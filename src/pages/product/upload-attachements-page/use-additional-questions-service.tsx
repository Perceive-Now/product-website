import axios from "axios";
import jsCookie from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "./db";

export interface IAnswerObj {
  questionId: number;
  answer: string;
}

export default function useAdditionalQuestionsService() {
  const [uploading, setIsUploading] = useState(false);

  const upload = async (answers: IAnswerObj[]) => {
    try {
      const user_id = jsCookie.get("user_id") ?? "";
      const session_id = jsCookie.get("session_id") ?? "";
      const category_id = "1" ?? "";

      const answersObj = answers.map((answer) => {
        return {
          category_id: category_id,
          session_id: session_id,
          user_id: user_id,
          question_id: String(answer.questionId),
          answer: answer.answer,
        };
      });

      const response = await axios.post(BASE_URL + "/attachment-answers/", { answers: answersObj });

      const resError = response.data.error;
      const resData = response.data;
      const status = response.status;
      const statusText = response.statusText;

      return { resError, resData, status, statusText };
    } catch (error: any) {
      return { resError: error.message ?? "error" };
    }
  };

  const uploadAnswers = async (answers: IAnswerObj[]) => {
    setIsUploading(true);

    const { resError, resData } = await upload(answers);

    setIsUploading(false);

    if (resError) {
      toast.error(resError);
      return;
    }

    return resData;
  };

  return { uploadAnswers, uploading };
}
