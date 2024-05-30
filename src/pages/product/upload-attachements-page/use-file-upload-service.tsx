import axios from "axios";
import jsCookie from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";

const BASE_URL = "https://pn-chatbot.azurewebsites.net";

export default function useFileUploadService() {
  const [uploading, setIsUploading] = useState(false);

  const convertToBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const result = fileReader.result as string;
        resolve(result.split(",")[1]);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const upload = async (files: File[]) => {
    try {
      const base64Files = await Promise.all(files.map(convertToBase64));

      const dataObj = {
        category_id: "",
        session_id: "",
        user_id: "",
        attachment: "",
      };

      dataObj.attachment = base64Files[0] ?? "";
      dataObj.user_id = jsCookie.get("user_id") ?? "";
      dataObj.session_id = jsCookie.get("session_id") ?? "";
      dataObj.category_id = "1" ?? "";

      const response = await axios.post(BASE_URL + "/attachment/", dataObj);

      const resError = response.data.error;
      const resData = response.data;
      const status = response.status;
      const statusText = response.statusText;

      return { resError, resData, status, statusText };
    } catch (error: any) {
      return { resError: error.message ?? "error" };
    }
  };

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true);

    const { resError, resData } = await upload(files);

    setIsUploading(false);

    if (resError) {
      toast.error(resError);
      return;
    }

    return resData;
  };

  return { uploadFiles, uploading };
}
