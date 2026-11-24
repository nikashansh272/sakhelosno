export type Language = 'ka' | 'en' | 'ru';

export type CatalogCategory =
  | 'wardrobes'
  | 'kitchens'
  | 'bathroom'
  | 'lighting'
  | 'tables';

export type HeroMenuCategory = CatalogCategory | 'custom-order';

export type GalleryCategory = 'wardrobes' | 'kitchens' | 'bathroom';

export type PageNavId =
  | 'home'
  | 'catalog'
  | 'custom-order'
  | 'payment'
  | 'delivery'
  | 'contact';

export type AppRoute =
  | { page: 'home' }
  | { page: 'catalog'; category: CatalogCategory }
  | { page: 'product'; productId: string }
  | { page: 'custom-order' }
  | { page: 'payment' }
  | { page: 'delivery' }
  | { page: 'contact' }
  | { page: 'not-found' };

export type ProductTagTone = 'made-to-order' | 'ready' | 'new';

export interface LocalizedText {
  ka: string;
  en: string;
  ru: string;
}

export interface ResponsiveImageMeta {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

export interface CatalogItem {
  id: string;
  code: string;
  category: CatalogCategory;
  name: LocalizedText;
  dimensions: string;
  priceGel: number | null;
  isStartingPrice: boolean;
  image: string;
  gallery: string[];
  galleryAlts: LocalizedText[];
  imageAlt: LocalizedText;
  shortDescription: LocalizedText;
  specLine: LocalizedText;
  tag: LocalizedText;
  tagTone: ProductTagTone;
  materialNote: LocalizedText;
  featured?: boolean;
  newArrival?: boolean;
}

export interface RealFactItem {
  id: string;
  text: LocalizedText;
}

export interface ProcessStep {
  stepNumber: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface HeroSlide {
  id: string;
  image: string;
  kicker: LocalizedText;
  headline: LocalizedText;
  subline: LocalizedText;
  ctaLabel: LocalizedText;
  targetCategory: CatalogCategory;
  label: LocalizedText;
  alt: LocalizedText;
}

export interface OrderBagItem {
  productId: string;
  quantity: number;
}
