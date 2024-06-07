import Title from "../../../components/reusable/title";
import GoBack from "./goback";
import ProgressBar from "./progress-bar";
import uploadAttachmentsPages from "./upload-attachment-pages-list";
import { useAppSelector } from "../../../hooks/redux";

export default function UploadAttachmentsPage() {
  const { currentPageId } = useAppSelector((state) => state.uploadAttachments);

  const currentPageTitle =
    uploadAttachmentsPages.find((page) => page.id === currentPageId)?.title ?? "Upload Attachments";

  return (
    <>
      <GoBack />
      <div>
        <Title text={currentPageTitle} className="mt-5" />
        <ProgressBar />
        <PagesStepper />
      </div>
    </>
  );
}

const PagesStepper = () => {
  const { currentPageId } = useAppSelector((state) => state.uploadAttachments);

  return (
    <>
      {uploadAttachmentsPages.map((page) => {
        const Comp = page.Component;
        if (page.id === currentPageId) {
          return (
            <div key={page.id}>
              <Comp key={page.id} />
            </div>
          );
        } else {
          return (
            <div key={page.id} className="hidden">
              <Comp key={page.id} />
            </div>
          );
        }
      })}
    </>
  );
};
