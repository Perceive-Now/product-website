import React from "react";
import classNames from "classnames";
import { InfoIcon } from "../../icons";
import MinusIcon from "../../icons/common/minus";
import AddIcon from "../../icons/common/add-icon";

interface CheckBoxButtonsProps {
  options: RadioButtonOption[];
  activeModes: string[];
  handleModeChange: (modes: string[]) => void;
  classNames?: {
    label?: string;
    component?: string;
  };
  hasDemoButton?: boolean;
}

interface RadioButtonOption {
  label: string;
  value: string;
  desc?: string;
}

export default function UseCaseSelectButton(props: CheckBoxButtonsProps) {
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
      {options.map((mode, idx) => (
        <div
          className={classNames(
            "relative flex justify-between items-center cursor-pointer rounded-md py-1 text-sm px-2",
            activeModes.includes(mode.value)
              ? "bg-primary-900 text-white border border-primary-900"
              : "bg-white border-appGray-200 border text-secondary-800 hover:bg-appGray-200",
          )}
          key={mode.value}
          onClick={() => handleCheckboxChange(mode)}
        >
          <input
            type="checkbox"
            checked={activeModes.includes(mode.value)}
            onChange={() => handleCheckboxChange(mode)}
            className="hidden"
          />
          <div className={classNames(props?.classNames?.label, "flex")}>
            {mode.label}
            <InfoIcon className="h-2 w-2" />
          </div>
          <span
            className={classNames(
              "rounded",
              activeModes.includes(mode.value)
                ? "bg-white text-primary-900"
                : "bg-primary-900 text-white",
            )}
          >
            {activeModes.includes(mode.value) ? (
              <MinusIcon className="h-2 w-2" />
            ) : (
              <AddIcon className="h-2 w-2" />
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
