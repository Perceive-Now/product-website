import { useState } from "react";

//
import PageTitle from "../../../components/reusable/page-title";
import Search, { IKeywordOption } from "../../../components/reusable/search";

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
