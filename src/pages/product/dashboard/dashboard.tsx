import { useState } from "react";
import { useLocation } from "react-router-dom";

//
import { IKeywordOption } from "../../../components/reusable/search/search";

export default function DashboardPage() {
  const location = useLocation();
  const locationState = location.state as ILocationState;

  const [searchKeywords] = useState(locationState?.search ?? []);

  return (
    <div>
      {searchKeywords && (
        <p>
          <span>Searching for: </span>
          <span>"</span>
          <span className="font-semibold">
            {searchKeywords.map((keyword, index) => {
              let comma = "";
              if (searchKeywords.length - 1 > index) {
                comma = ", ";
              }
              return `${keyword.value}${comma}`;
            })}
          </span>
          <span>"</span>
        </p>
      )}
    </div>
  );
}

interface ILocationState {
  search?: IKeywordOption[];
}
