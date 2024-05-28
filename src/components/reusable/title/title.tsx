import classNames from "classnames";
import React from "react";

interface ITitleProps {
  text: string;
  className?: string;
}

export default function Title({ text, className }: ITitleProps) {
  return (
    <h1 className={classNames("text-5xl font-extrabold text-primary-800", className)}>{text}</h1>
  );
}
