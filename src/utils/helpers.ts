export const formatNumber = (
  number: number,
  options?: IFormatNumberOptions
) => {
  const maxFraction = options?.maxFraction ?? 1;

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: maxFraction,
    ...(options?.isCurrency
      ? {
        style: "currency",
        currency: "USD",
      }
      : {}),
  }).format(number);
};

interface IFormatNumberOptions {
  maxFraction?: number;
  isCurrency?: boolean;
}


export const abbreviateString = (value: string) => {
  let abbreviatedString = '';
  let tempValue = String(value);
  tempValue.split(' ').forEach(word => {
    abbreviatedString += word[0].toUpperCase();
  })
  return abbreviatedString;
}