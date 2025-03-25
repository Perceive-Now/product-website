import Reports from "./reports";
import ReportSidebar from "./report-side";
import AgentHead from "src/pages/product/ai-agent/AgentHead";

const ReportMangement = () => {
  return (
    <div className="flex flex-col gap-x-[20px] w-full mx-auto">
      <AgentHead agentName="" />
      <div>
        <Reports />
      </div>
      {/* <div className='w-full bg-black h-screen' /> */}
      {/* <ReportSidebar /> */}
    </div>
  );
};

export default ReportMangement;
