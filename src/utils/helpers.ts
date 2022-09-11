/**
 *
 */
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

/**
 *
 */
export const abbreviateString = (inputString: string, maxLength?: number) => {
  const maxLn = maxLength ?? 5;

  return inputString
    .split(" ")
    .map((section) => section[0])
    .join("")
    .toUpperCase()
    .slice(0, maxLn);
};

//
interface IFormatNumberOptions {
  maxFraction?: number;
  isCurrency?: boolean;
}
