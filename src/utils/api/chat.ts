import axios from "axios";
import toast from "react-hot-toast";
import { AppConfig } from "src/config/app.config";

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

export async function getChatBotAnswer(body: IChat) {
  try {
    const response = await axios.post(`${BASE_PN_REPORT_URL}/generate/`, body);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.message);
  }
}

export async function addAnswer(value: IAnswers) {
  const answers = {
    answers: [value],
  };
  const response = await axios.post(`${BASE_PN_REPORT_URL}/add-answers/`, answers);
  return response;
}

export async function getUserChats(user_id: string, requirement_gathering_id: string) {
  const response = await axios.get<IAnswers[]>(
    `https://templateuserrequirements.azurewebsites.net/get-items?userID=${user_id}&requirement_gathering_id=${requirement_gathering_id}`,
    {},
    // `${BASE_PN_REPORT_URL}/get-answers/?userID=${user_id}&requirement_gathering_id=${requirement_gathering_id}`,
  );

  return response.data;
}

interface IChat {
  msg: {
    user_input: string;
  };
  input: string;
  answeredQuestion: string;
}

export interface IAnswers {
  question_id: string | number;
  session_id: string;
  user_id: string;
  answer: string;
}
