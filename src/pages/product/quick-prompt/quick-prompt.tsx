import QuickPromptForm from "./quick-prompt-form";

export default function QuickPrompt() {
  return (
    <>
      <p className="text-xl font-semibold text-secondary-900 mb-[20px] mt-[40px]">
        Please fill out the following Mad Libs-style prompts to help us generate your custom report.
      </p>
      <div className="w-[900px]">
        <QuickPromptForm />
      </div>
    </>
  );
}
