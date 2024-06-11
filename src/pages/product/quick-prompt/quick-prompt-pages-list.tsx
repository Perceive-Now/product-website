import { EQuickPromptPages } from "src/stores/upload-quick-prompt";
import QuickPrompt from "./quick-prompt";
import GoToReport from "../upload-attachements-page/goto-report";

const quickPromptPagesList = [
  {
    id: EQuickPromptPages.QuickPrompt,
    totalPages: 1,
    title: "Quick Prompt",
    description: "Add quick prompts",
    Component: QuickPrompt,
  },
  {
    id: EQuickPromptPages.AllSet,
    totalPages: 1,
    title: "All set",
    description: "Go to report and payement all set thing",
    Component: GoToReport,
  },
];

export default quickPromptPagesList;
