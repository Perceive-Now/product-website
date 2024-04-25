/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";

export async function getChatBotAnswer(body: IChat) {
  try {
    const response = await axios.post(`https://pn-chatbot.azurewebsites.net/generate/`, body);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.message);
  }
}
//
export async function addAnswer(value: IAnswers[]) {
  const response = await axios.post(`https://pn-chatbot.azurewebsites.net/add-answers/`, value);
  return response;
}

interface IChat {
  msg: {
    user_input: string;
  };
  input: string;
  answeredQuestion: string;
}

interface IAnswers {
  question_id: number;
  session_id: number;
  user_id: string;
  answer: string;
}
