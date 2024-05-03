import { useCallback, useEffect } from "react";
import ReviewQuestionAnswer from "./review-answer-question";
import { useQuery } from "@tanstack/react-query";
import Button from "../../../../reusable/button";
import { getUserChats } from "../../../../../utils/api/chat";
import { questionList } from "../../../../../pages/product/ip-landscaping/ip-analysis/_question";
import jsCookie from "js-cookie";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPReview({ changeActiveStep }: Props) {
  const user_id = jsCookie.get("userId") ?? "";
  const session_id = jsCookie.get("sessionId") ?? "";

  const onContinue = useCallback(async () => {
    changeActiveStep(0);
  }, [changeActiveStep]);

  const { data: userChats } = useQuery(["get-user-chats"], async () => {
    return await getUserChats(user_id, session_id);
  });
  // Fetching time period
  useEffect(() => {
    if (!userChats) return;
    //
  }, [userChats]);

  const mergedData = userChats?.map((chat) => {
    const question = questionList.find((q) => q.questionId == chat.question_id);
    return {
      ...chat,
      question: question?.question, // Assuming 'question' is the property name for the question text
      // You can include other properties from 'questionList' as needed
    };
  });
  return (
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

        <div className="mt-2 space-y-2.5 w-full">
          {mergedData?.map((u, idx) => (
            <ReviewQuestionAnswer
              key={idx * 59}
              question={u.question || ""}
              answer={u.answer || ""}
              onEdit={() => changeActiveStep(2)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Button htmlType={"button"} rounded={"large"} handleClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
