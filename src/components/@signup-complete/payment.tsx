import { useMutation } from "@tanstack/react-query";
import { useAppSelector } from "../../hooks/redux";
import { handleSubscriptionPayment, ISubscriptionBody } from "../../utils/api/subscription";
import Button from "../reusable/button";
import PaymentOption from "./@payment/PaymentOption";

//
export default function PaymentStep(props: ISignupStepProps) {
  const { baseProduct, selectedAddOns } = useAppSelector((state) => state.subscription);

  const { mutate } = useMutation(handleSubscriptionPayment);

  const totalPrice = selectedAddOns.reduce((acc, cur) => {
    return +acc + +(cur.price ?? 0);
  }, baseProduct.price ?? 0);

  const handlePayWithStripe = () => {
    if (baseProduct.pkid && selectedAddOns.length) {
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
      mutate({ body: body });
    }
  };

  return (
    <div className="p-2 md:p-5 w-full lg:max-w-5xl">
      <div>
        <PaymentOption />
      </div>

      <div className="mt-10 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <Button type="primary" handleClick={handlePayWithStripe}>
            Pay with Stripe
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

        <Button type="optional" rounded="full" handleClick={() => props.handleNext({})}>
          Continue
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
