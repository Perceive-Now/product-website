import { ChangeEvent, FunctionComponent, useCallback } from "react";
import { ICheckBoxValue } from "../../../@types/utils/IExtras";

interface Props {
  topics: CheckBoxOption[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;
  value: ICheckBoxValue[];
  classname?: any;
}
interface CheckBoxOption {
  value: number | string;
  label: string;
}

export const MultipleCheckbox: FunctionComponent<Props> = ({
  topics,
  onChange,
  value,
  classname,
}) => {
  // const handleOnChange = useCallback(
  //   (e: ChangeEvent<HTMLInputElement>) => {
  //     const updatedValue = [...value];
  //     const { value: checkboxValue, checked } = e.target;
  //     if (checked) {
  //       console.log(checked)
  //       // updatedValue.push(e.target.value.toString());
  //       updatedValue.push({ value: checkboxValue, label: e.target.id });
  //       onChange(updatedValue);

  //     } else {

  //       const filteredValue = updatedValue.filter(
  //         (item) => item.value !== checkboxValue
  //       );
  //       onChange(filteredValue);
  //     }
  //     console.log(updatedValue)

  //   },
  //   [onChange, value],
  // );
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value: checkboxValue, checked } = e.target;

      onChange((prevValue: Array<{ value: string | number; label: string }>) => {
        if (checked) {
          // Add the new checkbox value and label
          return [...prevValue, { value: checkboxValue, label: e.target.id }];
        } else {
          // Remove the checkbox value and label
          return prevValue.filter(
            (item) =>
              item.value.toString() !== checkboxValue.toString() || item.label !== e.target.id,
          );
        }
      });
    },
    [onChange],
  );
  return (
    <div className={classname === undefined ? "mt-2 flex items-center gap-x-3" : classname}>
      {topics.map((data) => (
        <div className="flex items-center" key={data.value}>
          <input
            id={data.label}
            value={data.value}
            onChange={handleOnChange}
            checked={value.some((item) => item.value === data.value && item.label === data.label)}
            type="checkbox"
            className="w-2 h-2 text-primary-600 bg-gray-100 border-primary-900 border focus:ring-0 focus:outline-none focus:ring-primary-900"
          />
          <label htmlFor={data.label} className="ml-1 text-sm font-medium text-gray-500 ">
            {data.label}
          </label>
        </div>
      ))}
    </div>
  );
};
