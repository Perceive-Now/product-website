import { useMemo, useState } from "react";

//
import Search from "../../../components/reusable/search";
import PageTitle from "../../../components/reusable/page-title";
import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef } from "@tanstack/react-table";

/**
 *
 */
export default function PatentsPage() {
  const [searchText, setSearchText] = useState("");

  const columns = useMemo<ColumnDef<PatentType>[]>(
    () => [
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
        accessorKey: "abstract",
      },
      {
        header: "Date (Y/M/D)",
        accessorKey: "date",
      },
      {
        header: "",
        accessorKey: "action",
      },
    ],
    []
  );

  return (
    <div>
      <div className="w-1/2">
        <Search onSubmit={(searchValue) => setSearchText(searchValue)} />
      </div>

      {searchText && (
        <div className="my-3">
          <p className="text-sm">
            <span className="text-gray-700">Showing active patents for:</span>
            <span> “{searchText}”</span>
          </p>

          <div className="my-3">
            <PageTitle title="Patents" learnMore="Learn more" />
          </div>

          <div>
            <ReactTable columnsData={columns} />
          </div>
        </div>
      )}
    </div>
  );
}

export type PatentType = {
  inventor: string;
  industry: string;
  title: string;
  abstract: string;
  date: string;
};
