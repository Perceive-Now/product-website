import React from "react";
import { useNavigate } from "react-router-dom";

const TaskType = () => {
  const navigate = useNavigate();

  const handleSelection = (type: string) => {
    if (type === "projectHub") {
      navigate("/admin"); // Redirect to Project Hub
    } else if (type === "aiAgent") {
      navigate("/agent-admin"); // Redirect to AI Agent
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-semibold">Choose task type</h1>
      <div className="flex gap-2">
        <div
          onClick={() => handleSelection("projectHub")}
          className="rounded shadow p-4 bg-gray-50 cursor-pointer hover:shadow-md w-[200px] flex items-center justify-center h-[200px]"
        >
          Project Hub
        </div>
        <div
          onClick={() => handleSelection("aiAgent")}
          className="rounded shadow p-4 bg-gray-50 cursor-pointer hover:shadow-md w-[200px] flex items-center justify-center h-[200px]"
        >
          AI Agent
        </div>
      </div>
    </div>
  );
};

export default TaskType;
