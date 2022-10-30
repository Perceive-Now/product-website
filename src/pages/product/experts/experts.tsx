import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

//
import PageTitle from "../../../components/reusable/page-title";
import ReactTable from "../../../components/reusable/ReactTable";
import Search, { IKeywordOption } from "../../../components/reusable/search";

//
import { getExperts, IExpertItem } from "../../../utils/api/advance-search";
import { setDashboardSearch } from "../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

/**
 *
 */
export default function ExpertsPage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const joinedKeywords = searchedKeywords
    ?.map((kwd) => `"${kwd.value}"`)
    .join(", ");

  const keywords = searchedKeywords?.map((kwd) => kwd.value) ?? [];

  const { data: expertsDataRaw, isLoading } = useQuery(
    ["advanced-search-experts", ...keywords],
    async () => {
      return await getExperts(keywords);
    }
  );

  const expertsData = (isLoading ? [] : expertsDataRaw?.data?.resultsList ?? [])
    //
    .slice(0, 10);

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const columns: ColumnDef<IExpertItem>[] = [
    {
      header: "Expert",
      accessorKey: "expertName",
      accessorFn: (row) => row.expertName ?? "-",
    },
    {
      header: "Company/University",
      accessorKey: "affiliationName",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Patents",
      id: "patentsCount",
      accessorFn: (row) => row.patentsCount ?? "-",
    },
    {
      header: "Papers",
      accessorKey: "publicationsCount",
      accessorFn: (row) => row.publicationsCount ?? "-",
    },
  ];

  return (
    <div>
      <div className="w-1/2">
        <Search initialValue={searchedKeywords} onSubmit={handleSearch} />
      </div>

      {searchedKeywords && searchedKeywords.length > 0 && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing active experts for:</span>
            <span className="font-semibold ml-1">{joinedKeywords}</span>
          </p>

          <div className="my-3">
            <PageTitle
              title="Experts"
              learnMore={`Expert trends are extracted from approx. 31 million authors and inventors of 96 million publications & 7 million patents respectively. These analytics allow you to uncover the top active experts for collaboration, outsourcing & network expansion.`}
            />
          </div>

          <div>
            <ReactTable columnsData={columns} rowsData={expertsData} />
          </div>
        </div>
      )}
    </div>
  );
}
