import { InfoIcon } from "../../icons";

/**
 *
 */
export default function NoDataMessage({ years }: INoDataMessageProps) {
  return (
    <div className="w-full min-h-[300px] text-center flex flex-col justify-center items-center">
      <InfoIcon fontSize={52} className="mb-3" />

      <span className="description">
        No funding in the past 5 years ({years})
      </span>
    </div>
  );
}

interface INoDataMessageProps {
  years: string;
}
