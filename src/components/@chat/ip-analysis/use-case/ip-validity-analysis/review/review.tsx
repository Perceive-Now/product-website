import Button from "../../../../../reusable/button";

import { useCallback } from "react";
import ReviewQuestionAnswer from "./review-answer-question";
import { useAppSelector } from "../../../../../../hooks/redux";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPReview({ changeActiveStep }: Props) {
  const chats = useAppSelector((values) => values.chat);

  const onContinue = useCallback(() => {
    changeActiveStep(16);
  }, [changeActiveStep]);

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
          <ReviewQuestionAnswer
            question={chats.first.question || ""}
            answer={chats.first.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.second.question || ""}
            answer={chats.second.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.thrid.question || ""}
            answer={chats.thrid.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.fourth.question || ""}
            answer={chats.fourth.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.fifth.question || ""}
            answer={chats.fifth.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.sixth.question || ""}
            answer={chats.sixth.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.seventh.question || ""}
            answer={chats.seventh.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.eight.question || ""}
            answer={chats.eight.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.ninth.question || ""}
            answer={chats.ninth.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.tenth.question || ""}
            answer={chats.tenth.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
          <ReviewQuestionAnswer
            question={chats.eleventh.question || ""}
            answer={chats.eleventh.answer || ""}
            onEdit={() => changeActiveStep(2)}
          />
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
