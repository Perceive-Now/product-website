import React from "react";
import checkIcon from "./_assets/checkIcon.svg";

const AgentInfo = () => {
  return (
    <div className="max-w-[215px] w-full bg-orange-50 gap-y-4 flex flex-col rounded-xl p-[12px]">
      <div className="flex items-start gap-2">
        <span className="text-purple-600 text-xl w-6 h-3 rounded-full bg-primary-50 flex-[0_0_24px] inline-flex items-center justify-center">
          <img src={checkIcon} alt="" />
        </span>
        <p className="text-gray-800 flex-auto text-sm">
          I’ll help you build a world-class Scope of Work in just 6 quick steps.
        </p>
      </div>

      <div className="flex items-start gap-2">
        <span className="text-purple-600 text-xl w-6 h-3 rounded-full bg-primary-50 flex-[0_0_24px] inline-flex items-center justify-center">
          <img src={checkIcon} alt="" />
        </span>
        <p className="text-gray-800 flex-auto text-sm">
          Don’t have all the answers? Just say:{" "}
          <span className="font-medium italic">“Skip and go to the next step”</span>.
        </p>
      </div>

      <div className="flex items-start gap-2">
        <span className="text-purple-600 text-xl w-6 h-3 rounded-full bg-primary-50 flex-[0_0_24px] inline-flex items-center justify-center">
          <img src={checkIcon} alt="" />
        </span>
        <p className="text-gray-800 flex-auto text-sm">
          You can customize your report further on the next page.
        </p>
      </div>
      {/* <div className="flex items-start gap-2">
        <span className="text-purple-600 text-xl w-6 h-3 rounded-full bg-primary-50 flex-[0_0_24px] inline-flex items-center justify-center">
          <img src={checkIcon} alt="" />
        </span>
        <p className="text-gray-800 flex-auto text-sm">
          The data sources shown represent only 10% to 20% of those that may appear in the final
          report. The complete set of sources will be curated by Perceive Now’s proprietary AI
          agents, tailored to the specific use case, industry context, and client objectives.
        </p>
      </div> */}
    </div>
  );
};

export default AgentInfo;
