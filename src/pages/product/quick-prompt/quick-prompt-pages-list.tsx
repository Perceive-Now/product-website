import AllSet from "../upload-attachements-page/all-set";
import QuickPrompt from "./quick-prompt";

const quickPromptPagesList = [
  {
    id: 0,
    totalPages: 1,
    title: "Quick Prompt",
    description: "Add quick prompts",
    Component: QuickPrompt,
  },
  {
    id: 1,
    totalPages: 1,
    title: "All set",
    description: "Go to report and payement all set thing",
    Component: AllSet,
  },
];

export default quickPromptPagesList;
