import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

//
import PageTitle from "../../reusable/page-title";
import ReactTable from "../../reusable/ReactTable";

//
import { formatNumber } from "../../../utils/helpers";

/*
 *
 **/
export default function TopFundersList(props: ITopFundersListProps) {
  const { data } = useQuery(["top-5-funders", ...props.keywords], async () => {
    return [
      {
        rank: 1,
        name: "World Bank",
        fundingAmount: 6000000,
        date: "2022-07-16",
      },
      {
        rank: 2,
        name: "National Science Foundation",
        fundingAmount: 5800000,
        date: "2022-05-21",
      },
      {
        rank: 3,
        name: "International Monetary Fund",
        fundingAmount: 4900000,
        date: "2022-02-18",
      },
      {
        rank: 4,
        name: "Asian Development Bank",
        fundingAmount: 4100000,
        date: "2021-11-24",
      },
      {
        rank: 5,
        name: "United Nations",
        fundingAmount: 3800000,
        date: "2021-04-13",
      },
    ];
  });

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
        info="info"
        titleClass="font-bold"
      />

      <div className="mt-7">
        <ReactTable columnsData={columns} rowsData={data} />

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
