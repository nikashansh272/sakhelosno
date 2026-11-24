import type { MouseEvent } from 'react';
import type {
  AppRoute,
  CatalogCategory,
  CatalogItem,
  GalleryCategory,
  Language,
  OrderBagItem,
  PageNavId,
} from '../types/site';

export const PHONE_DISPLAY = '555 55 90 47';
export const PHONE_E164 = '+995555559047';
export const WHATSAPP_NUMBER = '995555559047';

export interface FormattedPriceParts {
  prefix?: string;
  amount: string;
  suffix?: string;
  isTextOnly?: boolean;
}

export interface ParsedPathRoute {
  lang: Language;
  route: AppRoute;
  redirectTo?: string;
}

export function filterCatalogByCategory(
  items: readonly CatalogItem[],
  category: CatalogCategory,
): CatalogItem[] {
  return items.filter((item) => item.category === category);
}

export function searchCatalogItems(
  items: readonly CatalogItem[],
  query: string,
): CatalogItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return items.filter((item) => {
    const ka = item.name.ka.toLowerCase();
    const en = item.name.en.toLowerCase();
    const ru = item.name.ru.toLowerCase();
    const specKa = item.specLine.ka.toLowerCase();
    const specEn = item.specLine.en.toLowerCase();
    const specRu = item.specLine.ru.toLowerCase();
    const code = item.code.toLowerCase();
    return (
      ka.includes(normalized) ||
      en.includes(normalized) ||
      ru.includes(normalized) ||
      specKa.includes(normalized) ||
      specEn.includes(normalized) ||
      specRu.includes(normalized) ||
      code.includes(normalized)
    );
  });
}

export function getFeaturedItems(items: readonly CatalogItem[]): CatalogItem[] {
  const featured = items.filter((item) => item.featured);
  return featured.length > 0 ? featured : [...items];
}

export function getNewArrivalItems(items: readonly CatalogItem[]): CatalogItem[] {
  const arrivals = items.filter((item) => item.newArrival);
  return arrivals.length > 0 ? arrivals : [...items].reverse();
}

export function getLowestCatalogPrice(items: readonly CatalogItem[]): number {
  const priced = items
    .map((item) => item.priceGel)
    .filter((price): price is number => price !== null);
  if (priced.length === 0) return 0;
  return Math.min(...priced);
}

export function formatGelNumber(amount: number): string {
  return Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F');
}

export function getPriceOnRequestLabel(lang: Language): string {
  if (lang === 'ka') return 'ფასი შეთანხმებით';
  if (lang === 'ru') return 'Цена по запросу';
  return 'Price on request';
}

export function formatPriceParts(
  item: Pick<CatalogItem, 'priceGel' | 'isStartingPrice'>,
  lang: Language,
): FormattedPriceParts {
  if (item.priceGel === null) {
    return { amount: getPriceOnRequestLabel(lang), isTextOnly: true };
  }

  const amount = `${formatGelNumber(item.priceGel)}\u00A0₾`;

  if (!item.isStartingPrice) {
    return { amount };
  }

  if (lang === 'ka') {
    return { amount, suffix: '-დან' };
  }
  if (lang === 'ru') {
    return { prefix: 'от ', amount };
  }
  return { prefix: 'from ', amount };
}

export function formatPriceDisplay(
  item: Pick<CatalogItem, 'priceGel' | 'isStartingPrice'>,
  lang: Language,
): string {
  const parts = formatPriceParts(item, lang);
  return `${parts.prefix ?? ''}${parts.amount}${parts.suffix ?? ''}`;
}

export function formatSqmLabel(lang: Language): string {
  if (lang === 'ka') return 'მ²';
  if (lang === 'ru') return 'м²';
  return 'm²';
}

export function formatCustomRateParts(
  rateGelPerSqm: number,
  lang: Language,
): FormattedPriceParts {
  const amount = `${formatGelNumber(rateGelPerSqm)}\u00A0₾ / ${formatSqmLabel(lang)}`;
  if (lang === 'ka') {
    return { amount, suffix: '-დან' };
  }
  if (lang === 'ru') {
    return { prefix: 'от ', amount };
  }
  return { prefix: 'from ', amount };
}

export function getEyebrowClass(
  lang: Language,
  surface: 'light' | 'dark' = 'light',
): string {
  const color = surface === 'dark' ? 'text-[#E5D4B7]' : 'text-[#6B4428]';
  if (lang === 'ka') {
    return `text-[13px] font-semibold tracking-normal ${color}`;
  }
  return `text-[11px] font-semibold tracking-[0.14em] uppercase ${color}`;
}

export function buildTelHref(rawPhone: string = PHONE_E164): string {
  const cleaned = rawPhone.replace(/[^\d+]/g, '');
  return `tel:${cleaned}`;
}

export function buildWhatsAppHref(
  modelName?: string,
  lang: Language = 'ka',
): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!modelName) {
    return base;
  }

  const greetingByLang: Record<Language, string> = {
    ka: `გამარჯობა, მაინტერესებს მოდელი: ${modelName}`,
    en: `Hello, I am interested in the model: ${modelName}`,
    ru: `Здравствуйте, интересует модель: ${modelName}`,
  };

  return `${base}?text=${encodeURIComponent(greetingByLang[lang])}`;
}

export function buildCustomOrderWhatsAppHref(lang: Language = 'ka'): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const greetingByLang: Record<Language, string> = {
    ka: 'გამარჯობა, მსურს ინდივიდუალური ავეჯის შეკვეთის განხილვა.',
    en: 'Hello, I would like to discuss a custom furniture order.',
    ru: 'Здравствуйте, хочу обсудить индивидуальный заказ мебели.',
  };
  return `${base}?text=${encodeURIComponent(greetingByLang[lang])}`;
}

export function getLocalizedWordmark(lang: Language): string {
  return lang === 'ka' ? 'სახელოსნო' : 'Sakhelosno';
}

export function getNextHeroIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current + 1) % total;
}

export function getPrevHeroIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current - 1 + total) % total;
}

export function getGallerySlots(
  category: GalleryCategory,
  count: number = 3,
): Array<{ id: string; category: GalleryCategory }> {
  return Array.from({ length: count }, (_, idx) => ({
    id: `${category}-slot-${idx + 1}`,
    category,
  }));
}

export function detectHorizontalSwipe(
  startX: number,
  endX: number,
  startY: number,
  endY: number,
  thresholdPx: number = 40,
): 'next' | 'prev' | null {
  const deltaX = endX - startX;
  const deltaY = endY - startY;
  if (Math.abs(deltaX) < thresholdPx) return null;
  if (Math.abs(deltaX) <= Math.abs(deltaY)) return null;
  return deltaX < 0 ? 'next' : 'prev';
}

export function getActiveCarouselIndex(
  scrollLeft: number,
  cardOffsets: readonly number[],
): number {
  if (cardOffsets.length === 0) return 0;
  let closestIdx = 0;
  let minDiff = Math.abs(cardOffsets[0] - scrollLeft);
  for (let i = 1; i < cardOffsets.length; i += 1) {
    const diff = Math.abs(cardOffsets[i] - scrollLeft);
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = i;
    }
  }
  return closestIdx;
}

export function formatCategoryCount(
  items: readonly CatalogItem[],
  category: CatalogCategory,
  lang: Language,
): string {
  const count = items.filter((item) => item.category === category).length;
  if (lang === 'ka') {
    return `${count} მოდელი`;
  }
  if (lang === 'ru') {
    if (count === 1) return '1 модель';
    if (count >= 2 && count <= 4) return `${count} модели`;
    return `${count} моделей`;
  }
  return count === 1 ? '1 model' : `${count} models`;
}

const VALID_CATEGORIES: readonly CatalogCategory[] = [
  'wardrobes',
  'kitchens',
  'bathroom',
  'lighting',
  'tables',
];

const VALID_LANGUAGES: readonly Language[] = ['ka', 'en', 'ru'];

export function isValidCatalogCategory(value: string): value is CatalogCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(value);
}

export function isValidLanguage(value: string): value is Language {
  return (VALID_LANGUAGES as readonly string[]).includes(value);
}

export function buildLocalizedPath(lang: Language, route: AppRoute): string {
  switch (route.page) {
    case 'home':
      return `/${lang}/`;
    case 'catalog':
      return `/${lang}/catalog/${route.category}/`;
    case 'product':
      return `/${lang}/product/${route.productId}/`;
    case 'custom-order':
      return `/${lang}/custom-order/`;
    case 'payment':
      return `/${lang}/payment/`;
    case 'delivery':
      return `/${lang}/delivery/`;
    case 'contact':
      return `/${lang}/contact/`;
    case 'not-found':
      return `/${lang}/`;
  }
}

export function parsePathname(
  rawPathname: string,
  catalogItems: readonly Pick<CatalogItem, 'id'>[],
): ParsedPathRoute {
  const cleanPath = rawPathname.split('?')[0].split('#')[0] || '/';
  if (cleanPath === '/') {
    return { lang: 'ka', route: { page: 'home' }, redirectTo: '/ka/' };
  }
  if (cleanPath === '/index.html') {
    return { lang: 'ka', route: { page: 'home' } };
  }
  if (cleanPath === '/404' || cleanPath === '/404.html') {
    return { lang: 'ka', route: { page: 'not-found' } };
  }

  const trimmed = cleanPath.replace(/^\/+/, '').replace(/\/+$/, '');
  const segments = trimmed.split('/').filter(Boolean);

  // Legacy /mirrors URL redirects to Georgian bathroom furniture category
  if (segments.length === 1 && segments[0] === 'mirrors') {
    return {
      lang: 'ka',
      route: { page: 'catalog', category: 'bathroom' },
      redirectTo: '/ka/catalog/bathroom/',
    };
  }

  const maybeLang = segments[0];

  if (!isValidLanguage(maybeLang)) {
    return { lang: 'ka', route: { page: 'not-found' } };
  }

  const lang = maybeLang;
  const rest = segments.slice(1);

  if (rest.length === 0) {
    return { lang, route: { page: 'home' } };
  }

  const [section, slug, extra] = rest;
  if (extra) {
    return { lang, route: { page: 'not-found' } };
  }

  // Legacy /{lang}/mirrors or /{lang}/catalog/mirrors redirects to /{lang}/catalog/bathroom/
  if (
    (section === 'mirrors' && !slug) ||
    (section === 'catalog' && slug === 'mirrors')
  ) {
    return {
      lang,
      route: { page: 'catalog', category: 'bathroom' },
      redirectTo: `/${lang}/catalog/bathroom/`,
    };
  }

  if (section === 'catalog') {
    if (!slug) {
      return { lang, route: { page: 'catalog', category: 'wardrobes' } };
    }
    if (isValidCatalogCategory(slug)) {
      return { lang, route: { page: 'catalog', category: slug } };
    }
    return { lang, route: { page: 'not-found' } };
  }

  if (section === 'product') {
    if (slug && catalogItems.some((item) => item.id === slug)) {
      return { lang, route: { page: 'product', productId: slug } };
    }
    return { lang, route: { page: 'not-found' } };
  }

  if (!slug) {
    if (section === 'custom-order') return { lang, route: { page: 'custom-order' } };
    if (section === 'payment') return { lang, route: { page: 'payment' } };
    if (section === 'delivery') return { lang, route: { page: 'delivery' } };
    if (section === 'contact') return { lang, route: { page: 'contact' } };
  }

  return { lang, route: { page: 'not-found' } };
}

export function resolveActiveNavForRoute(route: AppRoute): PageNavId | null {
  if (route.page === 'not-found') return null;
  if (route.page === 'product') return 'catalog';
  return route.page;
}

export function shouldShowHeaderSearch(route: AppRoute): boolean {
  return (
    route.page === 'home' ||
    route.page === 'catalog' ||
    route.page === 'product'
  );
}

export function parseStoredLanguage(raw: string | null | undefined): Language {
  if (raw === 'ka' || raw === 'en' || raw === 'ru') return raw;
  return 'ka';
}

export function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function addOrderBagItem(
  bag: readonly OrderBagItem[],
  productId: string,
): OrderBagItem[] {
  const existing = bag.find((entry) => entry.productId === productId);
  if (existing) {
    return bag.map((entry) =>
      entry.productId === productId
        ? { ...entry, quantity: entry.quantity + 1 }
        : entry,
    );
  }
  return [...bag, { productId, quantity: 1 }];
}

export function updateOrderBagQuantity(
  bag: readonly OrderBagItem[],
  productId: string,
  nextQuantity: number,
): OrderBagItem[] {
  if (nextQuantity <= 0) {
    return bag.filter((entry) => entry.productId !== productId);
  }
  return bag.map((entry) =>
    entry.productId === productId ? { ...entry, quantity: nextQuantity } : entry,
  );
}

export function removeOrderBagItem(
  bag: readonly OrderBagItem[],
  productId: string,
): OrderBagItem[] {
  return bag.filter((entry) => entry.productId !== productId);
}

export function getOrderBagCount(bag: readonly OrderBagItem[]): number {
  return bag.reduce((sum, entry) => sum + entry.quantity, 0);
}

export function getOrderItemQuantity(
  bag: readonly OrderBagItem[],
  productId: string,
): number {
  return bag.find((entry) => entry.productId === productId)?.quantity ?? 0;
}

export function getOrderBagTotal(
  bag: readonly OrderBagItem[],
  catalogItems: readonly CatalogItem[],
): {
  totalGel: number;
  hasStartingPrice: boolean;
  hasPriceOnRequest: boolean;
} {
  let totalGel = 0;
  let hasStartingPrice = false;
  let hasPriceOnRequest = false;

  for (const entry of bag) {
    const product = catalogItems.find((item) => item.id === entry.productId);
    if (!product) continue;
    if (product.priceGel === null) {
      hasPriceOnRequest = true;
    } else {
      totalGel += product.priceGel * entry.quantity;
      if (product.isStartingPrice) {
        hasStartingPrice = true;
      }
    }
  }

  return { totalGel, hasStartingPrice, hasPriceOnRequest };
}

export function parseStoredOrderBag(
  raw: string | null | undefined,
  catalogItems: readonly Pick<CatalogItem, 'id'>[],
): OrderBagItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const validIds = new Set(catalogItems.map((item) => item.id));
    const result: OrderBagItem[] = [];
    for (const entry of parsed) {
      if (
        entry &&
        typeof entry === 'object' &&
        typeof entry.productId === 'string' &&
        typeof entry.quantity === 'number' &&
        Number.isInteger(entry.quantity) &&
        entry.quantity > 0 &&
        validIds.has(entry.productId)
      ) {
        result.push({ productId: entry.productId, quantity: entry.quantity });
      }
    }
    return result;
  } catch {
    return [];
  }
}

export function buildOrderBagWhatsAppHref(
  bag: readonly OrderBagItem[],
  catalogItems: readonly CatalogItem[],
  lang: Language = 'ka',
  cityNote?: string,
): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  const resolved = bag
    .map((entry) => {
      const product = catalogItems.find((item) => item.id === entry.productId);
      return product ? { product, quantity: entry.quantity } : null;
    })
    .filter((x): x is { product: CatalogItem; quantity: number } => x !== null);

  if (resolved.length === 0) {
    return base;
  }

  const headerByLang: Record<Language, string> = {
    ka: 'გამარჯობა, მსურს შეკვეთა:',
    en: 'Hello, I would like to order:',
    ru: 'Здравствуйте, хочу оформить заказ:',
  };

  const totalLabelByLang: Record<Language, string> = {
    ka: 'სავარაუდო ჯამი',
    en: 'Estimated total',
    ru: 'Ориентировочно итого',
  };

  const noteLabelByLang: Record<Language, string> = {
    ka: 'შენიშვნა',
    en: 'Note',
    ru: 'Комментарий',
  };

  const lines: string[] = [headerByLang[lang], ''];

  for (const { product, quantity } of resolved) {
    const priceText = formatPriceDisplay(product, lang);
    const metaPart = product.dimensions
      ? `${product.code}, ${product.dimensions}`
      : product.code;
    lines.push(
      `• ${product.name[lang]} (${metaPart}) × ${quantity} — ${priceText}`,
    );
  }

  const { totalGel, hasStartingPrice, hasPriceOnRequest } = getOrderBagTotal(
    bag,
    catalogItems,
  );
  const totalDisplay =
    totalGel === 0 && hasPriceOnRequest
      ? getPriceOnRequestLabel(lang)
      : hasPriceOnRequest
        ? `${formatPriceDisplay({ priceGel: totalGel, isStartingPrice: hasStartingPrice }, lang)} + ${getPriceOnRequestLabel(lang)}`
        : formatPriceDisplay(
            { priceGel: totalGel, isStartingPrice: hasStartingPrice },
            lang,
          );
  lines.push('', `${totalLabelByLang[lang]}: ${totalDisplay}`);

  const trimmedNote = cityNote?.trim();
  if (trimmedNote) {
    lines.push(`${noteLabelByLang[lang]}: ${trimmedNote}`);
  }

  return `${base}?text=${encodeURIComponent(lines.join('\n'))}`;
}
