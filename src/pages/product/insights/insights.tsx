import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import SearchBarScreen from "../../../components/@product/search-bar-screen";

//
import Search, { IKeywordOption } from "../../../components/reusable/search";
import { getMAInsights } from "../../../utils/api/ma-insights";
import PatentsDisclosure from "../../../components/reusable/accordion/patents-disclosure";
import DetailedDisclosure from "../../../components/reusable/detailed-disclosure";

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

  const handleKeywordChange = (value: IKeywordOption[]) => {
    setSearchKeywords(value);
  };

  const handleSearch = () => {
    console.log(searchkeywords);
  };

  return (
    <div>
      {!searchkeywords && (
        <SearchBarScreen
          searchKeywords={searchkeywords}
          handleKeywordChange={handleKeywordChange}
          handleSearch={handleSearch}
        />
      )}

      {searchkeywords && (
        <div>
          <div className="w-1/2">
            <Search onSubmit={() => null} initialValue={searchkeywords} />
          </div>

          <div className="mt-5">
            <div className="mb-11">
              <div className="text-primary-900 font-medium text-xl mb-2">
                Top 5 patents for IP portfolio expansion
              </div>

              <div className="text-lg text-gray-900 mb-4">
                {data?.patentsTop5?.respText}
              </div>

              <div>
                {data?.patentsTop5?.rankedList.map((listItem) => (
                  <PatentsDisclosure
                    key={listItem.uuid}
                    title={listItem.name}
                    description={listItem.description}
                    id={listItem.uuid}
                  />
                ))}
              </div>
            </div>

            <div className="mb-11">
              <div className="text-primary-900 font-medium text-xl mb-2">
                Top 5 Companies to Consider for M&A
              </div>

              <div className="text-lg text-gray-900 mb-4">
                {data?.companiesTop5?.respText}
              </div>

              <div>
                {data?.companiesTop5?.rankedList.map((listItem) => (
                  <DetailedDisclosure
                    key={listItem.uuid}
                    title={listItem.name}
                    description={listItem.description}
                    id={listItem.uuid}
                  />
                ))}
              </div>
            </div>

            <div className="mb-11">
              <div className="text-primary-900 font-medium text-xl mb-2">
                Top 5 Universities for Collaboration
              </div>

              <div className="text-lg text-gray-900 mb-4">
                {data?.universitiesTop5?.respText}
              </div>

              <div>
                {data?.universitiesTop5?.rankedList.map((listItem) => (
                  <DetailedDisclosure
                    key={listItem.uuid}
                    title={listItem.name}
                    description={listItem.description}
                    id={listItem.uuid}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
