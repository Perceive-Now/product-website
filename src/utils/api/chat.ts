import axios from "axios";
import axiosInstance from "../axios";
import toast from "react-hot-toast";

export async function getChatBotAnswer(body: any) {
  console.log(body);
  try {
    const response = await axios.post(`https://pn-chatbot.azurewebsites.net/generate/`, body);
    console.log(response);
    return response.data.data;
  } catch (error: any) {
    toast.error(error.message);
    console.log(error);
  }
}

interface IChat {
  msg: {
    user_input: string;
  };
  input: string;
  answeredQuestion: string;
}
