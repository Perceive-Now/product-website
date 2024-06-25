import { useCallback, useMemo, useState } from "react";
import axiosInstance from "../../../utils/axios";
import { API_URL, Auth_CODE } from "../../../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setSession } from "../../../stores/session";
import Button from "../../../components/reusable/button";

interface IPaymentIntent {
  payment_intent_id: string;
  clientSecret: string;
}

const useToPayment = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);

  const [loading, setLoading] = useState(false);
  const ItemId = useMemo(() => sessionDetail?.plans, [sessionDetail?.plans]);

  const handlePayment = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post<IPaymentIntent>(
        `${API_URL}/api/create_payment_intent?code=${Auth_CODE}&clientId=default`,
        {
          item_ids: ItemId,
        },
      );
      //
      setLoading(false);
      const clientSecret = response.data.clientSecret;
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            client_secret: clientSecret,
          },
        }),
      );
      sessionStorage.setItem("clientSecret", clientSecret);
      navigate("/payment");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create payment intent");
    }
  }, [ItemId, dispatch, navigate, sessionDetail]);

  return { handlePayment, loading };
};

export default useToPayment;
