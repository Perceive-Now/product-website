import { useState } from "react";

//
import PageTitle from "../../../components/reusable/page-title";
import Search, { IKeywordOption } from "../../../components/reusable/search";

/**
 *
 */
export default function TrendsPage() {
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
              Showing technology trends for:
            </span>
            “
            {searchKeywords.map((keywords) => (
              <span key={keywords.value}> {keywords.value}</span>
            ))}
            ”
          </p>

          <div className="my-3">
            <PageTitle
              title="Emerging super technologies"
              subTitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt arcu non sodales neque sodales ut etiam. Interdum velit laoreet id donec ultrices tincidunt arcu."
              learnMore="Learn more"
            />
          </div>
        </div>
      )}
    </div>
  );
}
