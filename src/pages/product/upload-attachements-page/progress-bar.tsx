import { useAppSelector } from "../../../hooks/redux";
import { useLocation } from "react-router-dom";
import { EReportSectionPageIDs } from "src/stores/draft";

export default function ProgressBar({
  currentStep = 0,
  totalSteps = 10,
}: {
  currentStep?: number;
  totalSteps?: number;
}) {
  const location = useLocation();

  const { requirmentGatheringMethod } = useAppSelector((state) => state.usecases);

  let currentPageName = "";

  switch (location.pathname) {
    case "/" + EReportSectionPageIDs.UseCases:
      currentPageName = "1";
      break;
    case "/" + EReportSectionPageIDs.InteractionMethod:
      currentPageName = "Interaction Method";
      break;
    case "/" + EReportSectionPageIDs.QA:
      currentPageName = "Detailed Q&A";
      break;
    case "/" + EReportSectionPageIDs.UploadAttachments:
      currentPageName = "Upload attachments";
      break;
    case "/" + EReportSectionPageIDs.UploadQuickPrompts:
      currentPageName = "Quick prompt";
      break;
    case "/" + EReportSectionPageIDs.Payment:
      currentPageName = "2";
      break;
    default:
      currentPageName = "";
      break;
  }

  return (
    <div className="h-[28px] w-full flex flex-row items-center gap-x-[4px] text-sm mt-1 mb-5">
      {/* usecase */}
      <div className="bg-progressbar-gradient-lr w-[260px] flex flex-col justify-center h-full rounded-l-[4px] overflow-hidden">
        <p className="text-white pl-[20px]">Use case selected</p>
      </div>

      {/* interaction / q&a / upload / qp */}
      {currentPageName === "1" && (
        <div className="bg-primary-50 w-full justify-center items-center h-full grid grid-cols-1 grid-rows-1 overflow-hidden">
          <p className="text-primary-900 pl-[20px] col-start-1 row-start-1 font-semibold">
            {"Select interaction method"}
          </p>
        </div>
      )}
      {currentPageName === "2" && (
        <div className="bg-primary-50 w-full justify-center items-center h-full grid grid-cols-1 grid-rows-1 overflow-hidden">
          <div
            className="bg-progressbar-gradient-rl w-full flex flex-col justify-center h-full col-start-1 row-start-1"
            style={{ width: `${100}%` }}
          ></div>
          <p className="text-white pl-[20px] col-start-1 row-start-1">
            {requirmentGatheringMethod}
          </p>
        </div>
      )}
      {currentPageName !== "1" && currentPageName !== "2" && (
        <div className="bg-primary-50 w-full justify-center items-center h-full grid grid-cols-1 grid-rows-1 overflow-hidden">
          <div
            className="bg-progressbar-gradient-rl w-full flex flex-col justify-center h-full col-start-1 row-start-1"
            style={{ width: `${((currentStep + 2) / (totalSteps + 2)) * 100}%` }}
          ></div>
          <p className="text-white pl-[20px] col-start-1 row-start-1">{currentPageName}</p>
        </div>
      )}

      {/* payment */}
      <div className="bg-primary-50 w-[260px] flex flex-col justify-center h-full rounded-r-[4px] overflow-hidden">
        <p className="text-primary-900 pl-[20px] font-semibold">Payment</p>
      </div>
    </div>
  );
}
