import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import StripePayment from "../../../../../pages/authentication/signup/stripe";
import { getProducts } from "../../../../../utils/api/product";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../hooks/redux";

// interface Props {
//   changeActiveStep: (step: number) => void;
// }

const Payment = () => {
  const navigate = useNavigate();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  // const clientSecret = sessionStorage.getItem("clientSecret");
  const ItemId = useMemo(() => sessionDetail?.plans, [sessionDetail?.plans]);
  const clientSecret = useMemo(() => sessionDetail?.client_secret, [sessionDetail?.client_secret]);

  const { data: products } = useQuery(["get-product"], async () => {
    return await getProducts();
  });

  // Fetching time period
  useEffect(() => {
    if (!products) return;
    //
  }, [products]);

  const selectedReports = products?.filter((p) => ItemId?.includes(p.id));

  useEffect(() => {
    if (!clientSecret && !selectedReports) {
      navigate("/");
    }
  }, [clientSecret, navigate, selectedReports]);

  return (
    <div>
      {clientSecret && selectedReports && (
        <StripePayment clientSecret={clientSecret} selectedPlan={selectedReports} />
      )}
    </div>
  );
};

export default Payment;
