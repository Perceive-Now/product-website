import classNames from "classnames";

interface ITitleProps {
  text: string;
  className?: string;
}

export default function Title({ text, className }: ITitleProps) {
  return (
    <h1 className={classNames("text-3xl 2xl:text-5xl font-extrabold text-heroDark-900", className)}>
      {text}
    </h1>
  );
}
