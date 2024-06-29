import ReportPercentage from "./report-percentage";
import ToPayementButton from "./to-payement-button";
import LeftContentWrapper from "./left-content-wrapper";

export default function AllSet() {
  return (
    <LeftContentWrapper>
      <div className="flex flex-col w-full xl:max-w-[900px] min-h-[400px] bg-white shadow-page-content p-2 rounded-lg">
        <div className="space-y-[20px]">
          <p className="text-heroDark-900 font-bold text-[32px]">Great! You're All Set</p>
          <p className="w-[300px] text-secondary-800">
            Thanks for providing the extra details. We now have everything we need to create your
            custom report.
          </p>
          <p className="w-[300px] text-secondary-800">
            Let's move on to creating your final report. Payment is needed to unlock your report.
          </p>
          <div className="w-[320px]">
            <ToPayementButton />
          </div>
        </div>
      </div>
      <div className="w-full xl:max-w-[400px] lg:max-w-[300px] max-w-[250px] shrink-0">
        <ReportPercentage />
      </div>
    </LeftContentWrapper>
  );
}
