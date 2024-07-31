import React, { useState } from "react";
import Calendar from "../../../components/reusable/calendar/Calendar";
import CalendarIcon from "../../../components/icons/common/calendar-icon";
import { UseCaseOptions } from "../../../components/@report/use-case/__use-cases";

interface DateFilterProps {
  onDateRangeChange: (range: { from: Date | null; to: Date | null }) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ onDateRangeChange }) => {
  const [classification, setClassification] = useState<"recent" | "specific" | "none">("none");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<{ from: boolean; to: boolean }>({
    from: false,
    to: false,
  });
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  const handleClassificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassification(event.target.value as "recent" | "specific" | "none");
  };

  const handleDateChange = (date: Date, type: "from" | "to") => {
    setDateRange((prev) => ({ ...prev, [type]: date }));
    setIsCalendarOpen((prev) => ({ ...prev, [type]: false }));
  };

  const handleDoneClick = () => {
    onDateRangeChange(dateRange);
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
      {classification === "specific" && (
        <div>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <label htmlFor="fromDate">From</label>
              <div className="relative">
                <input
                  type="text"
                  id="fromDate"
                  placeholder="DD-MM-YYYY      "
                  value={dateRange.from ? dateRange.from.toISOString().split("T")[0] : ""}
                  readOnly
                  onClick={() => setIsCalendarOpen({ from: true, to: false })}
                  className="border px-2 py-1"
                />
                {!dateRange.from && (
                  <span className="absolute inset-y-0 right-0 flex items-center ">
                    <CalendarIcon className="w-4 h-4 text-gray-600" />
                  </span>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="toDate">To</label>
              <div className="relative">
                <input
                  type="text"
                  id="toDate"
                  placeholder="DD-MM-YYYY      "
                  value={dateRange.to ? dateRange.to.toISOString().split("T")[0] : ""}
                  readOnly
                  onClick={() => setIsCalendarOpen({ from: false, to: true })}
                  className="border px-2 py-1"
                />
                {!dateRange.from && (
                  <span className="absolute inset-y-0 right-0 flex items-center ">
                    <CalendarIcon className="w-4 h-4 text-gray-600" />
                  </span>
                )}
              </div>
            </div>
          </div>
          {isCalendarOpen.from && (
            <Calendar
              selectedDate={dateRange.from || new Date()}
              onDateChange={(date) => handleDateChange(date, "from")}
            />
          )}
          {isCalendarOpen.to && (
            <Calendar
              selectedDate={dateRange.to || new Date()}
              onDateChange={(date) => handleDateChange(date, "to")}
            />
          )}
        </div>
      )}
      <div className="flex space-x-2 mt-2 justify-end ">
        <button
          className="bg-white text-[#442873] px-4 py-1 rounded font-mulish font-semibold border-[#442873] border-2"
          onClick={() => {
            setClassification("none");
            setDateRange({ from: null, to: null });
          }}
        >
          Clear
        </button>
        <button className="bg-[#442873] text-white px-4 py-1 rounded" onClick={handleDoneClick}>
          Done
        </button>
      </div>
    </div>
  );
};

interface UseCaseFilterProps {
  onUseCaseChange: (selectedUseCases: number[]) => void;
}

export const UseCaseFilter: React.FC<UseCaseFilterProps> = ({ onUseCaseChange }) => {
  const [selectedUseCases, setSelectedUseCases] = useState<number[]>([]);

  const handleCheckboxChange = (id: number) => {
    setSelectedUseCases((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((useCaseId) => useCaseId !== id)
        : [...prevSelected, id],
    );
  };

  const handleDoneClick = () => {
    onUseCaseChange(selectedUseCases);
  };

  return (
    <div className="p-4 bg-white text-black">
      {UseCaseOptions.map((useCase) => (
        <div key={useCase.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`useCase-${useCase.id}`}
            checked={selectedUseCases.includes(useCase.id)}
            onChange={() => handleCheckboxChange(useCase.id)}
          />
          <label htmlFor={`useCase-${useCase.id}`} className="ml-2">
            {useCase.label} ({Math.floor(Math.random() * 50) + 1}) {/* Sample number for demo */}
          </label>
        </div>
      ))}
      <div className="flex space-x-2 mt-2 justify-end ">
        <button
          className="bg-white text-[#442873] px-4 py-1 rounded font-mulish font-semibold border-[#442873] border-2"
          onClick={() => setSelectedUseCases([])}
        >
          Clear
        </button>
        <button className="bg-[#442873] text-white px-4 py-1 rounded" onClick={handleDoneClick}>
          Done
        </button>
      </div>
    </div>
  );
};
