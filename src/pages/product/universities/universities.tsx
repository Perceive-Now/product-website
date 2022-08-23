import { useState } from "react";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";

/**
 *
 */
export default function UniversitiesPage() {
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
              Showing top universities trends for:
            </span>
            <span> “{searchText}”</span>
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
