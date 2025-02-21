import React from "react";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";

const AIReportCustomization = () => {
  return (
    <div className="space-y-[20px] w-full z-10 pb-[7%]">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">AI Agent Reports</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" /> Back
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIReportCustomization;
