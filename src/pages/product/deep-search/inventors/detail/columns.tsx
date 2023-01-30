import { ColumnDef } from "@tanstack/react-table";

// Attorney table columns
export const attorneyColumnData: ColumnDef<IDeepSearchPatentDetailAttorney>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: (data) => <p className="line-clamp-1">{data.row.original.id || "-"}</p>,
  },
  {
    header: "Attorney organization",
    accessorKey: "attorney_organization",
    cell: (data) => (
      <p className="line-clamp-1">{data.row.original.attorney_organization || "-"}</p>
    ),
  },
  {
    header: "Sequence",
    accessorKey: "sequence",
    // TODO:: Discuss where this data exactly comes from
    cell: () => <p className="line-clamp-1">-</p>,
  },
];

// Examiner table columns
export const examinerColumnData: ColumnDef<IDeepSearchPatentDetailExamier>[] = [
  {
    header: "First name",
    accessorKey: "first_name",
    cell: (data) => <p className="line-clamp-1">{data.row.original.first_name || "-"}</p>,
  },
  {
    header: "Last name",
    accessorKey: "last_name",
    cell: (data) => <p className="line-clamp-1">{data.row.original.last_name || "-"}</p>,
  },
  {
    header: "Examier role",
    accessorKey: "examiner_role",
    cell: (data) => <p className="line-clamp-1">{data.row.original.examiner_role || "-"}</p>,
  },
  {
    header: "Art group",
    accessorKey: "art_group",
    cell: (data) => <p className="line-clamp-1">{data.row.original.art_group || "-"}</p>,
  },
];

// Examiner table columns
export const foreignCitationColumnData: ColumnDef<IDeepSearchPatentDetailForeignCitation>[] = [
  {
    header: "Citation sequence",
    accessorKey: "citation_sequence",
    cell: (data) => <p className="line-clamp-1">{data.row.original.citation_sequence || "-"}</p>,
  },
  {
    header: "Citation Application id",
    accessorKey: "citation_application_id",
    cell: (data) => (
      <p className="line-clamp-1">{data.row.original.citation_application_id || "-"}</p>
    ),
  },
  {
    header: "Citation date",
    accessorKey: "citation_date",
    cell: (data) => <p className="line-clamp-1">{data.row.original.citation_date || "-"}</p>,
  },
  {
    header: "Cited category",
    accessorKey: "citation_category",
    cell: (data) => <p className="line-clamp-1">{data.row.original.citation_category || "-"}</p>,
  },
  {
    header: "Cited country",
    accessorKey: "country",
  },
];

// CPC table columns
export const cpcColumnData: ColumnDef<IDeepSearchItemDetailCPC>[] = [
  {
    header: "Class",
    accessorKey: "class",
    minSize: 56,
    maxSize: 56,
  },
  {
    header: "Class title",
    accessorKey: "class_title",
    minSize: 400,
    maxSize: 400,
  },
  {
    header: "Subclass",
    accessorKey: "subclass",
    minSize: 80,
    maxSize: 80,
  },
  {
    header: "Subclass title",
    accessorKey: "subclass_title",
    minSize: 400,
    maxSize: 400,
  },
  {
    header: "Group",
    accessorKey: "group",
  },
  {
    header: "Group title",
    accessorKey: "group_title",
    minSize: 400,
    maxSize: 400,
  },
  {
    header: "Sequence",
    accessorKey: "cpc_sequence",
    minSize: 88,
    maxSize: 88,
  },
  {
    header: "Section",
    accessorKey: "cpc_section",
    minSize: 88,
    maxSize: 88,
  },
  {
    header: "Type",
    accessorKey: "cpc_type",
    minSize: 120,
    maxSize: 120,
  },
  {
    header: "Symbol position",
    accessorKey: "cpc_symbol_position",
    minSize: 132,
    maxSize: 132,
  },
];

// Assignee column data
export const assigneeColumnData: ColumnDef<IDeepSearchItemDetailAssignee>[] = [
  {
    header: "Assignee id",
    accessorKey: "assignee_id",
    minSize: 210,
    maxSize: 210,
  },
  {
    header: "Assignee organization",
    accessorKey: "assignee_organization",
    minSize: 260,
    maxSize: 260,
  },
  {
    header: "Assignee type",
    accessorKey: "assignee_type",
    minSize: 164,
    maxSize: 164,
  },
  {
    header: "Location id",
    accessorKey: "location_id",
    minSize: 210,
    maxSize: 210,
  },
  // TODO:: Verify about "Organization" in figma
  {
    header: "City",
    accessorKey: "disambig_city",
    minSize: 210,
    maxSize: 210,
  },
  {
    header: "Country",
    accessorKey: "disambig_country",
    minSize: 130,
    maxSize: 130,
  },
  {
    header: "Latitude",
    accessorKey: "latitude",
    minSize: 130,
    maxSize: 130,
  },
  {
    header: "Longitude",
    accessorKey: "longitude",
    minSize: 130,
    maxSize: 130,
  },
];

// Applicant column data
export const applicantColumnData: ColumnDef<IDeepSearchItemDetailApplicant>[] = [
  {
    header: "Applicant sequence",
    accessorKey: "applicant_sequence",
    minSize: 210,
    maxSize: 210,
  },
  {
    header: "First Name",
    accessorKey: "first_name",
    minSize: 210,
    maxSize: 210,
  },
  {
    header: "Last Name",
    accessorKey: "last_name",
    minSize: 210,
    maxSize: 210,
  },
  {
    header: "Designation",
    accessorKey: "applicant_designation",
    minSize: 210,
    maxSize: 210,
  },
  {
    header: "Location id",
    accessorKey: "applicant_location_id",
    minSize: 210,
    maxSize: 210,
  },
  {
    header: "City",
    accessorKey: "city",
    minSize: 210,
    maxSize: 210,
  },
  {
    header: "Country",
    accessorKey: "country",
    minSize: 210,
    maxSize: 210,
  },
];

// WIPO column data
export const wipoColumnData: ColumnDef<IDeepSearchItemDetailWipo>[] = [
  {
    header: "Field sequence",
    accessorKey: "wipo_field_sequence",
    minSize: 120,
  },
  {
    header: "Field id",
    accessorKey: "wipo_field_id",
    minSize: 80,
  },
  {
    header: "Sector title",
    accessorKey: "wipo_sector_title",
    minSize: 250,
  },
  {
    header: "Field title",
    accessorKey: "wipo_field_title",
    minSize: 250,
  },
];

// US patent citation data
export const usPatentCitationColumnData: ColumnDef<IDeepSearchItemDetailUsPatentCitation>[] = [
  {
    header: "Sequence",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Citation patent id",
    accessorKey: "citation_patent_id",
    minSize: 180,
    maxSize: 180,
  },
  {
    header: "Date",
    accessorKey: "citation_date",
    minSize: 120,
    maxSize: 120,
  },
  {
    header: "Record name",
    accessorKey: "record_name",
    minSize: 150,
    maxSize: 150,
  },
  {
    header: "WIPO kind",
    accessorKey: "wipo_kind",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Citation category",
    accessorKey: "citation_category",
    minSize: 180,
    maxSize: 180,
  },
];
