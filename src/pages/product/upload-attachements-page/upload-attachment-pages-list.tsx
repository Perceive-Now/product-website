import { EUploadAttachmentsPages } from "src/stores/upload-attachments";
import AdditionalQuestions from "./additional-questions";
import AllSet from "./all-set";
import GoToReport from "./goto-report";
import UploadAttachments from "./upload-attachments";
import WebsiteLinks from "./websiteLinks";

const uploadAttachmentsPages = [
  {
    id: EUploadAttachmentsPages.UploadAttachments,
    totalPages: 2,
    title: "Upload Attachments",
    description: "Upload the attachement files",
    Component: <UploadAttachments />,
  },
  {
    id: EUploadAttachmentsPages.WebsiteLinks,
    totalPages: 2,
    title: "Upload Attachments",
    description: "Add website links",
    Component: <WebsiteLinks />,
  },
  {
    id: EUploadAttachmentsPages.GoToReport,
    totalPages: 2,
    title: "Upload Attachments",
    description: "Go to report and payement all set thing",
    Component: <GoToReport />,
  },
  {
    id: EUploadAttachmentsPages.AdditionalQuestions,
    totalPages: 3,
    title: "Upload Attachments | Additional Q&A",
    description: "Additional Q&A for the uploaded files",
    Component: <AdditionalQuestions />,
  },
  {
    id: EUploadAttachmentsPages.AllSet,
    totalPages: 3,
    title: "Upload Attachments",
    description: "Thank you and continue to report and payement",
    Component: <AllSet />,
  },
];

export default uploadAttachmentsPages;
