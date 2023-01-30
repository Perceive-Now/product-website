import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

//
import Button from "../../../../../components/reusable/button";

//
import type { IDeepSearchPublicationListItem } from "../../../../../utils/api/deep-search/publications";

//
export const openColumnData: ColumnDef<IDeepSearchPublicationListItem>[] = [
  {
    header: "Publication Name",
    accessorKey: "title",
    cell: (data) => <p className="line-clamp-1">{data.row.original.title || "-"}</p>,
    minSize: 160,
    maxSize: 160,
  },
  {
    header: "Journel Name",
    accessorKey: "journel_name",
    cell: (data) => <p className="line-clamp-1">{data.row.original.title || "-"}</p>,
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
    cell: (data) => (
      <Link
        to={`/deep-search/publications/${encodeURIComponent(data.row.original._id)}?source=open`}
        className="text-gray-700 underline"
      >
        Generate Citation
      </Link>
    ),
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
      <Link
        to={`/deep-search/publications/${encodeURIComponent(data.row.original._id)}?source=closed`}
        className="text-gray-700 line-clamp-1"
      >
        {data.row.original.title || "-"}
      </Link>
    ),
    minSize: 160,
    maxSize: 160,
  },
  {
    header: "Abstract",
    accessorKey: "abstract",
    cell: (data) => (
      <Link
        to={`/deep-search/publications/${encodeURIComponent(data.row.original._id)}?source=closed`}
        className="text-gray-700 underline"
      >
        View Abstract
      </Link>
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
