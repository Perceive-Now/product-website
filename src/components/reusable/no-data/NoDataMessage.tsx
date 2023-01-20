//
import { InfoIcon } from "../../icons";

//
export default function NoDataMessage(props: INoDataMessageProps) {
  return (
    <div className="w-full min-h-[300px] text-center flex flex-col justify-center items-center">
      <InfoIcon fontSize={52} className="mb-3" />

      <p className="description">
        <span>No data available for the selected time period</span>

        {props.years ? <span className="font-semibold"> ({props.years})</span> : "!"}
      </p>
    </div>
  );
}

//
interface INoDataMessageProps {
  years?: string;
}
