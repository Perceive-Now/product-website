import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

//
import PageTitle from "../../reusable/page-title";
import ReactTable from "../../reusable/ReactTable";
import NoKeywordMessage from "../../reusable/no-keyword";

//
import { formatNumber } from "../../../utils/helpers";
import { getTop5Funders } from "../../../utils/api/dashboard";
import { LoadingIcon } from "../../icons";

/*
 *
 **/
export default function TopFundersList(props: ITopFundersListProps) {
  const { data, isLoading } = useQuery(
    ["top-5-funders", ...props.keywords],
    async () => {
      return await getTop5Funders(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  //
  const columns = useMemo<ColumnDef<ITopFunders>[]>(
    () => [
      {
        header: "Rank",
        accessorKey: "rank",
      },
      {
        header: "Funder",
        accessorKey: "funder_name",
      },
      {
        header: "Funding (USD)",
        accessorKey: "total_funding",
        cell: (props) => (
          <span>
            {formatNumber(props.row.original.total_funding, {
              isCurrency: true,
            })}
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        title="List of top 5 funders"
        titleClass="font-bold"
        info={`This list was extracted from "X" total number of funders worldwide`}
      />

      <div className="mt-2">
        {props.keywords.length > 0 && (
          <>
            {isLoading && (
              <div className="h-[300px] flex items-center justify-center">
                <LoadingIcon fontSize={56} />
              </div>
            )}

            {!isLoading && (
              <>
                <div className="h-[300px]">
                  <ReactTable
                    columnsData={columns}
                    rowsData={data}
                    size="medium"
                  />
                </div>

                <div className="text-primary-600 mt-4 cursor-pointer">
                  Read more
                </div>
              </>
            )}
          </>
        )}

        {props.keywords.length < 1 && <NoKeywordMessage />}
      </div>
    </div>
  );
}

interface ITopFundersListProps {
  keywords: string[];
}

interface ITopFunders {
  funder_name: string;
  total_funding: number;
}
