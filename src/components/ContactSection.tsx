import {
  ArrowUpRight,
  MapPin,
  MessageSquare,
  Phone,
} from 'lucide-react';
import {
  CLIENT_MAP_SETTINGS,
  OWNER_CONFIG,
  UI_COPY,
  pickText,
} from '../data/siteContent';
import type { Language } from '../types/site';
import {
  buildTelHref,
  buildWhatsAppHref,
  getEyebrowClass,
} from '../utils/catalogLogic';

interface ContactSectionProps {
  lang: Language;
  hideHeader?: boolean;
}

export function ContactSection({ lang, hideHeader = false }: ContactSectionProps) {
  const mapsExternalHref = CLIENT_MAP_SETTINGS.placeUrl;

  return (
    <section
      id="contact"
      className="bg-[#F6F1E9] py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-6 lg:px-10">
        {!hideHeader && (
            <div className="mb-8 md:mb-10">
              <span className={getEyebrowClass(lang, 'light')}>
                {pickText(UI_COPY.contact.eyebrow, lang)}
              </span>
              <h2
                className="mt-2 font-display font-medium text-[#241C17] text-balance max-w-2xl leading-[1.15]"
                style={{ fontSize: 'clamp(1.5rem, 5.4vw, 2.25rem)' }}
              >
                {pickText(UI_COPY.contact.title, lang)}
              </h2>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch gap-6 md:gap-8">
            {/* Left column: Direct contact info without duplicate inquiry CTA cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-[#EFE8DD] p-5 md:p-8">
              {/* Mobile tappable rows */}
              <div className="md:hidden flex flex-col gap-2.5">
                <a
                  href={mapsExternalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[54px] items-center justify-between gap-3 bg-[#F6F1E9] px-4 py-3 text-left text-[#241C17] hover:bg-[#E5DDD0] transition-colors no-underline"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <MapPin className="h-4 w-4 text-[#6B4428] shrink-0" strokeWidth={1.6} aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-[11px] text-[#6F5D50]">
                        {pickText(UI_COPY.contact.addressLabel, lang)}
                      </span>
                      <span className="block text-[15px] font-medium text-[#241C17] leading-snug">
                        {pickText(OWNER_CONFIG.address, lang)}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#6B4428] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                </a>

                <a
                  href={buildTelHref(OWNER_CONFIG.phoneE164)}
                  className="flex min-h-[54px] items-center justify-between gap-3 bg-[#F6F1E9] px-4 py-3 text-left text-[#241C17] hover:bg-[#E5DDD0] transition-colors no-underline"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Phone className="h-4 w-4 text-[#6B4428] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-[11px] text-[#6F5D50]">
                        {pickText(UI_COPY.contact.phoneLabel, lang)}
                      </span>
                      <span className="block text-[17px] font-semibold text-[#241C17] price-numerals">
                        {OWNER_CONFIG.phoneDisplay}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#6B4428] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                </a>

                <a
                  href={buildWhatsAppHref(undefined, lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[52px] items-center justify-between gap-3 bg-[#6B4428] px-4 py-3 text-left text-[#F6F1E9] hover:bg-[#55351E] transition-colors no-underline"
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <MessageSquare className="h-4 w-4 text-[#F6F1E9] shrink-0" strokeWidth={1.6} aria-hidden="true" />
                    <span className="text-[15px] font-semibold">WhatsApp</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#E5D4B7] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                </a>

                <a
                  href={OWNER_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-between gap-3 bg-[#F6F1E9] px-4 py-3 text-[15px] font-medium text-[#241C17] hover:bg-[#E5DDD0] transition-colors no-underline"
                >
                  <span className="min-w-0 truncate">Instagram · {OWNER_CONFIG.instagramHandle}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#6B4428] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                </a>

                <a
                  href={OWNER_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[48px] items-center justify-between gap-3 bg-[#F6F1E9] px-4 py-3 text-[15px] font-medium text-[#241C17] hover:bg-[#E5DDD0] transition-colors no-underline"
                >
                  <span className="min-w-0 truncate">Facebook · {OWNER_CONFIG.facebookLabel}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#6B4428] shrink-0" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>

              {/* Desktop / Tablet contact block (>= 768px) */}
              <div className="hidden md:flex flex-col justify-between h-full gap-8">
                <div className="space-y-6">
                  <div>
                    <div className={getEyebrowClass(lang, 'light')}>
                      {pickText(UI_COPY.contact.addressLabel, lang)}
                    </div>
                    <p className="mt-1.5 text-base font-medium text-[#241C17]">
                      {pickText(OWNER_CONFIG.address, lang)}
                    </p>
                  </div>

                  <div>
                    <div className={getEyebrowClass(lang, 'light')}>
                      {pickText(UI_COPY.contact.phoneLabel, lang)}
                    </div>
                    <a
                      href={buildTelHref(OWNER_CONFIG.phoneE164)}
                      className="mt-1.5 inline-block text-xl font-semibold text-[#241C17] hover:text-[#6B4428] price-numerals transition-colors no-underline"
                    >
                      {OWNER_CONFIG.phoneDisplay}
                    </a>
                  </div>

                  <div>
                    <div className={getEyebrowClass(lang, 'light')}>
                      {pickText(UI_COPY.contact.socialsLabel, lang)}
                    </div>
                    <div className="mt-2 flex flex-col gap-2 text-sm">
                      <a
                        href={OWNER_CONFIG.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#241C17] hover:text-[#6B4428] transition-colors w-fit no-underline"
                      >
                        Instagram · {OWNER_CONFIG.instagramHandle}
                      </a>
                      <a
                        href={OWNER_CONFIG.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#241C17] hover:text-[#6B4428] transition-colors w-fit no-underline"
                      >
                        Facebook · {OWNER_CONFIG.facebookLabel}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href={buildWhatsAppHref(undefined, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 bg-[#6B4428] px-6 py-2.5 text-sm font-semibold text-[#F6F1E9] hover:bg-[#55351E] transition-colors whitespace-nowrap no-underline"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: Google Maps */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-[#E5DDD0] h-[280px] md:flex-1 md:min-h-[340px] overflow-hidden">
                <iframe
                  title={pickText(OWNER_CONFIG.address, lang)}
                  src={OWNER_CONFIG.mapEmbedUrl}
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[280px] md:h-full md:min-h-[340px] w-full border-0"
                />
              </div>
              <a
                href={mapsExternalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex w-fit items-center text-[13px] md:text-xs font-medium text-[#6B4428] hover:text-[#241C17] transition-colors no-underline"
              >
                {pickText(UI_COPY.contact.openInGoogleMaps, lang)}
              </a>
            </div>
          </div>
      </div>
    </section>
  );
}
