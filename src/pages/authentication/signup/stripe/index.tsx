import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//
import StripePaymentForm from "./stripe-form";

//
import { AppConfig } from "src/config/app.config";

//
import { IProducts } from "../../../../utils/api/product";

interface Props {
  clientSecret: string;
  changeActiveStep?: (step: number) => void;
  selectedPlan: IProducts[];
}

const STRIPE_PROMISE = AppConfig.STRIPE_PUBLISHABLE_KEY;

/**
 *
 */
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
