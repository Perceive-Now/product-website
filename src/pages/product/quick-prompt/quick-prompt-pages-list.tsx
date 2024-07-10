import { EQuickPromptPages } from "src/stores/upload-quick-prompt";
import QuickPrompt from "./quick-prompt";

const quickPromptPagesList = [
  {
    id: EQuickPromptPages.QuickPrompt,
    totalPages: 0,
    title: "Quick Prompt",
    description: "Add quick prompts",
    Component: QuickPrompt,
  },
];

export default quickPromptPagesList;
