import Title from "../../../components/reusable/title";
import GoBack from "./goback";
import ProgressBar from "./progress-bar";
import uploadAttachmentsPages from "./upload-attachment-pages-list";
import { useAppSelector } from "../../../hooks/redux";

export default function UploadAttachmentsPage() {
  return (
    <>
      <GoBack />
      <div>
        <Title text="Upload Attachments" className="mt-5" />
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
