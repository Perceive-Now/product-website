import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import Button from "../../../../components/reusable/button";

import { IProducts } from "../../../../utils/api/product";

import StripeImage from "../../../../assets/images/stripe.svg";

import { useAppDispatch } from "../../../../hooks/redux";

import { setSession } from "../../../../stores/session";
import { getNewSession } from "../../../../stores/auth";

interface Props {
  changeActiveStep?: (step: number) => void;
  selectedPlan: IProducts[];
}

/**
 *
 *
 */

const StripePaymentForm = ({ selectedPlan }: Props) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  // const TotalPrice = selectedPlan.map((p) => p.price).reduce((acc, curr) => acc + curr, 0);
  const TotalPrice = selectedPlan.reduce((total, item) => {
    if (item.reportPlan === "pro") {
      return total + 995;
    } else if (item.reportPlan === "premium") {
      return total + 1995;
    }
    return total; // In case of an unknown type
  }, 0);

  // useEffect(() => {
  //   const pollPaymentStatus = async () => {
  //     try {
  //       const response = await axiosInstance.get(`${AppConfig.API_URL}/get_payment_status?${AppConfig.Auth_CODE}&clientId=default&payment_intent_id="pi_3PE6vHKOLJKi8SxA0MoVYDPO"`)
  //       // setPaymentStatus(response.data.status);
  //       console.log(response)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   const intervalId = setInterval(pollPaymentStatus, 5000);
  //   return () => clearInterval(intervalId);
  // }, []);

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
      if (result.error?.type === "validation_error" || result.error?.type === "card_error") {
        setIsLoading(false);
      } else {
        toast.error(result.error.message || "Payment is failed!");
        setIsLoading(false);
      }
    } else {
      toast.success("Your Payment is Successful!");
      sessionStorage.setItem("clientSecret", "");
      sessionStorage.setItem("planIds", "");

      dispatch(
        setSession({
          session_data: {
            use_cases: [],
            user_chat: {
              question: "",
              question_id: 0,
              example_answer: "",
              answer: "",
            },
            step_id: 0,
            question_id: 0,
            active_index: 0,
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
    <div className="grid grid-cols-2 bg-white px-2 py-4 gap-8 w-full rounded-lg ">
      <div className="space-y-3">
        <div className="space-y-[20px] font-semibold text-secondary-800">
          <p>Please select a payment method.</p>
          <div className="bg-white rounded inline-block px-4 py-1">
            <img src={StripeImage} alt="Stripe" />
          </div>
        </div>
        <div className="bg-appGray-100 px-2 py-2 rounded-md">
          <p className="capitalize text-sm pb-1">SELECTED REPORT</p>
          {selectedPlan.map((plan) => (
            <div key={plan.id} className="pb-0.5">
              <div className="grid grid-cols-2 text-secondary-800">
                <span>{plan.label}</span>
                <div className="justify-self-end ">
                  <span>{plan.reportPlan === "pro" && "$995"}</span>
                  <span>{plan.reportPlan === "premium" && "$1,995"}</span>
                </div>
                {/* <span>${plan.price / 100}</span> */}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 pb-4 border-t border-[#87888C] text-secondary-800">
            <span>Total</span>
            <span>${TotalPrice}</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <div className="mt-4">
          <Button
            disabled={isLoading || !stripe || !elements}
            type="primary"
            size="small"
            classname="text-sm w-full"
            loading={isLoading}
          >
            {isLoading ? <span>Processing</span> : <span>Confirm</span>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StripePaymentForm;
