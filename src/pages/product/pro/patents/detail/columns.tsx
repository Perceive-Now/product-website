import { ColumnDef } from "@tanstack/react-table";

// Attorney table columns
export const attorneyColumnData: ColumnDef<IDeepSearchPatentDetailAttorney>[] = [
  // {
  //   header: "ID",
  //   accessorKey: "id",
  //   cell: (data) => <p className="line-clamp-1">{data.row.original.id || "-"}</p>,
  // },

  {
    header: "Sequence",
    accessorKey: "sequence",
    // TODO:: Discuss where this data exactly comes from
    cell: () => <p className="line-clamp-1">-</p>,
  },
  {
    header: "First Name",
    accessorKey: "attorney_organization",
    cell: (data) => (
      <p className="line-clamp-1">{data.row.original.attorney_organization || "-"}</p>
    ),
  },
  {
    header: "Last Name",
    accessorKey: "attorney_organization",
    cell: (data) => (
      <p className="line-clamp-1">{data.row.original.attorney_organization || "-"}</p>
    ),
  },
  {
    header: "Attorney organization",
    accessorKey: "attorney_organization",
    cell: (data) => (
      <p className="line-clamp-1">{data.row.original.attorney_organization || "-"}</p>
    ),
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
    header: "Examiner role",
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
    // minSize: 132,
    // maxSize: 132,
  },
  {
    header: "Class",
    accessorKey: "class",
    minSize: 56,
    maxSize: 56,
  },
  {
    header: "Class title",
    accessorKey: "class_title",
    // minSize: 400,
    // maxSize: 400,
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
    // minSize: 400,
    // maxSize: 400,
  },
  {
    header: "Group",
    accessorKey: "group",
  },
  {
    header: "Group title",
    accessorKey: "group_title",
    // minSize: 400,
    // maxSize: 400,
  },
];

// Assignee column data
export const assigneeColumnData: ColumnDef<IDeepSearchItemDetailAssignee>[] = [
  // {
  //   header: "Assignee id",
  //   accessorKey: "assignee_id",
  //   minSize: 210,
  //   maxSize: 210,
  // },
  {
    header: "Sequence",
    accessorKey: "assignee_organization",
    minSize: 260,
    maxSize: 260,
  },
  {
    header: "First Name",
    accessorKey: "assignee_organization",
    minSize: 260,
    maxSize: 260,
  },
  {
    header: "Last Name",
    accessorKey: "assignee_organization",
    minSize: 260,
    maxSize: 260,
  },
  {
    header: "Attorney Organization",
    accessorKey: "assignee_type",
    minSize: 164,
    maxSize: 164,
  },
  // {
  //   header: "Location id",
  //   accessorKey: "location_id",
  //   minSize: 210,
  //   maxSize: 210,
  // },
  // // TODO:: Verify about "Organization" in figma
  // {
  //   header: "City",
  //   accessorKey: "disambig_city",
  //   minSize: 210,
  //   maxSize: 210,
  // },
  // {
  //   header: "Country",
  //   accessorKey: "disambig_country",
  //   minSize: 130,
  //   maxSize: 130,
  // },
  // {
  //   header: "Latitude",
  //   accessorKey: "latitude",
  //   minSize: 130,
  //   maxSize: 130,
  // },
  // {
  //   header: "Longitude",
  //   accessorKey: "longitude",
  //   minSize: 130,
  //   maxSize: 130,
  // },
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
    header: "Type",
    accessorKey: "applicant_location_id",
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

// Inventor column data
export const inventorColumnData: ColumnDef<IDeepSearchItemDetailTrainee>[] = [
  {
    header: "Sequence",
    accessorKey: "inventor_sequence",
    minSize: 210,
    maxSize: 210,
  },
  // {
  //   header: "Inventor id",
  //   accessorKey: "id",
  //   minSize: 210,
  //   maxSize: 210,
  // },
  {
    header: "First name",
    accessorKey: "first name",
    minSize: 260,
    maxSize: 260,
  },
  {
    header: "Last name",
    accessorKey: "second name",
    minSize: 164,
    maxSize: 164,
  },
  // {
  //   header: "Male flag",
  //   accessorKey: "male flag",
  //   minSize: 164,
  //   maxSize: 164,
  // },
  {
    header: "Attribution status",
    accessorKey: "attribution status",
    minSize: 164,
    maxSize: 164,
  },
  // {
  //   header: "Location id",
  //   accessorKey: "location_id",
  //   minSize: 210,
  //   maxSize: 210,
  // },
  // TODO:: Verify about "Organization" in figma
  {
    header: "City",
    accessorKey: "city",
    minSize: 210,
    maxSize: 210,
  },
  {
    header: "Country",
    accessorKey: "country",
    minSize: 130,
    maxSize: 130,
  },
  // {
  //   header: "Latitude",
  //   accessorKey: "latitude",
  //   minSize: 130,
  //   maxSize: 130,
  // },
  // {
  //   header: "Longitude",
  //   accessorKey: "longitude",
  //   minSize: 130,
  //   maxSize: 130,
  // },
];

// WIPO column data
export const wipoColumnData: ColumnDef<IDeepSearchItemDetailWipo>[] = [
  {
    header: "Sequence",
    accessorKey: "wipo_field_sequence",
    minSize: 120,
  },
  {
    header: "Field id",
    accessorKey: "wipo_field_id",
    minSize: 80,
  },
  {
    header: "Kind/Sector title",
    accessorKey: "wipo_sector_title",
    minSize: 250,
  },
  {
    header: "Field name",
    accessorKey: "wipo_field_title",
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
    header: "Main Class id",
    accessorKey: "citation_patent_id",
    minSize: 180,
    maxSize: 180,
  },
  {
    header: "Main Class",
    accessorKey: "citation_date",
    minSize: 120,
    maxSize: 120,
  },
  {
    header: "Subclass id",
    accessorKey: "record_name",
    minSize: 150,
    maxSize: 150,
  },
  // {
  //   header: "WIPO kind",
  //   accessorKey: "wipo_kind",
  //   minSize: 100,
  //   maxSize: 100,
  // },
  // {
  //   header: "Citation category",
  //   accessorKey: "citation_category",
  //   minSize: 180,
  //   maxSize: 180,
  // },
];

export const pctColumnData: ColumnDef<IDeepSearchItemDetailUsPatentCitation>[] = [
  {
    header: "PCT 102 date",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "PCT 371 date",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Doc number",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Doc type",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Filed country",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Application kind",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
];

export const ipcColumnData: ColumnDef<IDeepSearchItemDetailUsPatentCitation>[] = [
  {
    header: "Sequence",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Classification level",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Classification status",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Section",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "IPC class",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Sub class",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Main group",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
  {
    header: "Sub group",
    accessorKey: "citation_sequence",
    minSize: 100,
    maxSize: 100,
  },
];
