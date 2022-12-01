import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../../../components/reusable/page-title";
import Pagination from "../../../../components/reusable/pagination";
import Search, { IKeywordOption } from "../../../../components/reusable/search";

//
import RelatedKeyword from "../../../../components/@product/relatedKeyword";
import PublicationItem from "../../../../components/@product/publicationItem";

//
import { setDashboardSearch } from "../../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

//
import { getRelatedKeywords } from "../../../../utils/api/dashboard";
import { getPublications } from "../../../../utils/api/advance-search";

/**
 *
 */
export default function PublicationsPage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const joinedKeywords = searchedKeywords
    ?.map((kwd) => `"${kwd.value}"`)
    .join(", ");

  const keywords = searchedKeywords?.map((kwd) => kwd.value) ?? [];

  //
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: publicationsDataRaw } = useQuery(
    ["advanced-search-publications", ...keywords],
    async () => {
      return await getPublications(keywords);
    },
    { enabled: !!keywords?.length }
  );

  const { data: relatedKeywords } = useQuery(
    ["dashboard-most-related-keywords", ...keywords],
    async () => {
      return await getRelatedKeywords(keywords);
    },
    { enabled: !!keywords.length }
  );

  const publicationsData = ([] as any)
    // (isLoading ? [] : publicationsDataRaw?.data?.resultsList ?? [])
    // .filter((itm) => itm.abstract)
    .slice(0, 10);
  //
  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

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
            <span className="text-gray-700">
              Showing trending publications for:
            </span>
            <span className="font-semibold ml-1">{joinedKeywords}</span>
          </p>

          <div className="my-3">
            <PageTitle title="Publications" learnMore="Learn more" />
          </div>

          <div>
            {publicationsData?.map((publicationData: any) => (
              <PublicationItem
                data={publicationData}
                key={publicationData.doi}
              />
            ))}

            <div className="flex justify-center mt-7">
              <Pagination
                currentPage={currentPage}
                totalCount={111}
                gotoPage={gotoPage}
              />
            </div>
          </div>

          <div className="mt-5">
            <div className="uppercase font-semibold text-primary-900 text-sm mb-2">
              Related keywords
            </div>

            <div className="flex flex-wrap gap-x-2 gap-y-1 items-start">
              {relatedKeywords?.slice(0, 10)?.map((keyword) => (
                <RelatedKeyword keyword={keyword} key={keyword} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export interface IPublicationData {
  id: number;
  title: string;
  description: string;
}
