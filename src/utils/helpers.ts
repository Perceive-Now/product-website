import dayjs from 'dayjs';

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

export const getTimeperiod = (start?: string, end?: string) => {
  const START_YEAR = String(start) || "1997";
  const YEAR_DIFFERENCE = 4;

  let finalYear = String(end) || dayjs().format("YYYY");

  let timeperiodArray = [];

  while (finalYear > START_YEAR) {
    let endYear = dayjs(finalYear)
      .subtract(YEAR_DIFFERENCE, "year")
      .format("YYYY");
    timeperiodArray.push({
      label: `${endYear}-${finalYear}`,
      value: `${endYear}-${finalYear}`,
    });
    finalYear = endYear;
  }

  return timeperiodArray;
};

