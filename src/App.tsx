import { Suspense, lazy, useEffect, useRef, useState, type ComponentType } from 'react';
import { FeaturedSection } from './components/FeaturedSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { OrderDrawer } from './components/OrderDrawer';
import { TwoPathSection } from './components/TwoPathSection';
import { CATALOG_ITEMS } from './data/siteContent';
import type {
  AppRoute,
  CatalogCategory,
  CatalogItem,
  Language,
  OrderBagItem,
} from './types/site';
import {
  addOrderBagItem,
  buildLocalizedPath,
  getFeaturedItems,
  getOrderBagCount,
  getOrderItemQuantity,
  parsePathname,
  parseStoredOrderBag,
  removeOrderBagItem,
  resolveActiveNavForRoute,
  shouldShowHeaderSearch,
  updateOrderBagQuantity,
} from './utils/catalogLogic';
import { applyClientSeoHead, getPageSeo } from './utils/seo';

const loadCatalogPage = () => import('./components/CatalogPage');
const loadProductPage = () => import('./components/ProductPage');
const loadInfoPages = () => import('./components/InfoPages');
const loadNotFoundPage = () => import('./components/NotFoundPage');

const LazyCatalogPage = lazy(() =>
  loadCatalogPage().then((m) => ({ default: m.CatalogPage })),
);
const LazyProductPage = lazy(() =>
  loadProductPage().then((m) => ({ default: m.ProductPage })),
);
const LazyCustomOrderPage = lazy(() =>
  loadInfoPages().then((m) => ({ default: m.CustomOrderPage })),
);
const LazyPaymentPage = lazy(() =>
  loadInfoPages().then((m) => ({ default: m.PaymentPage })),
);
const LazyDeliveryPage = lazy(() =>
  loadInfoPages().then((m) => ({ default: m.DeliveryPage })),
);
const LazyContactPage = lazy(() =>
  loadInfoPages().then((m) => ({ default: m.ContactPage })),
);
const LazyNotFoundPage = lazy(() =>
  loadNotFoundPage().then((m) => ({ default: m.NotFoundPage })),
);

export interface SsrPageComponents {
  CatalogPage: ComponentType<{
    lang: Language;
    activeCategory: CatalogCategory;
    orderBag: OrderBagItem[];
    onNavigate: (route: AppRoute, nextLang?: Language) => void;
    onAddToOrder: (productId: string) => void;
    onOpenOrderDrawer: () => void;
  }>;
  ProductPage: ComponentType<{
    product: CatalogItem;
    lang: Language;
    orderBagCount: number;
    productQuantityInOrder: number;
    onAddToOrderAndOpen: (productId: string) => void;
    onUpdateOrderQuantity: (productId: string, nextQuantity: number) => void;
    onOpenOrderDrawer: () => void;
    onNavigate: (route: AppRoute, nextLang?: Language) => void;
  }>;
  CustomOrderPage: ComponentType<{ lang: Language }>;
  PaymentPage: ComponentType<{ lang: Language }>;
  DeliveryPage: ComponentType<{ lang: Language }>;
  ContactPage: ComponentType<{ lang: Language }>;
  NotFoundPage: ComponentType<{
    lang: Language;
    onNavigate: (route: AppRoute, nextLang?: Language) => void;
  }>;
}

export async function preloadRouteChunk(route: AppRoute): Promise<void> {
  switch (route.page) {
    case 'catalog':
      await loadCatalogPage();
      break;
    case 'product':
      await loadProductPage();
      break;
    case 'custom-order':
    case 'payment':
    case 'delivery':
    case 'contact':
      await loadInfoPages();
      break;
    case 'not-found':
      await loadNotFoundPage();
      break;
    case 'home':
    default:
      break;
  }
}

export interface AppProps {
  initialPath?: string;
  ssrPages?: SsrPageComponents;
}

const LANG_STORAGE_KEY = 'sakhelosno_lang';
const BAG_STORAGE_KEY = 'sakhelosno_order_bag';

function resolvePath(pathOverride?: string) {
  const pathname =
    pathOverride ??
    (typeof window !== 'undefined' ? window.location.pathname : '/ka/');
  return parsePathname(pathname, CATALOG_ITEMS);
}

export default function App({ initialPath, ssrPages }: AppProps) {
  const initialParsed = resolvePath(initialPath);
  const [lang, setLang] = useState<Language>(initialParsed.lang);
  const [route, setRoute] = useState<AppRoute>(initialParsed.route);
  const [orderBag, setOrderBag] = useState<OrderBagItem[]>([]);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const bagLoadedRef = useRef(false);
  const [lastCategory, setLastCategory] = useState<CatalogCategory>(
    initialParsed.route.page === 'catalog'
      ? initialParsed.route.category
      : 'wardrobes',
  );

  // Hydrate saved order bag after mount so SSR and initial client markup always match
  useEffect(() => {
    try {
      const restored = parseStoredOrderBag(
        window.localStorage.getItem(BAG_STORAGE_KEY),
        CATALOG_ITEMS,
      );
      if (restored.length > 0) {
        setOrderBag(restored);
      }
    } catch {
      // Ignore storage access restriction
    } finally {
      bagLoadedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!bagLoadedRef.current) return;
    try {
      window.localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(orderBag));
    } catch {
      // Ignore storage access restriction
    }
  }, [orderBag]);

  // Keep document <html lang>, <title>, meta, canonical, hreflang, and JSON-LD in sync
  useEffect(() => {
    applyClientSeoHead(getPageSeo(lang, route));
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage access restriction
    }
  }, [lang, route]);

  // Handle browser Back / Forward navigation without modifying or redirecting the path
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parsePathname(window.location.pathname, CATALOG_ITEMS);
      setLang(parsed.lang);
      setRoute(parsed.route);
      if (parsed.route.page === 'catalog') {
        setLastCategory(parsed.route.category);
      }
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigateTo(nextRoute: AppRoute, nextLang?: Language) {
    const targetLang = nextLang ?? lang;
    const targetPath = buildLocalizedPath(targetLang, nextRoute);
    if (nextRoute.page === 'catalog') {
      setLastCategory(nextRoute.category);
    }
    setLang(targetLang);
    setRoute(nextRoute);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }

  function handleAddToOrder(productId: string) {
    setOrderBag((prev) => addOrderBagItem(prev, productId));
  }

  function handleAddToOrderAndOpen(productId: string) {
    setOrderBag((prev) => addOrderBagItem(prev, productId));
    setOrderDrawerOpen(true);
  }

  function handleUpdateOrderQty(productId: string, nextQuantity: number) {
    setOrderBag((prev) => updateOrderBagQuantity(prev, productId, nextQuantity));
  }

  function handleRemoveOrderItem(productId: string) {
    setOrderBag((prev) => removeOrderBagItem(prev, productId));
  }

  const activeCategory: CatalogCategory =
    route.page === 'catalog' ? route.category : lastCategory;
  const activeNavId = resolveActiveNavForRoute(route);
  const showSearch = shouldShowHeaderSearch(route);

  const selectedProduct =
    route.page === 'product'
      ? (CATALOG_ITEMS.find((item) => item.id === route.productId) ??
        CATALOG_ITEMS[0])
      : CATALOG_ITEMS[0];

  const featuredItems = getFeaturedItems(CATALOG_ITEMS);
  const orderCount = getOrderBagCount(orderBag);

  const CatalogPageComp = ssrPages?.CatalogPage ?? LazyCatalogPage;
  const ProductPageComp = ssrPages?.ProductPage ?? LazyProductPage;
  const CustomOrderPageComp = ssrPages?.CustomOrderPage ?? LazyCustomOrderPage;
  const PaymentPageComp = ssrPages?.PaymentPage ?? LazyPaymentPage;
  const DeliveryPageComp = ssrPages?.DeliveryPage ?? LazyDeliveryPage;
  const ContactPageComp = ssrPages?.ContactPage ?? LazyContactPage;
  const NotFoundPageComp = ssrPages?.NotFoundPage ?? LazyNotFoundPage;

  function renderInnerPage() {
    if (route.page === 'catalog') {
      return (
        <CatalogPageComp
          lang={lang}
          activeCategory={route.category}
          orderBag={orderBag}
          onNavigate={navigateTo}
          onAddToOrder={handleAddToOrder}
          onOpenOrderDrawer={() => setOrderDrawerOpen(true)}
        />
      );
    }
    if (route.page === 'product') {
      return (
        <ProductPageComp
          product={selectedProduct}
          lang={lang}
          orderBagCount={orderCount}
          productQuantityInOrder={getOrderItemQuantity(
            orderBag,
            selectedProduct.id,
          )}
          onAddToOrderAndOpen={handleAddToOrderAndOpen}
          onUpdateOrderQuantity={handleUpdateOrderQty}
          onOpenOrderDrawer={() => setOrderDrawerOpen(true)}
          onNavigate={navigateTo}
        />
      );
    }
    if (route.page === 'custom-order') {
      return <CustomOrderPageComp lang={lang} />;
    }
    if (route.page === 'payment') {
      return <PaymentPageComp lang={lang} />;
    }
    if (route.page === 'delivery') {
      return <DeliveryPageComp lang={lang} />;
    }
    if (route.page === 'contact') {
      return <ContactPageComp lang={lang} />;
    }
    if (route.page === 'not-found') {
      return <NotFoundPageComp lang={lang} onNavigate={navigateTo} />;
    }
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#EFE8DD] text-[#241C17]">
      <Navbar
        lang={lang}
        currentRoute={route}
        activeNavId={activeNavId}
        activeCategory={activeCategory}
        showSearch={showSearch}
        orderCount={orderCount}
        onNavigate={navigateTo}
        onOpenOrderDrawer={() => setOrderDrawerOpen(true)}
      />

      <main className="flex-1">
        {route.page === 'home' ? (
          <>
            <HeroSection
              lang={lang}
              activeCategory={activeCategory}
              onNavigate={navigateTo}
            />
            <FeaturedSection
              items={featuredItems}
              lang={lang}
              orderBag={orderBag}
              onNavigate={navigateTo}
              onAddToOrder={handleAddToOrder}
              onOpenOrderDrawer={() => setOrderDrawerOpen(true)}
            />
            <TwoPathSection lang={lang} onNavigate={navigateTo} />
          </>
        ) : (
          <Suspense fallback={<div className="min-h-[65vh] bg-[#EFE8DD]" />}>
            {renderInnerPage()}
          </Suspense>
        )}
      </main>

      <Footer
        lang={lang}
        activeCategory={activeCategory}
        onNavigate={navigateTo}
      />

      <OrderDrawer
        open={orderDrawerOpen}
        lang={lang}
        items={orderBag}
        onClose={() => setOrderDrawerOpen(false)}
        onUpdateQuantity={handleUpdateOrderQty}
        onRemoveItem={handleRemoveOrderItem}
        onClearAll={() => setOrderBag([])}
        onNavigate={navigateTo}
      />
    </div>
  );
}
