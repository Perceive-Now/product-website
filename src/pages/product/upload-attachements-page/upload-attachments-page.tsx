import Title from "../../../components/reusable/title";
import GoBack from "./goback";
import { useContext } from "react";
import ProgressBar from "./progress-bar";
import uploadAttachmentsPages from "./upload-attachment-pages-list";
import UploadAttachmentsContextProvider, {
  UploadAttachmentsContext,
} from "./upload-attachments-context";

export default function UploadAttachmentsPage() {
  return (
    <UploadAttachmentsContextProvider>
      <GoBack />
      <div>
        <Title text="Upload Attachments" className="mt-5" />
        <ProgressBar />
        <PagesStepper />
      </div>
    </UploadAttachmentsContextProvider>
  );
}

const PagesStepper = () => {
  const { currentPageId } = useContext(UploadAttachmentsContext);

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
