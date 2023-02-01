import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Tooltip, TooltipProvider } from "react-tooltip";

//
import Search from "../../../../../components/reusable/search";
import Pagination from "../../../../../components/reusable/pagination";
import ReactTable from "../../../../../components/reusable/ReactTable";
import RadioButtons from "../../../../../components/reusable/radio-buttons";
import RelatedKeyword from "../../../../../components/@product/relatedKeyword";
import TableYearSelect from "../../../../../components/reusable/table-year-select";

import type { IKeywordOption } from "../../../../../components/reusable/search";

//
import { LoadingIcon } from "../../../../../components/icons";

//
import { useAppSelector } from "../../../../../hooks/redux";
import { setDashboardSearch } from "../../../../../stores/dashboard";

//
import { getRelatedKeywords } from "../../../../../utils/api/dashboard";
import { getDeepSearchPublicationList } from "../../../../../utils/api/deep-search/publications";

//
import { closedColumnData, openColumnData } from "./_data";

//
const PAGE_SIZE = 10;

/**
 *
 */
export default function PublicationListPage() {
  const dispatch = useDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const joinedkeywords = keywords.join(", ");

  const [selectedPublishedYear, setSelectedPublishedYear] = useState<number>(2022);
  //
  const [classification, setClassification] = useState<classificationMode>("Industry");
  //
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  //
  const { data: relatedKeywords } = useQuery(
    ["dashboard-most-related-keywords", ...keywords],
    async () => {
      return await getRelatedKeywords(keywords);
    },
    { enabled: !!keywords.length },
  );

  const publishYearsOptions = useMemo(() => {
    const startYear = new Date().getFullYear() - 1;
    const yearsToInclude = 50;
    const endYear = startYear - yearsToInclude;

    const years = [];
    for (let i = startYear; i >= endYear; i--) {
      years.push({
        label: i.toString(),
        value: i,
      });
    }
    return years;
  }, []);

  // Getting publication list
  const { data: publicationsList, isLoading } = useQuery({
    queryKey: [...keywords, classification, selectedPublishedYear, currentPage],
    queryFn: async () => {
      const response = await getDeepSearchPublicationList({
        keywords,
        year: selectedPublishedYear ? selectedPublishedYear : new Date().getFullYear() - 1,
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE + 1,
        classification,
      });

      //
      setTotalCount(response.count);

      //
      return response?.data ?? [];
    },
    enabled: !!keywords.length,
  });

  const finalPublicationList = publicationsList ?? [];

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const changeClassificationMode = (mode: string) => {
    setClassification(mode as classificationMode);
  };

  //
  return (
    <div>
      {/* Search bar */}
      <div className="grid grid-cols-7 mb-1">
        <div className="col-span-4">
          <Search
            required
            size="small"
            className="w-full"
            onSubmit={handleSearch}
            initialValue={searchedKeywords}
          />

          {keywords.length > 0 ? (
            <p className="mt-[4px]">
              <span>Showing publications for: </span>
              <span className="font-semibold">"{joinedkeywords}"</span>
            </p>
          ) : (
            <p className="mt-[4px] text-sm text-appGray-900">
              Search keywords e.g. “COVID-19” to see related publications.
            </p>
          )}
        </div>
      </div>

      {/* Classification */}
      <div className="flex justify-end">
        <RadioButtons
          activeMode={classification}
          handleModeChange={changeClassificationMode}
          options={[
            { label: "Industry closed access", value: "Industry" },
            { label: "Academic closed access", value: "Academic" },
            { label: "Open access", value: "Open" },
          ]}
        />
      </div>

      {/* Filter section */}
      <div className="mb-5 flex items-start">
        <span className="font-semibold text-appGray-900 mr-2">Filter by:</span>
        <TableYearSelect
          label="Publication Date"
          placeholder="Publication Date"
          onChange={(year) => setSelectedPublishedYear(year)}
          value={selectedPublishedYear}
          options={publishYearsOptions}
        />
      </div>

      {/* Main content */}
      <div>
        <p className="text-primary-900 text-[22px] mb-4">Publications</p>

        <TooltipProvider>
          <div className="my-4">
            {!!keywords.length && isLoading ? (
              <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
                <LoadingIcon width={40} height={40} />
              </div>
            ) : (
              <ReactTable
                size="small"
                rowsData={finalPublicationList}
                columnsData={classification === "Open" ? openColumnData : closedColumnData}
              />
            )}
          </div>

          <Tooltip className="tooltip" float />
        </TooltipProvider>

        <div className="flex justify-center">
          <Pagination
            page={currentPage}
            total={Math.ceil(totalCount / PAGE_SIZE)}
            onChange={(pageNum) => setCurrentPage(pageNum)}
            disabled={isLoading}
          />
        </div>
      </div>

      {!!keywords.length && (
        <div className="mt-5">
          <p className="mb-2 uppercase text-sm text-primary-900">Related Keywords</p>

          <div className="flex flex-wrap gap-1">
            {relatedKeywords?.related_keywords?.slice(0, 15)?.map((keyword, index) => (
              <RelatedKeyword keyword={keyword} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Industry and Academic are closed source, open is open source.
type classificationMode = "Industry" | "Academic" | "Open";
