import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import {
  handleSubscriptionPayment,
  ISubscriptionBody,
  ISubscriptionPayment,
} from "../../utils/api/subscription";
import Button from "../reusable/button";
import PaymentOption from "./@payment/PaymentOption";

//
export default function PaymentStep(props: ISignupStepProps) {
  const { baseProduct, selectedAddOns } = useAppSelector((state) => state.subscription);
  const [paymentObject, setPaymentObject] = useState<ISubscriptionPayment | null>(null);

  const { mutate, isLoading: isPayWithStripeLoading } = useMutation(handleSubscriptionPayment);

  const totalPrice = selectedAddOns.reduce((acc, cur) => {
    return +acc + +(cur.price ?? 0);
  }, baseProduct.price ?? 0);

  const handlePayWithStripe = () => {
    if (baseProduct.pkid) {
      const body: ISubscriptionBody = {
        duration: "MONTH",
        is_trial: true,
        product: {
          price: baseProduct.pkid,
        },
        addons: selectedAddOns.map((addOn) => ({
          price: addOn.pkid ?? "",
        })),
      };

      mutate(
        { body: body },
        {
          onSuccess: (response) => {
            const data = response.data;
            setPaymentObject(data);
          },
        },
      );
    }
  };

  const handleStripePayment = async () => {
    if (paymentObject) {
      const stripe = await loadStripe(paymentObject?.stripe_pub_key);
      // Redirect to Stripe Checkout
      if (stripe) {
        return stripe.redirectToCheckout({
          sessionId: paymentObject?.checkout_session_id,
        });
      }
    }
  };

  return (
    <div className="p-2 md:p-5 w-full lg:max-w-5xl">
      <div>
        <PaymentOption />
      </div>

      <div className="mt-10 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <Button
            type="primary"
            handleClick={handlePayWithStripe}
            disabled={isPayWithStripeLoading}
          >
            {isPayWithStripeLoading ? <span>Loading ... </span> : "Pay with Stripe"}
          </Button>
        </div>

        <div className="col-span-1">
          <div className="flex justify-between">
            <div>
              <div className="text-2xl">{baseProduct.title}</div>
              <div className="text-xs text-gray-600">Quick access Dashboard</div>
            </div>

            <div className="text-2xl">
              ${baseProduct.price ? Math.round(+baseProduct.price) : null}
            </div>
          </div>

          <div className="mt-2">
            {selectedAddOns.length > 0 && (
              <>
                <div className="font-bold mb-2">Deep Search Add-ons:</div>

                <div>
                  {selectedAddOns.map((addOn) => {
                    return (
                      <div key={addOn.pkid} className="flex justify-between mb-1">
                        <div>{addOn.title}</div>
                        <div>${addOn.price ? Math.round(+addOn.price) : null}</div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            <div className="border-t-2 border-gray-400" />

            <div className="flex justify-between mb-1 mt-2">
              <div className="font-bold text-xl">Total</div>
              <div className="font-bold text-xl">${totalPrice}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-x-2 mt-10">
        <Button type="secondary" rounded="full" handleClick={() => props.handlePrevious()}>
          Go Back
        </Button>

        <Button
          disabled={!paymentObject}
          type="optional"
          rounded="full"
          handleClick={handleStripePayment}
        >
          Pay
        </Button>
      </div>
    </div>
  );
}

//
interface ISignupStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (values?: any) => void;
  handlePrevious: () => void;
}
