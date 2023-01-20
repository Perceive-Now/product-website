import dayjs from "dayjs";

//
interface IFormatNumberOptions {
  maxFraction?: number;
  isCurrency?: boolean;
}

/**
 *
 */
export const formatNumber = (number: number, options?: IFormatNumberOptions) => {
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

/**
 *
 */
export const getTimeperiod = (end?: number | string) => {
  const YEAR_DIFFERENCE = 4;

  const currentYear = new Date().getFullYear();

  //
  let startYear = currentYear.toString();
  const MIN_YEAR = end ?? (currentYear - 4).toString();

  const timeperiodArray = [];

  //
  while (startYear >= MIN_YEAR) {
    const endYear = dayjs(startYear).subtract(YEAR_DIFFERENCE, "year").format("YYYY");

    timeperiodArray.push({
      label: `${endYear}-${startYear}`,
      value: `${endYear}-${startYear}`,
    });

    startYear = dayjs(endYear).subtract(1, "year").format("YYYY");
  }

  return timeperiodArray;
};
