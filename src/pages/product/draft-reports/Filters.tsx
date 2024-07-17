import React, { useState } from "react";
import DateRangePick from "../../../components/reusable/date-range/index";

export const DateFilter: React.FC = () => {
  const [classification, setClassification] = useState<"recent" | "specific" | "none">("none");

  const handleClassificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassification(event.target.value as "recent" | "specific" | "none");
  };

  const handleGetValues = (data: { start_date: string; end_date: string }) => {
    //console.log("Selected Date Range:", data);
  };

  return (
    <div className="p-4 bg-white text-black">
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="mostRecent"
          name="dateRange"
          value="recent"
          checked={classification === "recent"}
          onChange={handleClassificationChange}
        />
        <label htmlFor="mostRecent" className="ml-2">
          Most recent (Past 2 years)
        </label>
      </div>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          id="specificDateRange"
          name="dateRange"
          value="specific"
          checked={classification === "specific"}
          onChange={handleClassificationChange}
        />
        <label htmlFor="specificDateRange" className="ml-2 font-mulish">
          Specific date range
        </label>
      </div>
      {classification !== "none" && (
        <DateRangePick classification={classification} getValues={handleGetValues} />
      )}
      <div className="flex space-x-2 mt-2 justify-end ">
        <button
          className="bg-white text-[#442873] px-4 py-1 rounded font-mulish font-semibold border-[#442873] border-2"
          onClick={() => setClassification("none")}
        >
          Clear
        </button>
        <button className="bg-[#442873] text-white px-4 py-1 rounded">Done</button>
      </div>
    </div>
  );
};

export const UseCaseFilter: React.FC = () => {
  return <div>Use cases content here</div>;
};

export const TagFilter: React.FC = () => {
  return <div>Tags content here</div>;
};
