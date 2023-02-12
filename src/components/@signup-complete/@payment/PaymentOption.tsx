import { PaymentCardIcon } from "../../icons";

export default function PaymentOption() {
  return (
    <div className="px-2 py-1 text-white bg-primary-900 rounded flex items-center w-fit cursor-pointer">
      <PaymentCardIcon />

      <span className="ml-1">Stripe</span>
    </div>
  );
}
