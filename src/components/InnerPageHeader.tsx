interface InnerPageHeaderProps {
  title: string;
  intro?: string;
}

export function InnerPageHeader({ title, intro }: InnerPageHeaderProps) {
  return (
    <div className="bg-[#E5DDD0]/60 py-6 md:py-8">
      <div className="mx-auto max-w-[1440px] px-5 md:px-6 lg:px-10">
        <h1
          className="font-display font-medium text-[#241C17] leading-[1.15] text-balance"
          style={{ fontSize: 'clamp(1.65rem, 4.8vw, 2.35rem)' }}
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-3 max-w-[68ch] text-[14.5px] md:text-[15px] leading-[1.65] text-[#5A4E45]">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
