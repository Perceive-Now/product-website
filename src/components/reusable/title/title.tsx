import classNames from "classnames";

interface ITitleProps {
  text: string;
  className?: string;
}

export default function Title({ text, className }: ITitleProps) {
  return (
    <h1 className={classNames("text-5xl font-extrabold text-[#120824]", className)}>{text}</h1>
  );
}
