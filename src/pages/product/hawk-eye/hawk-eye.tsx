import { useState } from "react";
import { Outlet } from "react-router-dom";

//
import Search from "../../../components/reusable/search";

/**
 *
 */
export default function HawkEyePage() {
  const [searchText, setSearchText] = useState("");

  const [count] = useState<IHawkEyeCount>({
    publications: 46,
    experts: 36,
    universities: 3,
    patents: 13,
    funders: 8,
  });

  return (
    <div>
      <div className="w-1/2">
        <Search onSubmit={(value) => setSearchText(value)} />
      </div>

      <Outlet context={{ searchText, count }} />
    </div>
  );
}

interface IHawkEyeCount {
  publications: number;
  experts: number;
  universities: number;
  patents: number;
  funders: number;
}

export interface IHawkEyeContext {
  searchText: string;
  count: IHawkEyeCount;
}
