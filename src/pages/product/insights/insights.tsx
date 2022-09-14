import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";

//
import SearchBarScreen from "../../../components/@product/search-bar-screen";

//
import { IKeywordOption } from "../../../components/reusable/search";
import { getMAInsights } from "../../../utils/api/ma-insights";

/**
 *
 *
 */
export default function InsightsPage() {
  const [searchkeywords, setSearchKeywords] = useState<IKeywordOption[]>([]);

  const { data, isLoading } = useQuery(
    ["m&a-insight", searchkeywords],
    async () => {
      return await getMAInsights();
    }
  );

  console.log(data, "data");

  const handleKeywordChange = (value: IKeywordOption[]) => {
    setSearchKeywords(value);
  };

  const handleSearch = () => {
    console.log(searchkeywords);
  };

  return (
    <Fragment>
      <SearchBarScreen
        searchKeywords={searchkeywords}
        handleKeywordChange={handleKeywordChange}
        handleSearch={handleSearch}
      />
    </Fragment>
  );
}
