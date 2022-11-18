import dayjs from 'dayjs';

//
import { DEFAULT_TIME_PERIOD_END_YEAR, DEFAULT_TIME_PERIOD_START_YEAR, YEAR_DIFFERENCE } from './constants';

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

export const getTimeperiod = (start?: number, end?: number) => {
  const START_YEAR = start ? String(start) : DEFAULT_TIME_PERIOD_START_YEAR;

  let finalYear = end ? String(end) : DEFAULT_TIME_PERIOD_END_YEAR;

  let timeperiodArray = [];

  while (finalYear > START_YEAR) {
    const endYear = dayjs(finalYear)
      .subtract(YEAR_DIFFERENCE, "year")
      .format("YYYY");
    const timeperiod = `${endYear}-${finalYear}`;
    timeperiodArray.push({
      label: timeperiod,
      value: timeperiod,
    });

    finalYear = dayjs(endYear)
      .subtract(1, "year")
      .format("YYYY");
  }

  return timeperiodArray;
};

