import { useQuery } from "@tanstack/react-query";
import ArrowLeftIcon from "../../../../components/icons/common/arrow-left";
import Button from "../../../../components/reusable/button";
import { getProducts } from "../../../../utils/api/product";
import { useEffect, useState } from "react";
// import CircleLoader from "../../../../components/reusable/loader";
import axiosInstance from "../../../../utils/axios";
import { API_URL, Auth_CODE } from "../../../../utils/constants";
import StripePayment from "../stripe";
import toast from "react-hot-toast";
import Loading from "../../../../components/reusable/loading";

interface Props {
  changeActiveStep: (step: number) => void;
}

// const SubscriptionPlans = [
//   {
//     title: "Basic",
//     plan: "$200/month",
//     description: [
//       "Reports at $1780 each with rollover",
//       "Dashboard with summaries",
//       "Latest research insights",
//       "Visual data highlights",
//     ],
//   },
//   {
//     title: "Pro",
//     plan: "$4,400/month",
//     description: [
//       "Includes all Basic features",
//       "3 reports/month included",
//       "Extra reports at $1480 per report",
//       "Advanced analytics dashboard",
//       "Quarterly trend insights",
//       "Sector-specific updates",
//     ],
//   },
//   {
//     title: "Premium",
//     plan: "$7,800/month",
//     description: [
//       "Includes all Pro features",
//       "10 reports/month included",
//       "Strategic guidance from a dedicated manager",
//       "Custom research on demand",
//       "Detailed trend analysis",
//       "Extra reports at $1180 per report",
//       "Monthly executive summaries",
//       "Full regulatory and impact updates",
//     ],
//   },
// ];

interface IPaymentIntent {
  payment_intent_id: string;
  clientSecret: string;
}

const SubscriptionPlan = ({ changeActiveStep }: Props) => {
  // const [paymentId, setPaymentId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const { data: products, isLoading } = useQuery(["get-product"], async () => {
    return await getProducts();
  });

  // Fetching time period
  useEffect(() => {
    if (!products) return;
    //
  }, [products]);

  const handleSelectProduct = async (productId: number) => {
    try {
      const response = await axiosInstance.post<IPaymentIntent>(
        `${API_URL}/api/create_payment_intent?code=${Auth_CODE}&clientId=default`,
        {
          item_id: productId,
        },
      );
      //
      setClientSecret(response.data.clientSecret);
      // setPaymentId(response.data.payment_intent_id);
    } catch (error) {
      toast.error("Failed to create payment intent");
    }
  };

  return (
    <div className="h-full">
      <Loading isLoading={isLoading} />
      <div className="flex items-center gap-0.5">
        <Button type="default" size="default" handleClick={() => changeActiveStep(2)}>
          <ArrowLeftIcon />
        </Button>
        <h4 className="font-bold text-[22px] text-primary-900">Select your plan</h4>
      </div>
      <div className=" mt-2.5">
        {clientSecret ? (
          <StripePayment clientSecret={clientSecret} changeActiveStep={changeActiveStep} />
        ) : (
          <div className="grid grid-cols-3 gap-2.5">
            {products?.map((plan) => (
              <div
                key={plan.id}
                className="p-2.5 rounded-lg bg-appGray-100 text-secondary-800 h-[481px] flex flex-col justify-between"
              >
                <div>
                  <h6 className="font-bold ">{plan.name}</h6>
                  <p className="text-secondary-800 text-sm font-semibold">${plan.price / 100}</p>
                  <hr className="my-2.5 border-appGray-600 border-1 h-px" />
                  <ul className="list-disc text-sm">
                    {plan.description.split("-").map((d) => (
                      <li key={d} className="ml-2.5 text-sm">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full">
                  <Button
                    handleClick={() => handleSelectProduct(plan.id)}
                    type="secondary"
                    classname="w-full"
                    size="small"
                  >
                    Select
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
