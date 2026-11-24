import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { UI_COPY, pickText } from '../data/siteContent';
import type { AppRoute, CatalogItem, Language, OrderBagItem } from '../types/site';
import {
  buildLocalizedPath,
  getActiveCarouselIndex,
  getEyebrowClass,
  getOrderItemQuantity,
  isPlainLeftClick,
} from '../utils/catalogLogic';
import { ProductCard } from './ProductCard';

interface FeaturedSectionProps {
  items: CatalogItem[];
  lang: Language;
  orderBag: OrderBagItem[];
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
  onAddToOrder: (productId: string) => void;
  onOpenOrderDrawer: () => void;
}

export function FeaturedSection({
  items,
  lang,
  orderBag,
  onNavigate,
  onAddToOrder,
  onOpenOrderDrawer,
}: FeaturedSectionProps) {
  const visibleItems = items.slice(0, 6);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [activeSlide, setActiveSlide] = useState(0);

  if (visibleItems.length === 0) return null;

  function scrollMobileTrack(direction: 'prev' | 'next') {
    const node = trackRef.current;
    if (!node) return;
    const distance = Math.max(260, Math.round(node.clientWidth * 0.84));
    node.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
  }

  function handleMobileScroll() {
    if (rafRef.current !== 0) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;
      const node = trackRef.current;
      if (!node) return;
      const offsets = Array.from(node.children).map(
        (child) => (child as HTMLElement).offsetLeft - node.offsetLeft,
      );
      setActiveSlide(getActiveCarouselIndex(node.scrollLeft, offsets));
    });
  }

  const featuredTitle = pickText(UI_COPY.storefront.featuredTitle, lang);
  const catalogRoute: AppRoute = { page: 'catalog', category: 'wardrobes' };

  return (
    <section id="featured" className="bg-[#EFE8DD] py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-6 lg:px-10">
        <div className="mb-7 md:mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
          <div>
            <span className={getEyebrowClass(lang, 'light')}>
              {pickText(UI_COPY.storefront.featuredEyebrow, lang)}
            </span>
            <h2
              className="mt-2 font-display font-medium text-[#241C17] leading-[1.15]"
              style={{ fontSize: 'clamp(1.5rem, 5.4vw, 2.25rem)' }}
            >
              {featuredTitle}
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            <a
              href={buildLocalizedPath(lang, catalogRoute)}
              onClick={(e) => {
                if (isPlainLeftClick(e)) {
                  e.preventDefault();
                  onNavigate(catalogRoute);
                }
              }}
              className="group inline-flex min-h-[44px] items-center gap-1.5 text-sm md:text-[13px] font-semibold text-[#6B4428] hover:text-[#55351E] transition-colors no-underline"
            >
              <span>{pickText(UI_COPY.storefront.viewFullCatalog, lang)}</span>
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>

            <div className="flex md:hidden items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => scrollMobileTrack('prev')}
                aria-label={`Previous ${featuredTitle}`}
                className="flex h-11 w-11 items-center justify-center bg-[#F6F1E9] text-[#241C17] hover:bg-[#6B4428] hover:text-[#F6F1E9] transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={() => scrollMobileTrack('next')}
                aria-label={`Next ${featuredTitle}`}
                className="flex h-11 w-11 items-center justify-center bg-[#F6F1E9] text-[#241C17] hover:bg-[#6B4428] hover:text-[#F6F1E9] transition-colors cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile (< 768px): Swipeable track */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            onScroll={handleMobileScroll}
            className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-5 pb-1"
          >
            {visibleItems.map((item) => (
              <div
                key={`mobile-featured-${item.id}`}
                className="w-[82%] shrink-0 snap-start"
              >
                <ProductCard
                  item={item}
                  lang={lang}
                  quantityInOrder={getOrderItemQuantity(orderBag, item.id)}
                  onNavigate={onNavigate}
                  onAddToOrder={onAddToOrder}
                  onOpenOrderDrawer={onOpenOrderDrawer}
                  cardSurface="cream"
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-end">
            <span
              className="font-sans text-xs font-semibold tracking-[0.08em] text-[#6B4428] price-numerals"
              aria-live="polite"
            >
              0{activeSlide + 1} <span className="text-[#A98A5B]">/</span> 0
              {visibleItems.length}
            </span>
          </div>
        </div>

        {/* Desktop / Tablet (>= 768px): Clean uniform 3-column gallery grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {visibleItems.map((item) => (
            <div key={item.id} className="h-full">
              <ProductCard
                item={item}
                lang={lang}
                quantityInOrder={getOrderItemQuantity(orderBag, item.id)}
                onNavigate={onNavigate}
                onAddToOrder={onAddToOrder}
                onOpenOrderDrawer={onOpenOrderDrawer}
                cardSurface="cream"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
