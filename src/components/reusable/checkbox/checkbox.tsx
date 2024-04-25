import React from "react";
import CheckBoxOnIcon from "../../icons/miscs/checkbox-on";
import CheckBoxOffIcon from "../../icons/miscs/checkbox-off";
// import PopOverHover from "../tooltip";

interface CheckBoxButtonsProps {
  options: RadioButtonOption[];
  activeModes: string[];
  handleModeChange: (modes: string[]) => void;
  classNames?: {
    label?: string;
    component?: string;
  };
}

interface RadioButtonOption {
  label: string;
  value: string;
  desc?: string;
}

export default function CheckBoxButtons(props: CheckBoxButtonsProps) {
  const { options, activeModes, handleModeChange } = props;

  const handleCheckboxChange = (mode: RadioButtonOption) => {
    const isChecked = activeModes.includes(mode.value);
    if (isChecked) {
      handleModeChange(activeModes.filter((item) => item !== mode.value));
    } else {
      handleModeChange([...activeModes, mode.value]);
    }
  };

  return (
    <div className={props.classNames?.component}>
      {options.map((mode) => (
        <div
          className="flex items-center cursor-pointer group"
          key={mode.value}
          onClick={() => handleCheckboxChange(mode)}
        >
          <input
            type="checkbox"
            checked={activeModes.includes(mode.value)}
            onChange={() => handleCheckboxChange(mode)}
            className="hidden"
          />
          <span className="inline-block mr-1">
            {activeModes.includes(mode.value) ? (
              <CheckBoxOnIcon className="text-primary-500 group-hover:text-primary-600" />
            ) : (
              <CheckBoxOffIcon className="text-gray-600 group-hover:text-gray-700" />
            )}
          </span>

          <span className={`${props?.classNames?.label}`}>
            {mode.label}
            {/* {
              mode.desc &&
              <PopOverHover desc={mode.desc} />
            } */}
          </span>
        </div>
      ))}
    </div>
  );
}
