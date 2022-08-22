import { PropsWithChildren } from "react";

/**
 *
 */
export default function Input(props: PropsWithChildren<IInput>) {
  const inputType = props.type ?? "text";
  const label = props.label;
  const placeholder = props.placeholder;
  const value = props.value;
  const name = props.name;
  const id = props.id || props.name;
  const register = props.register;
  const error = props.error;
  const handleChange = props.handleChange;

  const handleInputChange = (event: any) => {
    register(name).onChange(event);
    if (handleChange) {
      handleChange(event);
    }
  };

  let inputRender;

  switch (inputType) {
    case "text":
    case "email": {
      inputRender = (
        <input
          id={id}
          name={name}
          {...(register ? register(name) : {})}
          className="input-field"
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
        />
      );
      break;
    }
    case "textarea":
      inputRender = (
        <textarea
          id={id}
          name={name}
          {...(register ? register(name) : {})}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
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
      {error?.message && (
        <div className="mt-1 text-xs text-danger-500">{error.message}</div>
      )}
    </div>
  );
}

type InputType = "text" | "email" | "textarea";
interface IInput {
  label?: string;
  id?: string;
  name?: string;
  type?: InputType;
  placeholder?: string;
  value?: string | number | readonly string[] | undefined;
  handleChange?: (e: any) => void;
  register?: any;
  error?: any;
}
