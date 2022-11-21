import {
  DEFAULT_TIME_PERIOD_END_YEAR,
  YEAR_DIFFERENCE,
} from "../../../utils/constants";

//
import { InfoIcon } from "../../icons";

/**
 *
 */
export default function NoDataMessage({ years }: INoDataMessageProps) {
  const displayYearData =
    years ||
    `${
      DEFAULT_TIME_PERIOD_END_YEAR - YEAR_DIFFERENCE
    } - ${DEFAULT_TIME_PERIOD_END_YEAR} `;

  return (
    <div className="w-full min-h-[300px] text-center flex flex-col justify-center items-center">
      <InfoIcon fontSize={52} className="mb-3" />

      <span className="description">
        No funding in the past 5 years ({displayYearData})
      </span>
    </div>
  );
}

interface INoDataMessageProps {
  years: string;
}
