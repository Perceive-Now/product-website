import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRangePick() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  return (
    <div className="flex items-center justify-end gap-x-1 ml-4 my-1">
      <div className="flex flex-col">
        <label>From</label>
        <ReactDatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <div className="flex flex-col">
        <label>To</label>
        <ReactDatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || new Date()} // Prevent selecting a date before the start date
        />
      </div>
    </div>
  );
}
