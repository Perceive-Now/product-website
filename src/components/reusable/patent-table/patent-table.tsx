import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

//
import Tooltip from "../tooltip";
import ReactTable from "../ReactTable";

//
import { VerticalThreeDots } from "../../icons";

/**
 *
 */
export default function PatentTable({ data }: IPatentTableProps) {
  const columnHelper = createColumnHelper<PatentType>();

  const columns: ColumnDef<PatentType>[] = [
    {
      header: "Inventor",
      accessorKey: "inventor",
    },
    {
      header: "Industry",
      accessorKey: "industry",
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Abstract",
      id: "abstract",
      accessorFn: (row) => `View abstract`,
    },
    {
      header: "Date (Y/M/D)",
      accessorKey: "date",
    },
    columnHelper.display({
      id: "actions",
      cell: (props) => <RowActions row={props.row} />,
    }),
  ];

  return <ReactTable columnsData={columns} rowsData={data} />;
}

const RowActions = ({ row }: any) => {
  return (
      <Tooltip
        isCustomPanel={true}
        trigger={
          <VerticalThreeDots
            data-dropdown-toggle="dropdown"
            className="cursor-pointer"
          />
        }
        panelClassName="rounded-lg py-2 px-3 text-gray-700 min-w-[200px]"
      >
        <ul id="dropdown">
          <li className="mb-2 cursor-pointer">
            <div>Bookmark</div>
          </li>
          <li className="mb-2 cursor-pointer">
            <div>Generate Citation</div>
          </li>
          <li className="cursor-pointer">
            <div>Share</div>
          </li>
        </ul>
      </Tooltip>
  );
};

export type PatentType = {
  inventor: string;
  industry: string;
  title: string;
  abstract: string;
  date: string;
};

interface IPatentTableProps {
  data: PatentType[];
}

// interface ILocationState {
//   search?: IKeywordOption[];
// }
