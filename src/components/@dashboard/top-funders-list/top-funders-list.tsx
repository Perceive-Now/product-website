import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

//
import PageTitle from "../../reusable/page-title";
import ReactTable from "../../reusable/ReactTable";
import DataSection from "../../reusable/data-section";

//
import { formatNumber } from "../../../utils/helpers";
import { getTop5Funders } from "../../../utils/api/dashboard";

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
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      title={
        <PageTitle
          title="List of top 5 funders"
          titleClass="font-semibold"
          info={`This list was extracted from "X" total number of funders worldwide`}
        />
      }
    >
      <div className="h-[300px] mt-5">
        <ReactTable columnsData={columns} rowsData={data} size="medium" />
      </div>

      <div className="text-primary-600 mt-4 cursor-pointer">
        <Link to="/funders">Read more</Link>
      </div>
    </DataSection>
  );
}

interface ITopFundersListProps {
  keywords: string[];
}

interface ITopFunders {
  funder_name: string;
  total_funding: number;
}
