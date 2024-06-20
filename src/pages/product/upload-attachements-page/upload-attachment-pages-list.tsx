import { EUploadAttachmentsPages } from "src/stores/upload-attachments";
import AdditionalQuestions from "./additional-questions";
import AllSet from "./all-set";
import GoToReport from "./goto-report";
import NeedAdditionalAnswers from "./need-additional-answers";
import UploadAttachments from "./upload-attachments";

const uploadAttachmentsPages = [
  {
    id: EUploadAttachmentsPages.UploadAttachments,
    totalPages: 1,
    title: "Upload Attachments",
    description: "Upload the attachement files",
    Component: UploadAttachments,
  },
  {
    id: EUploadAttachmentsPages.GoToReport,
    totalPages: 1,
    title: "Upload Attachments",
    description: "Go to report and payement all set thing",
    Component: GoToReport,
  },
  {
    id: EUploadAttachmentsPages.NeedAdditionalAnswers,
    totalPages: 2,
    title: "Upload Attachments",
    description: "Wait is over need additional answers to questions",
    Component: NeedAdditionalAnswers,
  },
  {
    id: EUploadAttachmentsPages.AdditionalQuestions,
    totalPages: 2,
    title: "Upload Attachments | Additional Q&A",
    description: "Additional Q&A for the uploaded files",
    Component: AdditionalQuestions,
  },
  {
    id: EUploadAttachmentsPages.AllSet,
    totalPages: 2,
    title: "Upload Attachments",
    description: "Thank you and continue to report and payement",
    Component: AllSet,
  },
];

export default uploadAttachmentsPages;
