import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

//
// import axiosInstance from "../../../utils/axios";
// import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

//
// import { setSession } from "../../../stores/session";
// import { AppConfig } from "src/config/app.config";

//
import Button from "../../../components/reusable/button";
import axios from "axios";

// interface IPaymentIntent {
//   payment_intent_id: string;
//   clientSecret: string;
// }

// const Auth_CODE = AppConfig.Auth_CODE;
// const API_URL = AppConfig.API_URL;

const useHandlePayment = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();

  // const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const [loading] = useState(false);
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

const ToPayementButton = () => {
  const { handlePayment, loading } = useHandlePayment();

  const onContinue = () => {
    handlePayment();
  };

  return (
    <Button
      type="optional"
      disabled={false}
      htmlType={"button"}
      rounded={"small"}
      classname="font-semibold w-full"
      handleClick={onContinue}
      loading={loading}
    >
      <p className="text-secondary-800">Continue</p>
    </Button>
  );
};

export default ToPayementButton;
export { useHandlePayment };
