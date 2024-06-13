import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PROMISE } from "../../../../utils/constants";

import StripePaymentForm from "./stripe-form";
import { loadStripe } from "@stripe/stripe-js";
import { IProducts } from "../../../../utils/api/product";

interface Props {
  clientSecret: string;
  changeActiveStep?: (step: number) => void;
  selectedPlan: IProducts[];
}

const StripePayment = ({ clientSecret, changeActiveStep, selectedPlan }: Props) => {
  return (
    <div className="w-full">
      {STRIPE_PROMISE && clientSecret && (
        <Elements stripe={loadStripe(STRIPE_PROMISE)} options={{ clientSecret }}>
          <StripePaymentForm selectedPlan={selectedPlan} changeActiveStep={changeActiveStep} />
        </Elements>
      )}
    </div>
  );
};

export default StripePayment;
