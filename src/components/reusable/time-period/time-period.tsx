import ReactSelect from "react-select";
import type { SingleValue } from "react-select";

//
import { ChevronDown } from "../../icons";

//
import "./time-period.css";

/*
 *
 **/
export default function TimePeriod(props: ITimePeriodProps) {
  const handleChange = (item: SingleValue<ITimePeriodItem>) => {
    props.onChange(item);
  };

  //
  const defaultValue = { label: "Select a period", value: "" };

  //
  return (
    <ReactSelect
      className="time-period-select"
      classNamePrefix="select"
      components={{
        DropdownIndicator: () => <ChevronDown className="text-primary-600" />,
        IndicatorSeparator: () => null,
      }}
      name="time-period"
      options={props.timePeriods}
      defaultValue={defaultValue}
      value={props.value ?? defaultValue}
      isSearchable={false}
      onChange={handleChange}
      styles={{
        option: (styles, { isFocused, isSelected, isDisabled }) => {
          return {
            ...styles,
            backgroundColor: isFocused || isSelected ? "rgb(225,213,242)" : "#fff",
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

//
interface ITimePeriodProps {
  value: ITimePeriodItem | null;
  timePeriods: ITimePeriodItem[];
  onChange: (value: ITimePeriodItem | null) => void;
}
