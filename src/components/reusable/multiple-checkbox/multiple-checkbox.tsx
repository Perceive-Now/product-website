import { ChangeEvent, FunctionComponent, useCallback } from "react";

interface Props {
  topics: CheckBoxOption[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;
  value: Array<string | number>;
}
interface CheckBoxOption {
  value: number | string;
  label: string;
}

export const MultipleCheckbox: FunctionComponent<Props> = ({ topics, onChange, value }) => {
  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const updatedValue = [...value];
      if (e.target.checked) {
        updatedValue.push(e.target.value.toString());
        onChange(updatedValue);
      } else {
        const filteredValue = updatedValue.filter(
          (v) => v.toString() !== e.target.value.toString(),
        );
        onChange(filteredValue);
      }
    },
    [onChange, value],
  );

  return (
    <div className="mt-2 flex items-center gap-x-3">
      {topics.map((data) => (
        <div className="flex items-center" key={data.value}>
          <input
            id={data.label}
            value={data.value}
            onChange={handleOnChange}
            checked={value.includes(data.value.toString())}
            type="checkbox"
            className="w-2 h-2 text-blue-600 bg-gray-100 border-gray-300  focus:ring-0 focus:outline-none focus:ring-white"
          />
          <label htmlFor={data.label} className="ml-1 text-sm font-medium text-gray-500 ">
            {data.label}
          </label>
        </div>
        // <div className="flex " key={data.value}>
        //   <label className="space-x-3">
        //     <input
        //       type='checkbox'
        //       value={data.value}
        //       onChange={handleOnChange}
        //       checked={value.includes(data.value.toString())}
        //       className="w-2 h-2 text-blue-600 bg-gray-100 border-gray-300  focus:ring-0 focus:outline-none focus:ring-white"
        //     />
        //     <span className="text-gray-800">{data.label}</span>
        //   </label>
        // </div>
      ))}
    </div>
  );
};
