import {
  GEO_COORDINATES,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  OG_LOCALE_BY_LANG,
  SITE_LOGO_PATH,
  SITE_URL,
  SUPPORTED_LANGUAGES,
} from '../config/seoConfig';
import {
  CATALOG_CATEGORIES,
  CATALOG_ITEMS,
  OWNER_CONFIG,
  UI_COPY,
} from '../data/siteContent';
import type {
  AppRoute,
  CatalogCategory,
  CatalogItem,
  Language,
  LocalizedText,
} from '../types/site';
import { buildLocalizedPath, formatGelNumber } from './catalogLogic';

export interface PageSeoData {
  lang: Language;
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  alternates: Array<{ hreflang: Language | 'x-default'; href: string }>;
  ogType: 'website' | 'product';
  ogLocale: string;
  ogAlternateLocales: string[];
  ogImage: string;
  ogImageAlt: string;
  siteName: string;
  robots: string;
  jsonLd: Array<Record<string, unknown>>;
}

export interface PrerenderRouteEntry {
  lang: Language;
  route: AppRoute;
  path: string;
}

export const SITE_TAB_TITLE = 'Sakhelosno / სახელოსნო - ავეჯის დამზადება';

function getBrandName(lang: Language): string {
  return lang === 'ka' ? 'სახელოსნო' : 'Sakhelosno';
}

function formatSeoTitle(_pageName: string, _lang: Language): string {
  return SITE_TAB_TITLE;
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalized = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalized}`;
}

const HOME_TITLE_BASE: LocalizedText = {
  ka: 'ავეჯი თბილისში და შეკვეთით',
  en: 'Furniture in Tbilisi & Custom Builds',
  ru: 'Мебель в Тбилиси и на заказ',
};

const HOME_DESCRIPTION: LocalizedText = {
  ka: 'ავეჯი თბილისში — მზა მოდელები და ინდივიდუალური ავეჯი შეკვეთით. კარადები, სამზარეულოები, აბაზანის ავეჯი, ტორშერები და მაგიდები თბილისის საწარმოდან.',
  en: 'Furniture in Tbilisi from Sakhelosno: ready-made models and custom furniture made to order — wardrobes, kitchens, bathroom vanities, lighting, tables.',
  ru: 'Мебель в Тбилиси от Sakhelosno: готовые модели и мебель на заказ — шкафы, кухни, мебель для ванной, торшеры, светильники и столы из собственного цеха.',
};

const CATEGORY_TITLES: Record<CatalogCategory, LocalizedText> = {
  wardrobes: {
    ka: 'კარადები და კარადა შეკვეთით',
    en: 'Wardrobes & Custom Built-Ins',
    ru: 'Шкафы и гардеробные на заказ',
  },
  kitchens: {
    ka: 'სამზარეულოს ავეჯი შეკვეთით',
    en: 'Custom Kitchen Furniture Tbilisi',
    ru: 'Кухонная мебель на заказ в Тбилиси',
  },
  bathroom: {
    ka: 'აბაზანის ავეჯი, კომოდები და LED სარკე',
    en: 'Bathroom Furniture, Vanities & LED Mirrors',
    ru: 'Мебель для ванной и LED-зеркала',
  },
  lighting: {
    ka: 'ტორშერები და სანათები — ავეჯის განათება',
    en: 'Floor Lamps & Architectural Lighting',
    ru: 'Торшеры, светильники и подсветка мебели',
  },
  tables: {
    ka: 'მაგიდები — სასადილო და ყავის მაგიდა შეკვეთით',
    en: 'Custom Tables — Dining & Coffee Tables',
    ru: 'Столы на заказ — обеденные и журнальные',
  },
};

const CATEGORY_DESCRIPTIONS: Record<CatalogCategory, LocalizedText> = {
  wardrobes: {
    ka: 'მზა კარადები და კარადა შეკვეთით თბილისში: მუქი მუხა, ბრინჯაოს მინა და ჩუმი მექანიზმები. ზუსტი ზომებით დამზადება, მიწოდება და მონტაჟი საქართველოში.',
    en: 'Explore ready-made and custom wardrobes crafted in Tbilisi using dark oak, bronze glass, and soft-close hardware. Measured, built, and fitted cleanly.',
    ru: 'Готовые и встроенные шкафы на заказ в Тбилиси из тёмного дуба и бронзового стекла с тихой фурнитурой. Точный замер, производство и монтаж по Грузии.',
  },
  kitchens: {
    ka: 'სამზარეულოს ავეჯი შეკვეთით თბილისში — მქრქალი ფასადები, ქვის ზედაპირები და ნატურალური მუხა. 3D ნახაზი, დამზადება საწარმოში და სრული მონტაჟი ადგილზე.',
    en: 'Custom kitchen furniture built in Tbilisi with matte fronts, solid stone worktops, and oak joinery. Complete 3D layout, local production, and fitting.',
    ru: 'Кухонная мебель на заказ в Тбилиси: матовые фасады, каменные столешницы и натуральный дуб. Создаём 3D-проект, производим в цеху и выполняем монтаж.',
  },
  bathroom: {
    ka: 'აბაზანის ავეჯი თბილისში — კაკლის კომოდები, ქვის ზედაპირები და LED სარკეები. მზა ზომები და დამზადება შეკვეთით მიწოდებითა და მონტაჟით მთელ საქართველოში.',
    en: 'Bathroom furniture in Tbilisi: fluted walnut vanities, stone tops, ceramic basins, and backlit LED mirrors. Ready-made sizes and bespoke builds in Georgia.',
    ru: 'Мебель для ванной в Тбилиси: подвесные тумбы из ореха, каменные столешницы и LED-зеркала с подсветкой. Готовые модели и изготовление на заказ с монтажом.',
  },
  lighting: {
    ka: 'ტორშერები და სანათები თბილისში — ხის ტორშერი, თითბრის სანათი და ავეჯის განათება თბილი შუქით ინტერიერისთვის. შეკვეთა და მიწოდება მთელ საქართველოში.',
    en: 'Floor lamps and architectural lighting in Tbilisi: dark oak floor lamps, brushed brass ambient lamps, and warm furniture lighting tailored for calm interiors.',
    ru: 'Торшеры и светильники в Тбилиси: деревянные торшеры, интерьерные светильники из латуни и тёплая подсветка мебели для спокойных интерьеров с доставкой.',
  },
  tables: {
    ka: 'მაგიდები თბილისში — სასადილო მაგიდა, ყავის მაგიდა და მაგიდა შეკვეთით მასიური კაკლის, მუხისა და ქვის ზედაპირებით. დამზადება და მიწოდება საქართველოში.',
    en: 'Custom tables crafted in Tbilisi: solid walnut dining tables, travertine and dark oak coffee tables, and tables made to order with delivery across Georgia.',
    ru: 'Столы на заказ в Тбилиси: обеденный стол из массива ореха и журнальный стол из тёмного дуба и камня. Изготовление по размерам и доставка по всей Грузии.',
  },
};

const PRODUCT_DESCRIPTIONS: Record<string, LocalizedText> = {
  'wardrobe-orbi': {
    ka: 'კარადა „ორბი“ (180×240×60 სმ) მუქი მუხის ფასადით და თითბრის სახელურებით. ფასი 1 650 ₾-დან სტანდარტული ზომისთვის, მიწოდებითა და მონტაჟით თბილისში.',
    en: 'Wardrobe Orbi (180×240×60 cm) in dark oak with brushed brass pulls and soft-close hinges. Starting from 1,650 GEL for standard size, made in Tbilisi.',
    ru: 'Шкаф «Орби» (180×240×60 см) из тёмного дуба с латунными ручками и тихой фурнитурой. Цена от 1 650 GEL за стандартный размер, доставка из Тбилиси.',
  },
  'wardrobe-savane': {
    ka: 'ვიტრინა კარადა „სავანე“ (220×240×60 სმ) ბრინჯაოს მინის კარებითა და შიდა განათებით. ფასი 2 150 ₾-დან სტანდარტული ზომისთვის, მიწოდებით საქართველოში.',
    en: 'Glass Wardrobe Savane (220×240×60 cm) with tinted bronze glass doors, walnut shelving, and warm lighting. Starting from 2,150 GEL for standard size.',
    ru: 'Витринный шкаф «Саване» (220×240×60 см) с бронзовым стеклом, орехом и тёплой подсветкой полок. Цена от 2 150 GEL за стандартный размер в Тбилиси.',
  },
  'kitchen-line': {
    ka: 'სამზარეულო „ლაინი“ (300×220×60 სმ) — სამზარეულოს ავეჯი შეკვეთით, მქრქალი ფასადებითა და ქვის ზედაპირით. ფასი 3 400 ₾-დან თბილისში, სრული მონტაჟით.',
    en: 'Kitchen Line (300×220×60 cm) custom kitchen furniture with matte fronts, oak accents, and stone worktop. Starting from 3,400 GEL for standard layout.',
    ru: 'Кухня «Лайн» (300×220×60 см) — кухонная мебель на заказ с матовыми фасадами и каменной столешницей. Цена от 3 400 GEL за базовую комплектацию.',
  },
  'bathroom-vanity-60-40': {
    ka: 'აბაზანის კომოდი 60/40 (60×40×52 სმ) კაკლის ფასადით და კერამიკული ნიჟარით. მზა აბაზანის ავეჯი თბილისში — ფასი 440 ₾, მიწოდებითა და მონტაჟით ადგილზე.',
    en: 'Bathroom vanity 60/40 (60×40×52 cm) in fluted walnut with an integrated ceramic basin. Ready-made bathroom furniture in Tbilisi priced at 440 GEL.',
    ru: 'Тумба для ванной 60/40 (60×40×52 см) из рельефного ореха с керамической раковиной. Готовая мебель для ванной в Тбилиси по цене 440 GEL с доставкой.',
  },
  'bathroom-vanity-mono': {
    ka: 'აბაზანის კომოდი „მონო“ (80×45×50 სმ) — კედელზე დაკიდული აბაზანის ავეჯი კაკლის უჯრითა და ქვის ზედაპირით. ფასი 620 ₾-დან შეკვეთით, მიწოდებით თბილისში.',
    en: 'Bathroom vanity Mono (80×45×50 cm) wall-hung walnut drawer topped with natural stone. Custom bathroom furniture from 620 GEL for the standard size.',
    ru: 'Тумба для ванной «Моно» (80×45×50 см) подвесная из ореха со столешницей из натурального камня. Мебель для ванной на заказ от 620 GEL в Тбилиси.',
  },
  'mirror-halo': {
    ka: 'უჩარჩო LED სარკე „ჰალო“ (80×100 სმ) სუფთა მინითა და რბილი თბილი განათებით. ფასი 280 ₾-დან სტანდარტული ზომისთვის, მიწოდებითა და მონტაჟით თბილისში.',
    en: 'Frameless LED Mirror Halo (80×100 cm) with clear silver glass and soft warm backlighting. Starting from 280 GEL for the standard 80×100 cm edition.',
    ru: 'Безрамочное LED-зеркало «Хало» (80×100 см) с чистым полотном и мягкой тёплой подсветкой. Цена от 280 GEL за стандартный размер, доставка из Тбилиси.',
  },
  'lighting-sena': {
    ka: 'ტორშერი „სენა“ — მუქი მუხისა და თითბრის მაღალი ტორშერი რბილი თბილი განათებით მშვიდი ინტერიერისთვის. ფასი შეთანხმებით, მიწოდებით თბილისსა და რეგიონებში.',
    en: 'Floor Lamp Sena crafted in dark oak and brushed brass with a warm diffused shade for calm living spaces. Price on request with delivery across Georgia.',
    ru: 'Торшер «Сена» из тёмного дуба и матовой латуни с мягким тёплым светом для гостиной и спальни. Цена по запросу, доставка по Тбилиси и регионам Грузии.',
  },
  'lighting-luma': {
    ka: 'სანათი „ლუმა“ — მინიმალისტური თითბრისა და მქრქალი მინის სანათი რბილი ავეჯის განათებისთვის. ფასი შეთანხმებით, შეკვეთითა და მიწოდებით თბილისში.',
    en: 'Ambient Lamp Luma in brushed brass and frosted opal glass for warm architectural and furniture lighting. Price on request with delivery from Tbilisi.',
    ru: 'Светильник «Лума» из матовой латуни и опалового стекла для мягкой интерьерной подсветки мебели. Цена по запросу, доставка по Тбилиси и всей Грузии.',
  },
  'table-kura': {
    ka: 'სასადილო მაგიდა „კურა“ — მასიური კაკლის მაგიდა შეკვეთით მქრქალი ზეთის საფარითა და სუფთა პროპორციებით. ფასი შეთანხმებით, მიწოდებითა და მონტაჟით.',
    en: 'Dining Table Kura crafted from solid walnut with a matte oil finish and architectural timber legs. Custom table made to order in Tbilisi, price on request.',
    ru: 'Обеденный стол «Кура» из массива ореха с матовым масляным покрытием и чистыми пропорциями. Стол на заказ в Тбилиси, цена по запросу, доставка по Грузии.',
  },
  'table-nori': {
    ka: 'ყავის მაგიდა „ნორი“ — დაბალი მაგიდა მუქი მუხის კარკასითა და ბუნებრივი ქვის ზედაპირით მისაღები ოთახისთვის. ფასი შეთანხმებით, მიწოდებით საქართველოში.',
    en: 'Coffee Table Nori pairing a dark oak architectural base with a honed natural stone top for calm living rooms. Price on request with delivery in Georgia.',
    ru: 'Журнальный стол «Нори» с основанием из тёмного дуба и столешницей из натурального камня для гостиной. Цена по запросу, доставка по Тбилиси и регионам.',
  },
};

const INNER_TITLES: Record<'custom-order' | 'payment' | 'delivery' | 'contact' | 'not-found', LocalizedText> = {
  'custom-order': {
    ka: 'ინდივიდუალური ავეჯი შეკვეთით',
    en: 'Custom Furniture Made to Order',
    ru: 'Индивидуальная мебель на заказ',
  },
  payment: {
    ka: 'გადახდის პირობები',
    en: 'Payment Terms & Methods',
    ru: 'Условия и способы оплаты',
  },
  delivery: {
    ka: 'მიწოდება და მონტაჟი საქართველოში',
    en: 'Delivery & Installation in Georgia',
    ru: 'Доставка и монтаж по Грузии',
  },
  contact: {
    ka: 'კონტაქტი — ნატო გიორგაძის ქ. 16',
    en: 'Contact & Tbilisi Address',
    ru: 'Контакты и адрес в Тбилиси',
  },
  'not-found': {
    ka: 'გვერდი ვერ მოიძებნა (404)',
    en: 'Page Not Found (404)',
    ru: 'Страница не найдена (404)',
  },
};

const INNER_DESCRIPTIONS: Record<'custom-order' | 'payment' | 'delivery' | 'contact' | 'not-found', LocalizedText> = {
  'custom-order': {
    ka: 'ინდივიდუალური ავეჯი შეკვეთით თბილისში 400 ₾/მ²-დან: ზომების აღება, 3D ნახაზი, დამზადება ჩვენს საწარმოში და პროფესიონალური მონტაჟი საქართველოში.',
    en: 'Custom furniture made to order in Tbilisi from 400 GEL/m². On-site measurement, 3D layout, local workshop production, and clean fitting across Georgia.',
    ru: 'Индивидуальная мебель на заказ в Тбилиси от 400 GEL/м²: выезд на замер, 3D-проект, производство в собственном цеху и аккуратный монтаж на объекте.',
  },
  payment: {
    ka: 'გადახდის მარტივი პირობები თბილისსა და რეგიონებში: ნაღდი ანგარიშსწორება მიღებისას ან საბანკო გადარიცხვა ინვოისით მზა და შეკვეთით ავეჯზე საქართველოში.',
    en: 'Simple payment options for ready-made and custom furniture in Tbilisi and Georgia: pay cash on delivery or via bank transfer by invoice with no hidden fees.',
    ru: 'Простые условия оплаты мебели в Тбилиси и регионах Грузии: наличными при получении или банковским переводом по счёту для готовых моделей и заказов.',
  },
  delivery: {
    ka: 'ავეჯის მიწოდება და ადგილზე მონტაჟი თბილისსა და საქართველოს ყველა რეგიონში. კარადების, სამზარეულოებისა და აბაზანის ავეჯის აწყობა ჩვენი გუნდით.',
    en: 'Furniture delivery and on-site installation across Tbilisi and all regions of Georgia. Our own workshop team handles transport, assembly, and fitting.',
    ru: 'Доставка и монтаж мебели по Тбилиси и всем регионам Грузии. Собственная бригада бережно привозит, собирает и устанавливает шкафы, кухни и тумбы.',
  },
  contact: {
    ka: 'დაუკავშირდით საწარმოს თბილისში: ნატო გიორგაძის ქ. 16, ტელეფონი 555 55 90 47, WhatsApp, Instagram და Facebook. ავეჯი თბილისში და შეკვეთით საქართველოში.',
    en: 'Contact Sakhelosno in Tbilisi at Nato Giorgadze St 16. Call +995 555 55 90 47 or message on WhatsApp for ready-made furniture and custom build quotes.',
    ru: 'Контакты Sakhelosno в Тбилиси: ул. Нато Гиоргадзе 16, телефон +995 555 55 90 47, WhatsApp, Instagram и Facebook. Готовая мебель и изготовление на заказ.',
  },
  'not-found': {
    ka: 'მოთხოვნილი გვერდი ვერ მოიძებნა. გადადით მთავარ გვერდზე ან დაათვალიერეთ კარადების, სამზარეულოების, აბაზანის ავეჯის, ტორშერებისა და მაგიდების კატალოგი.',
    en: 'The requested page could not be found. Return to the Sakhelosno homepage or browse our wardrobes, kitchens, bathroom furniture, floor lamps, and tables.',
    ru: 'Запрошенная страница не найдена. Вернитесь на главную Sakhelosno или откройте каталог шкафов, кухонь, мебели для ванной, торшеров и столов в Тбилиси.',
  },
};

function buildBreadcrumbList(
  items: Array<{ name: string; url: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((entry, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: entry.name,
      item: entry.url,
    })),
  };
}

function buildHomeStoreJsonLd(lang: Language, description: string): Record<string, unknown> {
  const streetByLang: LocalizedText = {
    ka: 'ნატო გიორგაძის ქ. 16',
    en: 'Nato Giorgadze St 16',
    ru: 'ул. Нато Гиоргадзе 16',
  };
  const cityByLang: LocalizedText = {
    ka: 'თბილისი',
    en: 'Tbilisi',
    ru: 'Тбилиси',
  };
  const countryByLang: LocalizedText = {
    ka: 'საქართველო',
    en: 'Georgia',
    ru: 'Грузия',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'FurnitureStore',
    name: getBrandName(lang),
    alternateName: lang === 'ka' ? 'Sakhelosno' : 'სახელოსნო',
    description,
    url: toAbsoluteUrl(buildLocalizedPath(lang, { page: 'home' })),
    logo: toAbsoluteUrl(SITE_LOGO_PATH),
    image: toAbsoluteUrl(OG_IMAGE_PATH),
    telephone: '+995 555 55 90 47',
    address: {
      '@type': 'PostalAddress',
      streetAddress: streetByLang[lang],
      addressLocality: cityByLang[lang],
      addressCountry: 'GE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_COORDINATES.latitude,
      longitude: GEO_COORDINATES.longitude,
    },
    areaServed: {
      '@type': 'Country',
      name: countryByLang[lang],
    },
    sameAs: [
      OWNER_CONFIG.instagramUrl,
      OWNER_CONFIG.facebookUrl,
    ],
  };
}

function buildProductJsonLd(
  product: CatalogItem,
  lang: Language,
  canonicalUrl: string,
): Record<string, unknown> {
  const unitNote =
    product.priceGel === null
      ? lang === 'ka'
        ? ' ფასი შეთანხმებით.'
        : lang === 'ru'
          ? ' Цена по запросу.'
          : ' Price on request.'
      : product.isStartingPrice
        ? lang === 'ka'
          ? ` ფასი იწყება ${formatGelNumber(product.priceGel)} ₾-დან სტანდარტული ზომისთვის (${product.dimensions} სმ).`
          : lang === 'ru'
            ? ` Цена от ${formatGelNumber(product.priceGel)} GEL за стандартный размер (${product.dimensions} см).`
            : ` Starting price from ${formatGelNumber(product.priceGel)} GEL for the standard size (${product.dimensions} cm).`
        : product.dimensions
          ? lang === 'ka'
            ? ` სტანდარტული ზომა: ${product.dimensions} სმ.`
            : lang === 'ru'
              ? ` Стандартный размер: ${product.dimensions} см.`
              : ` Standard size: ${product.dimensions} cm.`
          : '';

  const availability =
    product.tagTone === 'made-to-order'
      ? 'https://schema.org/MadeToOrder'
      : 'https://schema.org/InStock';

  const offers: Record<string, unknown> = {
    '@type': 'Offer',
    url: canonicalUrl,
    priceCurrency: 'GEL',
    availability,
  };

  if (product.priceGel !== null) {
    offers.price = String(product.priceGel);
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[lang],
    sku: product.code,
    image: product.gallery.map((img) => toAbsoluteUrl(img)),
    description: `${product.shortDescription[lang]} ${product.materialNote[lang]}.${unitNote}`,
    brand: {
      '@type': 'Brand',
      name: getBrandName(lang),
    },
    offers,
  };
}

function buildCustomOrderServiceJsonLd(
  lang: Language,
  canonicalUrl: string,
  description: string,
): Record<string, unknown> {
  const serviceType: LocalizedText = {
    ka: 'ინდივიდუალური ავეჯი შეკვეთით',
    en: 'Custom Furniture Made to Order',
    ru: 'Изготовление мебели на заказ',
  };
  const countryByLang: LocalizedText = {
    ka: 'საქართველო',
    en: 'Georgia',
    ru: 'Грузия',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: INNER_TITLES['custom-order'][lang],
    serviceType: serviceType[lang],
    description,
    url: canonicalUrl,
    provider: {
      '@type': 'FurnitureStore',
      name: getBrandName(lang),
      telephone: '+995 555 55 90 47',
      url: toAbsoluteUrl(buildLocalizedPath(lang, { page: 'home' })),
    },
    areaServed: {
      '@type': 'Country',
      name: countryByLang[lang],
    },
    offers: {
      '@type': 'Offer',
      price: String(OWNER_CONFIG.customOrderRateGelPerSqm),
      priceCurrency: 'GEL',
      unitText: lang === 'ka' ? 'მ²' : lang === 'ru' ? 'м²' : 'm²',
    },
  };
}

export function getPageSeo(lang: Language, route: AppRoute): PageSeoData {
  const path = buildLocalizedPath(lang, route);
  const canonicalUrl = toAbsoluteUrl(path);
  const homeUrl = toAbsoluteUrl(buildLocalizedPath(lang, { page: 'home' }));
  const alternates: Array<{ hreflang: Language | 'x-default'; href: string }> =
    route.page === 'not-found'
      ? []
      : [
          ...SUPPORTED_LANGUAGES.map((code) => ({
            hreflang: code,
            href: toAbsoluteUrl(buildLocalizedPath(code, route)),
          })),
          {
            hreflang: 'x-default',
            href: toAbsoluteUrl(buildLocalizedPath('ka', route)),
          },
        ];

  const ogLocale = OG_LOCALE_BY_LANG[lang];
  const ogAlternateLocales = SUPPORTED_LANGUAGES.filter((l) => l !== lang).map(
    (l) => OG_LOCALE_BY_LANG[l],
  );
  const ogImage = toAbsoluteUrl(OG_IMAGE_PATH);
  const siteName = getBrandName(lang);
  const defaultOgAlt: LocalizedText = {
    ka: 'მუქი მუხის კარადა თბილი განათებით — სახელოსნო თბილისი',
    en: 'Dark oak custom wardrobe with warm lighting by Sakhelosno Tbilisi',
    ru: 'Гардеробная из тёмного дуба с тёплой подсветкой — Sakhelosno Тбилиси',
  };

  if (route.page === 'home') {
    const title = formatSeoTitle(HOME_TITLE_BASE[lang], lang);
    const description = HOME_DESCRIPTION[lang];
    return {
      lang,
      path,
      title,
      description,
      canonicalUrl,
      alternates,
      ogType: 'website',
      ogLocale,
      ogAlternateLocales,
      ogImage,
      ogImageAlt: defaultOgAlt[lang],
      siteName,
      robots: 'index, follow',
      jsonLd: [buildHomeStoreJsonLd(lang, description)],
    };
  }

  if (route.page === 'catalog') {
    const categoryObj =
      CATALOG_CATEGORIES.find((c) => c.id === route.category) ??
      CATALOG_CATEGORIES[0];
    const title = formatSeoTitle(CATEGORY_TITLES[route.category][lang], lang);
    const description = CATEGORY_DESCRIPTIONS[route.category][lang];
    return {
      lang,
      path,
      title,
      description,
      canonicalUrl,
      alternates,
      ogType: 'website',
      ogLocale,
      ogAlternateLocales,
      ogImage,
      ogImageAlt: defaultOgAlt[lang],
      siteName,
      robots: 'index, follow',
      jsonLd: [
        buildBreadcrumbList([
          { name: UI_COPY.nav.home[lang], url: homeUrl },
          { name: categoryObj.label[lang], url: canonicalUrl },
        ]),
      ],
    };
  }

  if (route.page === 'product') {
    const product =
      CATALOG_ITEMS.find((item) => item.id === route.productId) ??
      CATALOG_ITEMS[0];
    const categoryObj =
      CATALOG_CATEGORIES.find((c) => c.id === product.category) ??
      CATALOG_CATEGORIES[0];
    const categoryUrl = toAbsoluteUrl(
      buildLocalizedPath(lang, { page: 'catalog', category: product.category }),
    );
    const title = formatSeoTitle(product.name[lang], lang);
    const description =
      PRODUCT_DESCRIPTIONS[product.id]?.[lang] ??
      `${product.name[lang]} — ${product.shortDescription[lang]}`;
    return {
      lang,
      path,
      title,
      description,
      canonicalUrl,
      alternates,
      ogType: 'product',
      ogLocale,
      ogAlternateLocales,
      ogImage,
      ogImageAlt: product.imageAlt[lang],
      siteName,
      robots: 'index, follow',
      jsonLd: [
        buildProductJsonLd(product, lang, canonicalUrl),
        buildBreadcrumbList([
          { name: UI_COPY.nav.home[lang], url: homeUrl },
          { name: categoryObj.label[lang], url: categoryUrl },
          { name: product.name[lang], url: canonicalUrl },
        ]),
      ],
    };
  }

  if (route.page === 'custom-order') {
    const title = formatSeoTitle(INNER_TITLES['custom-order'][lang], lang);
    const description = INNER_DESCRIPTIONS['custom-order'][lang];
    return {
      lang,
      path,
      title,
      description,
      canonicalUrl,
      alternates,
      ogType: 'website',
      ogLocale,
      ogAlternateLocales,
      ogImage,
      ogImageAlt: defaultOgAlt[lang],
      siteName,
      robots: 'index, follow',
      jsonLd: [
        buildCustomOrderServiceJsonLd(lang, canonicalUrl, description),
        buildBreadcrumbList([
          { name: UI_COPY.nav.home[lang], url: homeUrl },
          { name: UI_COPY.nav.customOrder[lang], url: canonicalUrl },
        ]),
      ],
    };
  }

  if (route.page === 'not-found') {
    return {
      lang,
      path: '/404.html',
      title: formatSeoTitle(INNER_TITLES['not-found'][lang], lang),
      description: INNER_DESCRIPTIONS['not-found'][lang],
      canonicalUrl: toAbsoluteUrl('/ka/'),
      alternates: [],
      ogType: 'website',
      ogLocale,
      ogAlternateLocales,
      ogImage,
      ogImageAlt: defaultOgAlt[lang],
      siteName,
      robots: 'noindex, follow',
      jsonLd: [],
    };
  }

  const pageKey = route.page;
  const navTitle =
    pageKey === 'payment'
      ? UI_COPY.nav.payment[lang]
      : pageKey === 'delivery'
        ? UI_COPY.nav.delivery[lang]
        : UI_COPY.nav.contact[lang];

  return {
    lang,
    path,
    title: formatSeoTitle(INNER_TITLES[pageKey][lang], lang),
    description: INNER_DESCRIPTIONS[pageKey][lang],
    canonicalUrl,
    alternates,
    ogType: 'website',
    ogLocale,
    ogAlternateLocales,
    ogImage,
    ogImageAlt: defaultOgAlt[lang],
    siteName,
    robots: 'index, follow',
    jsonLd: [
      buildBreadcrumbList([
        { name: UI_COPY.nav.home[lang], url: homeUrl },
        { name: navTitle, url: canonicalUrl },
      ]),
    ],
  };
}

export function getAllPrerenderRoutes(): PrerenderRouteEntry[] {
  const routes: AppRoute[] = [
    { page: 'home' },
    ...CATALOG_CATEGORIES.map(
      (cat): AppRoute => ({ page: 'catalog', category: cat.id }),
    ),
    ...CATALOG_ITEMS.map(
      (item): AppRoute => ({ page: 'product', productId: item.id }),
    ),
    { page: 'custom-order' },
    { page: 'payment' },
    { page: 'delivery' },
    { page: 'contact' },
  ];

  const entries: PrerenderRouteEntry[] = [];
  for (const lang of SUPPORTED_LANGUAGES) {
    for (const route of routes) {
      entries.push({
        lang,
        route,
        path: buildLocalizedPath(lang, route),
      });
    }
  }
  return entries;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildSitemapXml(): string {
  const entries = getAllPrerenderRoutes();
  const blocks = entries.map((entry) => {
    const loc = toAbsoluteUrl(entry.path);
    const alternates = [
      ...SUPPORTED_LANGUAGES.map((code) => ({
        hreflang: code,
        href: toAbsoluteUrl(buildLocalizedPath(code, entry.route)),
      })),
      {
        hreflang: 'x-default',
        href: toAbsoluteUrl(buildLocalizedPath('ka', entry.route)),
      },
    ];

    const priority =
      entry.route.page === 'home'
        ? '1.0'
        : entry.route.page === 'catalog' || entry.route.page === 'custom-order'
          ? '0.9'
          : entry.route.page === 'product'
            ? '0.8'
            : '0.7';

    const alternateLines = alternates
      .map(
        (alt) =>
          `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`,
      )
      .join('\n');

    return [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`,
      alternateLines,
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...blocks,
    '</urlset>',
    '',
  ].join('\n');
}

export interface PreloadImageConfig {
  href: string;
  srcSet?: string;
  sizes?: string;
}

export function renderSeoHeadTags(
  seo: PageSeoData,
  preloadHeroImage?: string | PreloadImageConfig,
): string {
  const lines: string[] = [
    `<title>${escapeHtmlAttr(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtmlAttr(seo.description)}" />`,
    `<meta name="robots" content="${escapeHtmlAttr(seo.robots)}" />`,
    `<link rel="canonical" href="${escapeHtmlAttr(seo.canonicalUrl)}" />`,
    ...seo.alternates.map(
      (alt) =>
        `<link rel="alternate" hreflang="${escapeHtmlAttr(alt.hreflang)}" href="${escapeHtmlAttr(alt.href)}" />`,
    ),
    `<meta property="og:type" content="${escapeHtmlAttr(seo.ogType)}" />`,
    `<meta property="og:site_name" content="${escapeHtmlAttr(seo.siteName)}" />`,
    `<meta property="og:title" content="${escapeHtmlAttr(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtmlAttr(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtmlAttr(seo.canonicalUrl)}" />`,
    `<meta property="og:locale" content="${escapeHtmlAttr(seo.ogLocale)}" />`,
    ...seo.ogAlternateLocales.map(
      (loc) => `<meta property="og:locale:alternate" content="${escapeHtmlAttr(loc)}" />`,
    ),
    `<meta property="og:image" content="${escapeHtmlAttr(seo.ogImage)}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `<meta property="og:image:alt" content="${escapeHtmlAttr(seo.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtmlAttr(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtmlAttr(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtmlAttr(seo.ogImage)}" />`,
  ];

  if (preloadHeroImage) {
    const cfg: PreloadImageConfig =
      typeof preloadHeroImage === 'string'
        ? { href: preloadHeroImage }
        : preloadHeroImage;
    const attrs = [
      'rel="preload"',
      'as="image"',
      `href="${escapeHtmlAttr(cfg.href)}"`,
      cfg.srcSet ? `imagesrcset="${escapeHtmlAttr(cfg.srcSet)}"` : '',
      cfg.sizes ? `imagesizes="${escapeHtmlAttr(cfg.sizes)}"` : '',
      'fetchpriority="high"',
    ]
      .filter(Boolean)
      .join(' ');
    lines.push(`<link ${attrs} />`);
  }

  for (const schema of seo.jsonLd) {
    lines.push(
      `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    );
  }

  return lines.join('\n    ');
}

export function applyClientSeoHead(seo: PageSeoData): void {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = seo.lang;
  document.title = seo.title;

  const setMeta = (selector: string, attrName: 'name' | 'property', key: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('meta[name="description"]', 'name', 'description', seo.description);
  setMeta('meta[name="robots"]', 'name', 'robots', seo.robots);
  setMeta('meta[property="og:type"]', 'property', 'og:type', seo.ogType);
  setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', seo.siteName);
  setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
  setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
  setMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonicalUrl);
  setMeta('meta[property="og:locale"]', 'property', 'og:locale', seo.ogLocale);
  setMeta('meta[property="og:image"]', 'property', 'og:image', seo.ogImage);
  setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', seo.ogImageAlt);
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.ogImage);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', seo.canonicalUrl);

  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((node) => node.remove());
  for (const alt of seo.alternates) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', alt.hreflang);
    link.setAttribute('href', alt.href);
    document.head.appendChild(link);
  }

  document.head
    .querySelectorAll('script[type="application/ld+json"]')
    .forEach((node) => node.remove());
  for (const schema of seo.jsonLd) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
