import { EQuickPromptPages } from "src/stores/upload-quick-prompt";
import QuickPrompt from "./quick-prompt";
import GoToReport from "./goto-report";

const quickPromptPagesList = [
  {
    id: EQuickPromptPages.QuickPrompt,
    totalPages: 0,
    title: "Quick Prompt",
    description: "Add quick prompts",
    Component: QuickPrompt,
  },
  {
    id: EQuickPromptPages.GoToReport,
    totalPages: 0,
    title: "Quick Prompt",
    description: "Go to report and payement all set thing",
    Component: GoToReport,
  },
];

export default quickPromptPagesList;
