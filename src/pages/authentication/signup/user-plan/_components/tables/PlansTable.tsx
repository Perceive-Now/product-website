import React from "react";

interface PlanTableProps {
  currentPlan: string;
}

const PlansTable = ({ currentPlan }: PlanTableProps) => {
  const plans = [
    {
      name: "Launch",
      description: "Ideal for startups and initial projects.",
      isActive: currentPlan === "Launch",
    },
    {
      name: "Accelerate",
      description: "Perfect for growing businesses looking to scale.",
      isActive: currentPlan === "Accelerate",
    },
    {
      name: "Ascend",
      description: "Designed for enterprises aiming for peak performance.",
      isActive: currentPlan === "Ascend",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-t-0 border-collapse border border-gray-200">
        <tbody className="flex justify-end">
          {plans.map((plan, index) => (
            <tr
              key={index}
              className={
                plan.isActive ? "bg-[#FFA300]" : index % 2 === 0 ? "bg-white" : "bg-transparent"
              }
            >
              <td className="border border-gray-200 px-4 py-2 text-center text-lg font-semibold w-[200px]">
                {plan.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlansTable;
