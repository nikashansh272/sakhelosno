import { UI_COPY, pickText } from '../data/siteContent';
import type { Language } from '../types/site';
import { AboutSection } from './AboutAndTermsSection';
import { ContactSection } from './ContactSection';
import { CustomOrderSection } from './CustomOrderSection';
import { InnerPageHeader } from './InnerPageHeader';

interface InnerPageProps {
  lang: Language;
}

export function CustomOrderPage({ lang }: InnerPageProps) {
  return (
    <div>
      <InnerPageHeader title={pickText(UI_COPY.nav.customOrder, lang)} />
      <CustomOrderSection lang={lang} />
      <AboutSection lang={lang} />
    </div>
  );
}

export function PaymentPage({ lang }: InnerPageProps) {
  const methods = UI_COPY.payment.methods[lang];

  return (
    <div className="bg-[#EFE8DD]">
      <InnerPageHeader title={pickText(UI_COPY.payment.title, lang)} />

      <section className="py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch">
            {methods.map((method, idx) => (
              <div
                key={method}
                className="bg-[#F6F1E9] p-6 md:p-8 flex flex-col justify-between gap-4"
              >
                <span className="font-sans text-lg font-semibold text-[#6B4428] price-numerals">
                  0{idx + 1}
                </span>
                <p className="text-[15px] md:text-base leading-[1.65] text-[#241C17]">
                  {method}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function DeliveryPage({ lang }: InnerPageProps) {
  const lines = UI_COPY.delivery.lines[lang];

  return (
    <div className="bg-[#EFE8DD]">
      <InnerPageHeader title={pickText(UI_COPY.delivery.title, lang)} />

      <section className="py-10 md:py-14 lg:py-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-stretch">
            {lines.map((line, idx) => (
              <div
                key={line}
                className="bg-[#F6F1E9] p-6 md:p-8 flex flex-col justify-between gap-4"
              >
                <span className="font-sans text-lg font-semibold text-[#6B4428] price-numerals">
                  0{idx + 1}
                </span>
                <p className="text-[15px] md:text-base leading-[1.65] text-[#241C17]">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export function ContactPage({ lang }: InnerPageProps) {
  return (
    <div>
      <InnerPageHeader title={pickText(UI_COPY.contact.title, lang)} />
      <ContactSection lang={lang} hideHeader />
    </div>
  );
}
