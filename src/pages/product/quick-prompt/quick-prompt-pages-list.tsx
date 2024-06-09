import AllSet from "../upload-attachements-page/all-set";
import QuickPrompt from "./quick-prompt";

export enum EQuickPromptPages {
  QuickPrompt,
  AllSet,
}

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
    Component: AllSet,
  },
];

export default quickPromptPagesList;
