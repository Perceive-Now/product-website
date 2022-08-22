import { PropsWithChildren } from "react";

/**
 *
 */
export default function Input(props: PropsWithChildren<IInput>) {
  const inputType = props.type;
  const label = props.label;
  const placeholder = props.placeholder;
  const value = props.value;
  const handleChange = props.handleChange;

  let inputRender;

  switch (inputType) {
    case "textarea":
      inputRender = (
        <textarea
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          rows={8}
        />
      );
      break;

    default:
      inputRender = null;
      break;
  }

  return (
    <div>
      {label && (
        <div className="text-appGray-900 mb-0.5 font-semibold">{label}</div>
      )}

      {inputRender}
    </div>
  );
}

type InputType = "textarea";
interface IInput {
  label?: string;
  type: InputType;
  placeholder?: string;
  value: string | number | readonly string[] | undefined;
  handleChange: (e: any) => void;
}
