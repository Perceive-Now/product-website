import dayjs from "dayjs";
import { US_STATES } from "./constants";
import { v4 as uuidv4 } from "uuid";

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

  const currentYear = new Date().getFullYear() - 1;

  //
  let startYear = currentYear.toString();
  const MIN_YEAR = end || (currentYear - 4).toString();

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

/**
 *
 */
export const errorMessageHandler = (errors: IErrorMessage) => {
  const errorValues = Object.entries(errors);

  // TODO:: Refactor
  // We should show only 1 error and not multiple alerts 😶
  errorValues.forEach(([key, values]) => {
    alert(`${key}: ${values}`);
  });
};

interface IErrorMessage {
  [key: string]: string[];
}

export const getStateFullName = (code: string) => {
  return US_STATES[code];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObjEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}

//

export function convertToBase64String(profile_photo?: string): string | undefined {
  if (!profile_photo) return undefined;

  const [dataType, base64Data] = profile_photo.split("base64/") as [string, string];
  const photo = `data:${dataType};base64,/${base64Data}`;
  return photo;
}

export function generateKnowId() {
  const maxDigits = 8
  const maxValue = 10 ** maxDigits - 1;
  const uniqueInt = Math.floor(Math.random() * (maxValue + 1));

  return uniqueInt;
}

export function generateKnowIdstring() {
  const newUuid = uuidv4();
  return newUuid;
}

export function getRandomErrorMessage() {
  const messages = [
    "I’m sorry, I didn’t quite catch that. Could you please select one of the available options to help me assist you better?",
    "Apologies, I couldn’t process that input. Please choose from the provided options so we can continue smoothly."
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  // Options for formatting the date and time
  const options: any = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
  };

  // Convert to local timezone
  return date.toLocaleString("en-GB", options);
}


export function formatReportDate(datetime: string) {
  const [year, month, day, hour, minute, second] = datetime.split('-').map(Number);

  // Create a Date object
  const date = new Date(year, month - 1, day, hour, minute, second);

  const options: any = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
  };

  // Convert to local timezone
  return date.toLocaleString("en-GB", options);
}

export const arrayBufferDownload = async (response: any) => {
  const arrayBuffer = await response.arrayBuffer();

  // Convert the ArrayBuffer to a Blob
  const blob = new Blob([arrayBuffer]);

  // Create a URL for the Blob
  const blobUrl = URL.createObjectURL(blob);

  // Create an anchor element to trigger download
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = "report.zip";

  // Append the anchor to the body (necessary for Firefox)
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);

}

export function processResponse(response: string) {
  // Extract options inside @@ delimiters
  const options = response.match(/@@(.*?)@@/g)?.map(option => option.replace(/@@/g, '').trim()) || [];

  // Remove extracted options from the response text
  const remainingText = response.replace(/@@(.*?)@@/g, '').trim();

  console.log("SPODPWOEPOWPEOPWO", options, remainingText)

  return { options, remainingText };
}