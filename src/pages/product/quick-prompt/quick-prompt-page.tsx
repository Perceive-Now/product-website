import Title from "../../../components/reusable/title";
import Button from "../../../components/reusable/button";
import QuickPromptForm from "./quick-prompt-form";

export default function QuickPromptPage() {
  return (
    <div className="flex flex-col min-w-[900px] min-h-[400px] bg-white rounded-lg">
      <Title text="Quick Prompt" />
      <p className="text-xl font-semibold text-secondary-900">
        Please fill out the following Mad Libs-style prompts to help us generate your custom report.
      </p>
      <QuickPromptForm />
      <Button
        type="optional"
        handleClick={() => {
          console.log("continue");
        }}
        disabled={false}
        classname="w-[320px]"
      >
        <p className="text-secondary-800">Continue</p>
      </Button>
    </div>
  );
}
