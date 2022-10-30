import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

//
import PageTitle from "../../reusable/page-title";
import ReactTable from "../../reusable/ReactTable";

//
import { formatNumber } from "../../../utils/helpers";
import { getTop5Funders } from "../../../utils/api/dashboard";

/*
 *
 **/
export default function TopFundersList(props: ITopFundersListProps) {
  const { data } = useQuery(
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
        header: "Funder",
        accessorKey: "name",
      },
      {
        header: "Funding",
        accessorKey: "fundingAmount",
        cell: (props) => (
          <span>
            {formatNumber(props.row.original.fundingAmount, {
              isCurrency: true,
            })}
          </span>
        ),
      },
      {
        header: "Date",
        accessorKey: "date",
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
        <ReactTable columnsData={columns} rowsData={data} size="medium" />

        <div className="text-primary-600 mt-4 cursor-pointer">Read more</div>
      </div>
    </div>
  );
}

interface ITopFundersListProps {
  keywords: string[];
}

interface ITopFunders {
  rank: number;
  name: string;
  fundingAmount: number;
  date: string;
}
