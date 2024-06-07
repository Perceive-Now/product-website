import WaitingWrapper from "./waiting-wrapper";

export default function NeedAdditionalAnswers() {
  return (
    <WaitingWrapper nextPageId={3}>
      <div>
        <p className="font-bold text-lg text-purple-900 mb-1">Almost There!</p>
        <p className="text-secondary-800">
          We need a bit more information to create your report. <br />
          Please answer a few more questions to complete the details. Once done, we'll generate your
          custom report.
        </p>
      </div>
    </WaitingWrapper>
  );
}
