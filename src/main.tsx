import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { preloadRouteChunk } from './App.tsx';
import { CATALOG_ITEMS } from './data/siteContent';
import { parsePathname } from './utils/catalogLogic';
import './index.css';

function normalizeComparePath(value: string): string {
  const clean = value.replace(/\/+$/, '') || '/';
  return clean === '/404.html' ? '/404' : clean;
}

async function bootstrap() {
  const rootEl = document.getElementById('root');
  if (!rootEl) return;

  // Redirect bare root "/" or legacy /mirrors paths once (fallback for local dev without Netlify _redirects).
  // Never redirect valid /ka/, /en/, or /ru/ routes.
  let currentPath = window.location.pathname;
  let parsed = parsePathname(currentPath, CATALOG_ITEMS);
  if (parsed.redirectTo && parsed.redirectTo !== currentPath) {
    window.history.replaceState(null, '', parsed.redirectTo);
    currentPath = parsed.redirectTo;
    parsed = parsePathname(currentPath, CATALOG_ITEMS);
  }
  await preloadRouteChunk(parsed.route);

  const prerenderPath = rootEl.getAttribute('data-prerender-path');
  const currentNorm = normalizeComparePath(currentPath);
  const canHydrate =
    rootEl.firstElementChild !== null &&
    rootEl.innerHTML.trim().length > 0 &&
    prerenderPath !== null &&
    (normalizeComparePath(prerenderPath) === currentNorm ||
      (prerenderPath === '/404' && parsed.route.page === 'not-found'));

  if (canHydrate) {
    hydrateRoot(rootEl, <App initialPath={currentPath} />);
  } else {
    rootEl.innerHTML = '';
    createRoot(rootEl).render(<App initialPath={currentPath} />);
  }
}

void bootstrap();
