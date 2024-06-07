import Title from "../../../components/reusable/title";
import GoBack from "./goback";
import ProgressBar from "./progress-bar";
import { useAppSelector } from "../../../hooks/redux";
import quickPromptPagesList from "./quick-prompt-pages-list";

export default function QuickPromptPage() {
  const { currentPageId } = useAppSelector((state) => state.uploadQuickPrompt);

  const currentPageTitle =
    quickPromptPagesList.find((page) => page.id === currentPageId)?.title ?? "Upload Attachments";

  return (
    <>
      <GoBack />
      <div className="flex flex-col min-w-[900px] min-h-[400px] bg-white rounded-lg">
        <Title text={currentPageTitle} className="mt-5" />
        <ProgressBar />
        <PagesStepper />
      </div>
    </>
  );
}

const PagesStepper = () => {
  const { currentPageId } = useAppSelector((state) => state.uploadQuickPrompt);

  return (
    <>
      {quickPromptPagesList.map((page) => {
        const Comp = page.Component;
        if (page.id === currentPageId) {
          return <Comp key={page.id} />;
        }
      })}
    </>
  );
};
