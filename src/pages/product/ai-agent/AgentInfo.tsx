import React from "react";

const AgentInfo = () => {
  return (
    <div className="space-y-4  max-w-[300px] w-full">
      <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl">
        <span className="text-purple-600 text-xl">✔</span>
        <p className="text-gray-800">
          I’ll help you build a world-class Scope of Work in just <b>6 quick steps</b>.
        </p>
      </div>

      <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl">
        <span className="text-purple-600 text-xl">✔</span>
        <p className="text-gray-800">
          Don’t have all the answers? Just say: <i>“Skip and go to the next step”</i>.
        </p>
      </div>

      <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl">
        <span className="text-purple-600 text-xl">✔</span>
        <p className="text-gray-800">You can customize your report further on the next page.</p>
      </div>
    </div>
  );
};

export default AgentInfo;
