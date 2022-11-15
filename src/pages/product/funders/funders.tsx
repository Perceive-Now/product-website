import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import RelatedKeyword from "../../../components/@product/relatedKeyword";

//
import PageTitle from "../../../components/reusable/page-title";
import Pagination from "../../../components/reusable/pagination";
import Search, { IKeywordOption } from "../../../components/reusable/search";

//
import { getRelatedKeywords } from "../../../utils/api/dashboard";

//
import { setDashboardSearch } from "../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

/**
 *
 */
export default function FundersPage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  //
  const [currentPage, setCurrentPage] = useState<number>(1);

  const joinedKeywords = searchedKeywords
    ?.map((kwd) => `"${kwd.value}"`)
    .join(", ");

  const keywords = searchedKeywords?.map((kwd) => kwd.value) ?? [];

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const { data: relatedKeywords } = useQuery(
    ["dashboard-most-related-keywords", ...keywords],
    async () => {
      return await getRelatedKeywords(keywords);
    },
    { enabled: !!keywords.length }
  );

  //
  const gotoPage = (page: number) => {
    setCurrentPage(page);
  };

  //
  return (
    <div>
      <div className="w-1/2">
        <Search initialValue={searchedKeywords} onSubmit={handleSearch} />
      </div>

      {searchedKeywords && searchedKeywords.length > 0 && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing top funders for:</span>
            <span className="font-semibold ml-1">{joinedKeywords}</span>
          </p>

          <div className="my-3">
            <PageTitle title="Funders" learnMore="Learn more" />
          </div>

          <div className="flex justify-center mt-7">
            <Pagination
              currentPage={currentPage}
              totalCount={111}
              gotoPage={gotoPage}
            />
          </div>

          <div className="mt-5">
            <div className="uppercase font-semibold text-primary-900 text-sm mb-2">
              Related keywords
            </div>

            <div className="flex flex-wrap gap-x-2 gap-y-1 items-start">
              {relatedKeywords?.slice(0, 15)?.map((keyword) => (
                <RelatedKeyword keyword={keyword} key={keyword} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
