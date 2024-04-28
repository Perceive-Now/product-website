import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PROMISE } from "../../../../utils/constants";

import StripePaymentForm from "./stripe-form";
import { loadStripe } from "@stripe/stripe-js";

interface Props {
  clientSecret: string;
  changeActiveStep: (step: number) => void;
}

const StripePayment = ({ clientSecret, changeActiveStep }: Props) => {
  return (
    <div className="w-4/5 mx-auto mt-10">
      {STRIPE_PROMISE && clientSecret && (
        <Elements stripe={loadStripe(STRIPE_PROMISE)} options={{ clientSecret }}>
          <StripePaymentForm changeActiveStep={changeActiveStep} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
