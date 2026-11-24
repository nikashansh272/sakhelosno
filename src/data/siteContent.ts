import type {
  CatalogCategory,
  CatalogItem,
  GalleryCategory,
  HeroMenuCategory,
  HeroSlide,
  Language,
  LocalizedText,
  ProcessStep,
  RealFactItem,
} from '../types/site';
import { SITE_MEDIA } from './media';

/**
 * Client-editable Google Maps pin location for Nato Giorgadze St 16, Tbilisi (Samgori district).
 * Replace coordinates, placeUrl, or embedUrl below with your exact Google Maps share/embed link anytime.
 */
export const CLIENT_MAP_SETTINGS = {
  lat: 41.6751,
  lng: 44.9001,
  zoom: 16,
  placeUrl: 'https://maps.google.com/?q=41.6751,44.9001',
  embedUrl:
    'https://maps.google.com/maps?q=41.6751,44.9001&z=16&ie=UTF8&iwloc=&output=embed',
};

/**
 * Owner-editable business settings, pricing rate, and catalog entries.
 */
export const OWNER_CONFIG = {
  phoneDisplay: '+995 555 55 90 47',
  phoneE164: '+995555559047',
  whatsappNumber: '995555559047',
  instagramHandle: 'sakhelosno_official',
  instagramUrl: 'https://instagram.com/sakhelosno_official',
  facebookLabel: 'Sakhelosno / სახელოსნო',
  facebookUrl: 'https://facebook.com',
  address: {
    ka: 'ნატო გიორგაძის ქ. 16, თბილისი',
    en: 'Nato Giorgadze St 16, Tbilisi',
    ru: 'ул. Нато Гиоргадзе 16, Тбилиси',
  } as LocalizedText,
  mapEmbedUrl: CLIENT_MAP_SETTINGS.embedUrl,
  customOrderRateGelPerSqm: 400,
  copyrightYear: 2026,
};

export const REAL_FACTS_STRIP: RealFactItem[] = [
  {
    id: 'measure',
    text: {
      ka: 'ზომების აღება ადგილზე',
      en: 'On-site room measurement',
      ru: 'Выезд на замер',
    },
  },
  {
    id: 'design3d',
    text: {
      ka: '3D დიზაინი შედის ფასში',
      en: '3D design included',
      ru: '3D-дизайн включён',
    },
  },
  {
    id: 'materials',
    text: {
      ka: 'ნატურალური ხე და ქვა',
      en: 'Natural wood & stone',
      ru: 'Натуральное дерево и камень',
    },
  },
  {
    id: 'workshop',
    text: {
      ka: 'საკუთარი საწარმო თბილისში',
      en: 'Own Tbilisi workshop',
      ru: 'Собственный цех в Тбилиси',
    },
  },
];

export const TWO_PATH_BAND = {
  ready: {
    eyebrow: {
      ka: 'სერიული ხაზი',
      en: 'Showroom Editions',
      ru: 'В наличии',
    },
    title: {
      ka: 'მზა ავეჯი',
      en: 'Ready-made models',
      ru: 'Готовая мебель',
    },
    cta: {
      ka: 'კატალოგის გახსნა',
      en: 'Open catalog',
      ru: 'Открыть каталог',
    },
  },
  custom: {
    eyebrow: {
      ka: 'პროექტირება',
      en: 'Made to Measure',
      ru: 'По вашим замерам',
    },
    title: {
      ka: 'დამზადება შეკვეთით',
      en: 'Made to order',
      ru: 'Мебель на заказ',
    },
    cta: {
      ka: 'შეკვეთის პირობები',
      en: 'See process',
      ru: 'Этапы заказа',
    },
  },
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'wardrobe',
    image: SITE_MEDIA.heroWardrobe,
    kicker: {
      ka: 'კარადები',
      en: 'Wardrobes',
      ru: 'Шкафы',
    },
    headline: {
      ka: 'გარდერობები ზუსტი ზომებით',
      en: 'Wardrobes made to measure',
      ru: 'Гардеробные по точным размерам',
    },
    subline: {
      ka: 'მუქი მუხა და მშვიდი ხაზები.',
      en: 'Dark oak and clean lines.',
      ru: 'Тёмный дуб и чистые линии.',
    },
    ctaLabel: {
      ka: 'კარადების ნახვა',
      en: 'View Wardrobes',
      ru: 'Смотреть шкафы',
    },
    targetCategory: 'wardrobes',
    label: {
      ka: '01 · გარდერობი',
      en: '01 · Wardrobe',
      ru: '01 · Гардеробная',
    },
    alt: {
      ka: 'მუქი მუხის კარადა თბილი განათებით',
      en: 'Dark oak wardrobe interior with warm lighting',
      ru: 'Гардеробная из тёмного дуба с тёплой подсветкой',
    },
  },
  {
    id: 'bathroom',
    image: SITE_MEDIA.heroBathroom,
    kicker: {
      ka: 'აბაზანის ავეჯი',
      en: 'Bathroom furniture',
      ru: 'Мебель для ванной',
    },
    headline: {
      ka: 'აბაზანის ავეჯი კაკლის ხით',
      en: 'Bathroom furniture in walnut',
      ru: 'Мебель для ванной из ореха',
    },
    subline: {
      ka: 'კაკლის კომოდები და თბილი განათება.',
      en: 'Walnut cabinetry and soft warm light.',
      ru: 'Ореховые тумбы и мягкий тёплый свет.',
    },
    ctaLabel: {
      ka: 'აბაზანის მოდელები',
      en: 'Bathroom models',
      ru: 'Модели для ванной',
    },
    targetCategory: 'bathroom',
    label: {
      ka: '02 · აბაზანის ავეჯი',
      en: '02 · Bathroom furniture',
      ru: '02 · Мебель для ванной',
    },
    alt: {
      ka: 'აბაზანის კაკლის კომოდი თბილი განათებით',
      en: 'Walnut bathroom vanity with soft warm backlight',
      ru: 'Тумба для ванной из ореха с мягкой тёплой подсветкой',
    },
  },
  {
    id: 'kitchen',
    image: SITE_MEDIA.heroKitchen,
    kicker: {
      ka: 'სამზარეულოები',
      en: 'Kitchens',
      ru: 'Кухни',
    },
    headline: {
      ka: 'სამზარეულოები შეკვეთით',
      en: 'Minimalist custom kitchens',
      ru: 'Минималистичные кухни',
    },
    subline: {
      ka: 'ქვის ზედაპირები, ნახაზი და მონტაჟი.',
      en: 'Stone worktops, drawings, and fitting.',
      ru: 'Каменные столешницы, чертежи и сборка.',
    },
    ctaLabel: {
      ka: 'სამზარეულოების ნახვა',
      en: 'View Kitchens',
      ru: 'Смотреть кухни',
    },
    targetCategory: 'kitchens',
    label: {
      ka: '03 · სამზარეულო',
      en: '03 · Kitchen',
      ru: '03 · Кухня',
    },
    alt: {
      ka: 'თანამედროვე მუქი სამზარეულო ქვის ზედაპირით',
      en: 'Minimalist dark kitchen with stone island',
      ru: 'Современная кухня с каменной столешницей',
    },
  },
];

export const HERO_CATEGORY_MENU: Array<{
  id: CatalogCategory;
  label: LocalizedText;
  thumbnail: string;
}> = [
  {
    id: 'wardrobes',
    label: { ka: 'კარადები', en: 'Wardrobes', ru: 'Шкафы' },
    thumbnail: SITE_MEDIA.catalogWardrobeOrbi,
  },
  {
    id: 'kitchens',
    label: { ka: 'სამზარეულოები', en: 'Kitchens', ru: 'Кухни' },
    thumbnail: SITE_MEDIA.catalogKitchenLine,
  },
  {
    id: 'bathroom',
    label: {
      ka: 'აბაზანის ავეჯი',
      en: 'Bathroom furniture',
      ru: 'Мебель для ванной',
    },
    thumbnail: SITE_MEDIA.catalogVanityCompact,
  },
  {
    id: 'lighting',
    label: {
      ka: 'ტორშერები და სანათები',
      en: 'Floor lamps and lighting',
      ru: 'Торшеры и светильники',
    },
    thumbnail: SITE_MEDIA.catalogLampSena,
  },
  {
    id: 'tables',
    label: { ka: 'მაგიდები', en: 'Tables', ru: 'Столы' },
    thumbnail: SITE_MEDIA.catalogTableKura,
  },
];

export const HERO_CUSTOM_ORDER_ENTRY: {
  id: HeroMenuCategory;
  label: LocalizedText;
  thumbnail: string;
} = {
  id: 'custom-order',
  label: {
    ka: 'დამზადება შეკვეთით',
    en: 'Made to order',
    ru: 'Мебель на заказ',
  },
  thumbnail: SITE_MEDIA.sidebarCustomDetail,
};

export const CATALOG_CATEGORIES: Array<{
  id: CatalogCategory;
  label: LocalizedText;
  intro: LocalizedText;
}> = [
  {
    id: 'wardrobes',
    label: { ka: 'კარადები', en: 'Wardrobes', ru: 'Шкафы' },
    intro: {
      ka: 'ვამზადებთ მზა და კარადა შეკვეთით თბილისში — მუქი მუხის, კაკლისა და დაბურული მინის ფასადებით. თითოეული მოდელი მორგებულია ოთახის ზუსტ ზომებზე და აღჭურვილია ჩუმი მექანიზმებით. ადგილზე ზომების აღება და მონტაჟი შედის ჩვენს სერვისში.',
      en: 'Ready-made models and custom wardrobes built in Tbilisi using dark oak, walnut, and tinted bronze glass fronts. Every piece is proportioned to your room dimensions with quiet soft-close hardware. On-site measurement and clean fitting are handled by our own team.',
      ru: 'Готовые модели и шкафы на заказ в Тбилиси с фасадами из тёмного дуба, ореха и тонированного стекла. Каждая модель подгоняется под точные размеры комнаты и комплектуется тихой фурнитурой. Замер и аккуратный монтаж выполняет наша бригада.',
    },
  },
  {
    id: 'kitchens',
    label: { ka: 'სამზარეულოები', en: 'Kitchens', ru: 'Кухни' },
    intro: {
      ka: 'სამზარეულოს ავეჯი შეკვეთით იქმნება თქვენი სივრცის ზუსტი ნახაზით, გამძლე ქვის ზედაპირებითა და მქრქალი ფასადებით. ნახაზიდან აწყობამდე მთელ პროცესს ჩვენი გუნდი თბილისის საწარმოში ასრულებს. მიწოდება და მონტაჟი შესაძლებელია მთელი საქართველოს მასშტაბით.',
      en: 'Custom kitchen furniture is built to your room layout with durable stone worktops, matte fronts, and natural oak details. Our Tbilisi team manages the entire build from initial measurement and layout to final installation. Delivery and fitting are available across Georgia.',
      ru: 'Кухонная мебель на заказ создаётся по точным замерам помещения с прочными каменными столешницами и матовыми фасадами. Наша команда в Тбилиси ведёт заказ от чертежа до сборки и установки. Доставка и монтаж доступны по всей Грузии.',
    },
  },
  {
    id: 'bathroom',
    label: {
      ka: 'აბაზანის ავეჯი',
      en: 'Bathroom furniture',
      ru: 'Мебель для ванной',
    },
    intro: {
      ka: 'აბაზანის ავეჯი კაკლის ხით, ქვის ზედაპირით, კერამიკული ნიჟარითა და თბილი განათების LED სარკით — როგორც მზა ზომებით, ისე ინდივიდუალურად. ტენიანობისადმი მდგრადი დამუშავება და ზუსტი ფურნიტურა უზრუნველყოფს ხანგრძლივ გამძლეობას. ჩავიტანთ და დავამონტაჟებთ თბილისსა და რეგიონებში.',
      en: 'Bathroom furniture in fluted walnut, natural stone tops, integrated ceramic basins, and backlit LED mirrors — available in ready compact sizes or built to order. Moisture-resistant finishes and quiet drawers are made for daily durability. Delivered and mounted across Tbilisi and all regions.',
      ru: 'Мебель для ванной из рельефного ореха с каменными столешницами, керамическими раковинами и LED-зеркалами — в готовых размерах и на заказ. Влагостойкая обработка и надёжная фурнитура рассчитаны на долгую службу. Доставляем и устанавливаем по Тбилиси и регионам.',
    },
  },
  {
    id: 'lighting',
    label: {
      ka: 'ტორშერები და სანათები',
      en: 'Floor lamps and lighting',
      ru: 'Торшеры и светильники',
    },
    intro: {
      ka: 'ხის ტორშერი, მინიმალისტური სანათი და თბილი ავეჯის განათება მშვიდი, ბალანსირებული ინტერიერისთვის. ვიყენებთ მუქ მუხას, თითბერსა და მქრქალ მინას, რომ შუქი რბილად და კომფორტულად გადანაწილდეს ოთახში. დეტალებისა და ფასის დასაზუსტებლად დაგვიკავშირდით თბილისში.',
      en: 'Wooden floor lamps, minimalist accent lamps, and warm furniture lighting designed for calm, architectural interiors. We pair dark oak, brushed brass, and frosted glass so light diffuses gently across living rooms and bedrooms. Contact our Tbilisi team for finishes and pricing on request.',
      ru: 'Деревянные торшеры, лаконичные светильники и мягкая подсветка мебели для спокойных современных интерьеров. Сочетаем тёмный дуб, матовую латунь и рассеивающее стекло для комфортного тёплого света. Уточните варианты отделки и стоимость у нашей команды в Тбилиси.',
    },
  },
  {
    id: 'tables',
    label: { ka: 'მაგიდები', en: 'Tables', ru: 'Столы' },
    intro: {
      ka: 'მასიური ხის სასადილო მაგიდა, ქვის ზედაპირიანი ყავის მაგიდა და მაგიდა შეკვეთით თქვენი ოთახის პროპორციებზე მორგებული ზომებით. ნატურალური კაკალი, მუქი მუხა და ბუნებრივი ქვა დამუშავებულია გამძლე მქრქალი საფარით. მიწოდება და აწყობა ხელმისაწვდომია თბილისსა და რეგიონებში.',
      en: 'Solid wood dining tables, stone-top coffee tables, and custom tables made to order in proportions tailored to your room. Natural walnut, dark oak, and honed stone are finished with durable matte protection for everyday use. Delivery and placement are available across Tbilisi and Georgia.',
      ru: 'Обеденный стол из массива, журнальный стол с каменной столешницей и стол на заказ в пропорциях вашего пространства. Натуральный орех, тёмный дуб и камень обрабатываются стойким матовым покрытием. Доставка и установка доступны в Тбилиси и по всей Грузии.',
    },
  },
];

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'wardrobe-orbi',
    code: 'SKH-WB-01',
    category: 'wardrobes',
    name: {
      ka: 'კარადა „ორბი“',
      en: 'Wardrobe Orbi',
      ru: 'Шкаф «Орби»',
    },
    dimensions: '180 × 240 × 60',
    priceGel: 1650,
    isStartingPrice: true,
    image: SITE_MEDIA.catalogWardrobeOrbi,
    gallery: [
      SITE_MEDIA.catalogWardrobeOrbi,
      SITE_MEDIA.heroWardrobe,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'კარადა ორბი მუქი ფასადით და თითბრის სახელურებით საძინებელში',
        en: 'Wardrobe Orbi in matte charcoal and dark oak with brass pulls',
        ru: 'Шкаф Орби с матовыми графитовыми и дубовыми фасадами в спальне',
      },
      {
        ka: 'მუქი მუხის კარადის შიდა სექცია თბილი განათებით',
        en: 'Dark oak wardrobe interior shelving with warm lighting',
        ru: 'Внутреннее наполнение гардероба из тёмного дуба с подсветкой',
      },
      {
        ka: 'ხის კუთხური შეერთებისა და თითბრის დეტალის ახლო კადრი',
        en: 'Close-up of dark wood corner joinery and brushed brass hardware',
        ru: 'Крупный план деревянного стыка и латунной фурнитуры',
      },
    ],
    imageAlt: {
      ka: 'კარადა ორბი მუქი ფასადით და თითბრის სახელურებით',
      en: 'Wardrobe Orbi in matte charcoal and dark oak with brass pulls',
      ru: 'Шкаф Орби с матовыми графитовыми и дубовыми фасадами',
    },
    tag: {
      ka: 'მზადაა გასაგზავნად',
      en: 'Ready to ship',
      ru: 'Готов к отправке',
    },
    tagTone: 'ready',
    specLine: {
      ka: '180 × 240 × 60 · მუქი მუხა',
      en: '180 × 240 × 60 · Dark oak',
      ru: '180 × 240 × 60 · Тёмный дуб',
    },
    shortDescription: {
      ka: 'მუქი მუხის ფასადი და ჩუმი მექანიზმები.',
      en: 'Dark oak panels with soft-close hinges.',
      ru: 'Тёмный дуб и тихая фурнитура.',
    },
    materialNote: {
      ka: 'მუქი მუხა, თითბრის სახელურები',
      en: 'Dark oak, brushed brass pulls',
      ru: 'Тёмный дуб, латунные ручки',
    },
    featured: true,
    newArrival: false,
  },
  {
    id: 'wardrobe-savane',
    code: 'SKH-WB-02',
    category: 'wardrobes',
    name: {
      ka: 'ვიტრინა კარადა „სავანე“',
      en: 'Glass Wardrobe Savane',
      ru: 'Витринный шкаф «Саване»',
    },
    dimensions: '220 × 240 × 60',
    priceGel: 2150,
    isStartingPrice: true,
    image: SITE_MEDIA.catalogWardrobeSavane,
    gallery: [
      SITE_MEDIA.catalogWardrobeSavane,
      SITE_MEDIA.heroWardrobe,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'ვიტრინა კარადა სავანე ბრინჯაოს მინის კარებითა და შიდა განათებით',
        en: 'Glass Wardrobe Savane with bronze glass doors and warm interior light',
        ru: 'Витринный шкаф Саване с тонированным стеклом и внутренней подсветкой',
      },
      {
        ka: 'გარდერობის შიდა თაროები და საკიდები მუქ მუხაში',
        en: 'Interior wardrobe rails and drawers in dark oak with warm glow',
        ru: 'Внутренние полки и штанги гардеробной из тёмного дуба',
      },
      {
        ka: 'კაკლისა და თითბრის ფურნიტურის ხელნაკეთი დეტალი',
        en: 'Joinery detail of walnut panel and brushed brass hinge',
        ru: 'Деталь столярного соединения из ореха и латунной петли',
      },
    ],
    imageAlt: {
      ka: 'ბრინჯაოს მინის კარადა შიდა განათებით',
      en: 'Wardrobe Savane with bronze glass doors and warm interior light',
      ru: 'Шкаф Саване с тонированным стеклом и внутренней подсветкой',
    },
    tag: {
      ka: 'ახალი მოდელი',
      en: 'New',
      ru: 'Новинка',
    },
    tagTone: 'new',
    specLine: {
      ka: '220 × 240 × 60 · ბრინჯაოს მინა',
      en: '220 × 240 × 60 · Bronze glass',
      ru: '220 × 240 × 60 · Бронзовое стекло',
    },
    shortDescription: {
      ka: 'დაბურული მინა და თბილი განათება შიგნიდან.',
      en: 'Warm shelving glows softly behind bronze glass.',
      ru: 'Тёплая подсветка полок за бронзовым стеклом.',
    },
    materialNote: {
      ka: 'ბრინჯაოს მინა, კაკალი, თბილი განათება',
      en: 'Bronze glass, walnut, warm lighting',
      ru: 'Бронзовое стекло, орех, тёплая подсветка',
    },
    featured: true,
    newArrival: true,
  },
  {
    id: 'kitchen-line',
    code: 'SKH-KT-01',
    category: 'kitchens',
    name: {
      ka: 'სამზარეულო „ლაინი“',
      en: 'Kitchen Line',
      ru: 'Кухня «Лайн»',
    },
    dimensions: '300 × 220 × 60',
    priceGel: 3400,
    isStartingPrice: true,
    image: SITE_MEDIA.catalogKitchenLine,
    gallery: [
      SITE_MEDIA.catalogKitchenLine,
      SITE_MEDIA.heroKitchen,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'მინიმალისტური სამზარეულო ლაინი ქვის ზედაპირით და მქრქალი ფასადით',
        en: 'Minimalist custom kitchen Line in matte graphite and oak with stone worktop',
        ru: 'Минималистичная кухня Лайн в графите и дубе с каменной столешницей',
      },
      {
        ka: 'სამზარეულოს კუნძული და ჩაშენებული კარადები თანამედროვე ინტერიერში',
        en: 'Dark minimalist kitchen island and full-height cabinets',
        ru: 'Кухонный остров с каменной столешницей и высокими шкафами',
      },
      {
        ka: 'მუქი ხის ფასადისა და თითბრის დეტალის ახლო კადრი',
        en: 'Close-up of cabinet timber grain and brushed brass pull',
        ru: 'Крупный план фактуры дерева и латунной фурнитуры кухни',
      },
    ],
    imageAlt: {
      ka: 'მინიმალისტური სამზარეულო ლაინი ქვის ზედაპირით',
      en: 'Minimalist custom kitchen Line in matte graphite and oak',
      ru: 'Минималистичная кухня Лайн в графите и дубе',
    },
    tag: {
      ka: 'ზომების მორგება',
      en: 'Custom sizes',
      ru: 'По вашим размерам',
    },
    tagTone: 'made-to-order',
    specLine: {
      ka: '300 × 220 × 60 · ქვის ზედაპირი',
      en: '300 × 220 × 60 · Stone worktop',
      ru: '300 × 220 × 60 · Каменная столешница',
    },
    shortDescription: {
      ka: 'მქრქალი ფასადები და გამძლე ქვის ზედაპირი.',
      en: 'Matte fronts paired with a solid stone worktop.',
      ru: 'Матовые фасады и каменная столешница.',
    },
    materialNote: {
      ka: 'მქრქალი ფასადი, მუხა, ქვის ზედაპირი',
      en: 'Matte fronts, natural oak, stone worktop',
      ru: 'Матовые фасады, дуб, каменная столешница',
    },
    featured: true,
    newArrival: false,
  },
  {
    id: 'bathroom-vanity-60-40',
    code: 'SKH-BT-01',
    category: 'bathroom',
    name: {
      ka: 'აბაზანის კომოდი 60/40',
      en: 'Bathroom vanity 60/40',
      ru: 'Тумба для ванной 60/40',
    },
    dimensions: '60 × 40 × 52',
    priceGel: 440,
    isStartingPrice: false,
    image: SITE_MEDIA.catalogVanityCompact,
    gallery: [
      SITE_MEDIA.catalogVanityCompact,
      SITE_MEDIA.heroBathroom,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'კაკლის აბაზანის კომოდი 60/40 კერამიკული ნიჟარით',
        en: 'Wall-mounted fluted walnut bathroom vanity 60/40 with ceramic basin',
        ru: 'Подвесная тумба для ванной из ореха 60/40 с керамической раковиной',
      },
      {
        ka: 'აბაზანის ინტერიერი კაკლის კომოდითა და თბილი განათების სარკით',
        en: 'Bathroom interior pairing fluted walnut vanity with backlit mirror',
        ru: 'Интерьер ванной комнаты с ореховой тумбой и зеркалом с подсветкой',
      },
      {
        ka: 'ხის კარის წიბოსა და თითბრის დეტალის ახლო კადრი',
        en: 'Close-up of solid walnut joinery and brushed brass edge detail',
        ru: 'Крупный план стыка ореховой панели и латунной детали',
      },
    ],
    imageAlt: {
      ka: 'კაკლის აბაზანის კომოდი 60/40 ნიჟარით',
      en: 'Wall-mounted fluted walnut bathroom vanity 60/40 with basin',
      ru: 'Подвесная тумба из ореха 60/40 с раковиной',
    },
    tag: {
      ka: 'პოპულარული',
      en: 'Bestseller',
      ru: 'Хит продаж',
    },
    tagTone: 'ready',
    specLine: {
      ka: '60 × 40 × 52 · კაკალი, ნიჟარა',
      en: '60 × 40 × 52 · Walnut, ceramic basin',
      ru: '60 × 40 × 52 · Орех, раковина',
    },
    shortDescription: {
      ka: 'კომპაქტური კაკლის კომოდი კერამიკული ნიჟარით.',
      en: 'Compact walnut vanity with integrated ceramic basin.',
      ru: 'Компактная тумба из ореха с керамической раковиной.',
    },
    materialNote: {
      ka: 'კაკალი, კერამიკული ნიჟარა',
      en: 'Fluted walnut, ceramic basin',
      ru: 'Рельефный орех, керамическая раковина',
    },
    featured: true,
    newArrival: true,
  },
  {
    id: 'bathroom-vanity-mono',
    code: 'SKH-BT-02',
    category: 'bathroom',
    name: {
      ka: 'აბაზანის კომოდი „მონო“',
      en: 'Bathroom vanity Mono',
      ru: 'Тумба для ванной «Моно»',
    },
    dimensions: '80 × 45 × 50',
    priceGel: 620,
    isStartingPrice: true,
    image: SITE_MEDIA.catalogVanityMono,
    gallery: [
      SITE_MEDIA.catalogVanityMono,
      SITE_MEDIA.heroBathroom,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'მონო 80 სმ დასაკიდი აბაზანის კომოდი ქვის ზედაპირით',
        en: 'Floating bathroom vanity Mono 80cm with natural stone top',
        ru: 'Подвесная тумба Моно 80 см со столешницей из натурального камня',
      },
      {
        ka: 'აბაზანის კაკლის ავეჯი და თბილი განათების LED სარკე',
        en: 'Walnut bathroom cabinetry with warm backlit LED mirror',
        ru: 'Ореховая мебель для ванной в сочетании с LED-зеркалом',
      },
      {
        ka: 'კაკლის ფასადისა და თითბრის სახელურის დეტალი',
        en: 'Detail view of walnut drawer joinery and brass hardware',
        ru: 'Деталь ящика из ореха и латунной фурнитуры',
      },
    ],
    imageAlt: {
      ka: 'მონო 80 სმ დასაკიდი აბაზანის კომოდი ქვის ზედაპირით',
      en: 'Floating bathroom vanity Mono 80cm with stone top',
      ru: 'Подвесная тумба Моно 80 см со столешницей из камня',
    },
    tag: {
      ka: 'მზადდება შეკვეთით',
      en: 'Made to order',
      ru: 'Под заказ',
    },
    tagTone: 'made-to-order',
    specLine: {
      ka: '80 × 45 × 50 · ქვის ზედაპირი',
      en: '80 × 45 × 50 · Stone top',
      ru: '80 × 45 × 50 · Каменный топ',
    },
    shortDescription: {
      ka: 'კედელზე დაკიდული კომოდი ქვის ზედაპირით.',
      en: 'Wall-hung vanity topped with natural stone.',
      ru: 'Подвесная тумба со столешницей из камня.',
    },
    materialNote: {
      ka: 'კაკლის უჯრა, ქვის ზედაპირი',
      en: 'Walnut drawer, natural stone top',
      ru: 'Ящик из ореха, каменная столешница',
    },
    featured: true,
    newArrival: true,
  },
  {
    id: 'mirror-halo',
    code: 'SKH-BT-03',
    category: 'bathroom',
    name: {
      ka: 'LED სარკე „ჰალო“',
      en: 'LED Mirror Halo',
      ru: 'LED-зеркало «Хало»',
    },
    dimensions: '80 × 100',
    priceGel: 280,
    isStartingPrice: true,
    image: SITE_MEDIA.catalogMirrorHalo,
    gallery: [
      SITE_MEDIA.catalogMirrorHalo,
      SITE_MEDIA.heroBathroom,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'უჩარჩო LED სარკე ჰალო თბილი განათებით ქვის კედელზე',
        en: 'Frameless LED mirror Halo with warm backlight on stone wall',
        ru: 'Безрамочное LED-зеркало Хало с тёплой подсветкой на каменной стене',
      },
      {
        ka: 'LED სარკე აბაზანის კაკლის კომოდის თავზე',
        en: 'Warm backlit LED mirror installed above a walnut bathroom vanity',
        ru: 'LED-зеркало над подвесной ореховой тумбой в ванной',
      },
      {
        ka: 'ინტერიერის ხისა და თითბრის ფაქტურის ახლო კადრი',
        en: 'Detail of dark timber finish and brushed brass accent',
        ru: 'Крупный план фактуры тёмного дерева и латунного акцента',
      },
    ],
    imageAlt: {
      ka: 'უჩარჩო LED სარკე ჰალო თბილი განათებით',
      en: 'Frameless LED mirror Halo with warm backlight',
      ru: 'Безрамочное зеркало Хало с тёплой подсветкой',
    },
    tag: {
      ka: 'სტუდიური სერია',
      en: 'Studio edition',
      ru: 'Серия студии',
    },
    tagTone: 'ready',
    specLine: {
      ka: '80 × 100 · თბილი განათება',
      en: '80 × 100 · Warm backlight',
      ru: '80 × 100 · Тёплая подсветка',
    },
    shortDescription: {
      ka: 'უჩარჩო სარკე რბილი, თბილი განათებით.',
      en: 'Frameless mirror with soft warm backlighting.',
      ru: 'Безрамочное зеркало с мягкой тёплой подсветкой.',
    },
    materialNote: {
      ka: 'სუფთა მინა, თბილი LED განათება',
      en: 'Clear silver glass, warm LED light',
      ru: 'Зеркальное полотно, тёплый LED',
    },
    featured: true,
    newArrival: true,
  },
  // PLACEHOLDER: replace with client's real model
  {
    id: 'lighting-sena',
    code: 'SKH-LT-01',
    category: 'lighting',
    name: {
      ka: 'ტორშერი „სენა“',
      en: 'Floor Lamp Sena',
      ru: 'Торшер «Сена»',
    },
    dimensions: '',
    priceGel: null,
    isStartingPrice: false,
    image: SITE_MEDIA.catalogLampSena,
    gallery: [
      SITE_MEDIA.catalogLampSena,
      SITE_MEDIA.catalogLampLuma,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'მუქი მუხისა და თითბრის ტორშერი სენა თბილი განათებით მისაღებ ოთახში',
        en: 'Dark oak and brushed brass floor lamp Sena with warm glow in living room',
        ru: 'Торшер Сена из тёмного дуба и латуни с тёплым светом в гостиной',
      },
      {
        ka: 'თითბრისა და მქრქალი მინის სანათი ხის კომოდზე თბილი განათებით',
        en: 'Brushed brass and matte glass lamp casting warm ambient light on walnut console',
        ru: 'Светильник из матовой латуни и стекла на ореховой консоли',
      },
      {
        ka: 'მუქი ხისა და თითბრის ზედაპირის ახლო ფაქტურა',
        en: 'Close-up texture of dark timber and brushed brass finish',
        ru: 'Крупный план фактуры тёмного дерева и матовой латуни',
      },
    ],
    imageAlt: {
      ka: 'მუქი მუხისა და თითბრის ტორშერი სენა თბილი შუქით',
      en: 'Floor Lamp Sena in dark oak and brushed brass with warm light',
      ru: 'Торшер Сена из тёмного дуба и матовой латуни с тёплым светом',
    },
    tag: {
      ka: 'ტორშერი',
      en: 'Floor lamp',
      ru: 'Торшер',
    },
    tagTone: 'made-to-order',
    specLine: {
      ka: 'მუქი მუხა · თითბერი · თბილი შუქი',
      en: 'Dark oak · Brushed brass · Warm light',
      ru: 'Тёмный дуб · Латунь · Тёплый свет',
    },
    shortDescription: {
      ka: 'მაღალი ხის ტორშერი რბილი თბილი განათებით.',
      en: 'Tall wooden floor lamp with warm diffused light.',
      ru: 'Высокий деревянный торшер с мягким тёплым светом.',
    },
    materialNote: {
      ka: 'მუქი მუხა, თითბერი, ქსოვილის აბაჟური',
      en: 'Dark oak, brushed brass, warm linen shade',
      ru: 'Тёмный дуб, матовая латунь, льняной абажур',
    },
    featured: false,
    newArrival: false,
  },
  // PLACEHOLDER: replace with client's real model
  {
    id: 'lighting-luma',
    code: 'SKH-LT-02',
    category: 'lighting',
    name: {
      ka: 'სანათი „ლუმა“',
      en: 'Ambient Lamp Luma',
      ru: 'Светильник «Лума»',
    },
    dimensions: '',
    priceGel: null,
    isStartingPrice: false,
    image: SITE_MEDIA.catalogLampLuma,
    gallery: [
      SITE_MEDIA.catalogLampLuma,
      SITE_MEDIA.catalogLampSena,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'თითბრისა და მქრქალი მინის სანათი ლუმა თბილი განათებით',
        en: 'Brushed brass and frosted glass lamp Luma casting warm ambient light',
        ru: 'Светильник Лума из матовой латуни и опалового стекла с тёплым светом',
      },
      {
        ka: 'მუქი მუხის ტორშერი თბილი შუქით მშვიდ ინტერიერში',
        en: 'Tall dark oak floor lamp in a calm neutral living space',
        ru: 'Высокий торшер из тёмного дуба в спокойном светлом интерьере',
      },
      {
        ka: 'ხისა და თითბრის დეტალის ახლო კადრი',
        en: 'Close-up of dark timber finish and brushed brass hardware',
        ru: 'Крупный план отделки дерева и матовой латуни',
      },
    ],
    imageAlt: {
      ka: 'თითბრისა და მქრქალი მინის სანათი ლუმა თბილი განათებით',
      en: 'Ambient Lamp Luma in brushed brass and frosted glass',
      ru: 'Светильник Лума из латуни и матового стекла',
    },
    tag: {
      ka: 'ავეჯის განათება',
      en: 'Ambient light',
      ru: 'Интерьерный свет',
    },
    tagTone: 'made-to-order',
    specLine: {
      ka: 'თითბერი · მქრქალი მინა · თბილი LED',
      en: 'Brushed brass · Frosted glass · Warm LED',
      ru: 'Матовая латунь · Стекло · Тёплый LED',
    },
    shortDescription: {
      ka: 'მინიმალისტური სანათი კომოდისა და ინტერიერის განათებისთვის.',
      en: 'Minimalist lamp for calm console and room lighting.',
      ru: 'Минималистичный светильник для мягкого света в интерьере.',
    },
    materialNote: {
      ka: 'მქრქალი თითბერი, ოპალის მინა, თბილი LED',
      en: 'Brushed brass, frosted opal glass, warm LED',
      ru: 'Матовая латунь, опаловое стекло, тёплый LED',
    },
    featured: false,
    newArrival: false,
  },
  // PLACEHOLDER: replace with client's real model
  {
    id: 'table-kura',
    code: 'SKH-TB-01',
    category: 'tables',
    name: {
      ka: 'სასადილო მაგიდა „კურა“',
      en: 'Dining Table Kura',
      ru: 'Обеденный стол «Кура»',
    },
    dimensions: '',
    priceGel: null,
    isStartingPrice: false,
    image: SITE_MEDIA.catalogTableKura,
    gallery: [
      SITE_MEDIA.catalogTableKura,
      SITE_MEDIA.catalogTableNori,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'მასიური კაკლის სასადილო მაგიდა კურა მინიმალისტურ სასადილო ოთახში',
        en: 'Solid walnut dining table Kura with architectural legs in sunlit dining room',
        ru: 'Обеденный стол Кура из массива ореха в светлой столовой',
      },
      {
        ka: 'დაბალი ყავის მაგიდა ქვის ზედაპირითა და მუქი მუხის ფეხებით',
        en: 'Low coffee table pairing honed stone top with dark oak base',
        ru: 'Низкий журнальный стол с каменной столешницей и дубовым основанием',
      },
      {
        ka: 'ხის კუთხური შეერთებისა და მქრქალი საფარის ახლო კადრი',
        en: 'Close-up of solid timber corner joinery and matte oil finish',
        ru: 'Крупный план столярного соединения и матового покрытия дерева',
      },
    ],
    imageAlt: {
      ka: 'მასიური კაკლის სასადილო მაგიდა კურა მქრქალი საფარით',
      en: 'Solid walnut Dining Table Kura with matte finish',
      ru: 'Обеденный стол Кура из массива ореха с матовым покрытием',
    },
    tag: {
      ka: 'სასადილო მაგიდა',
      en: 'Dining table',
      ru: 'Обеденный стол',
    },
    tagTone: 'made-to-order',
    specLine: {
      ka: 'მასიური კაკალი · მქრქალი ზეთის საფარი',
      en: 'Solid walnut · Matte oil finish',
      ru: 'Массив ореха · Матовое масло',
    },
    shortDescription: {
      ka: 'მასიური ხის სასადილო მაგიდა სუფთა პროპორციებით.',
      en: 'Solid walnut dining table with clean architectural proportions.',
      ru: 'Обеденный стол из массива с чистыми пропорциями.',
    },
    materialNote: {
      ka: 'მასიური კაკალი, მქრქალი ზეთის საფარი',
      en: 'Solid walnut, matte oil finish',
      ru: 'Массив ореха, матовое масляное покрытие',
    },
    featured: false,
    newArrival: false,
  },
  // PLACEHOLDER: replace with client's real model
  {
    id: 'table-nori',
    code: 'SKH-TB-02',
    category: 'tables',
    name: {
      ka: 'ყავის მაგიდა „ნორი“',
      en: 'Coffee Table Nori',
      ru: 'Журнальный стол «Нори»',
    },
    dimensions: '',
    priceGel: null,
    isStartingPrice: false,
    image: SITE_MEDIA.catalogTableNori,
    gallery: [
      SITE_MEDIA.catalogTableNori,
      SITE_MEDIA.catalogTableKura,
      SITE_MEDIA.aboutJoineryDetail,
    ],
    galleryAlts: [
      {
        ka: 'ყავის მაგიდა ნორი ბუნებრივი ქვის ზედაპირითა და მუქი მუხის კარკასით',
        en: 'Coffee table Nori with honed natural stone top and dark oak base',
        ru: 'Журнальный стол Нори со столешницей из натурального камня и дубовой базой',
      },
      {
        ka: 'მასიური კაკლის სასადილო მაგიდა სუფთა ფორმებით',
        en: 'Solid walnut dining table in a serene neutral dining room',
        ru: 'Обеденный стол из массива ореха в светлой столовой',
      },
      {
        ka: 'მუქი ხის შეერთებისა და მქრქალი ფაქტურის ახლო კადრი',
        en: 'Close-up of dark oak joinery and matte finish detail',
        ru: 'Крупный план соединения тёмного дуба и матовой фактуры',
      },
    ],
    imageAlt: {
      ka: 'ყავის მაგიდა ნორი ქვის ზედაპირითა და მუქი მუხის ფეხებით',
      en: 'Coffee Table Nori with honed stone top and dark oak base',
      ru: 'Журнальный стол Нори с каменной столешницей и основанием из дуба',
    },
    tag: {
      ka: 'ყავის მაგიდა',
      en: 'Coffee table',
      ru: 'Журнальный стол',
    },
    tagTone: 'made-to-order',
    specLine: {
      ka: 'მუქი მუხა · ბუნებრივი ქვის ზედაპირი',
      en: 'Dark oak · Natural stone top',
      ru: 'Тёмный дуб · Натуральный камень',
    },
    shortDescription: {
      ka: 'დაბალი ყავის მაგიდა ხისა და ქვის შეხამებით.',
      en: 'Low coffee table pairing dark oak and stone.',
      ru: 'Низкий журнальный стол из дуба и камня.',
    },
    materialNote: {
      ka: 'მუქი მუხის კარკასი, ბუნებრივი ქვის ზედაპირი',
      en: 'Dark oak base, honed natural stone top',
      ru: 'Основание из тёмного дуба, столешница из камня',
    },
    featured: false,
    newArrival: false,
  },
];

export const MADE_TO_ORDER_CATALOG_CARD = {
  image: SITE_MEDIA.twoPathCustomFitted,
  tag: {
    ka: 'შეკვეთით',
    en: 'Custom build',
    ru: 'Под размер',
  },
  title: {
    ka: 'დამზადება შეკვეთით',
    en: 'Made to measure',
    ru: 'Мебель по размерам',
  },
  specLine: {
    ka: 'თქვენი ოთახის ზომებით',
    en: 'Built to your room dimensions',
    ru: 'По размерам вашей комнаты',
  },
  priceLabel: {
    ka: '400 ₾ / მ²-დან',
    en: 'from 400 ₾ / m²',
    ru: 'от 400 ₾ / м²',
  },
  alt: {
    ka: 'ჩაშენებული კარადები კაკლისა და მუხის ფაქტურით',
    en: 'Custom built-in walnut and matte oak cabinetry',
    ru: 'Встроенные шкафы на заказ из ореха и дуба',
  },
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: {
      ka: 'ზომები',
      en: 'Measurements',
      ru: 'Замеры',
    },
    description: {
      ka: 'ვზომავთ სივრცეს და ვარჩევთ მასალას.',
      en: 'We measure your space and pick finishes.',
      ru: 'Снимаем размеры и подбираем материалы.',
    },
  },
  {
    stepNumber: '02',
    title: {
      ka: '3D ნახაზი',
      en: '3D layout',
      ru: '3D-проект',
    },
    description: {
      ka: 'გაჩვენებთ ვიზუალს და ვათანხმებთ ფასს.',
      en: 'We share the layout and confirm pricing.',
      ru: 'Показываем проект и согласуем цену.',
    },
  },
  {
    stepNumber: '03',
    title: {
      ka: 'დამზადება',
      en: 'Production',
      ru: 'Производство',
    },
    description: {
      ka: 'ვამზადებთ ჩვენს საწარმოში თბილისში.',
      en: 'Built locally in our Tbilisi shop.',
      ru: 'Изготавливаем в нашем цеху в Тбилиси.',
    },
  },
  {
    stepNumber: '04',
    title: {
      ka: 'მონტაჟი',
      en: 'Installation',
      ru: 'Монтаж',
    },
    description: {
      ka: 'ჩავიტანთ და ადგილზე ავაწყობთ.',
      en: 'Delivered and fitted cleanly on site.',
      ru: 'Привозим и аккуратно устанавливаем.',
    },
  },
];

export const GALLERY_CATEGORIES: Array<{
  id: GalleryCategory;
  label: LocalizedText;
}> = [
  {
    id: 'wardrobes',
    label: { ka: 'კარადები', en: 'Wardrobes', ru: 'Шкафы' },
  },
  {
    id: 'kitchens',
    label: { ka: 'სამზარეულოები', en: 'Kitchens', ru: 'Кухни' },
  },
  {
    id: 'bathroom',
    label: { ka: 'აბაზანა', en: 'Bathroom', ru: 'Ванная' },
  },
];

export const UI_COPY = {
  nav: {
    home: { ka: 'მთავარი', en: 'Home', ru: 'Главная' },
    catalog: { ka: 'კატალოგი', en: 'Catalog', ru: 'Каталог' },
    customOrder: {
      ka: 'ინდივიდუალური შეკვეთა',
      en: 'Custom Order',
      ru: 'На заказ',
    },
    payment: { ka: 'გადახდა', en: 'Payment', ru: 'Оплата' },
    delivery: { ka: 'მიწოდება', en: 'Delivery', ru: 'Доставка' },
    contact: { ka: 'კონტაქტი', en: 'Contact', ru: 'Контакты' },
  },
  header: {
    callLabel: {
      ka: 'დაგვირეკეთ',
      en: 'Call us',
      ru: 'Позвонить',
    },
    cityTag: {
      ka: 'თბილისი',
      en: 'Tbilisi',
      ru: 'Тбилиси',
    },
  },
  storefront: {
    categoriesLabel: { ka: 'კატეგორიები', en: 'Categories', ru: 'Категории' },
    searchPlaceholder: {
      ka: 'ძებნა...',
      en: 'Search...',
      ru: 'Поиск...',
    },
    searchEmpty: {
      ka: 'ვერ მოიძებნა',
      en: 'Nothing found',
      ru: 'Ничего не найдено',
    },
    featuredEyebrow: {
      ka: 'გამორჩეული',
      en: 'Collection',
      ru: 'Коллекция',
    },
    featuredTitle: {
      ka: 'მოდელები',
      en: 'Selected Pieces',
      ru: 'Модели',
    },
    newArrivalsEyebrow: {
      ka: 'ახალი',
      en: 'New',
      ru: 'Новое',
    },
    newArrivalsTitle: {
      ka: 'ახალი ნამუშევრები',
      en: 'New Arrivals',
      ru: 'Новые поступления',
    },
    viewFullCatalog: {
      ka: 'სრული კატალოგი',
      en: 'All models',
      ru: 'Весь каталог',
    },
    customMetaLabel: {
      ka: 'შეკვეთით',
      en: 'Custom',
      ru: 'На заказ',
    },
    productCodeLabel: {
      ka: 'კოდი',
      en: 'Code',
      ru: 'Код',
    },
    specMaterialsLabel: {
      ka: 'მასალა',
      en: 'Material',
      ru: 'Материал',
    },
    specDimensionsLabel: {
      ka: 'ზომები',
      en: 'Size',
      ru: 'Размеры',
    },
    specCategoryLabel: {
      ka: 'ჯგუფი',
      en: 'Category',
      ru: 'Раздел',
    },
    specInstallLabel: {
      ka: 'მიწოდება',
      en: 'Delivery',
      ru: 'Доставка',
    },
    specInstallValue: {
      ka: 'თბილისი და რეგიონები',
      en: 'Tbilisi & all regions',
      ru: 'Тбилиси и регионы',
    },
    productTabs: {
      description: { ka: 'აღწერა', en: 'Overview', ru: 'Обзор' },
      payment: { ka: 'გადახდა', en: 'Payment', ru: 'Оплата' },
      delivery: { ka: 'მიწოდება', en: 'Delivery', ru: 'Доставка' },
    },
    backToCatalog: {
      ka: 'კატალოგში დაბრუნება',
      en: 'Back to catalog',
      ru: 'Назад в каталог',
    },
  },
  hero: {
    highlights: [
      { ka: 'ზუსტი ზომები', en: 'Made to fit', ru: 'Точные размеры' },
      { ka: 'მზა მოდელები', en: 'Ready stock', ru: 'В наличии' },
      { ka: 'მონტაჟი', en: 'Fitting', ru: 'Монтаж' },
    ],
    ctaPrimary: {
      ka: 'შეკვეთით დამზადება',
      en: 'Order custom',
      ru: 'Заказать по размерам',
    },
  },
  catalog: {
    eyebrow: {
      ka: 'კატალოგი',
      en: 'Catalog',
      ru: 'Каталог',
    },
    title: {
      ka: 'კატალოგი',
      en: 'Catalog',
      ru: 'Каталог',
    },
    endCta: {
      ka: 'უფასო კონსულტაცია',
      en: 'Free consultation',
      ru: 'Бесплатная консультация',
    },
    endCtaHint: {
      ka: 'ზომების ან ფერის შესაცვლელად დაგვირეკეთ.',
      en: 'Call us to adjust sizes or finishes.',
      ru: 'Позвоните, чтобы изменить размер или цвет.',
    },
    callIconAriaPrefix: {
      ka: 'დარეკვა',
      en: 'Call about',
      ru: 'Позвонить по',
    },
  },
  productPage: {
    primaryCta: {
      ka: 'შეკვეთაში დამატება',
      en: 'Add to order',
      ru: 'Добавить в заказ',
    },
    secondaryCta: {
      ka: 'დარეკვა მოდელზე',
      en: 'Call about this piece',
      ru: 'Позвонить по модели',
    },
  },
  orderBag: {
    buttonLabel: {
      ka: 'შეკვეთა',
      en: 'Order',
      ru: 'Заказ',
    },
    title: {
      ka: 'შეკვეთა',
      en: 'Your order',
      ru: 'Ваш заказ',
    },
    emptyTitle: {
      ka: 'შეკვეთა ცარიელია',
      en: 'Your order is empty',
      ru: 'Заказ пуст',
    },
    emptyAction: {
      ka: 'კატალოგში გადასვლა',
      en: 'Browse models',
      ru: 'Перейти к моделям',
    },
    openOrderLabel: {
      ka: 'შეკვეთის ნახვა',
      en: 'Open order',
      ru: 'Открыть заказ',
    },
    notePlaceholder: {
      ka: 'ქალაქი ან შენიშვნა (არასავალდებულო)',
      en: 'City or note (optional)',
      ru: 'Город или комментарий (необязательно)',
    },
    totalLabel: {
      ka: 'ჯამი',
      en: 'Total',
      ru: 'Итого',
    },
    sendWhatsApp: {
      ka: 'WhatsApp-ში გაგზავნა',
      en: 'Send via WhatsApp',
      ru: 'Отправить в WhatsApp',
    },
    clearAll: {
      ka: 'გასუფთავება',
      en: 'Clear',
      ru: 'Очистить',
    },
    addAriaPrefix: {
      ka: 'შეკვეთაში დამატება',
      en: 'Add to order',
      ru: 'Добавить в заказ',
    },
  },
  customOrder: {
    pageEyebrow: {
      ka: 'ინდივიდუალური ავეჯი',
      en: 'Bespoke',
      ru: 'По размерам',
    },
    eyebrow: {
      ka: '4 ეტაპი',
      en: '4 Steps',
      ru: '4 этапа',
    },
    title: {
      ka: 'როგორ ვმუშაობთ',
      en: 'How it works',
      ru: 'Как мы работаем',
    },
    rateNote: {
      ka: '400\u00A0₾/მ²-დან',
      en: 'From 400\u00A0₾/m²',
      ru: 'От 400\u00A0₾/м²',
    },
    cta: {
      ka: 'გაგზავნა WhatsApp-ში',
      en: 'Start on WhatsApp',
      ru: 'Начать в WhatsApp',
    },
  },
  gallery: {
    eyebrow: {
      ka: 'არქივი',
      en: 'Portfolio',
      ru: 'Портфолио',
    },
    title: {
      ka: 'შესრულებული ნამუშევრები',
      en: 'Selected Interiors',
      ru: 'Реализованные объекты',
    },
    comingSoon: {
      ka: 'მალე დაემატება',
      en: 'Coming soon',
      ru: 'Скоро появится',
    },
  },
  about: {
    eyebrow: {
      ka: 'ჩვენ შესახებ',
      en: 'About',
      ru: 'О нас',
    },
    title: {
      ka: 'დამზადებულია თბილისში',
      en: 'Made in Tbilisi',
      ru: 'Сделано в Тбилиси',
    },
    lines: {
      ka: [
        'ვამზადებთ კარადებს, სამზარეულოებსა და აბაზანის ავეჯს.',
        'ნახაზიდან აწყობამდე მთელ პროცესს ჩვენი გუნდი აკეთებს.',
      ],
      en: [
        'We build wardrobes, kitchens, and bathroom cabinetry.',
        'One team handles everything from measurement to installation.',
      ],
      ru: [
        'Делаем шкафы, кухни и мебель для ванной.',
        'Одна команда ведёт заказ от замера до монтажа.',
      ],
    },
  },
  payment: {
    eyebrow: {
      ka: 'ანგარიშსწორება',
      en: 'Payment',
      ru: 'Оплата',
    },
    title: {
      ka: 'გადახდის პირობები',
      en: 'Payment',
      ru: 'Условия оплаты',
    },
    methods: {
      ka: [
        'ნაღდი ანგარიშსწორება მიღებისას.',
        'საბანკო გადარიცხვა ინვოისით.',
      ],
      en: [
        'Cash on delivery or in person.',
        'Bank transfer by invoice.',
      ],
      ru: [
        'Наличными при получении.',
        'Банковский перевод по счёту.',
      ],
    },
  },
  delivery: {
    eyebrow: {
      ka: 'ლოგისტიკა',
      en: 'Delivery',
      ru: 'Доставка',
    },
    title: {
      ka: 'მიწოდება და მონტაჟი',
      en: 'Delivery & fitting',
      ru: 'Доставка и монтаж',
    },
    lines: {
      ka: [
        'მიწოდება თბილისსა და რეგიონებში.',
        'აწყობა და მონტაჟი ჩვენი გუნდით.',
      ],
      en: [
        'Delivery across Tbilisi and all regions.',
        'On-site assembly by our own team.',
      ],
      ru: [
        'Доставка по Тбилиси и регионам.',
        'Сборка и установка нашей бригадой.',
      ],
    },
  },
  contact: {
    eyebrow: {
      ka: 'თბილისი',
      en: 'Tbilisi',
      ru: 'Тбилиси',
    },
    title: {
      ka: 'ნატო გიორგაძის ქ. 16',
      en: 'Nato Giorgadze St 16',
      ru: 'ул. Нато Гиоргадзе 16',
    },
    addressLabel: { ka: 'მისამართი', en: 'Address', ru: 'Адрес' },
    phoneLabel: {
      ka: 'ტელეფონი',
      en: 'Phone',
      ru: 'Телефон',
    },
    socialsLabel: {
      ka: 'სოციალური ქსელები',
      en: 'Social',
      ru: 'Соцсети',
    },
    inquiryTitle: {
      ka: 'ზომები გაქვთ?',
      en: 'Have measurements?',
      ru: 'Есть размеры?',
    },
    inquirySubtitle: {
      ka: 'დაგვირეკეთ ან გაგვიზიარეთ ზომები.',
      en: 'Call or share your dimensions.',
      ru: 'Позвоните или пришлите размеры.',
    },
    callButton: {
      ka: 'დარეკვა',
      en: 'Call',
      ru: 'Звонок',
    },
    whatsappButton: {
      ka: 'WhatsApp',
      en: 'WhatsApp',
      ru: 'WhatsApp',
    },
    openInGoogleMaps: {
      ka: 'Google Maps',
      en: 'Google Maps',
      ru: 'Google Карты',
    },
  },
  notFound: {
    eyebrow: { ka: 'შეცდომა 404', en: 'Error 404', ru: 'Ошибка 404' },
    title: {
      ka: 'გვერდი ვერ მოიძებნა',
      en: 'Page not found',
      ru: 'Страница не найдена',
    },
    description: {
      ka: 'მოთხოვნილი მისამართი არ არსებობს ან გადატანილია. გადადით მთავარ გვერდზე ან დაათვალიერეთ კატალოგი.',
      en: 'The page you are looking for does not exist or has moved. Return to the homepage or explore our furniture catalog.',
      ru: 'Запрошенная страница не найдена или была перемещена. Перейдите на главную страницу или откройте каталог мебели.',
    },
    homeCta: {
      ka: 'მთავარ გვერდზე დაბრუნება',
      en: 'Return to homepage',
      ru: 'На главную страницу',
    },
    catalogCta: {
      ka: 'ავეჯის კატალოგი',
      en: 'Explore furniture catalog',
      ru: 'Перейти в каталог',
    },
  },
  footer: {
    description: {
      ka: 'ავეჯი თბილისში — მზა მოდელები და ინდივიდუალური ავეჯი შეკვეთით.',
      en: 'Furniture in Tbilisi — ready-made models and custom furniture made to order.',
      ru: 'Мебель в Тбилиси — готовые модели и индивидуальная мебель на заказ.',
    },
    navHeading: { ka: 'ნავიგაცია', en: 'Navigation', ru: 'Навигация' },
    categoriesHeading: { ka: 'კოლექცია', en: 'Collection', ru: 'Коллекция' },
    contactHeading: { ka: 'კონტაქტი', en: 'Contact', ru: 'Контакты' },
    bottomNote: {
      ka: 'თბილისი',
      en: 'Tbilisi',
      ru: 'Тбилиси',
    },
  },
};

export function pickText(text: LocalizedText, lang: Language): string {
  return text[lang];
}
