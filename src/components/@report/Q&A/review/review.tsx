import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";

import axiosInstance from "src/utils/axios";

import ReviewQuestionAnswer from "./review-answer-question";

import Button from "../../../reusable/button";
import { LoadingIcon } from "../../../icons";

import { IAnswers, getUserChats } from "../../../../utils/api/chat";
import { questionList } from "../../../../pages/product/report-q&a/_question";

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import { setSession } from "../../../../stores/session";

import { QAPages, setCurrentPageId, setCurrentQuestionId } from "src/stores/Q&A";
import { AppConfig } from "src/config/app.config";

interface IPaymentIntent {
  payment_intent_id: string;
  clientSecret: string;
}
const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;
const API_URL = AppConfig.API_URL;
const Auth_CODE = AppConfig.Auth_CODE;

/**
 *
 */
export default function IPReview() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  const { currentPageId } = useAppSelector((state) => state.QA);

  const [userChats, setUserChats] = useState<IAnswers[]>();
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const ItemId = useMemo(() => sessionDetail?.plans, [sessionDetail?.plans]);

  const storedPlanIds = sessionStorage.getItem("planIds");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const item_id = storedPlanIds ? JSON.parse(storedPlanIds) : [];

  const user_id = jsCookie.get("user_id") ?? "";
  const requirementGatheringId = jsCookie.get("requirement_gathering_id");

  const handlePayment = useCallback(async () => {
    setPaymentLoading(true);
    try {
      const paymentResponse = await axiosInstance.post<IPaymentIntent>(
        `${API_URL}/api/create_payment_intent?code=${Auth_CODE}&clientId=default`,
        {
          item_ids: ItemId !== undefined ? ItemId : item_id,
        },
      );
      const clientSecret = paymentResponse.data.clientSecret;
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            client_secret: clientSecret,
          },
        }),
      );
      sessionStorage.setItem("clientSecret", clientSecret);

      await axiosInstance.post(
        `${BASE_PN_REPORT_URL}/report_generation/`,
        {
          requirement_gathering_id: requirementGatheringId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setPaymentLoading(false);
      navigate("/payment");
    } catch (error) {
      setPaymentLoading(false);
      toast.error("Failed to create payment intent or generate report");
    }
  }, [ItemId, dispatch, item_id, navigate, requirementGatheringId, sessionDetail]);

  const onContinue = useCallback(async () => {
    if (sessionDetail?.skipped_question && sessionDetail?.skipped_question?.length > 0) {
      toast.error("Please provide all question answer");
    } else {
      handlePayment();
    }
  }, [handlePayment, sessionDetail?.skipped_question]);

  useEffect(() => {
    if (currentPageId === 2) {
      setLoading(true);
      getUserChats(user_id, String(requirementGatheringId))
        .then((data) => {
          setUserChats(data as any);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Something went wrong");
          setLoading(false);
        });
    }
  }, [currentPageId, requirementGatheringId, user_id]);

  const mergedData = userChats?.map((chat) => {
    const question = questionList.find((q) => q.questionId == chat.question_id);
    return {
      ...chat,
      question: question?.question,
      example_answer: question?.answer,
    };
  });

  const onEdit = useCallback(
    (chat: any) => {
      dispatch(setCurrentQuestionId(Number(chat.question_id)));
      dispatch(setCurrentPageId(QAPages.edit));
    },
    [dispatch],
  );

  return (
    <>
      <div className="space-y-2.5 w-full shrink-0">
        <div className="w-full">
          <div>
            <h5 className="text-xl font-semibold text-black">
              Here's a quick look at the answers you gave.
            </h5>
            <p className="text-base text-secondary-800">
              Take a moment to review them, and when you're ready, you can keep going.
            </p>
          </div>
          <div className="relative">
            {loading ? (
              <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <LoadingIcon fontSize={52} className="animate-spin text-primary-900" />
              </div>
            ) : (
              <div className="mt-2 space-y-2.5 w-full">
                {mergedData
                  ?.sort((a, b) => Number(a.question_id) - Number(b.question_id))
                  .map((u, idx) => (
                    <ReviewQuestionAnswer
                      key={idx * 59}
                      question={u.question || ""}
                      answer={u.answer || ""}
                      onEdit={() => onEdit(u)}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            loading={paymentLoading}
            htmlType={"button"}
            rounded={"large"}
            handleClick={onContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
