import React from "react";
import Users from "./users";
import AgentHead from "src/pages/product/ai-agent/AgentHead";

const MyUsers = () => {
  return (
    <div className="flex flex-col gap-x-[20px] w-full mx-auto">
      <AgentHead agentName="" />
      <div>
        <Users />
      </div>
    </div>
  );
};

export default MyUsers;
