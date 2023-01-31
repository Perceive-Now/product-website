import { Link } from "react-router-dom";
import { TooltipWrapper } from "react-tooltip";
import { ColumnDef } from "@tanstack/react-table";

//
import Button from "../../../../../components/reusable/button";
import AbstractModal from "../../../../../components/reusable/abstract-modal";

//
import type { IDeepSearchPublicationListItem } from "../../../../../utils/api/deep-search/publications";

//
export const openColumnData: ColumnDef<IDeepSearchPublicationListItem>[] = [
  {
    header: "Publication Name",
    accessorKey: "title",
    cell: (data) => (
      <TooltipWrapper content={data.row.original.title}>
        <Link
          to={`/deep-search/publications/${encodeURIComponent(data.row.original._id)}?source=Open`}
          className="text-primary-600 hover:underline line-clamp-1"
        >
          {data.row.original.title}
        </Link>
      </TooltipWrapper>
    ),
    minSize: 160,
    maxSize: 160,
  },
  {
    header: "Journel Name",
    accessorKey: "journel_name",
    cell: (data) => (
      <TooltipWrapper content={data.row.original.title}>
        <p className="line-clamp-1">{data.row.original.title || "-"}</p>
      </TooltipWrapper>
    ),
    minSize: 130,
    maxSize: 130,
  },
  {
    header: "DOI",
    accessorKey: "doi_url",
    cell: (data) => (
      <a
        href={data.row.original.doi_url || "#"}
        className="line-clamp-1"
        target="_blank"
        rel="noreferrer"
      >
        {data.row.original.doi_url || "-"}
      </a>
    ),
    minSize: 130,
    maxSize: 130,
  },
  {
    header: "Citation",
    cell: () => <p>Generate Citation</p>,
    minSize: 150,
    maxSize: 150,
  },
  {
    header: " ",
    cell: () => (
      <Button type="secondary" size="small">
        Share
      </Button>
    ),
    minSize: 200,
    maxSize: 200,
  },
];

export const closedColumnData: ColumnDef<IDeepSearchPublicationListItem>[] = [
  {
    header: "Publication Name",
    accessorKey: "title",
    cell: (data) => (
      <TooltipWrapper content={data.row.original.title}>
        <Link
          to={`/deep-search/publications/${encodeURIComponent(
            data.row.original._id,
          )}?source=Closed`}
          className="text-primary-600 hover:underline line-clamp-1"
        >
          {data.row.original.title || "-"}
        </Link>
      </TooltipWrapper>
    ),
    minSize: 160,
    maxSize: 160,
  },
  {
    header: "Abstract",
    accessorKey: "abstract",
    cell: ({ row }) => (
      <AbstractModal
        data={{
          title: row.original.title,
          abstract: row.original.abstract,
          id: row.original._id,
        }}
        viewPath={`/deep-search/publications/${encodeURIComponent(row.original._id)}?source=Closed`}
        type="Publication"
      />
    ),
    minSize: 130,
    maxSize: 130,
  },
  {
    header: "Citation",
    cell: () => <span>Generate Citation</span>,
    minSize: 150,
    maxSize: 150,
  },
  {
    header: " ",
    cell: () => (
      <Button type="secondary" size="small">
        Share
      </Button>
    ),
    minSize: 200,
    maxSize: 200,
  },
];
