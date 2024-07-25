import QuickPromptForm from "./quick-prompt-form";

export default function QuickPrompt() {
  return (
    <>
      <p className="text-base font-semibold text-secondary-900 mb-1">
        Please fill out the following Mad Libs-style prompts to help us generate your custom report.
      </p>
      <div className="xl:w-[900px]">
        <QuickPromptForm />
      </div>
    </>
  );
}
