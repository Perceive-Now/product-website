import { useState } from "react";

//
import PageTitle from "../../../components/reusable/page-title";
import Search, { IKeywordOption } from "../../../components/reusable/search";

/**
 *
 */
export default function UniversitiesPage() {
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
            <span className="text-gray-700">
              Showing top universities trends for:
            </span>
            “
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
            <PageTitle
              title="Most recent publications by academic experts"
              subTitle="The top universities are located in Australia, Great Britain, Swizerland, and the United States. The top 3 leading universities are University College London, University of Southern California and Harvard Medical School."
              learnMore="Learn more"
            />
          </div>
        </div>
      )}
    </div>
  );
}
