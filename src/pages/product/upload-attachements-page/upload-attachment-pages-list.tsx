import AdditionalQuestions from "./additional-questions";
import AllSet from "./all-set";
import GoToReport from "./goto-report";
import NeedAdditionalAnswers from "./need-additional-answers";
import UploadAttachments from "./upload-attachments";

const uploadAttachmentsPages = [
  {
    id: 0,
    totalPages: 1,
    title: "Upload Attachments",
    description: "Upload the attachement files",
    Component: UploadAttachments,
  },
  {
    id: 1,
    totalPages: 1,
    title: "Upload Attachments",
    description: "Go to report and payement all set thing",
    Component: GoToReport,
  },
  {
    id: 2,
    totalPages: 2,
    title: "Upload Attachments | Additional Q&A",
    description: "Wait is over need additional answeres to questions",
    Component: NeedAdditionalAnswers,
  },
  {
    id: 3,
    totalPages: 2,
    title: "Upload Attachments | Additional Q&A",
    description: "Additional Q&A for the uploaded files",
    Component: AdditionalQuestions,
  },
  {
    id: 4,
    totalPages: 2,
    title: "Upload Attachments",
    description: "Thank you and continue to report and payement",
    Component: AllSet,
  },
];

export default uploadAttachmentsPages;
