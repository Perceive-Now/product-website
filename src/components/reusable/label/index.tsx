import React, { FunctionComponent, PropsWithChildren } from "react";

interface Props {
  className?: string;
  label?: string;
  required?: boolean;
  children?: any;
}

const Label: FunctionComponent<PropsWithChildren<Props>> = ({
  className,
  label,
  required,
  children,
}) => {
  return (
    <div className="pb-0.5">
      <span className={className}>
        {label}
        {children}
      </span>
      {required && <span className="font-bold">*</span>}
    </div>
  );
};

export default Label;
