import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../../../components/reusable/button";
import { IProduct } from "../../../../utils/api/product";
import StripeImage from "../../../../assets/images/stripe.svg";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setSession } from "../../../../stores/session";
import { getNewSession } from "../../../../stores/auth";

interface Props {
  changeActiveStep?: (step: number) => void;
  selectedPlan: IProduct[];
}

/**
 *
 *
 */

const StripePaymentForm = ({ selectedPlan }: Props) => {
  const dispatch = useAppDispatch();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session);

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const TotalPrice = selectedPlan.map((p) => p.price).reduce((acc, curr) => acc + curr, 0);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      toast.error("Stripe or Elements not initialized");
      return;
    }
    // try {
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      // confirmParams: {
      //   return_url: 'https://your-return-url.com',
      // },
    });
    if (result.error) {
      toast.error(result.error.message || "Payment is failed!");
      // setMessage(result.error.message ?? '');
      setIsLoading(false);
    } else {
      toast.success("Your Payment is Successful!");
      sessionStorage.setItem("clientSecret", "");

      dispatch(
        setSession({
          session_data: {
            last_session_id: sessionDetail?.session_id,
            use_cases: [],
            user_chat: {
              question: "",
              question_id: 0,
              example_answer: "",
              answer: "",
            },
            step_id: 0,
            common_question_id: 0,
            question_id: 0,
          },
        }),
      );
      dispatch(getNewSession());

      navigate("/stay-tuned");
      setIsLoading(false);
    }
    // }
    // catch (error) {
    //   toast.error("Failed to add card.");
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="grid grid-cols-2 bg-appGray-100 p-[40px] gap-8 w-full rounded-lg">
      <div className="space-y-3">
        <div className="space-y-[20px]">
          <p>Please select a payment method.</p>
          <div className="bg-white rounded inline-block px-4 py-1">
            <img src={StripeImage} alt="Stripe" />
          </div>
        </div>
        <div>
          <p className="capitalize text-sm pb-1">SELECTED PLAN</p>
          {selectedPlan.map((plan) => (
            <div key={plan.id} className="pb-1">
              <div className="flex items-center justify-between  font-semibold">
                <span>{plan.name}</span>
                <span>${plan.price / 100}</span>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 font-semibold border-t border-black">
            <span>Total</span>
            <span>${TotalPrice / 100}</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div className="mt-4">
          <Button type="primary" size="small" classname="text-sm w-full" loading={isLoading}>
            {isLoading ? <span>Processing</span> : <span>Confirm</span>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StripePaymentForm;
