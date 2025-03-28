import React from "react";
import { Link } from "react-router-dom";

type Agent = {
  agentName: string;
  title: string;
  description: string;
  icon: string;
  bgClass: string;
  className: string;
  backgroundImage: string;
  agentLink: string;
};

type AgentCardProps = {
  agent: Agent;
};

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Link to={`/ai-agent?agent=${agent.agentLink}`}>
      <div
        className={`flex flex-1 rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition-shadow ${
          agent.className
        } ${agent.agentName === "Finance & Strategy Agent" && "h-full"} cu`}
      >
        <div
          className={`flex flex-1 bg-gradient-to-br ${agent.bgClass} px-3 py-6 h-full`}
          style={{
            backgroundImage: `url(${agent.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // opacity: agent.agentName === "Marketing & Sales Agent" ? 0.9 : 1,
          }}
        >
          <div className="flex flex-1 flex-col justify-between gap-3 items-stretch rounded-lg h-full">
            <div className="flex flex-col">
              <img src={agent.icon} alt={agent.title} className="w-10 h-10 mb-2" />
              <div
                className="bg-white p-0.5 w-fit rounded backdrop-blur-sm"
                
              >
                <h3 className="text-3xl text-[#373D3F]">{agent.title}</h3>
              </div>
            </div>
            <p className="text-[#373D3F] text-sm">{agent.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AgentCard;
