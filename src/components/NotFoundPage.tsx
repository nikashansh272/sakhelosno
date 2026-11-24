import { UI_COPY, pickText } from '../data/siteContent';
import type { AppRoute, Language } from '../types/site';
import {
  buildLocalizedPath,
  getEyebrowClass,
  isPlainLeftClick,
} from '../utils/catalogLogic';

interface NotFoundPageProps {
  lang: Language;
  onNavigate: (route: AppRoute, nextLang?: Language) => void;
}

export function NotFoundPage({ lang, onNavigate }: NotFoundPageProps) {
  const homeRoute: AppRoute = { page: 'home' };
  const catalogRoute: AppRoute = { page: 'catalog', category: 'wardrobes' };

  return (
    <section className="bg-[#EFE8DD] py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-6 lg:px-10">
        <div className="max-w-xl bg-[#F6F1E9] p-8 md:p-12">
          <span className={getEyebrowClass(lang, 'light')}>
            {pickText(UI_COPY.notFound.eyebrow, lang)}
          </span>
          <h1
            className="mt-2 font-display font-medium text-[#241C17] leading-[1.15]"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 2.4rem)' }}
          >
            {pickText(UI_COPY.notFound.title, lang)}
          </h1>
          <p className="mt-4 text-[15px] leading-[1.65] text-[#5A4E45]">
            {pickText(UI_COPY.notFound.description, lang)}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={buildLocalizedPath(lang, homeRoute)}
              onClick={(e) => {
                if (isPlainLeftClick(e)) {
                  e.preventDefault();
                  onNavigate(homeRoute);
                }
              }}
              className="inline-flex min-h-[46px] items-center justify-center bg-[#6B4428] px-6 py-3 text-sm font-semibold text-[#F6F1E9] hover:bg-[#55351E] transition-colors no-underline"
            >
              {pickText(UI_COPY.notFound.homeCta, lang)}
            </a>

            <a
              href={buildLocalizedPath(lang, catalogRoute)}
              onClick={(e) => {
                if (isPlainLeftClick(e)) {
                  e.preventDefault();
                  onNavigate(catalogRoute);
                }
              }}
              className="inline-flex min-h-[46px] items-center justify-center bg-[#EFE8DD] px-6 py-3 text-sm font-semibold text-[#241C17] hover:bg-[#E5DDD0] transition-colors no-underline"
            >
              {pickText(UI_COPY.notFound.catalogCta, lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
