import { useState } from "react";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";

//
import { IKeywordOption } from "../../../components/reusable/search/search";

/**
 *
 */
export default function ExpertsPage() {
  const [searchKeywords, setSearchKeywords] = useState<IKeywordOption[]>();

  const handleSearch = (value: IKeywordOption[]) => {
    setSearchKeywords(value);
  };

  return (
    <div>
      <div className="w-1/2">
        <Search onSubmit={handleSearch} />
      </div>

      {searchKeywords && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing active experts for:</span>“
            {searchKeywords.map((keywords) => {
              return <span key={keywords.value}> {keywords.value}</span>;
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
