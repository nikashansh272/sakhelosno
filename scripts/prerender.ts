import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SSR_BUNDLE_PATH = path.join(ROOT_DIR, '.ssr-tmp', 'entry-server.js');

interface SsrModule {
  SITE_URL: string;
  renderRoute: (pathname: string) => {
    html: string;
    headTags: string;
    lang: string;
    seo: {
      title: string;
      description: string;
      jsonLd: Array<Record<string, unknown>>;
    };
  };
  getAllPrerenderRoutes: () => Array<{ path: string; lang: string }>;
  buildSitemapXml: () => string;
}

function injectIntoTemplate(
  template: string,
  lang: string,
  headTags: string,
  appHtml: string,
  prerenderPath: string,
): string {
  const withLang = template.replace(
    /<html\s+lang="[^"]*"/i,
    `<html lang="${lang}"`,
  );
  const withHead = withLang.replace(
    /<!--seo-head-start-->[\s\S]*?<!--seo-head-end-->/,
    headTags,
  );
  return withHead.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root" data-prerender-path="${prerenderPath}">${appHtml}</div>`,
  );
}

function routePathToOutputFile(routePath: string): string {
  const trimmed = routePath.replace(/^\/+|\/+$/g, '');
  if (!trimmed) {
    return path.join(DIST_DIR, 'index.html');
  }
  return path.join(DIST_DIR, trimmed, 'index.html');
}

async function main() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  const template = await fs.readFile(templatePath, 'utf-8');
  const ssrModule = (await import(
    pathToFileURL(SSR_BUNDLE_PATH).href
  )) as SsrModule;

  const routes = ssrModule.getAllPrerenderRoutes();
  let renderedCount = 0;

  for (const entry of routes) {
    const rendered = ssrModule.renderRoute(entry.path);
    const h1Count = (rendered.html.match(/<h1[\s>]/gi) ?? []).length;
    if (h1Count !== 1) {
      throw new Error(
        `Prerender check failed for ${entry.path}: expected 1 <h1>, found ${h1Count}`,
      );
    }

    // Validate JSON-LD serialization parses cleanly
    for (const schema of rendered.seo.jsonLd) {
      JSON.parse(JSON.stringify(schema));
    }

    const pageHtml = injectIntoTemplate(
      template,
      rendered.lang,
      rendered.headTags,
      rendered.html,
      entry.path,
    );
    const outputFile = routePathToOutputFile(entry.path);
    await fs.mkdir(path.dirname(outputFile), { recursive: true });
    await fs.writeFile(outputFile, pageHtml, 'utf-8');
    renderedCount += 1;
  }

  // Render custom 404 page
  const notFoundRendered = ssrModule.renderRoute('/404');
  const notFoundHtml = injectIntoTemplate(
    template,
    notFoundRendered.lang,
    notFoundRendered.headTags,
    notFoundRendered.html,
    '/404',
  );
  await fs.writeFile(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');

  // Keep dist/index.html as clean SPA shell without any inline redirect script
  // so Netlify's `/* /index.html 200` serves unknown routes directly to NotFoundPage
  const cleanShell = template.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    '<div id="root"></div>',
  );
  await fs.writeFile(path.join(DIST_DIR, 'index.html'), cleanShell, 'utf-8');

  // Generate sitemap.xml and robots.txt synced to SITE_URL
  const sitemapXml = ssrModule.buildSitemapXml();
  await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${ssrModule.SITE_URL}/sitemap.xml\n`;
  await fs.writeFile(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf-8');

  console.log(
    `[prerender] Generated ${renderedCount} static route HTML files, 404.html, clean SPA fallback index.html, sitemap.xml, and robots.txt`,
  );
}

main().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
