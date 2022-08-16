import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function DashboardPage() {
  const location = useLocation();
  const locationState = location.state as ILocationState;

  const [searchValue] = useState(locationState?.search ?? "");

  return (
    <div>
      {searchValue && (
        <p>
          <span>Searching for: </span>
          <span>"</span>
          <span className="font-semibold">{searchValue}</span>
          <span>"</span>
        </p>
      )}
    </div>
  );
}

interface ILocationState {
  search?: string;
}
