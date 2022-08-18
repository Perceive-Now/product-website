import { useState } from "react";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";

/**
 *
 */
export default function PatentsPage() {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <div className="w-1/2">
        <Search onSubmit={(searchValue) => setSearchText(searchValue)} />
      </div>

      {searchText && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing active patents for:</span>
            <span> “{searchText}”</span>
          </p>

          <div className="my-3">
            <PageTitle title="Patents" learnMore="Learn more" />
          </div>
        </div>
      )}
    </div>
  );
}
