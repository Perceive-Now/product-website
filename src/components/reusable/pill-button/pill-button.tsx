import classNames from "classnames";

export default function PillButton({
  isActive,
  label,
  className,
  //
  handleOnClick,
}: IPillButtonsProps) {
  return (
    <div
      className={classNames(
        "border-2 cursor-pointer border-primary-900 px-2 py-0.5 bg-white text-center rounded-2xl w-fit",
        isActive && "bg-primary-900 text-white",
        className
      )}
      onClick={handleOnClick}
    >
      {label}
    </div>
  );
}

interface IPillButtonsProps {
  isActive: boolean;
  label: string;
  className?: string;
  //
  handleOnClick: () => void;
}
