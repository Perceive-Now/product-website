import { useQuery } from "@tanstack/react-query";
import StripePayment from "../../../../../pages/authentication/signup/stripe";
import { getProducts } from "../../../../../utils/api/product";
import { useEffect } from "react";

const Payment = ({ changeActiveStep }: any) => {
  const clientSecret = sessionStorage.getItem("clientSecret");

  const ItemId = sessionStorage.getItem("UseCaseId") as any;

  const { data: products } = useQuery(["get-product"], async () => {
    return await getProducts();
  });

  // Fetching time period
  useEffect(() => {
    if (!products) return;
    //
  }, [products]);

  const selectedReports = products?.filter((p) => ItemId?.includes(p.id));

  return (
    <div>
      {clientSecret && selectedReports && (
        <StripePayment
          clientSecret={clientSecret}
          changeActiveStep={changeActiveStep}
          selectedPlan={selectedReports}
        />
      )}
    </div>
  );
};

export default Payment;
