import React, { useCallback, useState } from "react";
import Button from "../../../../reusable/button";
// import { getUserChats } from "../../../../../../utils/api/chat";
// import axios from "axios";
import jsCookie from "js-cookie";
import axiosInstance from "../../../../../utils/axios";
import { API_URL, Auth_CODE } from "../../../../../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  changeActiveStep: (steps: number) => void;
}

interface IPaymentIntent {
  payment_intent_id: string;
  clientSecret: string;
}

const Thankyou = ({ changeActiveStep }: Props) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const ItemId = sessionStorage.getItem("UseCaseId");

  const handleSelectProduct = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post<IPaymentIntent>(
        `${API_URL}/api/create_payment_intent?code=${Auth_CODE}&clientId=default`,
        {
          item_ids: JSON.parse(ItemId || ""),
        },
      );
      //
      setLoading(false);
      const clientSecret = response.data.clientSecret;
      sessionStorage.setItem("clientSecret", clientSecret);
      navigate("/payment");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create payment intent");
    }
  }, [ItemId, navigate]);

  //
  const onContinue = useCallback(async () => {
    jsCookie.set("questionId", String(0));
    jsCookie.set("commonQuestionId", String(0));
    handleSelectProduct();
  }, [handleSelectProduct]);

  return (
    <div className="h-[274px] flex flex-col items-start justify-between gap-y-[100px]">
      <div>
        <h6 className="text-xl font-medium text-secondary-800">
          Thank you for providing all the answers
        </h6>
        <p className="text-secondary-800">
          {/* If you'd like to take another look and make any changes, feel free to do so. Otherwise,
          you can go ahead and generate your report. */}
          If you'd like to take another look and make any changes, feel free to do so.
        </p>
      </div>
      <div className="flex items-center justify-center gap-1 h-full w-full">
        <Button
          htmlType={"button"}
          type="default"
          handleClick={() => changeActiveStep(6)}
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
