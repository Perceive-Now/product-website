import React, { useCallback } from "react";
import Button from "../../../../../reusable/button";
// import { getUserChats } from "../../../../../../utils/api/chat";
// import axios from "axios";
import jsCookie from "js-cookie";

interface Props {
  changeActiveStep: (steps: number) => void;
}

const Thankyou = ({ changeActiveStep }: Props) => {
  const onContinue = useCallback(() => {
    jsCookie.set("questionId", String(0));
    jsCookie.set("commonQuestionId", String(0));
    changeActiveStep(16);
    // getUserChats("12345678", "12345678")
  }, [changeActiveStep]);

  // const onContinue = useCallback(async () => {
  //   try {
  //     const response = await axios.post(
  //       `https://pn-chatbot.azurewebsites.net/get-answers`,
  //       {
  //         user_id: "12345678",
  //         sesion_id: "12345678",
  //       }
  //     );
  //     console.log(response)
  //   } catch (error: any) {
  //     console.log(error)
  //   }
  //   // getUserChats("12345678", "12345678")
  //   // changeActiveStep(0);
  // }, []);

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
          // handleClick={() => changeActiveStep(15)}
          classname="text-primary-900"
        >
          Review answers
        </Button>
        <Button
          htmlType={"button"}
          rounded={"small"}
          classname="font-semibold"
          handleClick={onContinue}
        >
          Proceed to payment
        </Button>
      </div>
    </div>
  );
};

export default Thankyou;
