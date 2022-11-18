import ReactSelect from "react-select";

//
import { getTimeperiod } from "../../../utils/helpers";

//
import { ChevronDown } from "../../icons";

//
import "./time-period.css";

/*
 *
 **/
export default function TimePeriod({
  startYear,
  endYear,
  handleChange,
}: ITimePeriodProps) {
  const timePeriods = getTimeperiod(startYear, endYear);

  return (
    <ReactSelect
      className="time-period-select"
      classNamePrefix="select"
      defaultValue={{ label: "View all periods", value: "" }}
      components={{
        DropdownIndicator: () => <ChevronDown className="text-primary-600" />,
        IndicatorSeparator: () => null,
      }}
      name="time-period"
      options={timePeriods}
      isSearchable={false}
      onChange={handleChange}
      styles={{
        option: (styles, { isFocused, isSelected, isDisabled }) => {
          return {
            ...styles,
            backgroundColor:
              isFocused || isSelected ? "rgb(225,213,242)" : "#fff",
            color: "rgb(68 40 115)",
            cursor: "pointer",
            ":active": {
              ...styles[":active"],
              backgroundColor: !isDisabled
                ? isSelected
                  ? "rgb(225,213,242)"
                  : "#E1D5F2"
                : undefined,
            },
          };
        },
      }}
    />
  );
}

type TimePeriodType = {
  label: string;
  value: string;
};

interface ITimePeriodProps {
  startYear?: number;
  endYear?: number;
  timePeriods?: TimePeriodType[];
  handleChange?: (value: any) => void;
}
