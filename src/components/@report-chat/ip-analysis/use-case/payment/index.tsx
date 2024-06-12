import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

import StripePayment from "../../../../../pages/authentication/signup/stripe";
import { getProducts } from "../../../../../utils/api/product";
import { useAppSelector } from "../../../../../hooks/redux";
import BackButton from "../../../../../components/reusable/back-button";
import DefaultProgressBar from "../../../../../components/reusable/default-progress";
import Loading from "src/components/reusable/loading";

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
    <div className="">
      <BackButton path={"q&a"} />
      <h5 className="text-5xl font-[800] my-2">Payment</h5>
      <DefaultProgressBar width={100} />
      {clientSecret === undefined || selectedReports === undefined ? (
        <Loading isLoading={clientSecret === undefined || selectedReports === undefined} />
      ) : (
        <div className="w-[932px] mx-auto flex justify-center items-center  shadow border rounded-md bg-white h-full">
          {clientSecret && selectedReports && (
            <StripePayment clientSecret={clientSecret} selectedPlan={selectedReports} />
          )}
        </div>
      )}
    </div>
  );
};

export default Payment;
