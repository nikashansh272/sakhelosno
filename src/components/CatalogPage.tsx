import {
  CATALOG_CATEGORIES,
  CATALOG_ITEMS,
  UI_COPY,
  pickText,
} from '../data/siteContent';
import type {
  AppRoute,
  CatalogCategory,
  Language,
  OrderBagItem,
} from '../types/site';
import {
  buildLocalizedPath,
  filterCatalogByCategory,
  formatCategoryCount,
  getEyebrowClass,
  getOrderItemQuantity,
  isPlainLeftClick,
} from '../utils/catalogLogic';
import { InnerPageHeader } from './InnerPageHeader';
import { MadeToOrderCatalogCard } from './MadeToOrderCatalogCard';
import { ProductCard } from './ProductCard';

interface CatalogPageProps {
  lang: Language;
  activeCategory: CatalogCategory;
  orderBag: OrderBagItem[];
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
  onAddToOrder: (productId: string) => void;
  onOpenOrderDrawer: () => void;
}

export function CatalogPage({
  lang,
  activeCategory,
  orderBag,
  onNavigate,
  onAddToOrder,
  onOpenOrderDrawer,
}: CatalogPageProps) {
  const activeCategoryObj =
    CATALOG_CATEGORIES.find((c) => c.id === activeCategory) ??
    CATALOG_CATEGORIES[0];
  const visibleItems = filterCatalogByCategory(CATALOG_ITEMS, activeCategory);

  return (
    <section className="bg-[#EFE8DD]">
      <InnerPageHeader
        title={pickText(activeCategoryObj.label, lang)}
        intro={pickText(activeCategoryObj.intro, lang)}
      />

      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-6 md:py-12 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-7 md:gap-8">
          <aside
            aria-label={pickText(UI_COPY.storefront.categoriesLabel, lang)}
            className="lg:col-span-3 bg-[#F6F1E9]"
          >
            <div className={`bg-[#E5DDD0] px-4 md:px-5 py-3.5 ${getEyebrowClass(lang, 'light')}`}>
              {pickText(UI_COPY.storefront.categoriesLabel, lang)}
            </div>
            <ul className="grid grid-cols-2 md:flex md:flex-col gap-1 p-2">
              {CATALOG_CATEGORIES.map((category, idx) => {
                const active = category.id === activeCategory;
                const catRoute: AppRoute = {
                  page: 'catalog',
                  category: category.id,
                };
                const isLastOdd = idx === CATALOG_CATEGORIES.length - 1;
                return (
                  <li
                    key={category.id}
                    className={`min-w-0 ${isLastOdd ? 'col-span-2 md:col-span-1' : ''}`}
                  >
                    <a
                      href={buildLocalizedPath(lang, catRoute)}
                      onClick={(e) => {
                        if (isPlainLeftClick(e)) {
                          e.preventDefault();
                          onNavigate(catRoute);
                        }
                      }}
                      aria-current={active ? 'page' : undefined}
                      className={`group flex min-h-[44px] w-full items-center justify-center md:justify-between gap-2 px-2.5 md:px-4 py-2.5 md:py-3 text-center md:text-left text-[12px] sm:text-[13px] md:text-sm transition-colors duration-200 no-underline ${
                        active
                          ? 'bg-[#6B4428] text-[#F6F1E9] md:bg-[#EAE1D3] font-semibold md:text-[#6B4428]'
                          : 'font-medium text-[#241C17] bg-[#EFE8DD]/70 md:bg-transparent hover:bg-[#EAE1D3]'
                      }`}
                    >
                      <span
                        className="leading-snug"
                        style={{ hyphens: 'none', overflowWrap: 'break-word' }}
                      >
                        {pickText(category.label, lang)}
                      </span>
                      <span className="hidden md:inline-block text-xs font-semibold text-[#6B4428] price-numerals whitespace-nowrap shrink-0">
                        {formatCategoryCount(CATALOG_ITEMS, category.id, lang)}
                      </span>
                    </a>
                  </li>
                );
              })}

              <li className="col-span-2 md:col-span-1 min-w-0 pt-1 md:pt-2">
                <a
                  href={buildLocalizedPath(lang, { page: 'custom-order' })}
                  onClick={(e) => {
                    if (isPlainLeftClick(e)) {
                      e.preventDefault();
                      onNavigate({ page: 'custom-order' });
                    }
                  }}
                  className="flex min-h-[44px] w-full items-center justify-center md:justify-between gap-2 bg-[#EFE8DD] px-3 md:px-4 py-2.5 md:py-3 text-center md:text-left text-[12.5px] md:text-sm font-semibold text-[#6B4428] hover:bg-[#EAE1D3] transition-colors no-underline"
                >
                  <span>{pickText(UI_COPY.nav.customOrder, lang)}</span>
                  <span className="hidden md:inline-block text-xs font-semibold text-[#6B4428] whitespace-nowrap shrink-0">
                    {pickText(UI_COPY.storefront.customMetaLabel, lang)}
                  </span>
                </a>
              </li>
            </ul>
          </aside>

          {/* Main Catalog Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-6 items-stretch">
              {visibleItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  lang={lang}
                  quantityInOrder={getOrderItemQuantity(orderBag, item.id)}
                  onNavigate={onNavigate}
                  onAddToOrder={onAddToOrder}
                  onOpenOrderDrawer={onOpenOrderDrawer}
                  cardSurface="cream"
                  compactMobile
                />
              ))}

              <MadeToOrderCatalogCard
                lang={lang}
                onNavigate={onNavigate}
                cardSurface="cream"
                compactMobile
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
