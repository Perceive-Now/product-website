import { RadioOffIcon, RadioOnIcon } from "../../icons";

/*
 *
 **/
export default function RadioButtons(props: IRadioButtons) {
  const { options, activeMode, handleModeChange } = props;

  return (
    <div className="flex gap-x-3 flex-column">
      {options.map((mode) => (
        <div
          className="flex items-center cursor-pointer group"
          key={mode.value}
          onClick={() => handleModeChange(mode.value)}
        >
          <span className="block mr-1">
            {mode.value === activeMode ? (
              <RadioOnIcon className="text-primary-500 group-hover:text-primary-600" />
            ) : (
              <RadioOffIcon className="text-gray-600 group-hover:text-gray-700" />
            )}
          </span>

          <span className={`text-gray-800 ${props?.classNames}`}>{mode.label}</span>
        </div>
      ))}
    </div>
  );
}

//
type RadioButtonOption = {
  label: string;
  value: string;
};

interface IRadioButtons {
  options: RadioButtonOption[];
  activeMode: string;
  handleModeChange: (mode: string) => void;
  classNames?: string;
}
