import classNames from "classnames";
import Select, { MenuPosition } from "react-select";

const controlStyles = {
  base: "border border-appGray-600 rounded-xl bg-white hover:cursor-pointer",
  focus: "border border-appGray-600 ring-1 ring-black",
  nonFocus: "border-appGray-600 hover:border-appGray-600",
  disabled: "opacity-50 cursor-not-allowed",
};
const placeholderStyles = "leading-7 text-black-50 font-500 px-0.5";
const selectInputStyles = "py-6 text-base ";
const valueContainerStyles = "px-1 gap-1 text-black-50 text-sm py-[8px]";
const singleValueStyles = "leading-7 text-black font-500 px-1";
const indicatorsContainerStyles = "gap-1";
const clearIndicatorStyles = "text-black-50 -mr-3";
const indicatorSeparatorStyles = "hidden";
const dropdownIndicatorStyles = "";
// hover:bg-gray-medium text-primary rounded-v1 hover:text-black h-6 w-6
const menuStyles =
  "p-1 mt-0 bg-white rounded-v1 text-black-50 text-sm font-500 vverse-scroller z-20";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-black-50 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer py-2 rounded",
  focus: "bg-primary-900 active:bg-primary-900 border-none",
  selected: "bg-primary-900 text-black-50",
  disabled: "opacity-50 cursor-not-allowed",
};
const noOptionsMessageStyles =
  "text-black-50 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

interface IOption {
  value: string | number;
  label: string;
}

interface Props {
  options?: IOption[];
  onChange: any;
  // onChange: (selectedValues: IOption | IOption[] | null) => void;
  value: IOption | null;
  // isMulti?: boolean;
  isSearchable?: boolean;
  disabled?: boolean;
  isClearable?: boolean;
  position?: "fixed" | "";
  name?: string;
  error?: any; // Add error prop here
  touched?: boolean; // Add touched prop here
  placeholder?: any;
}

export default function SelectBox({
  options,
  onChange,
  value,
  // isMulti,
  isSearchable,
  disabled,
  isClearable,
  position,
  error,
  touched,
  placeholder,
}: Props) {
  const handleSelectChange = (selectedOption: IOption | IOption[] | null) => {
    onChange(selectedOption);
  };

  return (
    <Select
      options={options}
      className={classNames(touched || error ? "error-react-select" : "")}
      onChange={handleSelectChange}
      value={value}
      isClearable={isClearable !== undefined ? isClearable : true}
      isDisabled={disabled}
      isSearchable={isSearchable || true}
      placeholder={placeholder || "Select an options"}
      menuPosition={position || ("" as MenuPosition)}
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base, { isFocused }) => ({
          ...base,
          transition: "none",
          borderColor: isFocused ? "#E5E5E5" : "",
          boxShadow: "none",
          "&:hover": {
            borderColor: touched || error ? "red" : "",
          },
        }),
      }}
      classNames={{
        control: ({ isFocused }) =>
          classNames(isFocused ? controlStyles.focus : controlStyles.nonFocus, controlStyles.base),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          classNames(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base,
            disabled && optionStyles.disabled,
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
    />
  );
}
