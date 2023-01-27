import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

//
import ReactTable from "../ReactTable";
import Tooltip from "../tooltip";
import { VerticalThreeDots } from "../../icons";

/**
 *
 */
export default function ExpertsTable({ data }: IExpertsTableProps) {
  const columnHelper = createColumnHelper<ExpertsType>();

  const columns: ColumnDef<ExpertsType>[] = [
    {
      header: "Inventor",
      accessorKey: "inventor",
    },
    {
      header: "Affiliation",
      accessorKey: "affiliation",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Patents",
      accessorKey: "patents",
    },
    {
      header: "Papers",
      accessorKey: "papers",
    },
    columnHelper.display({
      id: "actions",
      cell: () => <RowActions />,
    }),
  ];

  return <ReactTable columnsData={columns} rowsData={data} />;
}

export type ExpertsType = {
  id: string;
  inventor: string;
  affiliation: string;
  location: string;
  patents: string;
  papers: string;
};

interface IExpertsTableProps {
  data: ExpertsType[];
}

const RowActions = () => {
  return (
    <Tooltip
      isCustomPanel={true}
      trigger={<VerticalThreeDots data-dropdown-toggle="dropdown" className="cursor-pointer" />}
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
