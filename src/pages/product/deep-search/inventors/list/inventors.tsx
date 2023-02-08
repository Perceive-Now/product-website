import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import type { ColumnDef } from "@tanstack/react-table";

//
import { LoadingIcon } from "../../../../../components/icons";

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

import Button from "../../../../../components/reusable/button";
import TableYearSelect from "../../../../../components/reusable/table-year-select/table-year-select";
import {
  getDeepSearchPatentInventorsList,
  IDeepSearchInventorsPatentItem,
} from "../../../../../utils/api/deep-search/inventors";

//
const PAGE_SIZE = 10;

//
export default function DeepSearchInventorsListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paramsClassification: string | null = searchParams.get("mode");
  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const joinedkeywords = keywords.join(", ");

  //
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState<CategoryType>("patents");

  const [publishedYear, setPublishedYear] = useState<number>(2022);

  //
  useEffect(() => {
    if (paramsClassification) {
      if (paramsClassification === "patents" || paramsClassification === "publications") {
        setCategory(paramsClassification);
      }
    }
  }, [paramsClassification]);

  //
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

  //
  const { data: relatedKeywords } = useQuery({
    queryKey: ["dashboard-most-related-keywords", ...keywords],
    queryFn: () => {
      return getRelatedKeywords(keywords);
    },
    enabled: !!keywords.length,
  });

  // Getting patent list
  const { data: patentList, isLoading } = useQuery({
    queryKey: [...keywords, currentPage, publishedYear, "deepsearch-patent-inventor-list"],
    queryFn: async () => {
      const lastYearValue = new Date().getFullYear() - 1;
      const offset = (currentPage - 1) * PAGE_SIZE + 1;
      //
      const response = await getDeepSearchPatentInventorsList({
        keywords,
        year: publishedYear ?? lastYearValue,
        limit: PAGE_SIZE,
        offset: offset,
      });

      // FOR LATER USE IN OTHER SECTION
      // const total = offset + PAGE_SIZE;
      // if (response?.status_code === 204) {
      //   return [];
      // }
      // if (total > response?.total) {
      //   if (response?.inventors?.length > 0) {
      //     setTotalCount(total + PAGE_SIZE);
      //   }
      // } else {
      //   setTotalCount(response?.total || 0);
      // }
      setTotalCount(response?.total || 0);

      //
      return response?.inventors ?? [];
    },
    enabled: !!keywords.length || category !== "patents",
  });

  const finalInventorPatentList = patentList ?? [];

  //
  const inventorPatentColumns: ColumnDef<IDeepSearchInventorsPatentItem>[] = [
    {
      header: "Inventors",
      accessorKey: "inventor_name",
      cell: ({ row }) => (
        <p className="line-clamp-1">
          <span className="mr-1">
            {((currentPage - 1) * PAGE_SIZE + row.index + 1).toString().padStart(2, "0")}.
          </span>
          {`${row.original.first_name} ${row.original.last_name}`}
        </p>
      ),
      minSize: 350,
      maxSize: 350,
    },
    {
      header: "Company/University",
      accessorKey: "company-university",
      cell: (data) => (
        <p className="line-clamp-1">
          {data.row.original.company_name ? data.row.original.company_name : "-"}
        </p>
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: "No. of patents",
      accessorKey: "no_of_patents",
      cell: (data) => (
        <p className="line-clamp-1">
          {data.row.original.patent_count ? data.row.original.patent_count.toLocaleString() : "-"}
        </p>
      ),
      minSize: 150,
      maxSize: 150,
    },
    {
      header: "Patents Claims",
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
      header: " ",
      cell: ({ row }) => (
        <Button
          type="secondary"
          size="small"
          handleClick={() =>
            navigate(
              `/deep-search/inventor/patent/?firstName=${row.original.first_name}&lastName=${row.original.last_name}&keywords=${joinedkeywords}`,
            )
          }
        >
          Track
        </Button>
      ),
      minSize: 120,
      maxSize: 120,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const publicationColumns: ColumnDef<any>[] = [
    {
      header: "Inventors",
      accessorKey: "company_name",
      cell: ({ row }) => (
        <p className="line-clamp-1">
          <span className="mr-1">
            {((currentPage - 1) * PAGE_SIZE + row.index + 1).toString().padStart(2, "0")}.
          </span>
          {row.original.key || "-"}
        </p>
      ),
      minSize: 350,
      maxSize: 350,
    },
    {
      header: "Company/University",
      accessorKey: "company_name",
      minSize: 150,
      maxSize: 150,
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
      header: "Publications count",
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
      header: " ",
      cell: ({ row }) => (
        <Button
          type="secondary"
          size="small"
          handleClick={() =>
            navigate(
              `/deep-search/inventor/patent/?firstName=${row.original.first_name}&lastName=${row.original.last_name}`,
            )
          }
        >
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
  }, [searchedKeywords, category, publishedYear]);
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
              <span>Showing active inventors for: </span>
              <span className="font-semibold">"{joinedkeywords}"</span>
            </p>
          ) : (
            <p className="mt-[4px] text-appGray-900">
              Search keywords e.g. “COVID-19” to see related inventors.
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

      {!!keywords.length && (
        <>
          {/* Filter section */}
          <div className="mb-5 flex items-start">
            <span className="font-semibold text-appGray-900 mr-2">Filter by:</span>
            <TableYearSelect
              label="Publication Date"
              placeholder="Publication Date"
              onChange={(item) => setPublishedYear(item)}
              value={publishedYear}
              options={publishYearsOptions}
            />
          </div>
          {/* Main content */}
          <div>
            <p className="text-primary-900 text-[22px]">Inventors</p>

            <div className="my-4">
              {!!keywords.length && isLoading ? (
                <div className="w-full h-[300px] flex justify-center items-center text-primary-600">
                  <LoadingIcon width={40} height={40} />
                </div>
              ) : (
                <>
                  {category === "patents" && (
                    <ReactTable
                      columnsData={inventorPatentColumns}
                      rowsData={finalInventorPatentList}
                      size="small"
                    />
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
          <div className="mt-5">
            <p className="mb-2 uppercase text-sm text-primary-900">Related Keywords</p>

            <div className="flex flex-wrap gap-1">
              {relatedKeywords?.related_keywords?.slice(0, 15)?.map((keyword, index) => (
                <RelatedKeyword keyword={keyword} key={index} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

//
type CategoryType = "patents" | "publications";
