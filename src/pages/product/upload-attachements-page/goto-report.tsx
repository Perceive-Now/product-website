import WaitingWrapper from "./waiting-wrapper";
import ReportPercentage from "./report-percentage";

export default function GoToReport() {
  return (
    <WaitingWrapper>
      <div className="shrink-0">
        <p className="font-bold text-lg text-purple-900 mb-1">Ready to see your report?</p>
        <ReportPercentage />
      </div>
    </WaitingWrapper>
  );
}
