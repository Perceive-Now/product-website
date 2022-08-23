import "./input.css";

/**
 *
 */
export default function Input(props: IInput) {
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
          onChange={(e: any) => handleChange(e.target.value)}
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

interface IInput {
  label?: string;
  type: "textarea";
  placeholder?: string;
  value?: string;
  handleChange: (e: string) => void;
}
