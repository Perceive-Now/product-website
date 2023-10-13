import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { useAppSelector } from "../../../hooks/redux";

interface Props {
  classification: "recent" | "specific" | "none";
  getValues: (data: Array<string | null | Date>) => void;
}

export default function DateRangePick({ classification, getValues }: Props) {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setFullYear(today.getFullYear() - 2);
  // const formattedDate = today.toISOString().split('T')[0];

  // const FilteredDate = useAppSelector((state) => state.date?.filter) ?? [];

  const [startDate, setStartDate] = useState(classification === "recent" ? pastDate : null);
  const [endDate, setEndDate] = useState(classification === "recent" ? today : null);

  useEffect(() => {
    if (classification === "recent") {
      const today = new Date();
      const pastDate = new Date(today);
      pastDate.setFullYear(today.getFullYear() - 2);

      setStartDate(pastDate);
      setEndDate(today);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  }, [classification]);
  useEffect(() => {
    if (startDate && endDate) {
      getValues([startDate.toISOString().split("T")[0], endDate.toISOString().split("T")[0]]);
    }
  }, [startDate, endDate]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };
  // send date

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
          disabled={classification === "none"}
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
          disabled={classification === "none"}
        />
      </div>
    </div>
  );
}
