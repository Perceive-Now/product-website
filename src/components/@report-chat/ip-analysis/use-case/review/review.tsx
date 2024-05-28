import { useCallback, useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
import jsCookie from "js-cookie";

import ReviewQuestionAnswer from "./review-answer-question";

import Button from "../../../../reusable/button";

import { IAnswers, getUserChats } from "../../../../../utils/api/chat";
import { questionList } from "../../../../../pages/product/ip-landscaping/ip-analysis/_question";

import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

import { setChat } from "../../../../../stores/chat";
import { setSession } from "../../../../../stores/session";
import toast from "react-hot-toast";
import { LoadingIcon } from "../../../../icons";

interface Props {
  changeActiveStep: (steps: number) => void;
  activeStep?: number;
}

export default function IPReview({ changeActiveStep, activeStep }: Props) {
  const dispatch = useAppDispatch();
  const sessionDetail = useAppSelector((state) => state.sessionDetail.session?.session_data);
  const [userChats, setUserChats] = useState<IAnswers[]>();
  const [loading, setLoading] = useState(false);

  const user_id = jsCookie.get("user_id") ?? "";
  const session_id = jsCookie.get("session_id") ?? "";

  const onContinue = useCallback(() => {
    dispatch(
      setSession({
        session_data: {
          ...sessionDetail,
          step_id: 5,
        },
      }),
    );
    changeActiveStep(5);
  }, [changeActiveStep, dispatch, sessionDetail]);

  useEffect(() => {
    if (activeStep === 6) {
      setLoading(true);
      getUserChats(user_id, session_id)
        .then((data) => {
          console.log(data);
          setUserChats(data as any);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Something went wrong");
          setLoading(false);
        });
    }
  }, [activeStep, session_id, user_id]);

  const mergedData = userChats?.map((chat) => {
    const question = questionList.find((q) => q.questionId == chat.question_id);
    return {
      ...chat,
      question: question?.question,
      example_answer: question?.answer, // Assuming 'question' is the property name for the question text
      // You can include other properties from 'questionList' as needed
    };
  });

  const onEdit = useCallback(
    (chat: any) => {
      dispatch(
        setSession({
          session_data: {
            ...sessionDetail,
            step_id: 7,
            user_chat: chat,
          },
        }),
      );
      changeActiveStep(7);
      dispatch(setChat(chat));
    },
    [changeActiveStep, dispatch, sessionDetail],
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
          <Button htmlType={"button"} rounded={"large"} handleClick={onContinue}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
