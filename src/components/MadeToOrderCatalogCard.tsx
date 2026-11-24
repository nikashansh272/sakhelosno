import { ArrowRight } from 'lucide-react';
import { getResponsiveImage } from '../data/media';
import {
  MADE_TO_ORDER_CATALOG_CARD,
  pickText,
} from '../data/siteContent';
import type { AppRoute, Language } from '../types/site';
import { buildLocalizedPath, isPlainLeftClick } from '../utils/catalogLogic';

interface MadeToOrderCatalogCardProps {
  lang: Language;
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
  cardSurface?: 'cream' | 'oat';
  compactMobile?: boolean;
}

export function MadeToOrderCatalogCard({
  lang,
  onNavigate,
  cardSurface = 'cream',
  compactMobile = false,
}: MadeToOrderCatalogCardProps) {
  const customRoute: AppRoute = { page: 'custom-order' };
  const imgMeta = getResponsiveImage(MADE_TO_ORDER_CATALOG_CARD.image);

  return (
    <article
      className={`group relative flex h-full flex-col ${
        cardSurface === 'oat' ? 'bg-[#EFE8DD]' : 'bg-[#F6F1E9]'
      }`}
    >
      <div
        className={`relative w-full aspect-[4/5] overflow-hidden ${
          cardSurface === 'oat' ? 'bg-[#E5DDD0]' : 'bg-[#E5DDD0]/80'
        }`}
      >
        <img
          src={imgMeta.src}
          srcSet={imgMeta.srcSet || undefined}
          sizes={
            compactMobile
              ? '(max-width: 767px) 46vw, (max-width: 1023px) 44vw, 25vw'
              : '(max-width: 767px) 82vw, (max-width: 1023px) 46vw, 30vw'
          }
          alt={pickText(MADE_TO_ORDER_CATALOG_CARD.alt, lang)}
          width={imgMeta.width}
          height={imgMeta.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div
        className={`flex flex-1 min-w-0 flex-col justify-between ${
          compactMobile ? 'p-3 md:p-5' : 'p-5'
        }`}
      >
        <div className="min-w-0">
          <h3>
            <a
              href={buildLocalizedPath(lang, customRoute)}
              onClick={(e) => {
                if (isPlainLeftClick(e)) {
                  e.preventDefault();
                  onNavigate(customRoute);
                }
              }}
              className={`inline-block text-left font-display font-medium text-[#241C17] hover:text-[#6B4428] transition-colors after:content-[''] after:absolute after:inset-0 after:z-10 no-underline ${
                compactMobile
                  ? 'text-[15.5px] leading-snug sm:text-base md:text-[19px]'
                  : 'text-[19px] leading-snug'
              }`}
            >
              {pickText(MADE_TO_ORDER_CATALOG_CARD.title, lang)}
            </a>
          </h3>

          <p className="mt-1 text-[11px] sm:text-xs text-[#7B6D62]">
            {pickText(MADE_TO_ORDER_CATALOG_CARD.specLine, lang)}
          </p>
        </div>

        <div className="mt-4 flex min-w-0 items-center justify-between gap-2">
          <span className="font-sans text-[12px] sm:text-[13px] md:text-sm font-semibold text-[#6B4428] price-numerals whitespace-nowrap">
            {pickText(MADE_TO_ORDER_CATALOG_CARD.priceLabel, lang)}
          </span>
          <ArrowRight
            className="h-4 w-4 text-[#6B4428] transition-transform duration-200 group-hover:translate-x-0.5 shrink-0"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}
