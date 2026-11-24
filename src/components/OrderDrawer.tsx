import { MessageSquare, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getResponsiveImage } from '../data/media';
import { CATALOG_ITEMS, UI_COPY, pickText } from '../data/siteContent';
import type { AppRoute, Language, OrderBagItem } from '../types/site';
import {
  buildLocalizedPath,
  buildOrderBagWhatsAppHref,
  formatPriceParts,
  getOrderBagCount,
  getOrderBagTotal,
  getPriceOnRequestLabel,
  isPlainLeftClick,
} from '../utils/catalogLogic';
import { PriceDisplay } from './PriceDisplay';

interface OrderDrawerProps {
  open: boolean;
  lang: Language;
  items: OrderBagItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, nextQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
}

export function OrderDrawer({
  open,
  lang,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  onNavigate,
}: OrderDrawerProps) {
  const [cityNote, setCityNote] = useState('');

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const resolvedItems = items
    .map((entry) => {
      const product = CATALOG_ITEMS.find((c) => c.id === entry.productId);
      return product ? { product, quantity: entry.quantity } : null;
    })
    .filter((x): x is { product: (typeof CATALOG_ITEMS)[number]; quantity: number } => x !== null);

  const count = getOrderBagCount(items);
  const { totalGel, hasStartingPrice, hasPriceOnRequest } = getOrderBagTotal(
    items,
    CATALOG_ITEMS,
  );
  const totalParts =
    totalGel === 0 && hasPriceOnRequest
      ? { amount: getPriceOnRequestLabel(lang), isTextOnly: true }
      : formatPriceParts(
          { priceGel: totalGel, isStartingPrice: hasStartingPrice },
          lang,
        );
  const whatsappHref = buildOrderBagWhatsAppHref(
    items,
    CATALOG_ITEMS,
    lang,
    cityNote,
  );
  const catalogRoute: AppRoute = { page: 'catalog', category: 'wardrobes' };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={pickText(UI_COPY.orderBag.title, lang)}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close order drawer"
        onClick={onClose}
        className="fixed inset-0 bg-[#241C17]/50 cursor-pointer"
      />

      {/* Sharp slide-over panel */}
      <div className="relative z-10 flex h-full w-full max-w-[440px] flex-col bg-[#F6F1E9] text-[#241C17] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 bg-[#EFE8DD] px-5 py-4 md:px-6">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-4 w-4 text-[#6B4428]" strokeWidth={1.65} aria-hidden="true" />
            <h2 className="font-display text-xl font-medium text-[#241C17]">
              {pickText(UI_COPY.orderBag.title, lang)}
            </h2>
            {count > 0 && (
              <span className="bg-[#6B4428] px-2 py-0.5 text-xs font-semibold text-[#F6F1E9] price-numerals">
                {count}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order drawer"
            className="inline-flex h-10 w-10 items-center justify-center text-[#241C17] hover:bg-[#E5DDD0] transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        {resolvedItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
            <ShoppingBag className="h-9 w-9 text-[#A98A5B]" strokeWidth={1.3} aria-hidden="true" />
            <p className="text-base text-[#5A4E45]">
              {pickText(UI_COPY.orderBag.emptyTitle, lang)}
            </p>
            <a
              href={buildLocalizedPath(lang, catalogRoute)}
              onClick={(e) => {
                if (isPlainLeftClick(e)) {
                  e.preventDefault();
                  onClose();
                  onNavigate(catalogRoute);
                }
              }}
              className="inline-flex min-h-[44px] items-center justify-center bg-[#6B4428] px-6 py-2.5 text-sm font-semibold text-[#F6F1E9] hover:bg-[#55351E] transition-colors no-underline"
            >
              {pickText(UI_COPY.orderBag.emptyAction, lang)}
            </a>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5 md:px-6 space-y-3">
              {resolvedItems.map(({ product, quantity }) => {
                const imgMeta = getResponsiveImage(product.image);
                const productRoute: AppRoute = {
                  page: 'product',
                  productId: product.id,
                };
                const lineParts = formatPriceParts(
                  {
                    priceGel:
                      product.priceGel === null
                        ? null
                        : product.priceGel * quantity,
                    isStartingPrice: product.isStartingPrice,
                  },
                  lang,
                );

                return (
                  <div
                    key={product.id}
                    className="flex gap-3.5 bg-[#EFE8DD] p-3"
                  >
                    <a
                      href={buildLocalizedPath(lang, productRoute)}
                      onClick={(e) => {
                        if (isPlainLeftClick(e)) {
                          e.preventDefault();
                          onClose();
                          onNavigate(productRoute);
                        }
                      }}
                      className="h-20 w-20 shrink-0 overflow-hidden bg-[#E5DDD0] block"
                    >
                      <img
                        src={imgMeta.src}
                        srcSet={imgMeta.srcSet || undefined}
                        sizes="80px"
                        alt={pickText(product.imageAlt, lang)}
                        width={imgMeta.width}
                        height={imgMeta.height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </a>

                    <div className="flex flex-1 min-w-0 flex-col justify-between gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <a
                            href={buildLocalizedPath(lang, productRoute)}
                            onClick={(e) => {
                              if (isPlainLeftClick(e)) {
                                e.preventDefault();
                                onClose();
                                onNavigate(productRoute);
                              }
                            }}
                            className="block truncate font-display text-base font-medium text-[#241C17] hover:text-[#6B4428] transition-colors no-underline"
                          >
                            {pickText(product.name, lang)}
                          </a>
                          <div className="truncate text-[11px] text-[#7B6D62] tabular-nums">
                            {product.dimensions || pickText(product.materialNote, lang)}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id)}
                          aria-label={`Remove ${pickText(product.name, lang)}`}
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-[#7B6D62] hover:text-[#241C17] transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center bg-[#F6F1E9]">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(product.id, quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="inline-flex h-8 w-8 items-center justify-center text-[#241C17] hover:bg-[#E5DDD0] transition-colors cursor-pointer"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={1.7} />
                          </button>
                          <span className="w-7 text-center text-xs font-semibold text-[#241C17] price-numerals">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(product.id, quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="inline-flex h-8 w-8 items-center justify-center text-[#241C17] hover:bg-[#E5DDD0] transition-colors cursor-pointer"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.7} />
                          </button>
                        </div>

                        <PriceDisplay parts={lineParts} size="compact" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer: optional city/note, total, send to WhatsApp */}
            <div className="bg-[#EFE8DD] px-5 py-5 md:px-6 space-y-4">
              <div>
                <label htmlFor="order-city-note" className="sr-only">
                  {pickText(UI_COPY.orderBag.notePlaceholder, lang)}
                </label>
                <input
                  id="order-city-note"
                  type="text"
                  value={cityNote}
                  onChange={(e) => setCityNote(e.target.value)}
                  placeholder={pickText(UI_COPY.orderBag.notePlaceholder, lang)}
                  className="h-11 w-full bg-[#F6F1E9] px-3.5 text-sm text-[#241C17] placeholder:text-[#7B6D62] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-[#5A4E45]">
                  {pickText(UI_COPY.orderBag.totalLabel, lang)}
                </span>
                <div className="text-right">
                  <PriceDisplay parts={totalParts} size="card" />
                  {totalGel > 0 && hasPriceOnRequest && (
                    <div className="mt-0.5 text-[11px] text-[#6B4428]">
                      + {getPriceOnRequestLabel(lang)}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#6B4428] px-5 py-3 text-sm font-semibold text-[#F6F1E9] hover:bg-[#55351E] transition-colors no-underline"
                >
                  <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                  <span>{pickText(UI_COPY.orderBag.sendWhatsApp, lang)}</span>
                </a>

                <button
                  type="button"
                  onClick={onClearAll}
                  className="inline-flex min-h-[36px] w-full items-center justify-center text-xs font-medium text-[#7B6D62] hover:text-[#241C17] transition-colors cursor-pointer"
                >
                  {pickText(UI_COPY.orderBag.clearAll, lang)}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
