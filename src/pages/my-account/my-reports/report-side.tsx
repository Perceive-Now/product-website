import React, { useState } from "react";
import ReportBundleIcon from "../../../components/icons/common/bundle";
import BundleReportModal from "../../../components/modal/bundle-report/bundle-report";

const ReportSidebar = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="w-[100px] xl:w-[224px] pt-[110px] shrink-0">
        <div className="bg-primary-900 rounded-lg px-[8px] py-[20px] space-y-[10px]">
          <div className="text-white">0 Reports remaining</div>
          <button
            onClick={() => setModal(true)}
            type="button"
            className="flex items-center gap-1 text-white"
          >
            <ReportBundleIcon />
            Buy report bundle
          </button>
        </div>
      </div>
      <BundleReportModal open={modal} onClose={() => setModal(false)} />
    </>
  );
};

export default ReportSidebar;
