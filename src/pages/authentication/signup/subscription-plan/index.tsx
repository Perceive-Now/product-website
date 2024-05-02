import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import ArrowLeftIcon from "../../../../components/icons/common/arrow-left";

import Button from "../../../../components/reusable/button";
import Loading from "../../../../components/reusable/loading";

import { IProduct, getProducts } from "../../../../utils/api/product";

import axiosInstance from "../../../../utils/axios";

import { API_URL, Auth_CODE } from "../../../../utils/constants";

import StripePayment from "../stripe";

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
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<IProduct>();

  const ItemId = sessionStorage.getItem("UseCaseId");

  const { data: products, isLoading } = useQuery(["get-product"], async () => {
    return await getProducts();
  });

  // Fetching time period
  useEffect(() => {
    if (!products) return;
    //
  }, [products]);

  const handleSelectProduct = useCallback(
    async (plan: IProduct) => {
      setLoading(true);
      setSelectedPlan(plan);
      try {
        const response = await axiosInstance.post<IPaymentIntent>(
          `${API_URL}/api/create_payment_intent?code=${Auth_CODE}&clientId=default`,
          {
            item_id: ItemId,
          },
        );
        //
        setLoading(false);
        setClientSecret(response.data.clientSecret);
        // setPaymentId(response.data.payment_intent_id);
      } catch (error) {
        setLoading(false);
        toast.error("Failed to create payment intent");
      }
    },
    [ItemId],
  );

  const handleChange = useCallback(() => {
    if (clientSecret) {
      setClientSecret("");
    } else {
      changeActiveStep(2);
    }
  }, [changeActiveStep, clientSecret]);

  return (
    <div className="h-full">
      <Loading isLoading={isLoading} />
      <div className="flex items-center gap-0.5">
        <Button type="default" size="default" handleClick={handleChange}>
          <ArrowLeftIcon />
        </Button>
        <h4 className="font-bold text-[22px] text-primary-900">
          {clientSecret ? "Complete your payment" : "Select your plan"}
        </h4>
      </div>
      <div className=" mt-2.5">
        {clientSecret && selectedPlan ? (
          <StripePayment
            clientSecret={clientSecret}
            changeActiveStep={changeActiveStep}
            selectedPlan={selectedPlan as any}
          />
        ) : (
          <div className="grid grid-cols-3 gap-2.5">
            {products?.map((plan) => (
              <div
                key={plan.id}
                className="p-2.5 rounded-lg bg-appGray-100 text-secondary-800 h-[481px] flex flex-col justify-between"
              >
                <div>
                  <h6 className="font-bold line-clamp-1">{plan.name}</h6>
                  <p className="text-secondary-800 text-sm font-semibold pt-1">
                    ${plan.price / 100}
                  </p>
                  <hr className="my-2 border-appGray-600 border-1 h-px" />
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
                    handleClick={() => handleSelectProduct(plan)}
                    type="secondary"
                    classname="w-full"
                    size="small"
                    loading={plan.id === selectedPlan?.id && loading}
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
