import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

//
import ReactTable from "../ReactTable";
import Button from "../button";

/**
 *
 */
export default function FundingTable({ data }: IFundingTableProps) {
  const columnHelper = createColumnHelper<FundingType>();

  const columns: ColumnDef<FundingType>[] = [
    {
      header: "Funder",
      accessorKey: "funder",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Paper",
      accessorKey: "paper",
    },
    {
      header: "Industry",
      id: "industry",
    },
    {
      header: "Funding",
      accessorKey: "funding",
    },
    columnHelper.display({
      id: "actions",
      cell: (props) => <Button type="secondary">Track</Button>,
    }),
  ];

  return <ReactTable columnsData={columns} rowsData={data} />;
}

export type FundingType = {
  id: string;
  funder: string;
  funding: string;
  industry: string;
  location: string;
  paper: string;
};

interface IFundingTableProps {
  data: FundingType[];
}

// interface ILocationState {
//   search?: IKeywordOption[];
// }
