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
        if (page.id === currentPageId) {
          const Component = page.Component;
          return <Component key={page.id} />;
        }
      })}
    </>
  );
};
