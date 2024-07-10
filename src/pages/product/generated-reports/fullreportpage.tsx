import React from "react";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";

const FullReportPage = () => {
  const location = useLocation();
  const { title, report } = location.state;

  return (
    <div className="bg-white p-5 flex flex-col justify-center items-start text-left w-[800px] rounded-lg">
      <div className="flex flex-row justify-between w-full gap-y-1">
        <p className="font-bold text-[18px] text-primary-900">{title}</p>
      </div>
      <div className="mt-[20px]">
        <Markdown>{report}</Markdown>
      </div>
    </div>
  );
};

export default FullReportPage;
