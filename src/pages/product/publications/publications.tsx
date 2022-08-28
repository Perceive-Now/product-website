import { useState } from "react";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";

//
import { IKeywordOption } from "../../../components/reusable/search/search";

/**
 *
 */
export default function PublicationsPage() {
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
              Showing trending publications for:
            </span>
            ”
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
            <PageTitle title="publications" learnMore="Learn more" />
          </div>
        </div>
      )}
    </div>
  );
}
