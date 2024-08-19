import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

//
// import axiosInstance from "../../../utils/axios";
// import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

//
// import { setSession } from "../../../stores/session";
// import { AppConfig } from "src/config/app.config";

// interface IPaymentIntent {
//   payment_intent_id: string;
//   clientSecret: string;
// }

// const Auth_CODE = AppConfig.Auth_CODE;
// const API_URL = AppConfig.API_URL;

/**
 *
 */
const useToPayment = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  // const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const [loading, setLoading] = useState(false);
  // const ItemId = useMemo(() => sessionDetail?.plans, [sessionDetail?.plans]);

  const handlePayment = useCallback(async () => {
    navigate("/stay-tuned");
    // setLoading(true);
    // try {
    //   const response = await axiosInstance.post<IPaymentIntent>(
    //     `${API_URL}/api/create_payment_intent?code=${Auth_CODE}&clientId=default`,
    //     {
    //       item_ids: ItemId,
    //     },
    //   );
    //   //
    //   setLoading(false);
    //   const clientSecret = response.data.clientSecret;
    //   dispatch(
    //     setSession({
    //       session_data: {
    //         ...sessionDetail,
    //         client_secret: clientSecret,
    //       },
    //     }),
    //   );
    //   sessionStorage.setItem("clientSecret", clientSecret);
    //   navigate("/payment");
    // } catch (error) {
    //   setLoading(false);
    //   toast.error("Failed to create payment intent");
    // }
  }, [navigate]);

  return { handlePayment, loading };
};

export default useToPayment;
