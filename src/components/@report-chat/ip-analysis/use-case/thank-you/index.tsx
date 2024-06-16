import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../../../../reusable/button";

import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { setSession } from "../../../../../stores/session";

import axiosInstance from "../../../../../utils/axios";
import { API_URL, Auth_CODE } from "../../../../../utils/constants";

interface Props {
  changeActiveStep: (steps: number) => void;
}

interface IPaymentIntent {
  payment_intent_id: string;
  clientSecret: string;
}

const Thankyou = ({ changeActiveStep }: Props) => {
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

  //
  const onContinue = useCallback(async () => {
    if (sessionDetail?.skipped_question && sessionDetail?.skipped_question?.length > 0) {
      toast.error("Please provide all question answer");
    } else {
      handlePayment();
    }
  }, [handlePayment, sessionDetail?.skipped_question]);

  // review answer
  const reviewAnswer = useCallback(() => {
    dispatch(
      setSession({
        session_data: {
          ...sessionDetail,
          step_id: 6,
        },
      }),
    );
    changeActiveStep(6);
  }, [changeActiveStep, dispatch, sessionDetail]);

  return (
    <div className="h-[274px] flex flex-col items-start justify-between gap-y-[100px]">
      <div>
        <h6 className="text-xl font-medium text-secondary-800">
          Answer all the skipped questions to continue.
        </h6>
        {/* <p className="text-secondary-800">
          If you'd like to take another look and make any changes, feel free to do so.
        </p> */}
      </div>
      <div className="flex items-center justify-center gap-1 h-full w-full">
        <Button
          htmlType={"button"}
          type="default"
          handleClick={reviewAnswer}
          classname="text-primary-900"
        >
          Review answers
        </Button>
        <Button
          htmlType={"button"}
          rounded={"small"}
          classname="font-semibold"
          handleClick={onContinue}
          loading={loading}
        >
          Proceed to payment
        </Button>
      </div>
    </div>
  );
};

export default Thankyou;
