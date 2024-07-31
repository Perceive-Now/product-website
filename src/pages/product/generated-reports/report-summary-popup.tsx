import React from "react";
import { useNavigate } from "react-router-dom";
import { UseCaseOptions } from "../../../components/@report/use-case/__use-cases";
import Markdown from "react-markdown";
import Button from "../../../components/reusable/button";
import { useAppSelector } from "src/hooks/redux";

const ReportSummaryPopup = ({
  handleViewFullReportCallback,
  setIsOpenDialog,
}: {
  handleViewFullReportCallback: () => void;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const currentReport = useAppSelector((state) => state.generatedReports.currentReport);

  if (!currentReport) {
    return <div>No report selected</div>;
  }

  const handleViewFullReport = () => {
    setIsOpenDialog(false);
    navigate("/full-report", {
      state: {
        title: currentReport.title,
        data: currentReport.data,
        requirement_gathering_id: currentReport.requirement_gathering_id,
      },
    });
  };

  const useCaseName = UseCaseOptions.find(
    (useCase) => useCase.useCaseId === Number(currentReport.user_case_id),
  )?.label;

  return (
    <div className="bg-white p-5 flex flex-col justify-center items-start text-left w-[800px] rounded-lg">
      <div className="flex flex-row justify-between w-full gap-y-1">
        <p className="font-bold text-[18px] text-primary-900">Summary</p>
        <button onClick={() => setIsOpenDialog(false)}>close</button>
      </div>

      <div className="flex flex-row justify-between w-full mt-[20px]">
        <div>
          <p className="font-bold text-[18px] text-primary-900 text-left">{currentReport.title}</p>
          <p>
            <span className="text-gray-500">Use Case : </span>{" "}
            <span className="text-[#373D3F]">{useCaseName}</span>
          </p>
        </div>
        <div>
          <p>{currentReport.date ? new Date(currentReport.date).toLocaleDateString() : null}</p>
        </div>
      </div>

      <div className="mt-[20px]">
        <p className="text-m ">
          <Markdown>{currentReport.summary}</Markdown>
        </p>
      </div>

      <Button type="primary" classname="w-[250px] mt-[20px]" handleClick={handleViewFullReport}>
        <p>View full report</p>
      </Button>
    </div>
  );
};

export default ReportSummaryPopup;
