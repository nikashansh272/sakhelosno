import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  CATALOG_CATEGORIES,
  OWNER_CONFIG,
  UI_COPY,
  pickText,
} from '../data/siteContent';
import type { AppRoute, CatalogCategory, Language } from '../types/site';
import {
  buildLocalizedPath,
  buildTelHref,
  buildWhatsAppHref,
  getEyebrowClass,
  getLocalizedWordmark,
  isPlainLeftClick,
} from '../utils/catalogLogic';

interface FooterProps {
  lang: Language;
  activeCategory: CatalogCategory;
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
}

export function Footer({ lang, activeCategory, onNavigate }: FooterProps) {
  const [openAccordions, setOpenAccordions] = useState<{
    nav: boolean;
    categories: boolean;
    contact: boolean;
  }>({
    nav: false,
    categories: false,
    contact: false,
  });

  function toggleAccordion(key: 'nav' | 'categories' | 'contact') {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleInternalClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    route: AppRoute,
  ) {
    if (!isPlainLeftClick(e)) return;
    e.preventDefault();
    onNavigate(route);
  }

  const navLinks: Array<{ route: AppRoute; href: string; label: string }> = [
    {
      route: { page: 'home' },
      href: buildLocalizedPath(lang, { page: 'home' }),
      label: pickText(UI_COPY.nav.home, lang),
    },
    {
      route: { page: 'catalog', category: activeCategory },
      href: buildLocalizedPath(lang, {
        page: 'catalog',
        category: activeCategory,
      }),
      label: pickText(UI_COPY.nav.catalog, lang),
    },
    {
      route: { page: 'custom-order' },
      href: buildLocalizedPath(lang, { page: 'custom-order' }),
      label: pickText(UI_COPY.nav.customOrder, lang),
    },
    {
      route: { page: 'payment' },
      href: buildLocalizedPath(lang, { page: 'payment' }),
      label: pickText(UI_COPY.nav.payment, lang),
    },
    {
      route: { page: 'delivery' },
      href: buildLocalizedPath(lang, { page: 'delivery' }),
      label: pickText(UI_COPY.nav.delivery, lang),
    },
    {
      route: { page: 'contact' },
      href: buildLocalizedPath(lang, { page: 'contact' }),
      label: pickText(UI_COPY.nav.contact, lang),
    },
  ];

  const homeHref = buildLocalizedPath(lang, { page: 'home' });

  return (
    <footer className="bg-[#261B15] text-[#F6F1E9] pt-12 pb-9 md:pt-16 md:pb-12">
      {/* MOBILE FOOTER (< 768px) */}
      <div className="md:hidden px-5">
        <div className="space-y-4 pb-8">
          <a
            href={homeHref}
            onClick={(e) => handleInternalClick(e, { page: 'home' })}
            className="inline-flex items-center shrink-0"
          >
            <img
              src="/assets/aistudio/79c22dd3-5e60-400f-aa8e-b95b5c5b0a5a_4ada7875.png"
              alt={getLocalizedWordmark(lang)}
              width={2008}
              height={440}
              loading="lazy"
              decoding="async"
              className="block h-8 w-auto max-w-[200px] object-contain"
            />
          </a>
          <p className="text-[15px] leading-[1.6] text-[#CFC4B7]">
            {pickText(UI_COPY.footer.description, lang)}
          </p>
        </div>

        <div className="space-y-2 pb-4">
          <div className="bg-[#2E211A]">
            <button
              type="button"
              onClick={() => toggleAccordion('nav')}
              aria-expanded={openAccordions.nav}
              className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left cursor-pointer"
            >
              <span className={getEyebrowClass(lang, 'dark')}>
                {pickText(UI_COPY.footer.navHeading, lang)}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-[#E5D4B7] transition-transform duration-200 ${
                  openAccordions.nav ? 'rotate-180' : ''
                }`}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </button>
            {openAccordions.nav && (
              <ul className="px-4 pb-3 space-y-1 text-[15px] text-[#CFC4B7]">
                {navLinks.map((link) => (
                  <li key={`m-footer-${link.href}`}>
                    <a
                      href={link.href}
                      onClick={(e) => handleInternalClick(e, link.route)}
                      className="flex min-h-[44px] items-center hover:text-[#F6F1E9] transition-colors no-underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-[#2E211A]">
            <button
              type="button"
              onClick={() => toggleAccordion('categories')}
              aria-expanded={openAccordions.categories}
              className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left cursor-pointer"
            >
              <span className={getEyebrowClass(lang, 'dark')}>
                {pickText(UI_COPY.footer.categoriesHeading, lang)}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-[#E5D4B7] transition-transform duration-200 ${
                  openAccordions.categories ? 'rotate-180' : ''
                }`}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </button>
            {openAccordions.categories && (
              <ul className="px-4 pb-3 space-y-1 text-[15px] text-[#CFC4B7]">
                {CATALOG_CATEGORIES.map((category) => {
                  const catRoute: AppRoute = {
                    page: 'catalog',
                    category: category.id,
                  };
                  return (
                    <li key={`m-footer-cat-${category.id}`}>
                      <a
                        href={buildLocalizedPath(lang, catRoute)}
                        onClick={(e) => handleInternalClick(e, catRoute)}
                        className="flex min-h-[44px] items-center hover:text-[#F6F1E9] transition-colors no-underline"
                      >
                        {pickText(category.label, lang)}
                      </a>
                    </li>
                  );
                })}
                <li>
                  <a
                    href={buildLocalizedPath(lang, { page: 'custom-order' })}
                    onClick={(e) => handleInternalClick(e, { page: 'custom-order' })}
                    className="flex min-h-[44px] items-center text-[#E5D4B7] hover:text-[#F6F1E9] transition-colors no-underline"
                  >
                    {pickText(UI_COPY.nav.customOrder, lang)}
                  </a>
                </li>
              </ul>
            )}
          </div>

          <div className="bg-[#2E211A]">
            <button
              type="button"
              onClick={() => toggleAccordion('contact')}
              aria-expanded={openAccordions.contact}
              className="flex min-h-[48px] w-full items-center justify-between px-4 py-3 text-left cursor-pointer"
            >
              <span className={getEyebrowClass(lang, 'dark')}>
                {pickText(UI_COPY.footer.contactHeading, lang)}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-[#E5D4B7] transition-transform duration-200 ${
                  openAccordions.contact ? 'rotate-180' : ''
                }`}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </button>
            {openAccordions.contact && (
              <ul className="px-4 pb-4 space-y-1 text-[15px] text-[#CFC4B7]">
                <li className="py-2 text-[#F6F1E9]">
                  {pickText(OWNER_CONFIG.address, lang)}
                </li>
                <li>
                  <a
                    href={buildTelHref(OWNER_CONFIG.phoneE164)}
                    className="flex min-h-[44px] items-center text-[#E5D4B7] hover:text-[#F6F1E9] tabular-nums transition-colors font-medium no-underline"
                  >
                    {OWNER_CONFIG.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={buildWhatsAppHref(undefined, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center hover:text-[#F6F1E9] transition-colors no-underline"
                  >
                    WhatsApp {OWNER_CONFIG.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-6 pt-1">
                  <a
                    href={OWNER_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center text-sm text-[#F6F1E9] hover:text-[#E5D4B7] transition-colors no-underline"
                  >
                    Instagram
                  </a>
                  <a
                    href={OWNER_CONFIG.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] items-center text-sm text-[#F6F1E9] hover:text-[#E5D4B7] transition-colors no-underline"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="mt-4 pt-6 flex flex-col gap-2 text-xs text-[#B7AA9B]">
          <div className="text-[#F6F1E9] tabular-nums">
            © {OWNER_CONFIG.copyrightYear} {getLocalizedWordmark(lang)}
          </div>
          <div>{pickText(UI_COPY.footer.bottomNote, lang)}</div>
          <div className="pt-1 text-[#A98A5B] font-medium">Made by Onyx</div>
        </div>
      </div>

      {/* DESKTOP / TABLET FOOTER (>= 768px): Rich multi-column layout with "Made by Onyx" */}
      <div className="hidden md:block mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          <div className="lg:col-span-4 space-y-4">
            <a
              href={homeHref}
              onClick={(e) => handleInternalClick(e, { page: 'home' })}
              className="inline-flex items-center shrink-0"
            >
              <img
                src="/assets/aistudio/79c22dd3-5e60-400f-aa8e-b95b5c5b0a5a_4ada7875.png"
                alt={getLocalizedWordmark(lang)}
                width={2008}
                height={440}
                loading="lazy"
                decoding="async"
                className="h-9 sm:h-10 w-auto object-contain block"
              />
            </a>
            <p className="text-[13px] leading-[1.65] text-[#CFC4B7] max-w-[36ch]">
              {pickText(UI_COPY.footer.description, lang)}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-medium text-[#F6F1E9]">
              <a
                href={OWNER_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E5D4B7] transition-colors no-underline"
              >
                Instagram
              </a>
              <a
                href={OWNER_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E5D4B7] transition-colors no-underline"
              >
                Facebook
              </a>
            </div>
          </div>

          <nav aria-label={pickText(UI_COPY.footer.navHeading, lang)} className="lg:col-span-2">
            <h2 className={getEyebrowClass(lang, 'dark')}>
              {pickText(UI_COPY.footer.navHeading, lang)}
            </h2>
            <ul className="mt-4 space-y-2.5 text-[13px] text-[#CFC4B7]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleInternalClick(e, link.route)}
                    className="hover:text-[#F6F1E9] transition-colors no-underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={pickText(UI_COPY.footer.categoriesHeading, lang)} className="lg:col-span-3">
            <h2 className={getEyebrowClass(lang, 'dark')}>
              {pickText(UI_COPY.footer.categoriesHeading, lang)}
            </h2>
            <ul className="mt-4 space-y-2.5 text-[13px] text-[#CFC4B7]">
              {CATALOG_CATEGORIES.map((category) => {
                const catRoute: AppRoute = {
                  page: 'catalog',
                  category: category.id,
                };
                return (
                  <li key={category.id}>
                    <a
                      href={buildLocalizedPath(lang, catRoute)}
                      onClick={(e) => handleInternalClick(e, catRoute)}
                      className="hover:text-[#F6F1E9] transition-colors text-left no-underline"
                    >
                      {pickText(category.label, lang)}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={buildLocalizedPath(lang, { page: 'custom-order' })}
                  onClick={(e) => handleInternalClick(e, { page: 'custom-order' })}
                  className="text-[#E5D4B7] hover:text-[#F6F1E9] transition-colors text-left no-underline"
                >
                  {pickText(UI_COPY.nav.customOrder, lang)}
                </a>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={getEyebrowClass(lang, 'dark')}>
              {pickText(UI_COPY.footer.contactHeading, lang)}
            </h2>
            <ul className="mt-4 space-y-3 text-[13px] text-[#CFC4B7]">
              <li className="text-[#F6F1E9]">
                {pickText(OWNER_CONFIG.address, lang)}
              </li>
              <li>
                <a
                  href={buildTelHref(OWNER_CONFIG.phoneE164)}
                  className="text-[#E5D4B7] hover:text-[#F6F1E9] tabular-nums transition-colors font-medium no-underline"
                >
                  {OWNER_CONFIG.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppHref(undefined, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F6F1E9] transition-colors no-underline"
                >
                  WhatsApp {OWNER_CONFIG.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#2E211A] px-5 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#B7AA9B]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="text-[#F6F1E9] tabular-nums">
              © {OWNER_CONFIG.copyrightYear} {getLocalizedWordmark(lang)}
            </span>
            <span>{pickText(UI_COPY.footer.bottomNote, lang)}</span>
          </div>
          <div className="text-[#A98A5B] font-medium">Made by Onyx</div>
        </div>
      </div>
    </footer>
  );
}
