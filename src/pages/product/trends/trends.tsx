import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DetailedDisclosure from "../../../components/reusable/detailed-disclosure";

//
import PageTitle from "../../../components/reusable/page-title";
import Search, { IKeywordOption } from "../../../components/reusable/search";
import { getTechnologyTrends } from "../../../utils/api/trends";

/**
 *
 */
export default function TrendsPage() {
  const [searchKeywords, setSearchKeywords] = useState<IKeywordOption[]>();

  const { data, isLoading } = useQuery(
    ["technology-trends", searchKeywords],
    async () => {
      return await getTechnologyTrends();
    }
  );

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
              subTitle={data?.data.respText}
              learnMore="Learn more"
            />
          </div>

          <div>
            {data?.trendsList?.map((listItem) => (
              <DetailedDisclosure
                key={listItem.uuid}
                title={listItem.name}
                description={listItem.description}
                id={listItem.uuid}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
