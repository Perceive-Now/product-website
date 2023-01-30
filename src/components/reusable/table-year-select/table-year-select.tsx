import ReactSelect from "react-select";
import type { SingleValue } from "react-select";

//
import { ChevronDown } from "../../icons";

//
import "./table-year-select.css";

/**
 *
 */
export default function TableYearSelect(props: ITableYearSelectProps) {
  const handleChange = (item: SingleValue<IYearItem>) => {
    props.onChange(item);
  };

  const defaultValue = { label: props.placeholder, value: null };

  return (
    <ReactSelect
      className="table-year-select"
      classNamePrefix="select"
      components={{
        DropdownIndicator: () => <ChevronDown className="text-primary-600" />,
        IndicatorSeparator: () => null,
      }}
      name="table-year"
      options={props.options}
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

export interface IYearItem {
  label: string;
  value: number | null;
}

//
interface ITableYearSelectProps {
  value: IYearItem | null;
  placeholder: string;
  options: IYearItem[];
  onChange: (value: IYearItem | null) => void;
}
