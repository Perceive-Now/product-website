import CheckBoxOnIcon from "../../icons/miscs/checkbox-on";
import CheckBoxOffIcon from "../../icons/miscs/checkbox-off";
import PopOverHover from "../tooltip";
import classNames from "classnames";

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
          className="flex  items-center cursor-pointer"
          key={mode.value}
          onClick={() => handleCheckboxChange(mode)}
        >
          <input
            type="checkbox"
            checked={activeModes.includes(mode.value)}
            onChange={() => handleCheckboxChange(mode)}
            className="hidden"
          />
          <span className="mr-1">
            {activeModes.includes(mode.value) ? (
              <CheckBoxOnIcon className="text-white group-hover:text-primary-600" />
            ) : (
              <CheckBoxOffIcon className="text-white group-hover:text-gray-700" />
            )}
          </span>

          <div className={classNames(props?.classNames?.label, "flex")}>
            {mode.label}
            {mode.desc && <PopOverHover desc={mode.desc} />}
          </div>
        </div>
      ))}
    </div>
  );
}
