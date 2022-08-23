import { useState } from "react";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";

/**
 *
 */
export default function TrendsPage() {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <div className="w-1/2">
        <Search onSubmit={(searchValue) => setSearchText(searchValue)} />
      </div>

      {searchText && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">
              Showing technology trends for:
            </span>
            <span> “{searchText}”</span>
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
