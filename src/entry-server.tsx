import { renderToString } from 'react-dom/server';
import App, { type SsrPageComponents } from './App';
import { CatalogPage } from './components/CatalogPage';
import {
  ContactPage,
  CustomOrderPage,
  DeliveryPage,
  PaymentPage,
} from './components/InfoPages';
import { NotFoundPage } from './components/NotFoundPage';
import { ProductPage } from './components/ProductPage';
import { SITE_URL } from './config/seoConfig';
import { SITE_MEDIA, getResponsiveImage } from './data/media';
import { CATALOG_ITEMS } from './data/siteContent';
import { parsePathname } from './utils/catalogLogic';
import {
  buildSitemapXml,
  getAllPrerenderRoutes,
  getPageSeo,
  renderSeoHeadTags,
  type PageSeoData,
  type PreloadImageConfig,
} from './utils/seo';

const SSR_PAGES: SsrPageComponents = {
  CatalogPage,
  ProductPage,
  CustomOrderPage,
  PaymentPage,
  DeliveryPage,
  ContactPage,
  NotFoundPage,
};

export interface RenderedRoutePayload {
  html: string;
  seo: PageSeoData;
  headTags: string;
  lang: PageSeoData['lang'];
}

export function renderRoute(pathname: string): RenderedRoutePayload {
  const parsed = parsePathname(pathname, CATALOG_ITEMS);
  const seo = getPageSeo(parsed.lang, parsed.route);

  const { route } = parsed;
  let preloadImage: PreloadImageConfig | undefined;
  if (route.page === 'home') {
    const heroMeta = getResponsiveImage(SITE_MEDIA.heroWardrobe);
    preloadImage = {
      href: heroMeta.src,
      srcSet: heroMeta.srcSet || undefined,
      sizes: '(max-width: 1023px) 100vw, 72vw',
    };
  } else if (route.page === 'product') {
    const product = CATALOG_ITEMS.find((item) => item.id === route.productId);
    if (product) {
      const prodMeta = getResponsiveImage(product.image);
      preloadImage = {
        href: prodMeta.src,
        srcSet: prodMeta.srcSet || undefined,
        sizes: '(max-width: 1023px) 92vw, 56vw',
      };
    }
  }

  const html = renderToString(
    <App initialPath={pathname} ssrPages={SSR_PAGES} />,
  );
  const headTags = renderSeoHeadTags(seo, preloadImage);

  return {
    html,
    seo,
    headTags,
    lang: seo.lang,
  };
}

export {
  SITE_URL,
  buildSitemapXml,
  getAllPrerenderRoutes,
  getPageSeo,
  renderSeoHeadTags,
};
