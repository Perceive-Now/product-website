import { EUploadAttachmentsPages } from "src/stores/upload-attachments";
import WaitingWrapper from "./waiting-wrapper";

export default function NeedAdditionalAnswers() {
  return (
    <WaitingWrapper nextPageId={EUploadAttachmentsPages.AdditionalQuestions}>
      <div>
        <p className="font-bold text-lg text-purple-900 mb-1">Almost There!</p>
        <p className="text-secondary-800">
          Great start! A few more details will help us tailor the report perfectly to your needs.
        </p>
      </div>
    </WaitingWrapper>
  );
}
