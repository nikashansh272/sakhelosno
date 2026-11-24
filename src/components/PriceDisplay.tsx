import type { FormattedPriceParts } from '../utils/catalogLogic';

interface PriceDisplayProps {
  parts: FormattedPriceParts;
  size?: 'card' | 'cardCompact' | 'tile' | 'page' | 'compact';
  tone?: 'light' | 'dark';
  className?: string;
}

export function PriceDisplay({
  parts,
  size = 'card',
  tone = 'light',
  className = '',
}: PriceDisplayProps) {
  const amountColor = tone === 'dark' ? 'text-[#F6F1E9]' : 'text-[#241C17]';
  const qualifierColor = tone === 'dark' ? 'text-[#DDD2C5]' : 'text-[#6F5D50]';

  const sizeStyles = {
    card: {
      amount: 'text-[18px] sm:text-[20px] md:text-[22px] leading-none',
      qualifier: 'text-[12px] md:text-[13px] leading-none',
    },
    cardCompact: {
      amount: 'text-[14.5px] sm:text-[18px] md:text-[21px] leading-none',
      qualifier: 'text-[11px] sm:text-[12px] md:text-[13px] leading-none',
    },
    tile: {
      amount: 'text-xl sm:text-[22px] leading-none',
      qualifier: 'text-[13px] leading-none',
    },
    page: {
      amount: 'text-2xl sm:text-[28px] leading-none',
      qualifier: 'text-sm sm:text-[15px] leading-none',
    },
    compact: {
      amount: 'text-sm leading-none',
      qualifier: 'text-[11px] leading-none',
    },
  }[size];

  if (parts.isTextOnly) {
    const textOnlySizes = {
      card: 'text-[13.5px] sm:text-[15px] leading-snug',
      cardCompact: 'text-[11.5px] sm:text-[13.5px] md:text-[15px] leading-snug',
      tile: 'text-sm leading-snug',
      page: 'text-[17px] sm:text-[19px] leading-snug',
      compact: 'text-xs leading-snug',
    }[size];
    const textOnlyColor =
      tone === 'dark' ? 'text-[#E5D4B7]' : 'text-[#6B4428]';

    return (
      <span
        className={`inline-block font-sans font-medium ${textOnlySizes} ${textOnlyColor} ${className}`}
      >
        {parts.amount}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-baseline gap-1 font-sans price-numerals whitespace-nowrap ${className}`}
    >
      {parts.prefix && (
        <span className={`font-normal ${sizeStyles.qualifier} ${qualifierColor}`}>
          {parts.prefix.trim()}
        </span>
      )}
      <span className={`font-semibold ${sizeStyles.amount} ${amountColor}`}>
        {parts.amount}
      </span>
      {parts.suffix && (
        <span className={`font-normal ${sizeStyles.qualifier} ${qualifierColor}`}>
          {parts.suffix}
        </span>
      )}
    </span>
  );
}
