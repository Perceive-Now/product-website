import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Button from "../../../../components/reusable/button";
import toast from "react-hot-toast";

interface Props {
  changeActiveStep: (step: number) => void;
}

/**
 *
 *
 */

const StripePaymentForm = ({ changeActiveStep }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      toast.error("Stripe or Elements not initialized");
      return;
    }
    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        // confirmParams: {
        //   return_url: 'https://your-return-url.com',
        // },
      });

      // console.log(result)

      if (result.error) {
        // setMessage(result.error.message ?? '');
        setIsLoading(false);
      } else {
        toast.success("Card successfully Added!");
        changeActiveStep(4);
        // Basant, here's where you do the logic of either changing pages or generating the report
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Failed to add card.");
      // setMessage('Error confirming payment');
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="mt-4">
        <Button type="primary" size="small" classname="text-sm" loading={isLoading}>
          {isLoading ? <span>Processing</span> : <span>Add Card</span>}
        </Button>
      </div>
    </form>
  );
};

export default StripePaymentForm;
