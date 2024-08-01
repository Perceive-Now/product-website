import React, { useState } from "react";
import axios from "axios";
import { AppConfig } from "src/config/app.config";
import Modal from "../../../components/reusable/modal";
import Button from "../../../components/reusable/button";
import toast from "react-hot-toast";
import "../../../components/reusable/button/button.css";

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

interface DownloadModalProps {
  isOpen: boolean;
  handleClose: () => void;
  reportId: string;
  requirementGatheringId: number;
  userCaseId: string;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  handleClose,
  reportId,
  requirementGatheringId,
  userCaseId,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("word");

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${BASE_PN_REPORT_URL}/download-file/`, {
        params: {
          requirement_gathering_id: requirementGatheringId,
          user_case_id: userCaseId,
          report_type: selectedFormat,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${reportId}.${selectedFormat}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);

      toast.success("Report downloaded successfully");
      handleClose();
    } catch (error) {
      toast.error("Failed to download report");
      console.error("Download error", error);
    }
  };

  return (
    <Modal open={isOpen} handleOnClose={handleClose}>
      <div className="p-5 w-full max-w-[500px] mx-auto bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-end">
          <button onClick={handleClose} className="text-lg font-bold">
            ✖
          </button>
          <h3 className="text-xl font-semibold mb-1  self-start">Download</h3>
        </div>
        <p className="mb-4">Please select the format you like to download to.</p>
        <div className="mb-6 ml-3">
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="format"
              value="pdf"
              checked={selectedFormat === "pdf"}
              onChange={() => setSelectedFormat("pdf")}
              className="mr-2 form-radio text-purple-600"
            />
            PDF
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="format"
              value="word"
              checked={selectedFormat === "docx"}
              onChange={() => setSelectedFormat("docx")}
              className="mr-2 form-radio text-purple-600"
            />
            Word
          </label>
        </div>
        <div className="flex justify-center">
          <Button type="primary" classname="optional-button" handleClick={handleDownload}>
            Download
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DownloadModal;
