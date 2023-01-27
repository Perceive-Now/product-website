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

//
import type { ITopFunder } from "../../../utils/api/dashboard";

/*
 *
 **/
export default function TopFundersList(props: ITopFundersListProps) {
  const { data, isLoading, isError, error } = useQuery(
    ["top-5-funders", ...props.keywords],
    async () => {
      return await getTop5Funders(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  //
  const formattedData = (data ?? []).sort((a, b) => b.award_amount - a.award_amount).slice(0, 5);

  //
  const columns = useMemo<ColumnDef<ITopFunder>[]>(
    () => [
      {
        header: "Project title",
        accessorKey: "project_title",
        cell: (item) => <p className="line-clamp-1">{item.row.original.project_title}</p>,
      },
      {
        header: "Funding",
        accessorKey: "award_amount",
        minSize: 80,
        cell: (item) => (
          <span>
            {formatNumber(item.row.original.award_amount, {
              isCurrency: true,
            })}
          </span>
        ),
      },
      {
        header: "Principal Investigator",
        accessorKey: "lead_investigator_given",
        minSize: 170,
      },
    ],
    [],
  );

  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title="List of top 5 funders"
          titleClass="font-semibold"
          info={`This list was extracted from "X" total number of funders worldwide`}
        />
      }
    >
      <div className="min-h-[300px] mt-5">
        <ReactTable columnsData={columns} rowsData={formattedData} size="medium" />
      </div>

      {/* <div className="text-primary-600 mt-4 cursor-pointer">
        <Link to="/funders">Read more</Link>
      </div> */}
    </DataSection>
  );
}

interface ITopFundersListProps {
  keywords: string[];
}
