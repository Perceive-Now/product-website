import React from "react";
import { useAppSelector } from "../../../hooks/redux";
import { ConfirmationGuyIcon } from "../../../components/icons";
import Button from "../../../components/reusable/button";

const ReportSummaryPopup = ({
  handleViewFullReportCallback,
  setIsOpenDialog,
  event,
}: {
  handleViewFullReportCallback: () => void;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  event: any;
}) => {
  const { requirementPercentage } = useAppSelector((state) => state.uploadAttachments);

  const handleViewFullReport = () => {
    setIsOpenDialog(false);
    handleViewFullReportCallback();
  };

  return (
    <div className="bg-white p-5 flex flex-col justify-center items-start text-left w-[800px] rounded-lg">
      <div className="flex flex-row justify-between w-full gap-y-1">
        <p className="font-bold text-[18px] text-primary-900">Summary</p>
        <button onClick={() => setIsOpenDialog(false)}>close</button>
      </div>

      <div className="flex flex-row justify-between w-full mt-[20px]">
        <div>
          <p className="font-bold text-[18px] text-primary-900 text-left">
            {event.data.reportName}
          </p>
          <p>
            <span className="text-gray-500">Use Case : </span>{" "}
            <span className="text-[#373D3F]">IP validity analysis report</span>
          </p>
        </div>
        <div>
          <p> {"2023 - 06 - 15"}</p>
        </div>
      </div>

      <div className="mt-[20px]">
        <p className="text-sm">
          {"Biomedical Measurement (CPC Section A61B - 700  Patents): A significant number of patents fall under the Biomedical Measurement category, indicating a strong focus on refining measurement accuracy and reliability in wearable blood pressure sensors.\n" +
            "Electric Communication Technique (CPC Section H04 - 400 Patents): The patent data showcases a considerable emphasis on improving electric communication techniques for real-time data transmission and connectivity with other devices or networks.\n" +
            "Basic Electric Elements (CPC Section H01 - 350 Patents): The patents within this section underline efforts in advancing core electric components to ensure effective operation, power management, and miniaturization of wearable blood pressure sensors."}
        </p>
      </div>

      <Button type="primary" classname="w-[250px] mt-[20px]" handleClick={handleViewFullReport}>
        <p>View full report</p>
      </Button>
    </div>
  );
};

export default ReportSummaryPopup;
