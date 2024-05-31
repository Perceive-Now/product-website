import Title from "../../../components/reusable/title";
import UploadAttachments from "./upload-attachments";
import AdditionalQuestions from "./additional-questions";
import AllSet from "./all-set";
import GoBack from "./goback";
import StepContextProvider, { UploadAttachmentsContext } from "./upload-attachments-context";
import { useContext } from "react";
import GoToReport from "./goto-report";
import NeedAdditionalAnswers from "./need-additional-answers";

const uploadAttachmentsSteps = [
  {
    id: 0,
    title: "Upload Attachments",
    description: "Upload the attachement files",
    Component: UploadAttachments,
  },
  {
    id: 1,
    title: "Upload Attachments",
    description: "Go to report and payement all set thing",
    Component: GoToReport,
  },
  {
    id: 2,
    title: "Upload Attachments | Additional Q&A",
    description: "Wait is over need additional answeres to questions",
    Component: NeedAdditionalAnswers,
  },
  {
    id: 3,
    title: "Upload Attachments | Additional Q&A",
    description: "Additional Q&A for the uploaded files",
    Component: AdditionalQuestions,
  },
  {
    id: 4,
    title: "Upload Attachments",
    description: "Thank you and continue to report and payement",
    Component: AllSet,
  },
];

export default function UploadAttachementsPage() {
  return (
    <StepContextProvider>
      <GoBack />
      <div>
        <Title text="Upload Attachments" className="mt-5" />
        <ProgressBar />
        <StepContent />
      </div>
    </StepContextProvider>
  );
}

const ProgressBar = () => {
  const { currentStep } = useContext(UploadAttachmentsContext);

  return (
    <div className="w-full bg-primary-900 h-2 my-3">
      <div
        className="h-full bg-secondary-500"
        style={{ width: `${(currentStep / uploadAttachmentsSteps.length) * 100}%` }}
      ></div>
    </div>
  );
};

const StepContent = () => {
  const { currentStep } = useContext(UploadAttachmentsContext);

  return (
    <>
      {uploadAttachmentsSteps.map((step) => {
        if (step.id === currentStep) {
          const Component = step.Component;
          return <Component key={step.id} />;
        }
      })}
    </>
  );
};
