import { useState } from 'react';
import { SITE_MEDIA, getResponsiveImage } from '../data/media';
import { UI_COPY, pickText } from '../data/siteContent';
import type { Language } from '../types/site';
import { getEyebrowClass } from '../utils/catalogLogic';

interface SectionLangProps {
  lang: Language;
}

export function AboutSection({ lang }: SectionLangProps) {
  const [imgError, setImgError] = useState(false);
  const imgMeta = getResponsiveImage(SITE_MEDIA.aboutJoineryDetail);

  const imgAlt =
    lang === 'ka'
      ? 'თბილისის საწარმოში დამზადებული მუქი ხის კუთხური შეერთება და თითბრის დეტალი'
      : lang === 'ru'
        ? 'Деталь столярного стыка из тёмного дерева и латунной фурнитуры из цеха в Тбилиси'
        : 'Close-up of handcrafted dark timber corner joinery and brushed brass hardware from our Tbilisi workshop';

  return (
    <section id="about" className="bg-[#F6F1E9] py-14 md:py-16">
      <div className="mx-auto max-w-[1440px] px-5 md:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-5 lg:gap-0">
          <div className="lg:col-start-1 lg:col-end-8 lg:row-start-1 bg-[#E5DDD0] aspect-[16/10] overflow-hidden">
            {!imgError ? (
              <img
                src={imgMeta.src}
                srcSet={imgMeta.srcSet || undefined}
                sizes="(max-width: 1023px) 92vw, 56vw"
                alt={imgAlt}
                width={imgMeta.width}
                height={imgMeta.height}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-[#7B6D62]">
                Sakhelosno
              </div>
            )}
          </div>

          <div className="lg:col-start-7 lg:col-end-13 lg:row-start-1 relative z-10 bg-[#EFE8DD] p-5 md:p-8 lg:p-10">
            <span className={getEyebrowClass(lang, 'light')}>
              {pickText(UI_COPY.about.eyebrow, lang)}
            </span>
            <h2
              className="mt-2 font-display font-medium text-[#241C17] text-balance leading-[1.15]"
              style={{ fontSize: 'clamp(1.5rem, 5.4vw, 1.875rem)' }}
            >
              {pickText(UI_COPY.about.title, lang)}
            </h2>
            <div className="mt-4 md:mt-5 space-y-3 text-[15px] md:text-sm leading-[1.6] text-[#3D3129] max-w-[48ch]">
              {UI_COPY.about.lines[lang].map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
