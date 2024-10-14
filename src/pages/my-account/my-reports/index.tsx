import React from "react";
import Reports from "./reports";
import ReportSidebar from "./report-side";

const MyReport = () => {
  return (
    <div className="flex gap-x-[20px] w-full mx-auto">
      <Reports />
      {/* <div className='w-full bg-black h-screen' /> */}
      <ReportSidebar />
    </div>
  );
};

export default MyReport;
