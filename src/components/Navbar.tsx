import { Menu, MessageSquare, Phone, Search, ShoppingBag, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getResponsiveImage } from '../data/media';
import {
  CATALOG_CATEGORIES,
  CATALOG_ITEMS,
  OWNER_CONFIG,
  UI_COPY,
  pickText,
} from '../data/siteContent';
import type {
  AppRoute,
  CatalogCategory,
  Language,
  PageNavId,
} from '../types/site';
import {
  buildLocalizedPath,
  buildTelHref,
  buildWhatsAppHref,
  formatPriceParts,
  getEyebrowClass,
  getLocalizedWordmark,
  isPlainLeftClick,
  searchCatalogItems,
} from '../utils/catalogLogic';
import { PriceDisplay } from './PriceDisplay';

interface NavbarProps {
  lang: Language;
  currentRoute: AppRoute;
  activeNavId: PageNavId | null;
  activeCategory: CatalogCategory;
  showSearch: boolean;
  orderCount: number;
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
  onOpenOrderDrawer: () => void;
}

const LANGUAGES: Array<{ code: Language; label: string; name: string }> = [
  { code: 'ka', label: 'GE', name: 'ქართული' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ru', label: 'RU', name: 'Русский' },
];

export function Navbar({
  lang,
  currentRoute,
  activeNavId,
  activeCategory,
  showSearch,
  orderCount,
  onNavigate,
  onOpenOrderDrawer,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchCatalogItems(CATALOG_ITEMS, searchQuery);
  const langTargetRoute: AppRoute =
    currentRoute.page === 'not-found' ? { page: 'home' } : currentRoute;

  useEffect(() => {
    if (!showSearch) {
      setSearchOpen(false);
    }
  }, [showSearch]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;
      const inDesktop = desktopSearchRef.current?.contains(target) ?? false;
      const inMobile = mobileSearchRef.current?.contains(target) ?? false;
      if (!inDesktop && !inMobile) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const navLinks: Array<{
    id: PageNavId;
    route: AppRoute;
    href: string;
    label: string;
  }> = [
    {
      id: 'home',
      route: { page: 'home' },
      href: buildLocalizedPath(lang, { page: 'home' }),
      label: pickText(UI_COPY.nav.home, lang),
    },
    {
      id: 'catalog',
      route: { page: 'catalog', category: activeCategory },
      href: buildLocalizedPath(lang, {
        page: 'catalog',
        category: activeCategory,
      }),
      label: pickText(UI_COPY.nav.catalog, lang),
    },
    {
      id: 'custom-order',
      route: { page: 'custom-order' },
      href: buildLocalizedPath(lang, { page: 'custom-order' }),
      label: pickText(UI_COPY.nav.customOrder, lang),
    },
    {
      id: 'payment',
      route: { page: 'payment' },
      href: buildLocalizedPath(lang, { page: 'payment' }),
      label: pickText(UI_COPY.nav.payment, lang),
    },
    {
      id: 'delivery',
      route: { page: 'delivery' },
      href: buildLocalizedPath(lang, { page: 'delivery' }),
      label: pickText(UI_COPY.nav.delivery, lang),
    },
    {
      id: 'contact',
      route: { page: 'contact' },
      href: buildLocalizedPath(lang, { page: 'contact' }),
      label: pickText(UI_COPY.nav.contact, lang),
    },
  ];

  function handleInternalLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    route: AppRoute,
    nextLang?: Language,
  ) {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(route, nextLang);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchResults.length > 0) {
      onNavigate({ page: 'product', productId: searchResults[0].id });
      setSearchOpen(false);
      setSearchQuery('');
    }
  }

  function renderSearchDropdown() {
    if (!(searchOpen && searchQuery.trim().length > 0)) return null;
    return (
      <div className="absolute left-0 right-0 top-full z-50 bg-[#F6F1E9] shadow-xl">
        {searchResults.length > 0 ? (
          <ul className="py-1 space-y-0.5">
            {searchResults.map((item) => {
              const productRoute: AppRoute = {
                page: 'product',
                productId: item.id,
              };
              const imgMeta = getResponsiveImage(item.image);
              return (
                <li key={item.id}>
                  <a
                    href={buildLocalizedPath(lang, productRoute)}
                    onClick={(e) => {
                      if (!isPlainLeftClick(e)) return;
                      e.preventDefault();
                      onNavigate(productRoute);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-[#EFE8DD] transition-colors no-underline"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={imgMeta.src}
                        srcSet={imgMeta.srcSet || undefined}
                        sizes="56px"
                        alt={pickText(item.imageAlt, lang)}
                        width={imgMeta.width}
                        height={imgMeta.height}
                        loading="lazy"
                        decoding="async"
                        className="h-11 w-14 shrink-0 object-cover bg-[#E5DDD0]"
                      />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-[#241C17]">
                          {pickText(item.name, lang)}
                        </div>
                        <div className="truncate text-[11px] text-[#7B6D62] tabular-nums">
                          {item.dimensions
                            ? `${item.code} · ${item.dimensions}`
                            : `${item.code} · ${pickText(item.materialNote, lang)}`}
                        </div>
                      </div>
                    </div>
                    <PriceDisplay
                      parts={formatPriceParts(item, lang)}
                      size="compact"
                      className="shrink-0"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="px-4 py-4 text-xs text-[#7B6D62]">
            {pickText(UI_COPY.storefront.searchEmpty, lang)}
          </div>
        )}
      </div>
    );
  }

  return (
    <header className="relative z-40 w-full bg-[#F6F1E9]">
      {/* MOBILE HEADER (< 768px): Non-sticky 56px top row + search bar on shop routes */}
      <div className="md:hidden bg-[#F6F1E9]">
        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-2 px-5">
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-fullscreen-menu"
              aria-label="Open navigation menu"
              className="-ml-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#241C17] hover:text-[#6B4428] transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>

          <a
            href={buildLocalizedPath(lang, { page: 'home' })}
            onClick={(e) => handleInternalLinkClick(e, { page: 'home' })}
            className="flex min-w-0 items-center justify-center"
          >
            <img
              src="/assets/logo-dark.png"
              alt={getLocalizedWordmark(lang)}
              width={2008}
              height={440}
              className="block h-7 sm:h-8 w-auto max-w-[148px] object-contain"
            />
          </a>

          <div className="flex items-center justify-end gap-0.5">
            <a
              href={buildTelHref(OWNER_CONFIG.phoneE164)}
              aria-label={`${pickText(UI_COPY.header.callLabel, lang)} · ${OWNER_CONFIG.phoneDisplay}`}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#6B4428] hover:text-[#241C17] transition-colors"
            >
              <Phone className="h-[19px] w-[19px]" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onOpenOrderDrawer}
              aria-label={`${pickText(UI_COPY.orderBag.buttonLabel, lang)}${orderCount > 0 ? ` (${orderCount})` : ''}`}
              className={`-mr-2 relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center transition-colors cursor-pointer ${
                orderCount > 0
                  ? 'text-[#6B4428]'
                  : 'text-[#241C17] hover:text-[#6B4428]'
              }`}
            >
              <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.7} aria-hidden="true" />
              {orderCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center bg-[#6B4428] px-1 text-[10px] font-semibold leading-none text-[#F6F1E9] price-numerals">
                  {orderCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {showSearch && (
          <div ref={mobileSearchRef} className="relative px-5 pb-3.5">
            <form onSubmit={handleSearchSubmit} role="search" className="relative flex">
              <label htmlFor="mobile-catalog-search-input" className="sr-only">
                {pickText(UI_COPY.storefront.searchPlaceholder, lang)}
              </label>
              <input
                id="mobile-catalog-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder={pickText(UI_COPY.storefront.searchPlaceholder, lang)}
                className="h-11 w-full bg-[#EFE8DD] pl-3.5 pr-16 text-[15px] text-[#241C17] placeholder:text-[#7B6D62] focus:bg-[#E5DDD0]/80 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSearchOpen(false);
                  }}
                  aria-label="Clear search"
                  className="absolute right-11 top-0 flex h-11 w-10 items-center justify-center text-[#7B6D62] hover:text-[#241C17] cursor-pointer"
                >
                  <X className="h-4 w-4" strokeWidth={1.6} />
                </button>
              )}
              <button
                type="submit"
                aria-label="Search catalog"
                className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#6B4428] text-[#F6F1E9] hover:bg-[#55351E] transition-colors cursor-pointer"
              >
                <Search className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </button>
            </form>
            {renderSearchDropdown()}
          </div>
        )}
      </div>

      {/* DESKTOP / TABLET HEADER (>= 768px) */}
      <div className="hidden md:block">
        <div className="bg-[#F6F1E9]">
          <div className="mx-auto flex max-w-[1440px] flex-wrap md:flex-nowrap items-center justify-between gap-2.5 md:gap-8 px-4 py-2.5 sm:px-6 lg:px-10">
            <a
              href={buildLocalizedPath(lang, { page: 'home' })}
              onClick={(e) => handleInternalLinkClick(e, { page: 'home' })}
              className="inline-flex items-center shrink-0"
            >
              <img
                src="/assets/logo-dark.png"
                alt={getLocalizedWordmark(lang)}
                width={2008}
                height={440}
                className="h-9 sm:h-10 w-auto object-contain block"
              />
            </a>

            {showSearch && (
              <div
                ref={desktopSearchRef}
                className="relative order-3 md:order-2 w-full md:flex-1 md:max-w-[520px]"
              >
                <form onSubmit={handleSearchSubmit} role="search" className="relative flex">
                  <label htmlFor="catalog-search-input" className="sr-only">
                    {pickText(UI_COPY.storefront.searchPlaceholder, lang)}
                  </label>
                  <input
                    id="catalog-search-input"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchOpen(true);
                    }}
                    onFocus={() => setSearchOpen(true)}
                    placeholder={pickText(UI_COPY.storefront.searchPlaceholder, lang)}
                    className="h-9 w-full bg-[#EFE8DD] pl-3.5 pr-16 text-xs sm:text-[13px] text-[#241C17] placeholder:text-[#7B6D62] focus:bg-[#E5DDD0]/80 focus:outline-none transition-colors"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchOpen(false);
                      }}
                      aria-label="Clear search"
                      className="absolute right-10 top-0 flex h-9 w-8 items-center justify-center text-[#7B6D62] hover:text-[#241C17] cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                  )}
                  <button
                    type="submit"
                    aria-label="Search catalog"
                    className="flex h-9 w-10 shrink-0 items-center justify-center bg-[#6B4428] text-[#F6F1E9] hover:bg-[#55351E] transition-colors cursor-pointer"
                  >
                    <Search className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                  </button>
                </form>

                {renderSearchDropdown()}
              </div>
            )}

            {/* Right: Direct phone + sharp Order drawer button */}
            <div className="order-2 md:order-3 flex items-center gap-3 sm:gap-4 shrink-0">
              <a
                href={buildTelHref(OWNER_CONFIG.phoneE164)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#241C17] hover:text-[#6B4428] transition-colors tabular-nums whitespace-nowrap shrink-0 no-underline"
              >
                <Phone
                  className="h-3.5 w-3.5 text-[#6B4428] shrink-0"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span>{OWNER_CONFIG.phoneDisplay}</span>
              </a>

              <button
                type="button"
                onClick={onOpenOrderDrawer}
                className={`inline-flex h-9 items-center justify-center gap-2 px-3.5 text-xs sm:text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  orderCount > 0
                    ? 'bg-[#6B4428] text-[#F6F1E9] hover:bg-[#55351E]'
                    : 'bg-[#EFE8DD] text-[#241C17] hover:bg-[#E5DDD0]'
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                <span>{pickText(UI_COPY.orderBag.buttonLabel, lang)}</span>
                {orderCount > 0 && (
                  <span className="font-semibold price-numerals">{orderCount}</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-expanded={mobileOpen}
                aria-controls="tablet-navigation-drawer"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="inline-flex lg:hidden h-9 w-9 items-center justify-center bg-[#EFE8DD] text-[#241C17] hover:bg-[#E5DDD0] transition-colors cursor-pointer"
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Menu className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Nav links left, GE | EN | RU real <a> language switcher right */}
        <div className="bg-[#E5DDD0]/65">
          <div className="mx-auto flex h-10 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-10">
            <nav
              aria-label="Primary navigation"
              className="hidden lg:flex h-full items-center gap-7"
            >
              {navLinks.map((link) => {
                const isActive = activeNavId === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleInternalLinkClick(e, link.route)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`inline-flex h-full items-center px-1.5 text-[13px] font-medium transition-colors duration-150 whitespace-nowrap shrink-0 no-underline ${
                      isActive
                        ? 'bg-[#EFE8DD] text-[#6B4428]'
                        : 'text-[#5A4E45] hover:text-[#6B4428]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <span className={`inline-flex lg:hidden ${getEyebrowClass(lang, 'light')}`}>
              {pickText(UI_COPY.header.cityTag, lang)}
            </span>

            <nav
              aria-label="Language switcher"
              className="flex items-center bg-[#EFE8DD]"
            >
              {LANGUAGES.map((item) => {
                const active = lang === item.code;
                const href = buildLocalizedPath(item.code, langTargetRoute);
                return (
                  <a
                    key={item.code}
                    href={href}
                    hrefLang={item.code}
                    aria-label={item.name}
                    aria-current={active ? 'true' : undefined}
                    onClick={(e) =>
                      handleInternalLinkClick(e, langTargetRoute, item.code)
                    }
                    className={`px-2.5 py-1 text-[11px] font-medium tracking-wider transition-colors duration-150 whitespace-nowrap shrink-0 no-underline ${
                      active
                        ? 'bg-[#6B4428] text-[#F6F1E9]'
                        : 'text-[#5A4E45] hover:text-[#241C17]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tablet navigation drawer (768px..1023px) */}
        {mobileOpen && (
          <div
            id="tablet-navigation-drawer"
            className="hidden md:block lg:hidden bg-[#E5DDD0] px-4 py-3 sm:px-6"
          >
            <nav aria-label="Tablet navigation" className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeNavId === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleInternalLinkClick(e, link.route)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-2 py-2.5 text-sm transition-colors no-underline ${
                      isActive
                        ? 'bg-[#EFE8DD]/75 font-semibold text-[#6B4428]'
                        : 'font-medium text-[#241C17] hover:text-[#6B4428]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* FULL-SCREEN MOBILE CREAM HAMBURGER PANEL (< 768px) */}
      <div
        id="mobile-fullscreen-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!mobileOpen}
        aria-label="Mobile navigation menu"
        className={`md:hidden fixed inset-0 z-50 bg-[#F6F1E9] transition-opacity duration-200 ease-out ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto px-5 pt-2 pb-8">
          <div>
            <div className="flex h-14 items-center justify-end">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="-mr-2 inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#241C17] hover:text-[#6B4428] transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="mt-2 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeNavId === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleInternalLinkClick(e, link.route)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-[44px] items-center text-[22px] leading-snug transition-colors no-underline ${
                      isActive
                        ? 'font-semibold text-[#6B4428]'
                        : 'font-normal text-[#241C17] hover:text-[#6B4428]'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="mt-8">
              <div className={getEyebrowClass(lang, 'light')}>
                {pickText(UI_COPY.storefront.categoriesLabel, lang)}
              </div>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {CATALOG_CATEGORIES.map((category, idx) => {
                  const catRoute: AppRoute = {
                    page: 'catalog',
                    category: category.id,
                  };
                  const isLastOdd = idx === CATALOG_CATEGORIES.length - 1;
                  return (
                    <a
                      key={category.id}
                      href={buildLocalizedPath(lang, catRoute)}
                      onClick={(e) => handleInternalLinkClick(e, catRoute)}
                      className={`flex min-h-[44px] items-center bg-[#EFE8DD] px-3 py-2.5 text-left text-[13.5px] leading-snug font-medium text-[#241C17] hover:bg-[#E5DDD0] hover:text-[#6B4428] transition-colors no-underline ${
                        isLastOdd ? 'col-span-2' : ''
                      }`}
                      style={{ hyphens: 'none', overflowWrap: 'break-word' }}
                    >
                      {pickText(category.label, lang)}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <nav
                aria-label="Mobile language switcher"
                className="inline-flex items-center bg-[#EFE8DD] p-1"
              >
                {LANGUAGES.map((item) => {
                  const active = lang === item.code;
                  const href = buildLocalizedPath(item.code, langTargetRoute);
                  return (
                    <a
                      key={item.code}
                      href={href}
                      hrefLang={item.code}
                      aria-label={item.name}
                      aria-current={active ? 'true' : undefined}
                      onClick={(e) =>
                        handleInternalLinkClick(e, langTargetRoute, item.code)
                      }
                      className={`inline-flex min-h-[44px] min-w-[56px] items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider transition-colors no-underline ${
                        active
                          ? 'bg-[#6B4428] text-[#F6F1E9]'
                          : 'text-[#5A4E45] hover:text-[#241C17]'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <a
              href={buildTelHref(OWNER_CONFIG.phoneE164)}
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 bg-[#6B4428] px-5 py-3 text-[15px] font-semibold text-[#F6F1E9] hover:bg-[#55351E] transition-colors price-numerals no-underline"
            >
              <Phone className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>{OWNER_CONFIG.phoneDisplay}</span>
            </a>

            <a
              href={buildWhatsAppHref(undefined, lang)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 bg-[#EFE8DD] px-5 py-3 text-[15px] font-medium text-[#241C17] hover:bg-[#E5DDD0] transition-colors no-underline"
            >
              <MessageSquare className="h-4 w-4 text-[#6B4428] shrink-0" strokeWidth={1.6} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
