import RequirementSummary from "./requirement-summary";
import ToPayementButton from "./to-payement-button";

export default function GoToReport() {
  return (
    <RequirementSummary>
      <div className="w-[300px] space-y-5">
        <p className="font-bold text-lg text-purple-900 mb-1">Ready to see your report?</p>
        <p className="text-secondary-800">
          Everything looks great so far! Let's move on to creating your final report. <br />
          Payment is needed to unlock your report.
        </p>
        <ToPayementButton />
        <p className="cursor-pointer underline text-purple-900">
          If more info is required (temp link)
        </p>
      </div>
    </RequirementSummary>
  );
}
