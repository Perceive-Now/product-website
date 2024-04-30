import Button from "../../../../../reusable/button";

import { useCallback } from "react";
import ReviewQuestionAnswer from "./review-answer-question";
import { useAppSelector } from "../../../../../../hooks/redux";
// import { useQuery } from "@tanstack/react-query";
// import { getUserChats } from "../../../../../../utils/api/chat";
import axios from "axios";

interface Props {
  changeActiveStep: (steps: number) => void;
}

export default function IPReview({ changeActiveStep }: Props) {
  const chats = useAppSelector((values) => values.chat);

  const onContinue = useCallback(async () => {
    try {
      const response = await axios.post(`https://pn-chatbot.azurewebsites.net/get-answers`, {
        user_id: "12345678",
        sesion_id: "12345678",
      });
      console.log(response);
    } catch (error: any) {
      // console.log(error)
    }
    // getUserChats("12345678", "12345678")
    // changeActiveStep(0);
  }, []);

  // const { data: userChats, isLoading } = useQuery(["get-user-chats"], async () => {
  //   return await getUserChats("12345678", "12345678");
  // });
  // // Fetching time period
  // useEffect(() => {
  //   if (!userChats) return;
  //   //
  // }, [userChats]);

  // console.log(userChats)

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
