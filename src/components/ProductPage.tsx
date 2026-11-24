import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getResponsiveImage } from '../data/media';
import {
  CATALOG_CATEGORIES,
  OWNER_CONFIG,
  UI_COPY,
  pickText,
} from '../data/siteContent';
import type { AppRoute, CatalogItem, Language } from '../types/site';
import {
  buildLocalizedPath,
  buildTelHref,
  formatPriceParts,
  getNextHeroIndex,
  getPrevHeroIndex,
  isPlainLeftClick,
} from '../utils/catalogLogic';
import { PriceDisplay } from './PriceDisplay';

interface ProductPageProps {
  product: CatalogItem;
  lang: Language;
  orderBagCount: number;
  productQuantityInOrder: number;
  onAddToOrderAndOpen: (productId: string) => void;
  onUpdateOrderQuantity: (productId: string, nextQuantity: number) => void;
  onOpenOrderDrawer: () => void;
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
}

export function ProductPage({
  product,
  lang,
  orderBagCount,
  productQuantityInOrder,
  onAddToOrderAndOpen,
  onUpdateOrderQuantity,
  onOpenOrderDrawer,
  onNavigate,
}: ProductPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [product.id]);

  const galleryImages =
    product.gallery.length > 0 ? product.gallery : [product.image];
  const categoryObj =
    CATALOG_CATEGORIES.find((c) => c.id === product.category) ??
    CATALOG_CATEGORIES[0];
  const modelName = pickText(product.name, lang);
  const activeImgSrc = galleryImages[activeImageIndex] ?? product.image;
  const activeImgMeta = getResponsiveImage(activeImgSrc);
  const activeAlt = product.galleryAlts?.[activeImageIndex]
    ? pickText(product.galleryAlts[activeImageIndex], lang)
    : pickText(product.imageAlt, lang);
  const backRoute: AppRoute = { page: 'catalog', category: product.category };

  return (
    <section className="bg-[#EFE8DD]">
      <div className="mx-auto max-w-[1440px] px-5 py-8 md:px-6 md:py-12 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-8 md:gap-10 lg:gap-14">
          {/* Left: Gallery with arrows and thumbnails */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5DDD0]">
              <img
                src={activeImgMeta.src}
                srcSet={activeImgMeta.srcSet || undefined}
                sizes="(max-width: 1023px) 92vw, 56vw"
                alt={activeAlt}
                width={activeImgMeta.width}
                height={activeImgMeta.height}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />

              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        getPrevHeroIndex(prev, galleryImages.length),
                      )
                    }
                    aria-label="Previous product photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-[#F6F1E9]/95 text-[#241C17] hover:bg-[#6B4428] hover:text-[#F6F1E9] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveImageIndex((prev) =>
                        getNextHeroIndex(prev, galleryImages.length),
                      )
                    }
                    aria-label="Next product photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center bg-[#F6F1E9]/95 text-[#241C17] hover:bg-[#6B4428] hover:text-[#F6F1E9] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>

            {galleryImages.length > 1 && (
              <div className="mt-3.5 md:mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                {galleryImages.map((imgSrc, idx) => {
                  const isActive = idx === activeImageIndex;
                  const thumbMeta = getResponsiveImage(imgSrc);
                  return (
                    <button
                      key={`${product.id}-thumb-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-pressed={isActive}
                      aria-label={`View photo ${idx + 1} of ${modelName}`}
                      className={`aspect-[4/3] min-h-[44px] overflow-hidden bg-[#E5DDD0] cursor-pointer transition-opacity ${
                        isActive
                          ? 'ring-2 ring-[#6B4428] opacity-100'
                          : 'opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={thumbMeta.src}
                        srcSet={thumbMeta.srcSet || undefined}
                        sizes="(max-width: 639px) 30vw, 180px"
                        alt=""
                        width={thumbMeta.width}
                        height={thumbMeta.height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Product details, Add to Order (WhatsApp) + Direct Call */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-2 text-xs text-[#7B6D62] price-numerals">
              <span>{pickText(categoryObj.label, lang)}</span>
              <span aria-hidden="true">·</span>
              <span>{product.code}</span>
            </div>

            <h1
              className="mt-2.5 font-display font-medium text-[#241C17] leading-[1.15]"
              style={{ fontSize: 'clamp(1.65rem, 6vw, 2.25rem)' }}
            >
              {modelName}
            </h1>

            <div className="mt-4">
              <PriceDisplay parts={formatPriceParts(product, lang)} size="page" />
            </div>

            <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.65] text-[#5A4E45]">
              {pickText(product.shortDescription, lang)}
            </p>

            {/* Primary: Add to Order (sends to WhatsApp) + Secondary: Direct Call */}
            <div className="mt-7 flex flex-col gap-3">
              {productQuantityInOrder > 0 ? (
                <div className="flex items-stretch gap-2.5">
                  <div className="inline-flex h-12 items-center bg-[#F6F1E9] shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateOrderQuantity(
                          product.id,
                          productQuantityInOrder - 1,
                        )
                      }
                      aria-label="Decrease quantity"
                      className="inline-flex h-12 w-11 items-center justify-center text-[#241C17] hover:bg-[#E5DDD0] transition-colors cursor-pointer"
                    >
                      <Minus className="h-4 w-4" strokeWidth={1.7} />
                    </button>
                    <span className="w-9 text-center text-sm font-semibold text-[#241C17] price-numerals">
                      {productQuantityInOrder}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateOrderQuantity(
                          product.id,
                          productQuantityInOrder + 1,
                        )
                      }
                      aria-label="Increase quantity"
                      className="inline-flex h-12 w-11 items-center justify-center text-[#241C17] hover:bg-[#E5DDD0] transition-colors cursor-pointer"
                    >
                      <Plus className="h-4 w-4" strokeWidth={1.7} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenOrderDrawer}
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-[#6B4428] px-5 py-3 text-sm font-semibold text-[#F6F1E9] hover:bg-[#55351E] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                    <span>
                      {pickText(UI_COPY.orderBag.openOrderLabel, lang)} ({orderBagCount})
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onAddToOrderAndOpen(product.id)}
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 bg-[#6B4428] px-5 py-3 text-sm font-semibold text-[#F6F1E9] hover:bg-[#55351E] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                  <span>{pickText(UI_COPY.productPage.primaryCta, lang)}</span>
                </button>
              )}

              <a
                href={buildTelHref(OWNER_CONFIG.phoneE164)}
                className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 bg-[#F6F1E9] px-5 py-3 text-sm font-semibold text-[#241C17] hover:bg-[#E5DDD0] transition-colors whitespace-nowrap no-underline"
              >
                <Phone className="h-4 w-4 text-[#6B4428] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                <span>{pickText(UI_COPY.productPage.secondaryCta, lang)}</span>
              </a>
            </div>

            {/* Clean surface-based spec list without decorative lines */}
            <dl className="mt-8 space-y-2 text-sm">
              {product.dimensions && (
                <div className="flex items-center justify-between gap-4 bg-[#F6F1E9] px-4 py-3.5">
                  <dt className="text-[#7B6D62]">
                    {pickText(UI_COPY.storefront.specDimensionsLabel, lang)}
                  </dt>
                  <dd className="font-medium text-[#241C17] tabular-nums">
                    {product.dimensions}
                  </dd>
                </div>
              )}
              <div className="flex items-baseline justify-between gap-4 bg-[#F6F1E9] px-4 py-3.5">
                <dt className="text-[#7B6D62] shrink-0">
                  {pickText(UI_COPY.storefront.specMaterialsLabel, lang)}
                </dt>
                <dd className="text-right font-medium text-[#241C17]">
                  {pickText(product.materialNote, lang)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 bg-[#F6F1E9] px-4 py-3.5">
                <dt className="text-[#7B6D62] shrink-0">
                  {pickText(UI_COPY.storefront.specInstallLabel, lang)}
                </dt>
                <dd className="text-right font-medium text-[#241C17]">
                  {pickText(UI_COPY.storefront.specInstallValue, lang)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <a
                href={buildLocalizedPath(lang, backRoute)}
                onClick={(e) => {
                  if (isPlainLeftClick(e)) {
                    e.preventDefault();
                    onNavigate(backRoute);
                  }
                }}
                className="group inline-flex min-h-[44px] items-center gap-1.5 text-sm md:text-[13px] font-semibold text-[#6B4428] hover:text-[#55351E] transition-colors no-underline"
              >
                <ArrowLeft
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span>{pickText(UI_COPY.storefront.backToCatalog, lang)}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
