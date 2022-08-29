import { useState } from "react";
import { Outlet } from "react-router-dom";

//
import Search from "../../../components/reusable/search";
import { IKeywordOption } from "../../../components/reusable/search/search";

/**
 *
 */
export default function HawkEyePage() {
  const [searchKeywords, setSearchKeywords] = useState<IKeywordOption[]>();

  const handleSearch = (value: IKeywordOption[]) => {
    setSearchKeywords(value);
  };

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
        <Search onSubmit={handleSearch} />
      </div>
      
      <Outlet context={{ searchKeywords, count }} />
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
  searchKeywords: IKeywordOption[];
  count: IHawkEyeCount;
}
