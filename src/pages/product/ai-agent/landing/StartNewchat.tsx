import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import AgentHead from "../AgentHead";
import AgentInfo from "../AgentInfo";
import QueryAnswer from "src/components/@vc-product/query-answer";
import ChatQuery from "src/components/@vc-product/chat-question";
import { agents } from "./homepage";

const StartNewchat = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="px-0 md:px-3 w-full mx-auto h-full">
        <div className="flex justify-start items-center mt-3">
          <Link to="/ai-agent/landing">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
        <AgentHead />
        <div className="flex flex-col gap-y-3 lg:flex-row lg:gap-y-0 gap-x-5 lg:gap-x-2">
          <div className="flex-auto relative flex flex-col gap-2 max-w-[780px] mx-auto h-[100vh]">
            <div className="flex flex-row flex-auto justify-center">
              <div className="bg-white rounded-lg p-3 pt-0 w-full max-h-[calc(100vh-244px)] overflow-y-auto pn_scroller shadow-[0_4px_4px_0] shadow-[#000]/[0.06]">
                <ChatQuery
                  query={
                    "Welcome! I'm here to assist you with your reports. Which AI Agent would you like to work with today?"
                  }
                  index={1}
                  initLoading={false}
                  agentName={""}
                />
                <div className={`flex flex-wrap items-center justify-end gap-2 mt-2 `}>
                  {agents.map(
                    (agent) =>
                      !agent.disabled && (
                        <button
                          key={agent.agentLink}
                          onClick={() => {
                            navigate(`/ai-agent?agent=${agent.agentLink}`);
                          }}
                          // disabled={stage !== "Edit Summary" ? hasselected : false}
                          className={`cursor-pointer text-sm rounded-lg py-1 px-2 border border-secondary-500 hover:bg-foundationOrange-100 text-secondary-800`}
                        >
                          {agent.agentName}
                        </button>
                      ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartNewchat;
