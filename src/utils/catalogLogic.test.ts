import test from 'node:test';
import assert from 'node:assert/strict';
import module from 'node:module';
import {
  addOrderBagItem,
  buildCustomOrderWhatsAppHref,
  buildLocalizedPath,
  buildOrderBagWhatsAppHref,
  buildTelHref,
  buildWhatsAppHref,
  detectHorizontalSwipe,
  filterCatalogByCategory,
  formatCategoryCount,
  formatCustomRateParts,
  formatPriceDisplay,
  formatPriceParts,
  getActiveCarouselIndex,
  getEyebrowClass,
  getFeaturedItems,
  getGallerySlots,
  getLocalizedWordmark,
  getLowestCatalogPrice,
  getNewArrivalItems,
  getNextHeroIndex,
  getOrderBagCount,
  getOrderBagTotal,
  getOrderItemQuantity,
  getPrevHeroIndex,
  parsePathname,
  parseStoredLanguage,
  parseStoredOrderBag,
  removeOrderBagItem,
  resolveActiveNavForRoute,
  searchCatalogItems,
  shouldShowHeaderSearch,
  updateOrderBagQuantity,
} from './catalogLogic';
import type { CatalogItem, Language } from '../types/site';

if (typeof (module as { registerHooks?: unknown }).registerHooks === 'function') {
  (module as unknown as {
    registerHooks: (hooks: {
      load: (url: string, context: unknown, nextLoad: (u: string, c: unknown) => unknown) => unknown;
    }) => void;
  }).registerHooks({
    load(url, context, nextLoad) {
      if (/\.(jpg|jpeg|png|webp|avif)$/i.test(url)) {
        return {
          format: 'module',
          shortCircuit: true,
          source: `export default ${JSON.stringify(url)};`,
        };
      }
      return nextLoad(url, context);
    },
  });
}

const SAMPLE_ITEMS: CatalogItem[] = [
  {
    id: 'w1',
    code: 'SKH-WB-01',
    category: 'wardrobes',
    name: { ka: 'კარადა „ორბი“', en: 'Wardrobe Orbi', ru: 'Шкаф «Орби»' },
    dimensions: '180 × 240 × 60',
    priceGel: 1650,
    isStartingPrice: true,
    image: 'w1.jpg',
    gallery: ['w1.jpg'],
    imageAlt: { ka: 'ორბი', en: 'Orbi', ru: 'Орби' },
    galleryAlts: [{ ka: 'ორბი', en: 'Orbi', ru: 'Орби' }],
    tag: { ka: 'მზადაა გასაგზავნად', en: 'Ready to ship', ru: 'Готов к отправке' },
    tagTone: 'ready',
    specLine: { ka: '180 × 240 × 60 · მუხა', en: '180 × 240 × 60 · Oak', ru: '180 × 240 × 60 · Дуб' },
    shortDescription: { ka: 'მოკლე აღწერა', en: 'Short note', ru: 'Кратко о модели' },
    materialNote: { ka: 'მუხა', en: 'Oak', ru: 'Дуб' },
    featured: true,
    newArrival: false,
  },
  {
    id: 'b1',
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
    image: 'b1.jpg',
    gallery: ['b1.jpg'],
    imageAlt: {
      ka: 'აბაზანის კომოდი',
      en: 'Bathroom vanity',
      ru: 'Тумба для ванной',
    },
    galleryAlts: [
      {
        ka: 'აბაზანის კომოდი',
        en: 'Bathroom vanity',
        ru: 'Тумба для ванной',
      },
    ],
    tag: { ka: 'პოპულარული', en: 'Bestseller', ru: 'Хит продаж' },
    tagTone: 'ready',
    specLine: { ka: '60 × 40 × 52 · კაკალი', en: '60 × 40 × 52 · Walnut', ru: '60 × 40 × 52 · Орех' },
    shortDescription: { ka: 'მოკლე აღწერა ორი', en: 'Compact note', ru: 'Кратко о тумбе' },
    materialNote: { ka: 'კაკალი', en: 'Walnut', ru: 'Орех' },
    featured: true,
    newArrival: true,
  },
  {
    id: 'm1',
    code: 'SKH-BT-03',
    category: 'bathroom',
    name: { ka: 'LED სარკე „ჰალო“', en: 'LED Mirror Halo', ru: 'LED-зеркало «Хало»' },
    dimensions: '80 × 100',
    priceGel: 280,
    isStartingPrice: true,
    image: 'm1.jpg',
    gallery: ['m1.jpg'],
    imageAlt: { ka: 'ჰალო', en: 'Halo', ru: 'Хало' },
    galleryAlts: [{ ka: 'ჰალო', en: 'Halo', ru: 'Хало' }],
    tag: { ka: 'სტუდიური სერია', en: 'Studio edition', ru: 'Серия студии' },
    tagTone: 'ready',
    specLine: { ka: '80 × 100 · მინა', en: '80 × 100 · Glass', ru: '80 × 100 · Стекло' },
    shortDescription: { ka: 'უჩარჩო სარკე', en: 'Halo mirror note', ru: 'О зеркале' },
    materialNote: { ka: 'მინა', en: 'Glass', ru: 'Стекло' },
    featured: false,
    newArrival: true,
  },
  {
    id: 'l1',
    code: 'SKH-LT-01',
    category: 'lighting',
    name: { ka: 'ტორშერი „სენა“', en: 'Floor Lamp Sena', ru: 'Торшер «Сена»' },
    dimensions: '',
    priceGel: null,
    isStartingPrice: false,
    image: 'l1.jpg',
    gallery: ['l1.jpg'],
    imageAlt: { ka: 'სენა', en: 'Sena', ru: 'Сена' },
    galleryAlts: [{ ka: 'სენა', en: 'Sena', ru: 'Сена' }],
    tag: { ka: 'ტორშერი', en: 'Floor lamp', ru: 'Торшер' },
    tagTone: 'made-to-order',
    specLine: { ka: 'მუქი მუხა · თბილი შუქი', en: 'Dark oak · Warm light', ru: 'Тёмный дуб · Тёплый свет' },
    shortDescription: { ka: 'მაღალი ტორშერი', en: 'Tall floor lamp', ru: 'Высокий торшер' },
    materialNote: { ka: 'მუქი მუხა', en: 'Dark oak', ru: 'Тёмный дуб' },
    featured: false,
    newArrival: false,
  },
];

test('filterCatalogByCategory filters strictly to selected tab with no All fallback', () => {
  const bathroom = filterCatalogByCategory(SAMPLE_ITEMS, 'bathroom');
  assert.equal(bathroom.length, 2);
  assert.deepEqual(
    bathroom.map((i) => i.id),
    ['b1', 'm1'],
  );

  const lighting = filterCatalogByCategory(SAMPLE_ITEMS, 'lighting');
  assert.equal(lighting.length, 1);
  assert.equal(lighting[0].id, 'l1');

  const kitchens = filterCatalogByCategory(SAMPLE_ITEMS, 'kitchens');
  assert.equal(kitchens.length, 0);
});

test('searchCatalogItems matches titles across KA/EN/RU and product codes', () => {
  assert.equal(searchCatalogItems(SAMPLE_ITEMS, '').length, 0);
  assert.equal(searchCatalogItems(SAMPLE_ITEMS, '   ').length, 0);
  assert.equal(searchCatalogItems(SAMPLE_ITEMS, 'vanity')[0].id, 'b1');
  assert.equal(searchCatalogItems(SAMPLE_ITEMS, 'ორბი')[0].id, 'w1');
  assert.equal(searchCatalogItems(SAMPLE_ITEMS, 'хало')[0].id, 'm1');
  assert.equal(searchCatalogItems(SAMPLE_ITEMS, 'SKH-BT-01')[0].id, 'b1');
});

test('getFeaturedItems, getNewArrivalItems, and getLowestCatalogPrice return expected results', () => {
  assert.deepEqual(
    getFeaturedItems(SAMPLE_ITEMS).map((i) => i.id),
    ['w1', 'b1'],
  );
  assert.deepEqual(
    getNewArrivalItems(SAMPLE_ITEMS).map((i) => i.id),
    ['b1', 'm1'],
  );
  assert.equal(getLowestCatalogPrice(SAMPLE_ITEMS), 280);
});

test('formatPriceParts and formatPriceDisplay separate amount from qualifier cleanly with thin space', () => {
  assert.deepEqual(
    formatPriceParts({ priceGel: 440, isStartingPrice: false }, 'ka'),
    { amount: '440\u00A0₾' },
  );
  assert.deepEqual(
    formatPriceParts({ priceGel: 1650, isStartingPrice: true }, 'ka'),
    { amount: '1\u202F650\u00A0₾', suffix: '-დან' },
  );
  assert.deepEqual(
    formatPriceParts({ priceGel: 1650, isStartingPrice: true }, 'en'),
    { prefix: 'from ', amount: '1\u202F650\u00A0₾' },
  );
  assert.deepEqual(
    formatPriceParts({ priceGel: 1650, isStartingPrice: true }, 'ru'),
    { prefix: 'от ', amount: '1\u202F650\u00A0₾' },
  );
  assert.equal(
    formatPriceDisplay({ priceGel: 1650, isStartingPrice: true }, 'ka'),
    '1\u202F650\u00A0₾-დან',
  );
  assert.deepEqual(
    formatPriceParts({ priceGel: null, isStartingPrice: false }, 'ka'),
    { amount: 'ფასი შეთანხმებით', isTextOnly: true },
  );
  assert.deepEqual(
    formatPriceParts({ priceGel: null, isStartingPrice: false }, 'en'),
    { amount: 'Price on request', isTextOnly: true },
  );
  assert.deepEqual(
    formatPriceParts({ priceGel: null, isStartingPrice: false }, 'ru'),
    { amount: 'Цена по запросу', isTextOnly: true },
  );
});

test('formatCustomRateParts and getEyebrowClass follow Georgian მ² and zero-tracking typography', () => {
  assert.deepEqual(formatCustomRateParts(400, 'ka'), {
    amount: '400\u00A0₾ / მ²',
    suffix: '-დან',
  });
  assert.deepEqual(formatCustomRateParts(400, 'en'), {
    prefix: 'from ',
    amount: '400\u00A0₾ / m²',
  });
  assert.deepEqual(formatCustomRateParts(400, 'ru'), {
    prefix: 'от ',
    amount: '400\u00A0₾ / м²',
  });

  const kaEyebrow = getEyebrowClass('ka', 'light');
  assert.ok(kaEyebrow.includes('tracking-normal'));
  assert.ok(kaEyebrow.includes('text-[13px]'));
  assert.ok(!kaEyebrow.includes('uppercase'));

  const enEyebrow = getEyebrowClass('en', 'light');
  assert.ok(enEyebrow.includes('uppercase'));
});

test('buildTelHref, buildWhatsAppHref, and buildCustomOrderWhatsAppHref produce valid contact links', () => {
  assert.equal(buildTelHref('555 55 90 47'), 'tel:555559047');
  assert.equal(buildTelHref(), 'tel:+995555559047');
  assert.equal(buildWhatsAppHref(), 'https://wa.me/995555559047');

  const modelHref = buildWhatsAppHref('Bathroom vanity 60/40', 'en');
  assert.ok(modelHref.startsWith('https://wa.me/995555559047?text='));
  assert.ok(modelHref.includes(encodeURIComponent('Bathroom vanity 60/40')));

  assert.ok(buildCustomOrderWhatsAppHref('ka').startsWith('https://wa.me/995555559047?text='));
});

test('getLocalizedWordmark returns clean wordmark per language', () => {
  assert.equal(getLocalizedWordmark('ka'), 'სახელოსნო');
  assert.equal(getLocalizedWordmark('en'), 'Sakhelosno');
  assert.equal(getLocalizedWordmark('ru'), 'Sakhelosno');
});

test('getNextHeroIndex / getPrevHeroIndex wrap safely and getGallerySlots returns 3 slots', () => {
  assert.equal(getNextHeroIndex(0, 3), 1);
  assert.equal(getNextHeroIndex(2, 3), 0);
  assert.equal(getPrevHeroIndex(0, 3), 2);
  assert.equal(getPrevHeroIndex(2, 3), 1);
  assert.equal(getNextHeroIndex(0, 0), 0);

  const slots = getGallerySlots('wardrobes');
  assert.equal(slots.length, 3);
  assert.deepEqual(
    slots.map((s) => s.id),
    ['wardrobes-slot-1', 'wardrobes-slot-2', 'wardrobes-slot-3'],
  );
});

test('formatCategoryCount formats localized model counts accurately', () => {
  assert.equal(formatCategoryCount(SAMPLE_ITEMS, 'wardrobes', 'ka'), '1 მოდელი');
  assert.equal(formatCategoryCount(SAMPLE_ITEMS, 'wardrobes', 'en'), '1 model');
  assert.equal(formatCategoryCount(SAMPLE_ITEMS, 'wardrobes', 'ru'), '1 модель');
  assert.equal(
    formatCategoryCount([...SAMPLE_ITEMS, { ...SAMPLE_ITEMS[0], id: 'w2' }], 'wardrobes', 'en'),
    '2 models',
  );
});

test('siteContent enforces unique CTAs, verifiable facts, Georgian copy rules, and zero filler', async () => {
  const {
    CATALOG_CATEGORIES,
    CATALOG_ITEMS,
    HERO_CATEGORY_MENU,
    HERO_SLIDES,
    PROCESS_STEPS,
    REAL_FACTS_STRIP,
    TWO_PATH_BAND,
    UI_COPY,
  } = await import('../data/siteContent');

  assert.equal(REAL_FACTS_STRIP.length, 4);
  const fullKaJson = JSON.stringify({
    HERO_SLIDES,
    HERO_CATEGORY_MENU,
    CATALOG_ITEMS,
    PROCESS_STEPS,
    REAL_FACTS_STRIP,
    TWO_PATH_BAND,
    UI_COPY,
  });

  // Verify zero invented metrics & forbidden GE typos/fillers
  assert.ok(!fullKaJson.includes('12+'));
  assert.ok(!fullKaJson.includes('640+'));
  assert.ok(!fullKaJson.includes('100%'));
  assert.ok(!fullKaJson.includes('სახელოსნო'));
  assert.ok(!fullKaJson.includes('დაგვეკონტაქტეთ'));
  assert.ok(!fullKaJson.includes('ჭრამდე'));
  assert.ok(!fullKaJson.includes('შერჩეული'));
  assert.ok(!fullKaJson.includes('შებოლილ'));
  assert.ok(!fullKaJson.includes('შპონ'));
  assert.ok(!fullKaJson.toLowerCase().includes('smoked oak'));
  assert.ok(!fullKaJson.toLowerCase().includes('veneer'));
  assert.ok(!fullKaJson.includes('თქვენი პროექტ'));
  assert.ok(!fullKaJson.includes('WhatsApp კითხვა'));
  assert.equal(HERO_CATEGORY_MENU.length, 5);
  assert.deepEqual(
    CATALOG_CATEGORIES.map((c) => c.id),
    ['wardrobes', 'kitchens', 'bathroom', 'lighting', 'tables'],
  );
  assert.ok(!HERO_CATEGORY_MENU.some((entry) => entry.id === ('mirrors' as never)));
  assert.equal(
    CATALOG_ITEMS.find((i) => i.id === 'mirror-halo')?.category,
    'bathroom',
  );
  assert.equal(UI_COPY.storefront.featuredEyebrow.ka, 'გამორჩეული');
  assert.equal(UI_COPY.catalog.endCta.ka, 'უფასო კონსულტაცია');
  assert.ok(!UI_COPY.customOrder.rateNote.ka.includes('m²'));
  assert.ok(UI_COPY.customOrder.rateNote.ka.includes('მ²'));
  const kaOnlyText = JSON.stringify({
    HERO_SLIDES: HERO_SLIDES.map((s) => `${s.kicker.ka} ${s.headline.ka} ${s.subline.ka}`),
    TWO_PATH_BAND: [
      TWO_PATH_BAND.ready.title.ka,
      TWO_PATH_BAND.custom.title.ka,
      '400 ₾ / მ²',
    ],
    REAL_FACTS_STRIP: REAL_FACTS_STRIP.map((f) => f.text.ka),
    PROCESS_STEPS: PROCESS_STEPS.map((p) => `${p.title.ka} ${p.description.ka}`),
    CUSTOM_ORDER_RATE: UI_COPY.customOrder.rateNote.ka,
    UI_COPY_ABOUT: UI_COPY.about.lines.ka,
    UI_COPY_PAYMENT: UI_COPY.payment.methods.ka,
    UI_COPY_DELIVERY: UI_COPY.delivery.lines.ka,
    UI_COPY_FOOTER: UI_COPY.footer.description.ka,
  });
  assert.ok((kaOnlyText.match(/3D/g) ?? []).length <= 2, '3D mentioned more than twice');
  assert.ok((kaOnlyText.match(/400/g) ?? []).length <= 2, '400 mentioned more than twice');
  assert.ok((kaOnlyText.match(/საწარმო/g) ?? []).length <= 2, 'საწარმო mentioned more than twice');

  const langs: Language[] = ['ka', 'en', 'ru'];

  for (const lang of langs) {
    assert.notEqual(
      UI_COPY.customOrder.pageEyebrow[lang],
      UI_COPY.customOrder.eyebrow[lang],
      `Duplicate Custom Order eyebrow in ${lang}`,
    );
    assert.notEqual(
      UI_COPY.customOrder.pageEyebrow[lang],
      UI_COPY.nav.customOrder[lang],
      `Custom Order eyebrow matches title in ${lang}`,
    );
    const tags = CATALOG_ITEMS.map((item) => item.tag[lang]);
    assert.equal(new Set(tags).size, CATALOG_ITEMS.length, `Duplicate tag in ${lang}`);

    for (const cat of CATALOG_CATEGORIES) {
      assert.ok(cat.intro[lang].length >= 80, `Category intro too short for ${cat.id} (${lang})`);
    }

    for (const item of CATALOG_ITEMS) {
      const words = item.shortDescription[lang].trim().split(/\s+/).filter(Boolean);
      assert.ok(words.length <= 8, `${item.id} (${lang}) descriptor exceeds 8 words: "${item.shortDescription[lang]}"`);
    }

    const ctas = [
      UI_COPY.header.callLabel[lang],
      ...HERO_SLIDES.map((s) => s.ctaLabel[lang]),
      UI_COPY.hero.ctaPrimary[lang],
      TWO_PATH_BAND.ready.cta[lang],
      TWO_PATH_BAND.custom.cta[lang],
      UI_COPY.storefront.viewFullCatalog[lang],
      UI_COPY.catalog.endCta[lang],
      UI_COPY.customOrder.cta[lang],
      UI_COPY.contact.callButton[lang],
      UI_COPY.contact.whatsappButton[lang],
      UI_COPY.productPage.primaryCta[lang],
      UI_COPY.productPage.secondaryCta[lang],
    ];
    assert.equal(new Set(ctas).size, ctas.length, `Duplicate CTA wording detected in ${lang}: ${ctas.join(' | ')}`);
  }
});

test('parsePathname, buildLocalizedPath, and resolveActiveNavForRoute enforce trailing-slash URLs and root-only redirect', () => {
  assert.deepEqual(parsePathname('/', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'home' },
    redirectTo: '/ka/',
  });
  // Never redirect any path starting with /ka, /en, or /ru
  assert.deepEqual(parsePathname('/ka', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'home' },
  });
  assert.deepEqual(parsePathname('/ka/', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'home' },
  });
  assert.deepEqual(parsePathname('/en/', SAMPLE_ITEMS), {
    lang: 'en',
    route: { page: 'home' },
  });
  assert.deepEqual(parsePathname('/ru/', SAMPLE_ITEMS), {
    lang: 'ru',
    route: { page: 'home' },
  });

  assert.deepEqual(parsePathname('/en/catalog/', SAMPLE_ITEMS), {
    lang: 'en',
    route: { page: 'catalog', category: 'wardrobes' },
  });
  assert.deepEqual(parsePathname('/ru/catalog/kitchens/', SAMPLE_ITEMS), {
    lang: 'ru',
    route: { page: 'catalog', category: 'kitchens' },
  });
  assert.deepEqual(parsePathname('/ru/catalog/kitchens', SAMPLE_ITEMS), {
    lang: 'ru',
    route: { page: 'catalog', category: 'kitchens' },
  });
  assert.deepEqual(parsePathname('/ka/catalog/lighting/', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'catalog', category: 'lighting' },
  });
  assert.deepEqual(parsePathname('/en/catalog/tables/', SAMPLE_ITEMS), {
    lang: 'en',
    route: { page: 'catalog', category: 'tables' },
  });
  assert.deepEqual(parsePathname('/ka/catalog/mirrors/', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'catalog', category: 'bathroom' },
    redirectTo: '/ka/catalog/bathroom/',
  });
  assert.deepEqual(parsePathname('/en/catalog/mirrors', SAMPLE_ITEMS), {
    lang: 'en',
    route: { page: 'catalog', category: 'bathroom' },
    redirectTo: '/en/catalog/bathroom/',
  });
  assert.deepEqual(parsePathname('/ru/mirrors/', SAMPLE_ITEMS), {
    lang: 'ru',
    route: { page: 'catalog', category: 'bathroom' },
    redirectTo: '/ru/catalog/bathroom/',
  });
  assert.deepEqual(parsePathname('/mirrors', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'catalog', category: 'bathroom' },
    redirectTo: '/ka/catalog/bathroom/',
  });
  assert.deepEqual(parsePathname('/ka/catalog/invalid/', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'not-found' },
  });

  assert.deepEqual(parsePathname('/ka/product/b1/', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'product', productId: 'b1' },
  });
  assert.deepEqual(parsePathname('/en/product/nonexistent/', SAMPLE_ITEMS), {
    lang: 'en',
    route: { page: 'not-found' },
  });
  assert.deepEqual(parsePathname('/unknown-path', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'not-found' },
  });

  assert.deepEqual(parsePathname('/ka/custom-order/', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'custom-order' },
  });
  assert.deepEqual(parsePathname('/en/payment/', SAMPLE_ITEMS), {
    lang: 'en',
    route: { page: 'payment' },
  });
  assert.deepEqual(parsePathname('/ru/delivery/', SAMPLE_ITEMS), {
    lang: 'ru',
    route: { page: 'delivery' },
  });
  assert.deepEqual(parsePathname('/ka/contact/', SAMPLE_ITEMS), {
    lang: 'ka',
    route: { page: 'contact' },
  });

  // Every built path uses a trailing slash
  assert.equal(buildLocalizedPath('ka', { page: 'home' }), '/ka/');
  assert.equal(buildLocalizedPath('en', { page: 'home' }), '/en/');
  assert.equal(
    buildLocalizedPath('ru', { page: 'catalog', category: 'bathroom' }),
    '/ru/catalog/bathroom/',
  );
  assert.equal(
    buildLocalizedPath('ka', { page: 'product', productId: 'b1' }),
    '/ka/product/b1/',
  );
  assert.equal(buildLocalizedPath('en', { page: 'payment' }), '/en/payment/');

  assert.equal(resolveActiveNavForRoute({ page: 'home' }), 'home');
  assert.equal(
    resolveActiveNavForRoute({ page: 'catalog', category: 'kitchens' }),
    'catalog',
  );
  assert.equal(
    resolveActiveNavForRoute({ page: 'product', productId: 'b1' }),
    'catalog',
  );
  assert.equal(resolveActiveNavForRoute({ page: 'payment' }), 'payment');
  assert.equal(resolveActiveNavForRoute({ page: 'delivery' }), 'delivery');
  assert.equal(resolveActiveNavForRoute({ page: 'contact' }), 'contact');
  assert.equal(resolveActiveNavForRoute({ page: 'not-found' }), null);

  assert.equal(shouldShowHeaderSearch({ page: 'home' }), true);
  assert.equal(
    shouldShowHeaderSearch({ page: 'catalog', category: 'kitchens' }),
    true,
  );
  assert.equal(
    shouldShowHeaderSearch({ page: 'product', productId: 'b1' }),
    true,
  );
  assert.equal(shouldShowHeaderSearch({ page: 'custom-order' }), false);
  assert.equal(shouldShowHeaderSearch({ page: 'payment' }), false);
  assert.equal(shouldShowHeaderSearch({ page: 'delivery' }), false);
  assert.equal(shouldShowHeaderSearch({ page: 'contact' }), false);
  assert.equal(shouldShowHeaderSearch({ page: 'not-found' }), false);

  assert.equal(parseStoredLanguage('en'), 'en');
  assert.equal(parseStoredLanguage('ru'), 'ru');
  assert.equal(parseStoredLanguage('ka'), 'ka');
  assert.equal(parseStoredLanguage('fr'), 'ka');
  assert.equal(parseStoredLanguage(null), 'ka');
});

test('SEO metadata, hreflang, JSON-LD, and sitemap.xml validate strictly across all 60 trailing-slash routes', async () => {
  const { buildSitemapXml, getAllPrerenderRoutes, getPageSeo } = await import('./seo');
  const { SITE_URL } = await import('../config/seoConfig');

  const routes = getAllPrerenderRoutes();
  assert.equal(routes.length, 60, 'Expected 20 routes × 3 languages = 60 prerender routes');
  assert.ok(!routes.some((r) => r.path.includes('/mirrors')));

  const seenDescriptions = new Set<string>();

  for (const entry of routes) {
    assert.ok(entry.path.endsWith('/'), `Route path missing trailing slash: ${entry.path}`);
    const seo = getPageSeo(entry.lang, entry.route);

    assert.equal(seo.title, 'Sakhelosno / სახელოსნო - ავეჯის დამზადება');
    assert.ok(seo.title.length <= 60);

    // Description rules: 140..160 chars, unique
    assert.ok(
      seo.description.length >= 140 && seo.description.length <= 160,
      `Description length ${seo.description.length} out of 140-160 range for ${entry.path}: "${seo.description}"`,
    );
    assert.ok(
      !seenDescriptions.has(seo.description),
      `Duplicate description detected: "${seo.description}"`,
    );
    seenDescriptions.add(seo.description);

    // Canonical & hreflang rules (all trailing slash)
    assert.equal(seo.canonicalUrl, `${SITE_URL}${entry.path}`);
    assert.ok(seo.canonicalUrl.endsWith('/'));
    assert.equal(seo.alternates.length, 4);
    assert.deepEqual(
      seo.alternates.map((a) => a.hreflang),
      ['ka', 'en', 'ru', 'x-default'],
    );
    for (const alt of seo.alternates) {
      assert.ok(alt.href.endsWith('/'), `hreflang missing trailing slash: ${alt.href}`);
    }
    const kaAlt = seo.alternates.find((a) => a.hreflang === 'ka');
    const xDefAlt = seo.alternates.find((a) => a.hreflang === 'x-default');
    assert.equal(xDefAlt?.href, kaAlt?.href);

    // JSON-LD strict compliance
    assert.ok(seo.jsonLd.length >= 1, `Missing JSON-LD on ${entry.path}`);
    const serialized = JSON.stringify(seo.jsonLd);
    assert.ok(!serialized.includes('aggregateRating'), `Forbidden aggregateRating on ${entry.path}`);
    assert.ok(!serialized.includes('"review"'), `Forbidden review on ${entry.path}`);
    assert.ok(!serialized.includes('openingHours'), `Forbidden openingHours on ${entry.path}`);
    assert.ok(!serialized.includes('priceRange'), `Forbidden priceRange on ${entry.path}`);

    if (entry.route.page === 'home') {
      assert.equal(seo.jsonLd[0]['@type'], 'FurnitureStore');
      assert.equal(seo.jsonLd[0].telephone, '+995 555 55 90 47');
    } else if (entry.route.page === 'product') {
      assert.equal(seo.jsonLd[0]['@type'], 'Product');
      const offers = seo.jsonLd[0].offers as Record<string, unknown>;
      assert.equal(offers.priceCurrency, 'GEL');
      assert.equal(seo.jsonLd[1]['@type'], 'BreadcrumbList');
    } else if (entry.route.page === 'custom-order') {
      assert.equal(seo.jsonLd[0]['@type'], 'Service');
      assert.equal(seo.jsonLd[1]['@type'], 'BreadcrumbList');
    } else {
      assert.equal(seo.jsonLd[0]['@type'], 'BreadcrumbList');
    }
  }

  // Verify 404 SEO uses noindex
  const notFoundSeo = getPageSeo('ka', { page: 'not-found' });
  assert.equal(notFoundSeo.robots, 'noindex, follow');

  // Verify sitemap.xml contains every URL + xhtml:link alternates
  const sitemap = buildSitemapXml();
  for (const entry of routes) {
    assert.ok(
      sitemap.includes(`<loc>${SITE_URL}${entry.path}</loc>`),
      `Missing URL in sitemap.xml: ${entry.path}`,
    );
  }
  assert.ok(sitemap.includes('xhtml:link rel="alternate" hreflang="x-default"'));
});

test('SITE_MEDIA excludes old workshop person photo and keeps distinct replacement assets', async () => {
  const { SITE_MEDIA } = await import('../data/media');
  const values = Object.values(SITE_MEDIA);
  assert.ok(!values.some((src) => src.includes('about_workshop_1794597701115')));
  assert.notEqual(SITE_MEDIA.aboutJoineryDetail, SITE_MEDIA.sidebarCustomDetail);
  assert.notEqual(SITE_MEDIA.aboutJoineryDetail, SITE_MEDIA.twoPathCustomFitted);
  assert.notEqual(SITE_MEDIA.sidebarCustomDetail, SITE_MEDIA.twoPathCustomFitted);
});

test('detectHorizontalSwipe distinguishes horizontal swipes from vertical scrolling and taps', () => {
  assert.equal(detectHorizontalSwipe(200, 110, 100, 105), 'next');
  assert.equal(detectHorizontalSwipe(110, 200, 100, 108), 'prev');
  assert.equal(detectHorizontalSwipe(100, 85, 100, 100), null);
  assert.equal(detectHorizontalSwipe(200, 140, 100, 220), null);
});

test('getActiveCarouselIndex snaps to nearest card offset', () => {
  const offsets = [0, 320, 640, 960];
  assert.equal(getActiveCarouselIndex(0, offsets), 0);
  assert.equal(getActiveCarouselIndex(290, offsets), 1);
  assert.equal(getActiveCarouselIndex(700, offsets), 2);
  assert.equal(getActiveCarouselIndex(950, offsets), 3);
  assert.equal(getActiveCarouselIndex(100, []), 0);
});

test('order bag helpers add, increment, update, remove, persist, and build WhatsApp order URLs', () => {
  let bag = addOrderBagItem([], 'w1');
  assert.deepEqual(bag, [{ productId: 'w1', quantity: 1 }]);

  bag = addOrderBagItem(bag, 'w1');
  bag = addOrderBagItem(bag, 'b1');
  assert.equal(getOrderBagCount(bag), 3);
  assert.equal(getOrderItemQuantity(bag, 'w1'), 2);
  assert.equal(getOrderItemQuantity(bag, 'b1'), 1);
  assert.equal(getOrderItemQuantity(bag, 'm1'), 0);

  assert.deepEqual(getOrderBagTotal(bag, SAMPLE_ITEMS), {
    totalGel: 1650 * 2 + 440,
    hasStartingPrice: true,
    hasPriceOnRequest: false,
  });

  bag = addOrderBagItem(bag, 'l1');
  assert.deepEqual(getOrderBagTotal(bag, SAMPLE_ITEMS), {
    totalGel: 1650 * 2 + 440,
    hasStartingPrice: true,
    hasPriceOnRequest: true,
  });
  bag = removeOrderBagItem(bag, 'l1');

  bag = updateOrderBagQuantity(bag, 'w1', 0);
  assert.deepEqual(bag, [{ productId: 'b1', quantity: 1 }]);
  assert.deepEqual(getOrderBagTotal(bag, SAMPLE_ITEMS), {
    totalGel: 440,
    hasStartingPrice: false,
    hasPriceOnRequest: false,
  });

  const parsed = parseStoredOrderBag(
    JSON.stringify([
      { productId: 'b1', quantity: 2 },
      { productId: 'unknown', quantity: 1 },
      { productId: 'w1', quantity: 0 },
    ]),
    SAMPLE_ITEMS,
  );
  assert.deepEqual(parsed, [{ productId: 'b1', quantity: 2 }]);
  assert.deepEqual(parseStoredOrderBag('bad-json', SAMPLE_ITEMS), []);

  const kaHref = buildOrderBagWhatsAppHref(
    [
      { productId: 'w1', quantity: 1 },
      { productId: 'b1', quantity: 2 },
    ],
    SAMPLE_ITEMS,
    'ka',
    'თბილისი',
  );
  assert.ok(kaHref.startsWith('https://wa.me/995555559047?text='));
  const decoded = decodeURIComponent(kaHref.split('?text=')[1]);
  assert.ok(decoded.includes('SKH-WB-01'));
  assert.ok(decoded.includes('SKH-BT-01'));
  assert.ok(decoded.includes('× 2'));
  assert.ok(decoded.includes('თბილისი'));

  assert.equal(
    buildOrderBagWhatsAppHref([], SAMPLE_ITEMS, 'en'),
    'https://wa.me/995555559047',
  );

  assert.deepEqual(removeOrderBagItem(bag, 'b1'), []);
});
