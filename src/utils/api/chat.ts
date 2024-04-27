/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "../axios";

export async function getChatBotAnswer(body: IChat) {
  try {
    const response = await axios.post(`https://pn-chatbot.azurewebsites.net/generate/`, body);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.message);
  }
}
//
export async function addAnswer(value: IAnswers) {
  const answers = {
    answers: [value],
  };
  const response = await axios.post(`https://pn-chatbot.azurewebsites.net/add-answers/`, answers);
  return response;
}

export async function getUserChats(user_id: string, sesion_id: string) {
  const value = {
    user_id,
    sesion_id,
  };
  const response = await axiosInstance.post(
    `https://pn-chatbot.azurewebsites.net/get-answers`,
    value,
  );

  return response.data.data;
}

interface IChat {
  msg: {
    user_input: string;
  };
  input: string;
  answeredQuestion: string;
}

interface IAnswers {
  question_id: string;
  session_id: string;
  user_id: string;
  answer: string;
}
