import { MessageSquare } from 'lucide-react';
import {
  OWNER_CONFIG,
  PROCESS_STEPS,
  UI_COPY,
  pickText,
} from '../data/siteContent';
import type { Language } from '../types/site';
import {
  buildCustomOrderWhatsAppHref,
  formatCustomRateParts,
  getEyebrowClass,
} from '../utils/catalogLogic';
import { PriceDisplay } from './PriceDisplay';

interface CustomOrderSectionProps {
  lang: Language;
}

export function CustomOrderSection({ lang }: CustomOrderSectionProps) {
  const rateParts = formatCustomRateParts(
    OWNER_CONFIG.customOrderRateGelPerSqm,
    lang,
  );

  return (
    <section
      id="custom-order"
      className="bg-[#3B2A20] text-[#F6F1E9] py-14 md:py-16"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-6 lg:px-10">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <span className={getEyebrowClass(lang, 'dark')}>
              {pickText(UI_COPY.customOrder.eyebrow, lang)}
            </span>
            <h2
              className="mt-2 font-display font-medium text-[#F6F1E9] text-balance max-w-2xl leading-[1.15]"
              style={{ fontSize: 'clamp(1.5rem, 5.4vw, 1.875rem)' }}
            >
              {pickText(UI_COPY.customOrder.title, lang)}
            </h2>
          </div>

          <div className="bg-[#2C1F17] py-3.5 px-5 self-start lg:self-auto shrink-0">
            <PriceDisplay parts={rateParts} size="tile" tone="dark" />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.stepNumber}
              className="h-full bg-[#4A3529] p-5 md:p-6 flex flex-row md:flex-col justify-start items-start gap-4"
            >
              <span className="font-sans text-lg font-semibold text-[#E5D4B7] price-numerals shrink-0">
                {step.stepNumber}
              </span>
              <div>
                <h3 className="font-display text-xl md:text-lg font-medium text-[#F6F1E9]">
                  {pickText(step.title, lang)}
                </h3>
                <p className="mt-1.5 text-[15px] md:text-[13px] leading-[1.6] md:leading-[1.55] text-[#DDD2C5]">
                  {pickText(step.description, lang)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-start">
          <a
            href={buildCustomOrderWhatsAppHref(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] md:min-h-[44px] w-full sm:w-auto items-center justify-center gap-2.5 bg-[#A98A5B] px-6 py-2.5 text-sm font-semibold text-[#241C17] hover:bg-[#E5D4B7] transition-colors whitespace-nowrap no-underline"
          >
            <MessageSquare className="h-4 w-4 shrink-0" strokeWidth={1.6} aria-hidden="true" />
            <span>{pickText(UI_COPY.customOrder.cta, lang)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
