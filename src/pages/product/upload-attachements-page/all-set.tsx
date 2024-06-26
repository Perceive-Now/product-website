import ReportPercentage from "./report-percentage";
import ToPayementButton from "./to-payement-button";

export default function AllSet() {
  return (
    <div className="flex lg:flex-row flex-wrap gap-y-5 justify-between gap-x-[100px]">
      <div className="flex flex-col w-full lg:max-w-[900px] max-w-[600px] min-h-[400px] bg-white shadow-page-content p-2 rounded-lg">
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
      <div className="max-w-[400px] w-full shrink-0">
        <ReportPercentage />
      </div>
    </div>
  );
}
