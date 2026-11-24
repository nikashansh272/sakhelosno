import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SITE_MEDIA, getResponsiveImage } from '../data/media';
import {
  CATALOG_ITEMS,
  HERO_CATEGORY_MENU,
  HERO_CUSTOM_ORDER_ENTRY,
  HERO_SLIDES,
  MADE_TO_ORDER_CATALOG_CARD,
  UI_COPY,
  pickText,
} from '../data/siteContent';
import type {
  AppRoute,
  CatalogCategory,
  HeroMenuCategory,
  Language,
} from '../types/site';
import {
  buildLocalizedPath,
  detectHorizontalSwipe,
  formatCategoryCount,
  getEyebrowClass,
  getNextHeroIndex,
  getPrevHeroIndex,
  isPlainLeftClick,
} from '../utils/catalogLogic';

interface HeroSectionProps {
  lang: Language;
  activeCategory: CatalogCategory;
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
}

export function HeroSection({
  lang,
  activeCategory,
  onNavigate,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabletMenuOpen, setTabletMenuOpen] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => getNextHeroIndex(prev, HERO_SLIDES.length));
    }, 6500);

    return () => window.clearInterval(timer);
  }, [activeIndex]);

  function routeForMenu(id: HeroMenuCategory): AppRoute {
    return id === 'custom-order'
      ? { page: 'custom-order' }
      : { page: 'catalog', category: id };
  }

  function renderMenuRightMeta(id: HeroMenuCategory) {
    if (id === 'custom-order') {
      return pickText(UI_COPY.storefront.customMetaLabel, lang);
    }
    return formatCategoryCount(CATALOG_ITEMS, id, lang);
  }

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    const touch = e.changedTouches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const start = touchStartRef.current;
    const touch = e.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch) return;
    const direction = detectHorizontalSwipe(
      start.x,
      touch.clientX,
      start.y,
      touch.clientY,
    );
    if (direction === 'next') {
      setActiveIndex((prev) => getNextHeroIndex(prev, HERO_SLIDES.length));
    } else if (direction === 'prev') {
      setActiveIndex((prev) => getPrevHeroIndex(prev, HERO_SLIDES.length));
    }
  }

  const activeSlide = HERO_SLIDES[activeIndex] ?? HERO_SLIDES[0];
  const slideCtaRoute: AppRoute = {
    page: 'catalog',
    category: activeSlide.targetCategory,
  };

  return (
    <section id="home" className="bg-[#EFE8DD]">
      <div className="mx-auto max-w-[1440px] md:px-4 md:pt-4 md:pb-6 sm:md:px-6 lg:px-10 lg:pt-6 lg:pb-8">
        {/* Tablet category dropdown above hero (md..lg) */}
        <div className="hidden md:block lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setTabletMenuOpen((prev) => !prev)}
            aria-expanded={tabletMenuOpen}
            className={`flex h-12 w-full items-center justify-between bg-[#F6F1E9] px-4 cursor-pointer ${
              lang === 'ka'
                ? 'text-[13px] font-semibold tracking-normal text-[#241C17]'
                : 'text-xs font-semibold uppercase tracking-[0.14em] text-[#241C17]'
            }`}
          >
            <span>{pickText(UI_COPY.storefront.categoriesLabel, lang)}</span>
            <ChevronDown
              className={`h-4 w-4 text-[#6B4428] transition-transform duration-150 ${
                tabletMenuOpen ? 'rotate-180' : ''
              }`}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </button>

          {tabletMenuOpen && (
            <div className="mt-1 flex flex-col gap-1 bg-[#F6F1E9] p-1.5">
              {[...HERO_CATEGORY_MENU, HERO_CUSTOM_ORDER_ENTRY].map((item) => {
                const isActive = item.id === activeCategory;
                const route = routeForMenu(item.id);
                const thumb = getResponsiveImage(item.thumbnail);
                return (
                  <a
                    key={item.id}
                    href={buildLocalizedPath(lang, route)}
                    onClick={(e) => {
                      if (isPlainLeftClick(e)) {
                        e.preventDefault();
                        setTabletMenuOpen(false);
                        onNavigate(route);
                      }
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200 no-underline ${
                      isActive
                        ? 'bg-[#EAE1D3] text-[#6B4428]'
                        : item.id === 'custom-order'
                          ? 'bg-[#EFE8DD] text-[#6B4428] hover:bg-[#EAE1D3]'
                          : 'text-[#241C17] hover:bg-[#EAE1D3]'
                    }`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <img
                        src={thumb.src}
                        srcSet={thumb.srcSet || undefined}
                        sizes="48px"
                        alt=""
                        width={thumb.width}
                        height={thumb.height}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-12 shrink-0 object-cover bg-[#E5DDD0]"
                      />
                      <span
                        className="min-w-0 leading-snug"
                        style={{ hyphens: 'none', overflowWrap: 'normal' }}
                      >
                        {pickText(item.label, lang)}
                      </span>
                    </span>
                    <span className="text-[11px] font-semibold text-[#6B4428] price-numerals whitespace-nowrap shrink-0 ml-2">
                      {renderMenuRightMeta(item.id)}
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Storefront split: Desktop Sidebar left + SINGLE unified Hero Banner right (exact 1 <h1> in DOM) */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[372px_minmax(0,1fr)] items-stretch gap-0 md:gap-6">
          {/* Desktop Category Sidebar */}
          <aside
            aria-label={pickText(UI_COPY.storefront.categoriesLabel, lang)}
            className="hidden lg:flex min-w-0 flex-col bg-[#F6F1E9]"
          >
            <div className={`bg-[#E5DDD0]/75 px-5 py-4 ${getEyebrowClass(lang, 'light')}`}>
              {pickText(UI_COPY.storefront.categoriesLabel, lang)}
            </div>

            <ul className="flex-1 flex flex-col justify-between gap-1.5 p-2.5">
              {[...HERO_CATEGORY_MENU, HERO_CUSTOM_ORDER_ENTRY].map((item) => {
                const isActive = item.id === activeCategory;
                const isCustom = item.id === 'custom-order';
                const route = routeForMenu(item.id);
                const thumb = getResponsiveImage(item.thumbnail);
                return (
                  <li key={item.id} className="flex flex-1 min-w-0">
                    <a
                      href={buildLocalizedPath(lang, route)}
                      onClick={(e) => {
                        if (isPlainLeftClick(e)) {
                          e.preventDefault();
                          onNavigate(route);
                        }
                      }}
                      aria-current={isActive ? 'true' : undefined}
                      className={`group flex w-full min-w-0 items-center justify-between gap-2.5 px-3.5 py-2 text-left text-[13px] font-medium transition-colors duration-200 no-underline ${
                        isActive
                          ? 'bg-[#EAE1D3] text-[#241C17]'
                          : isCustom
                            ? 'bg-[#EFE8DD] text-[#6B4428] hover:bg-[#EAE1D3]'
                            : 'text-[#241C17] hover:bg-[#EAE1D3]'
                      }`}
                    >
                      <span className="flex flex-1 items-center gap-3 min-w-0">
                        <img
                          src={thumb.src}
                          srcSet={thumb.srcSet || undefined}
                          sizes="48px"
                          alt=""
                          width={thumb.width}
                          height={thumb.height}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-12 shrink-0 object-cover bg-[#E5DDD0] transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                        />
                        <span
                          className="min-w-0 leading-snug"
                          style={{ hyphens: 'none', overflowWrap: 'normal' }}
                        >
                          {pickText(item.label, lang)}
                        </span>
                      </span>
                      <span className="text-xs font-semibold text-[#6B4428] price-numerals whitespace-nowrap shrink-0">
                        {renderMenuRightMeta(item.id)}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Unified Responsive Hero Slider: Single <h1>, single eager LCP image on slide 0 */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative flex min-h-[75vh] md:min-h-[480px] sm:md:min-h-[550px] lg:min-h-[600px] flex-col justify-end md:justify-between overflow-hidden bg-[#2A1E17]"
          >
            <div className="absolute inset-0 overflow-hidden">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === activeIndex;
                const imgMeta = getResponsiveImage(slide.image);
                return (
                  <div
                    key={slide.id}
                    aria-hidden={!isActive}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                      isActive ? 'opacity-100 z-0' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={imgMeta.src}
                      srcSet={imgMeta.srcSet || undefined}
                      sizes="(max-width: 1023px) 100vw, 72vw"
                      alt={pickText(slide.alt, lang)}
                      width={imgMeta.width}
                      height={imgMeta.height}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      decoding={idx === 0 ? 'sync' : 'async'}
                      fetchPriority={idx === 0 ? 'high' : 'low'}
                      className={`h-full w-full object-cover ${
                        isActive ? 'hero-ken-burns' : ''
                      }`}
                    />
                  </div>
                );
              })}

              {/* Mobile bottom gradient scrim */}
              <div
                aria-hidden="true"
                className="md:hidden absolute inset-0 z-10"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(30,20,14,0.16) 0%, rgba(30,20,14,0.44) 45%, rgba(26,17,12,0.92) 100%)',
                }}
              />
              {/* Desktop warm espresso left scrim */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute inset-0 z-10"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(34,22,16,0.88) 0%, rgba(34,22,16,0.58) 46%, rgba(34,22,16,0.14) 76%, rgba(34,22,16,0.0) 100%)',
                }}
              />
              <div
                aria-hidden="true"
                className="hidden md:block lg:hidden absolute inset-0 z-10 bg-[#221610]/28"
              />
            </div>

            {/* Single Hero Copy & Primary CTA */}
            <div className="relative z-20 flex md:flex-1 items-end md:items-center px-5 pt-24 pb-6 md:px-10 md:py-12 lg:px-14">
              <div
                key={activeSlide.id}
                className="flex min-h-[140px] md:min-h-[210px] w-full max-w-[470px] flex-col justify-end md:justify-center"
              >
                <div className="mb-2.5 md:mb-3.5">
                  <span className={getEyebrowClass(lang, 'dark')}>
                    {pickText(activeSlide.kicker, lang)}
                  </span>
                </div>

                <h1
                  className="font-display font-normal tracking-[-0.02em] text-[#F6F1E9] text-balance leading-[1.12] md:leading-[1.15]"
                  style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.3rem)' }}
                >
                  {pickText(activeSlide.headline, lang)}
                </h1>

                <p className="mt-2.5 md:mt-4 max-w-[42ch] text-[15px] md:text-sm leading-[1.45] md:leading-[1.6] text-[#E6DDD0]">
                  {pickText(activeSlide.subline, lang)}
                </p>

                <div className="mt-5 md:mt-7">
                  <a
                    href={buildLocalizedPath(lang, slideCtaRoute)}
                    onClick={(e) => {
                      if (isPlainLeftClick(e)) {
                        e.preventDefault();
                        onNavigate(slideCtaRoute);
                      }
                    }}
                    className="inline-flex min-h-[46px] md:min-h-[44px] w-full sm:w-auto items-center justify-center bg-[#6B4428] px-6 py-2.5 text-sm md:text-xs lg:text-sm font-semibold text-[#F6F1E9] hover:bg-[#55351E] transition-colors whitespace-nowrap no-underline"
                  >
                    {pickText(activeSlide.ctaLabel, lang)}
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom slider controls: 01 / 03 counter + sharp minimal arrows */}
            <div className="relative z-20 flex items-center justify-between gap-6 bg-[#241812]/72 backdrop-blur-[2px] px-5 py-3 md:px-10 md:py-3.5 lg:px-14">
              <span
                className="font-sans text-xs font-semibold tracking-[0.08em] text-[#E5D4B7] price-numerals whitespace-nowrap shrink-0"
                aria-live="polite"
              >
                0{activeIndex + 1} <span className="text-[#A98A5B]">/</span> 0
                {HERO_SLIDES.length}
              </span>

              <div className="flex items-center gap-1.5 md:gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      getPrevHeroIndex(prev, HERO_SLIDES.length),
                    )
                  }
                  aria-label="Previous slide"
                  className="flex h-10 w-10 md:h-8 md:w-8 items-center justify-center bg-[#3B2A20] text-[#F6F1E9] hover:bg-[#6B4428] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveIndex((prev) =>
                      getNextHeroIndex(prev, HERO_SLIDES.length),
                    )
                  }
                  aria-label="Next slide"
                  className="flex h-10 w-10 md:h-8 md:w-8 items-center justify-center bg-[#3B2A20] text-[#F6F1E9] hover:bg-[#6B4428] transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Categories (< 768px): 2-column grid of 5 category tiles + full-width made-to-order tile */}
        <div
          aria-label={pickText(UI_COPY.storefront.categoriesLabel, lang)}
          className="md:hidden px-5 pt-7 pb-10"
        >
          <div className="mb-3.5">
            <span className={getEyebrowClass(lang, 'light')}>
              {pickText(UI_COPY.storefront.categoriesLabel, lang)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {HERO_CATEGORY_MENU.map((item, idx) => {
              const route = routeForMenu(item.id);
              const thumb = getResponsiveImage(item.thumbnail);
              const isWideLast = idx === HERO_CATEGORY_MENU.length - 1;
              return (
                <a
                  key={`mobile-tile-${item.id}`}
                  href={buildLocalizedPath(lang, route)}
                  onClick={(e) => {
                    if (isPlainLeftClick(e)) {
                      e.preventDefault();
                      onNavigate(route);
                    }
                  }}
                  className={`group relative w-full box-border bg-[#2A1E17] text-left no-underline block ${
                    isWideLast ? 'col-span-2 aspect-[2.1/1]' : 'aspect-square'
                  }`}
                >
                  <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <img
                      src={thumb.src}
                      srcSet={thumb.srcSet || undefined}
                      sizes={isWideLast ? '92vw' : '46vw'}
                      alt=""
                      width={thumb.width}
                      height={thumb.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(30,20,14,0.06) 30%, rgba(26,17,12,0.90) 100%)',
                      }}
                    />
                  </div>
                  <span
                    className="relative z-10 box-border flex h-full w-full max-w-full items-end p-3 font-display font-semibold text-[#F6F1E9]"
                    style={{
                      fontSize:
                        item.id === 'lighting' ||
                        item.id === 'bathroom' ||
                        (item.id === 'kitchens' && lang === 'ka')
                          ? 'clamp(12.5px, 3.6vw, 17px)'
                          : 'clamp(15px, 4.3vw, 18px)',
                      lineHeight: 1.2,
                      hyphens: 'none',
                      overflowWrap: 'break-word',
                      wordBreak: 'normal',
                    }}
                  >
                    {pickText(item.label, lang)}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Separate full-width Made to Order tile */}
          {(() => {
            const customThumb = getResponsiveImage(SITE_MEDIA.twoPathCustomFitted);
            const customRoute: AppRoute = { page: 'custom-order' };
            return (
              <a
                href={buildLocalizedPath(lang, customRoute)}
                onClick={(e) => {
                  if (isPlainLeftClick(e)) {
                    e.preventDefault();
                    onNavigate(customRoute);
                  }
                }}
                className="group relative mt-3.5 block aspect-[2.15/1] w-full box-border bg-[#2A1E17] text-left no-underline"
              >
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                  <img
                    src={customThumb.src}
                    srcSet={customThumb.srcSet || undefined}
                    sizes="92vw"
                    alt=""
                    width={customThumb.width}
                    height={customThumb.height}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(30,20,14,0.12) 20%, rgba(26,17,12,0.92) 100%)',
                    }}
                  />
                </div>
                <div className="relative z-10 flex h-full w-full flex-col justify-end p-3.5">
                  <span className="font-display text-[17px] font-semibold leading-tight text-[#F6F1E9]">
                    {pickText(HERO_CUSTOM_ORDER_ENTRY.label, lang)}
                  </span>
                  <span className="mt-1 text-xs font-medium text-[#E5D4B7] price-numerals">
                    {pickText(MADE_TO_ORDER_CATALOG_CARD.priceLabel, lang)}
                  </span>
                </div>
              </a>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
