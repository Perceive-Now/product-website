import classNames from "classnames";
import { PropsWithChildren } from "react";

export default function PaymentOption({
  active,
  handleClick,
  children,
}: PropsWithChildren<IPaymentOptionProps>) {
  return (
    <div
      className={classNames(
        active ? "bg-primary-900 text-white" : "",
        "px-2 py-1 shadow rounded flex items-center w-fit cursor-pointer min-w-[150px]",
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

interface IPaymentOptionProps {
  active: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClick: any;
}
