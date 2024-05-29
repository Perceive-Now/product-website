import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import Title from "../../../components/reusable/title";
import UploadAttachments from "./upload-attachments";
import { useState } from "react";
import UploadAttachmentsWaiting from "./upload-attachments-waiting";
import AdditionalQuestions from "./additional-questions";

const uploadAttachmentsSteps = [
  {
    id: 1,
    title: "Upload Attachments",
    description: "Upload the attachement files",
  },
  {
    id: 2,
    title: "Upload Attachments",
    description: "Wait for the files to upload and generate the questions",
  },
  {
    id: 3,
    title: "Upload Attachments | Additional Q&A",
    description: "Additional Q&A for the uploaded files",
  },
  {
    id: 4,
    title: "Upload Attachments",
    description: "Thank you and continue to report and payement",
  },
];

export default function UploadAttachementsPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <Link
        to="/product"
        className="flex flex-row gap-x-1 font-bold text-secondary-800 w-fit bg-red-400"
      >
        <ArrowLeftIcon /> Back
      </Link>

      {/* <div>
        <div className="flex flex-row gap-x-1">
          {uploadAttachmentsSteps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col gap-y-1 ${
                currentStep === step.id ? "text-primary-800" : "text-secondary-800"
              }`}
            >
              <div>{step.title}</div>
              <div>{step.description}</div>
            </div>
          ))}
        </div>
      </div> */}

      <div>
        <Title text="Upload Attachments" className="mt-5" />
        {"bar"}
        {/* <UploadAttachments /> */}
        {/* <UploadAttachmentsWaiting /> */}
        <AdditionalQuestions />
      </div>
    </div>
  );
}
