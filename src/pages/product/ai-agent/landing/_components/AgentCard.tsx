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
};

type AgentCardProps = {
  agent: Agent;
};

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <Link to={`/ai-agent?agent=${encodeURIComponent(agent.agentName)}`}>
      <div
        className={`flex flex-1 rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition-shadow ${agent.className} cu`}
      >
        <div
          className={`flex flex-1 bg-gradient-to-br ${agent.bgClass} p-6 h-full`}
          style={{
            backgroundImage: `url(${agent.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // opacity: agent.agentName === "Marketing & Sales Agent" ? 0.9 : 1,
          }}
        >
          <div className="flex flex-1 flex-col justify-stretch gap-3 items-stretch rounded-lg h-full">
            <div>
              <img src={agent.icon} alt={agent.title} className="w-12 h-12 mb-2" />
              <div
                className="bg-white/90 p-1 rounded-md backdrop-blur-sm"
                style={{ fontFamily: "serif" }}
              >
                <h3 className="text-2xl font-medium mb-2 text-gray-800">{agent.title}</h3>
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
