import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { TooltipWrapper } from "react-tooltip";
import AbstractModal from "../../../../../components/reusable/abstract-modal";

//
export const patentColumnData: ColumnDef<IDeepSearchPatentListItem>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: (data) => (
      <TooltipWrapper content={data.row.original.title}>
        <Link
          className="line-clamp-1 text-primary-600 hover:underline"
          to={`/deep-search/patents/${data.row.original._id}`}
        >
          {data.row.original.title}
        </Link>
      </TooltipWrapper>
    ),
    minSize: 330,
    maxSize: 330,
  },
  {
    header: "Organization",
    accessorKey: "company",
    cell: (data) => (
      <TooltipWrapper content={data.row.original.company}>
        <p className="line-clamp-1">{data.row.original.company || "-"}</p>
      </TooltipWrapper>
    ),
    minSize: 200,
    maxSize: 200,
  },
  {
    header: "Inventor",
    accessorKey: "inventor",
    cell: (data) => (
      <TooltipWrapper content={data.row.original.inventor}>
        <p className="line-clamp-1">{data.row.original.inventor || "-"}</p>
      </TooltipWrapper>
    ),
    minSize: 200,
    maxSize: 200,
  },
  {
    header: "Abstract",
    cell: (data) => {
      const originalData = data.row.original;

      return (
        <AbstractModal
          type="Patent"
          data={{
            id: originalData._id,
            title: originalData.title,
            abstract: originalData.abstract,
          }}
          viewPath={`/deep-search/patents/${originalData._id}`}
        />
      );
    },
    minSize: 130,
    maxSize: 130,
  },
  {
    header: "Date (Y/M/D)",
    accessorKey: "date",
    minSize: 140,
    maxSize: 140,
  },
];
