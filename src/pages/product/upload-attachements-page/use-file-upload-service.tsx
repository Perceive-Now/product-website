import axios from "axios";

export default function useFileUploadService() {
  const convertToBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result as string);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadFiles = async (files: File[]) => {
    try {
      const base64Files = await Promise.all(files.map(convertToBase64));
      const formData = new FormData();
      base64Files.forEach((base64File, index) => {
        if (base64File === null) return;
        formData.append(`file-${index}`, base64File);
      });
      await axios.post("/upload", formData); // TODO replace with actual API endpoint with tokens
    } catch (error) {
      alert("Error uploading files:" + error);
    }
  };

  return { uploadFiles };
}
