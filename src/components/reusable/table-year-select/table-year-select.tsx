import ReactSelect from "react-select";

//
import { ChevronDown } from "../../icons";

//
import "./table-year-select.css";

/**
 *
 */
export default function TableYearSelect(props: ITableYearSelectProps) {
  const handleChange = (year: number) => {
    props.onChange(year);
  };

  const defaultValue = { label: props.placeholder, value: new Date().getFullYear() - 1 };

  const value = props.value ? { label: props.value.toString(), value: props.value } : defaultValue;

  return (
    <div>
      {props.label && <div className="text-appGray-900 mb-1">{props.label}</div>}

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
        value={value}
        isSearchable={false}
        onChange={(item) => item && handleChange(item.value)}
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
    </div>
  );
}

interface IYearItem {
  label: string;
  value: number;
}

//
interface ITableYearSelectProps {
  label?: string;
  value: number;
  placeholder: string;
  options: IYearItem[];
  onChange: (value: number) => void;
}
