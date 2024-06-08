import WaitingWrapper from "./waiting-wrapper";

export default function GoToReport() {
  return (
    <WaitingWrapper nextPageId={4} nextPayement={true}>
      <div>
        <p className="font-bold text-lg text-purple-900 mb-1">Ready to see your report?</p>
        <p className="text-secondary-800">
          Everything looks great so far! Let's move on to creating your final report. <br />
          Payment is needed to unlock your report.
        </p>
      </div>
    </WaitingWrapper>
  );
}
