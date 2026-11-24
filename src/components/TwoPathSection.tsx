import { ArrowRight } from 'lucide-react';
import { SITE_MEDIA, getResponsiveImage } from '../data/media';
import {
  CATALOG_ITEMS,
  OWNER_CONFIG,
  TWO_PATH_BAND,
  pickText,
} from '../data/siteContent';
import type { AppRoute, Language } from '../types/site';
import {
  buildLocalizedPath,
  formatCustomRateParts,
  formatPriceParts,
  getEyebrowClass,
  getLowestCatalogPrice,
  isPlainLeftClick,
} from '../utils/catalogLogic';
import { PriceDisplay } from './PriceDisplay';

interface TwoPathSectionProps {
  lang: Language;
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
}

export function TwoPathSection({ lang, onNavigate }: TwoPathSectionProps) {
  const lowestPrice = getLowestCatalogPrice(CATALOG_ITEMS);
  const readyPriceParts = formatPriceParts(
    { priceGel: lowestPrice, isStartingPrice: true },
    lang,
  );
  const customPriceParts = formatCustomRateParts(
    OWNER_CONFIG.customOrderRateGelPerSqm,
    lang,
  );

  const readyRoute: AppRoute = { page: 'catalog', category: 'wardrobes' };
  const customRoute: AppRoute = { page: 'custom-order' };
  const readyImg = getResponsiveImage(SITE_MEDIA.catalogVanityMono);
  const customImg = getResponsiveImage(SITE_MEDIA.twoPathCustomFitted);

  const readyAlt =
    lang === 'ka'
      ? 'მზა აბაზანის კაკლის კომოდი ქვის ზედაპირით'
      : lang === 'ru'
        ? 'Готовая тумба для ванной из ореха с каменной столешницей'
        : 'Ready-made floating walnut vanity with natural stone top';

  const customAlt =
    lang === 'ka'
      ? 'ინდივიდუალური ავეჯი შეკვეთით — ჩაშენებული კაკლის კარადა და სამუშაო კუთხე'
      : lang === 'ru'
        ? 'Индивидуальная мебель на заказ — встроенный шкаф и рабочая зона из ореха'
        : 'Custom furniture made to order — built-in walnut cabinetry and desk';

  return (
    <section
      aria-label={
        lang === 'ka'
          ? 'შეძენის ორი გზა'
          : lang === 'ru'
            ? 'Два формата заказа'
            : 'Two ways to furnish'
      }
      className="bg-[#EFE8DD] pb-14 md:pb-16"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left tile: Ready-made models */}
          <article className="group relative min-h-[250px] sm:min-h-0 sm:aspect-[16/10] overflow-hidden bg-[#2A1E17]">
            <img
              src={readyImg.src}
              srcSet={readyImg.srcSet || undefined}
              sizes="(max-width: 767px) 92vw, 48vw"
              alt={readyAlt}
              width={readyImg.width}
              height={readyImg.height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(30,20,14,0.12) 0%, rgba(30,20,14,0.52) 50%, rgba(28,18,13,0.88) 100%)',
              }}
            />

            <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-8 lg:p-10">
              <span className={getEyebrowClass(lang, 'dark')}>
                {pickText(TWO_PATH_BAND.ready.eyebrow, lang)}
              </span>

              <h2
                className="mt-2 font-display font-medium text-[#F6F1E9] leading-[1.15]"
                style={{ fontSize: 'clamp(1.45rem, 5vw, 1.875rem)' }}
              >
                <a
                  href={buildLocalizedPath(lang, readyRoute)}
                  onClick={(e) => {
                    if (isPlainLeftClick(e)) {
                      e.preventDefault();
                      onNavigate(readyRoute);
                    }
                  }}
                  className="after:content-[''] after:absolute after:inset-0 no-underline"
                >
                  {pickText(TWO_PATH_BAND.ready.title, lang)}
                </a>
              </h2>

              <div className="mt-4 md:mt-5 flex flex-wrap items-center justify-between gap-4">
                <PriceDisplay parts={readyPriceParts} size="tile" tone="dark" />
                <span className="inline-flex items-center gap-2 text-[13px] md:text-sm font-medium text-[#E5D4B7] group-hover:text-[#F6F1E9] transition-colors">
                  <span>{pickText(TWO_PATH_BAND.ready.cta, lang)}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </article>

          {/* Right tile: Made to order */}
          <article className="group relative min-h-[250px] sm:min-h-0 sm:aspect-[16/10] overflow-hidden bg-[#2A1E17]">
            <img
              src={customImg.src}
              srcSet={customImg.srcSet || undefined}
              sizes="(max-width: 767px) 92vw, 48vw"
              alt={customAlt}
              width={customImg.width}
              height={customImg.height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(30,20,14,0.12) 0%, rgba(30,20,14,0.52) 50%, rgba(28,18,13,0.88) 100%)',
              }}
            />

            <div className="relative z-10 flex h-full flex-col justify-end p-5 md:p-8 lg:p-10">
              <span className={getEyebrowClass(lang, 'dark')}>
                {pickText(TWO_PATH_BAND.custom.eyebrow, lang)}
              </span>

              <h2
                className="mt-2 font-display font-medium text-[#F6F1E9] leading-[1.15]"
                style={{ fontSize: 'clamp(1.45rem, 5vw, 1.875rem)' }}
              >
                <a
                  href={buildLocalizedPath(lang, customRoute)}
                  onClick={(e) => {
                    if (isPlainLeftClick(e)) {
                      e.preventDefault();
                      onNavigate(customRoute);
                    }
                  }}
                  className="after:content-[''] after:absolute after:inset-0 no-underline"
                >
                  {pickText(TWO_PATH_BAND.custom.title, lang)}
                </a>
              </h2>

              <div className="mt-4 md:mt-5 flex flex-wrap items-center justify-between gap-4">
                <PriceDisplay parts={customPriceParts} size="tile" tone="dark" />
                <span className="inline-flex items-center gap-2 text-[13px] md:text-sm font-medium text-[#E5D4B7] group-hover:text-[#F6F1E9] transition-colors">
                  <span>{pickText(TWO_PATH_BAND.custom.cta, lang)}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
