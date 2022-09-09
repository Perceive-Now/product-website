import { useEffect, useState } from "react";

//
import PageTitle from "../../../components/reusable/page-title";
import Search, { IKeywordOption } from "../../../components/reusable/search";

//
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { handleSetDashboardSearch } from "../../../stores/dashboard";

/**
 *
 */
export default function ExpertsPage() {
  const dispatch = useAppDispatch();
  const dashboardSearch = useAppSelector((state) => state.dashboard?.search);

  const [searchKeywords, setSearchKeywords] = useState<IKeywordOption[]>();

  //
  useEffect(() => {
    setSearchKeywords(dashboardSearch);
  }, [dashboardSearch]);

  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(handleSetDashboardSearch(value));
  };

  return (
    <div>
      <div className="w-1/2">
        <Search initialValue={searchKeywords} onSubmit={handleSearch} />
      </div>

      {searchKeywords && searchKeywords.length > 0 && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing active experts for:</span>“
            {searchKeywords.map((keyword, index) => {
              let comma = "";
              if (searchKeywords.length - 1 > index) {
                comma = ", ";
              }
              return `${keyword.value}${comma}`;
            })}
            ”
          </p>

          <div className="my-3">
            <PageTitle title="Experts" learnMore="Learn more" />
          </div>
        </div>
      )}
    </div>
  );
}
