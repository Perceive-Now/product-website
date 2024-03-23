import classNames from "classnames";
import "./input.css";

/**
 *
 */
export default function Input(props: IInput) {
  const inputType = props.type ?? "text";
  const label = props.label;
  const placeholder = props.placeholder;
  const value = props.value;
  const name = props.name;
  const id = props.id || props.name;
  const register = props.register;
  const error = props.error;
  const handleChange = props.handleChange;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (event: any) => {
    if (register) {
      register(name).onChange(event);
    }
    if (handleChange) {
      handleChange(event.target.value);
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
          className={classNames(
            "rounded-lg w-full placeholder:text-sm",
            error
              ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
              : "input-field",
          )}
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
          className={classNames(
            "w-full rounded-lg placeholder:text-sm",
            error
              ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
              : "input-field",
          )}
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
      {label && <div className="text-appGray-900 mb-0.5 font-semibold">{label}</div>}

      {inputRender}

      {error?.message && <div className="mt-1 text-xs text-danger-500">{error.message}</div>}
    </div>
  );
}

interface IInput {
  label?: string;
  id?: string;
  name?: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  value?: string;
  handleChange?: (e: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}
