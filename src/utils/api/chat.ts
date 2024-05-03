/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";
// import axiosInstance from "../axios";

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

export async function getUserChats(user_id: string, session_id: string) {
  try {
    const response = await axios.get<IAnswers[]>(
      `https://pn-chatbot.azurewebsites.net/get-answers/?userID=${user_id}&sessionID=${session_id}`,
    );

    return response.data;
  } catch (error) {
    // Handle error
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Error:", error);
    }
    throw error; // Rethrow the error
  }
}

interface IChat {
  msg: {
    user_input: string;
  };
  input: string;
  answeredQuestion: string;
}

interface IAnswers {
  question_id: string | number;
  session_id: string;
  user_id: string;
  answer: string;
}
