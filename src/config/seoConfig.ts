/**
 * Central SEO & domain configuration.
 * Replace SITE_URL with your live production domain (no trailing slash) before deploying.
 */
export const SITE_URL = 'https://example.com';

/**
 * Placeholder geographic coordinates for Nato Giorgadze St 16, Tbilisi, Georgia.
 * Replace with exact verified Google Maps pin coordinates when ready.
 */
export const GEO_COORDINATES = {
  latitude: 41.6751,
  longitude: 44.9001,
} as const;

export const OG_IMAGE_PATH = '/assets/og-sakhelosno.jpg';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const SITE_LOGO_PATH = '/assets/logo-dark.png';

export const SUPPORTED_LANGUAGES = ['ka', 'en', 'ru'] as const;
export const DEFAULT_LANGUAGE = 'ka' as const;

export const OG_LOCALE_BY_LANG = {
  ka: 'ka_GE',
  en: 'en_US',
  ru: 'ru_RU',
} as const;
