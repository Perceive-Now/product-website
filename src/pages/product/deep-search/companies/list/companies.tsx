import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import type { ColumnDef } from "@tanstack/react-table";

//
import { LoadingIcon } from "../../../../../components/icons";

import Button from "../../../../../components/reusable/button";
import Search from "../../../../../components/reusable/search";
import ReactTable from "../../../../../components/reusable/ReactTable";
import Pagination from "../../../../../components/reusable/pagination";
import RadioButtons from "../../../../../components/reusable/radio-buttons";
import RelatedKeyword from "../../../../../components/@product/relatedKeyword";

import type { IKeywordOption } from "../../../../../components/reusable/search";

//
import { setDashboardSearch } from "../../../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";

//
import { getRelatedKeywords } from "../../../../../utils/api/dashboard";
import { getDeepSearchCompaniesPatentList } from "../../../../../utils/api/deep-search/companies";

import type { IDeepSearchCompanyPatentItem } from "../../../../../utils/api/deep-search/companies";

//
const PAGE_SIZE = 10;

//
export default function DeepSearchCompaniesListPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const joinedkeywords = keywords.join(", ");

  //
  const [totalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState<CategoryType>("patents");

  //
  const { data: relatedKeywords } = useQuery({
    queryKey: ["dashboard-most-related-keywords", ...keywords],
    queryFn: () => {
      return getRelatedKeywords(keywords);
    },
    enabled: !!keywords.length,
  });

  // Navigate to company patent list
  const navigateToPatentList = (
    name: string,
    patents: number,
    patentClaims: number,
    inventors: number,
  ) => {
    navigate(
      `/deep-search/companies/patent?name=${encodeURIComponent(
        name,
      )}&p=${patents}&pc=${patentClaims}&i=${inventors}`,
    );
  };

  // Getting patent list
  const { data: patentList, isLoading } = useQuery({
    queryKey: [...keywords, currentPage],
    queryFn: async () => {
      const response = await getDeepSearchCompaniesPatentList({
        keywords,
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE + 1,
      });

      //
      // setTotalCount();

      //
      return response ?? [];
    },
    enabled: !!keywords.length || category !== "patents",
  });

  const finalPatentList = patentList ?? [];

  //
  const patentColumns: ColumnDef<IDeepSearchCompanyPatentItem>[] = [
    {
      header: "Company Name",
      accessorKey: "company_name",
      cell: (data) => <p className="line-clamp-1">{data.row.original.key || "-"}</p>,
      minSize: 350,
      maxSize: 350,
    },
    {
      header: "No. of patents",
      accessorKey: "no_of_patents",
      cell: (data) => (
        <p className="line-clamp-1">
          {data.row.original.count ? data.row.original.count.toLocaleString() : "-"}
        </p>
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: "No. of patent claims",
      accessorKey: "no_of_patent_claims",
      cell: (data) => (
        <p className="line-clamp-1">
          {data.row.original.claim_sum ? data.row.original.claim_sum.toLocaleString() : "-"}
        </p>
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: "Inventors",
      accessorKey: "inventors",
      cell: (data) => (
        <p className="line-clamp-1">
          {data.row.original.inv_count ? data.row.original.inv_count.toLocaleString() : "-"}
        </p>
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: " ",
      cell: (data) => {
        const dataValues = data.row.original;

        return (
          <Button
            type="secondary"
            size="small"
            handleClick={() =>
              navigateToPatentList(
                dataValues.key,
                dataValues.count,
                dataValues.claim_sum,
                dataValues.inv_count,
              )
            }
          >
            Track
          </Button>
        );
      },
      minSize: 120,
      maxSize: 120,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const publicationColumns: ColumnDef<any>[] = [
    {
      header: "Company Name",
      accessorKey: "company_name",
      cell: (data) => <p className="line-clamp-1">{data.row.original.key || "-"}</p>,
      minSize: 350,
      maxSize: 350,
    },
    {
      header: "No. of publications",
      accessorKey: "no_of_publications",
      cell: (data) => (
        <p className="line-clamp-1">
          {data.row.original ? data.row.original.count.toLocaleString() : "-"}
        </p>
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: "Reference count",
      accessorKey: "reference_count",
      cell: (data) => (
        <p className="line-clamp-1">
          {data.row.original.reference_count
            ? data.row.original.reference_count.toLocaleString()
            : "-"}
        </p>
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: "Authors",
      accessorKey: "authors_count",
      cell: (data) => (
        <p className="line-clamp-1">
          {data.row.original.authors_count ? data.row.original.authors_count.toLocaleString() : "-"}
        </p>
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: " ",
      cell: () => (
        <Button type="secondary" size="small">
          Track
        </Button>
      ),
      minSize: 120,
      maxSize: 120,
    },
  ];

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const changeClassificationMode = (mode: string) => {
    setCategory(mode as CategoryType);
  };

  //
  useEffect(() => {
    setCurrentPage(1);
  }, [searchedKeywords, category]);

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

          {!!keywords.length && (
            <p className="mt-[4px]">
              <span>Showing companies for: </span>
              <span className="font-semibold">"{joinedkeywords}"</span>
            </p>
          )}
        </div>
      </div>

      {/* Classification */}
      <div className="flex justify-end">
        <RadioButtons
          activeMode={category}
          handleModeChange={changeClassificationMode}
          options={[
            { label: "Patents", value: "patents" },
            { label: "Publications", value: "publications" },
          ]}
        />
      </div>

      {/* Main content */}
      <div>
        <p className="text-primary-900 text-[22px]">Companies</p>

        <div className="my-4">
          {!!keywords.length && isLoading ? (
            <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
              <LoadingIcon width={40} height={40} />
            </div>
          ) : (
            <>
              {category === "patents" && (
                <ReactTable columnsData={patentColumns} rowsData={finalPatentList} size="small" />
              )}

              {category === "publications" && (
                <ReactTable columnsData={publicationColumns} rowsData={[]} size="small" />
              )}
            </>
          )}
        </div>

        <div className="flex justify-center">
          <Pagination
            page={currentPage}
            total={Math.ceil(totalCount / PAGE_SIZE)}
            onChange={(pageNum) => setCurrentPage(pageNum)}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Related keywords */}
      {keywords.length > 0 && (
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

//
type CategoryType = "patents" | "publications";
