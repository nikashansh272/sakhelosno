import { Plus } from 'lucide-react';
import { useState } from 'react';
import { getResponsiveImage } from '../data/media';
import { UI_COPY, pickText } from '../data/siteContent';
import type { AppRoute, CatalogItem, Language } from '../types/site';
import {
  buildLocalizedPath,
  formatPriceParts,
  isPlainLeftClick,
} from '../utils/catalogLogic';
import { PriceDisplay } from './PriceDisplay';

interface ProductCardProps {
  item: CatalogItem;
  lang: Language;
  quantityInOrder?: number;
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
  onAddToOrder?: (productId: string) => void;
  onOpenOrderDrawer?: () => void;
  cardSurface?: 'cream' | 'oat';
  compactMobile?: boolean;
}

export function ProductCard({
  item,
  lang,
  quantityInOrder = 0,
  onNavigate,
  onAddToOrder,
  onOpenOrderDrawer,
  cardSurface = 'cream',
  compactMobile = false,
}: ProductCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const modelName = pickText(item.name, lang);
  const priceParts = formatPriceParts(item, lang);
  const productRoute: AppRoute = { page: 'product', productId: item.id };
  const imgMeta = getResponsiveImage(item.image);

  function handleQuickAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (quantityInOrder > 0 && onOpenOrderDrawer) {
      onOpenOrderDrawer();
    } else if (onAddToOrder) {
      onAddToOrder(item.id);
    }
  }

  return (
    <article
      className={`group relative flex h-full flex-col ${
        cardSurface === 'oat' ? 'bg-[#EFE8DD]' : 'bg-[#F6F1E9]'
      }`}
    >
      {/* Pure, unobstructed furniture photography */}
      <div
        className={`relative w-full aspect-[4/5] overflow-hidden ${
          cardSurface === 'oat' ? 'bg-[#E5DDD0]' : 'bg-[#E5DDD0]/80'
        }`}
      >
        {!imgFailed ? (
          <img
            src={imgMeta.src}
            srcSet={imgMeta.srcSet || undefined}
            sizes={
              compactMobile
                ? '(max-width: 767px) 46vw, (max-width: 1023px) 44vw, 25vw'
                : '(max-width: 767px) 82vw, (max-width: 1023px) 46vw, 30vw'
            }
            alt={pickText(item.imageAlt, lang)}
            width={imgMeta.width}
            height={imgMeta.height}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-[#7B6D62]">
            {modelName}
          </div>
        )}
      </div>

      {/* Minimal card footer: Title, dimensions, Price + compact Add-to-Order button */}
      <div
        className={`flex flex-1 min-w-0 flex-col justify-between ${
          compactMobile ? 'p-3 md:p-5' : 'p-5'
        }`}
      >
        <div className="min-w-0">
          <h3>
            <a
              href={buildLocalizedPath(lang, productRoute)}
              onClick={(e) => {
                if (isPlainLeftClick(e)) {
                  e.preventDefault();
                  onNavigate(productRoute);
                }
              }}
              className={`inline-block text-left font-display font-medium text-[#241C17] hover:text-[#6B4428] transition-colors after:content-[''] after:absolute after:inset-0 after:z-10 no-underline ${
                compactMobile
                  ? 'text-[15.5px] leading-snug sm:text-base md:text-[19px]'
                  : 'text-[19px] leading-snug'
              }`}
            >
              {modelName}
            </a>
          </h3>

          <p className="mt-1 text-[11px] sm:text-xs text-[#7B6D62] tabular-nums">
            {item.dimensions || pickText(item.specLine, lang)}
          </p>
        </div>

        <div className="mt-4 flex min-w-0 items-center justify-between gap-2">
          <PriceDisplay
            parts={priceParts}
            size={compactMobile ? 'cardCompact' : 'card'}
          />

          {onAddToOrder && (
            <button
              type="button"
              onClick={handleQuickAdd}
              aria-label={
                quantityInOrder > 0
                  ? `${pickText(UI_COPY.orderBag.openOrderLabel, lang)} (${quantityInOrder})`
                  : `${pickText(UI_COPY.orderBag.addAriaPrefix, lang)}: ${modelName}`
              }
              className={`relative z-20 inline-flex shrink-0 items-center justify-center transition-colors cursor-pointer ${
                compactMobile ? 'h-8 w-8 md:h-9 md:w-9' : 'h-9 w-9'
              } ${
                quantityInOrder > 0
                  ? 'bg-[#6B4428] text-[#F6F1E9] hover:bg-[#55351E]'
                  : 'bg-[#EFE8DD] text-[#241C17] hover:bg-[#6B4428] hover:text-[#F6F1E9]'
              }`}
            >
              {quantityInOrder > 0 ? (
                <span className="text-xs font-semibold price-numerals">
                  {quantityInOrder}
                </span>
              ) : (
                <Plus className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
