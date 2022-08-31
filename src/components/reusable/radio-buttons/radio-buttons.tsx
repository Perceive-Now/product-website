import { RadioOffIcon, RadioOnIcon } from "../../icons";

export default function RadioButtons({
  options,
  activeMode,
  handleModeChange,
}: IRadioButtons) {
  return (
    <div className="flex">
      {options.map((mode) => {
        const isSelected = mode.value === activeMode;
        return (
          <div
            className="flex items-center ml-3 cursor-pointer"
            key={mode.value}
            onClick={() => handleModeChange(mode.value)}
          >
            <span className="block mr-1">
              {isSelected ? <RadioOnIcon /> : <RadioOffIcon />}
            </span>
            <span className="capitalize text-gray-600">{mode.label}</span>
          </div>
        );
      })}
    </div>
  );
}

type RadioButtonOption = {
  label: string;
  value: string;
};
interface IRadioButtons {
  options: RadioButtonOption[];
  activeMode: string;
  handleModeChange: (mode: string) => void;
}
