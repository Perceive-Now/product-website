import { useMemo, useState } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef } from "@tanstack/react-table";

//
import EditIcon from "../../../components/icons/miscs/Edit";

//
import CheckboxInput from "../../../components/reusable/check-box/checkbox";
import TableSearch from "../../../components/reusable/table-search";
import TableDropdown from "../../../components/reusable/table-dropdown";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import Button from "src/components/reusable/button";
/**
 *
 */
const Users = () => {
  const [users, setusers] = useState([
    { id: 1, user_name: "xyz", role: "admin", reports_count: 6 },
    { id: 2, user_name: "abc", role: "admin", reports_count: 6 },
    { id: 3, user_name: "pqr", role: "admin", reports_count: 6 },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const filteredUser = users.filter((user) =>
    user.user_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  interface IOptions {
    label: string;
    icon: JSX.Element;
    action: () => void;
  }

  const handleRowSelectionChange = (selection: any) => {
    setRowSelection(selection);
  };

  const menuItems = [
    {
      label: "Pin",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("yo"),
    },
    {
      label: "Delete",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("yo"),
    },
    {
      label: "Share",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("yo"),
    },
  ];

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select-col",
        header: ({ table }) => (
          <div className="pl-1 pt-1">
            <CheckboxInput
              className="border-white"
              checked={table.getIsAllRowsSelected()}
              // indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()} // or getToggleAllPageRowsSelectedHandler
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="pl-1 pt-1">
            <CheckboxInput
              className="border-white"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
      },
      {
        header: "User",
        accessorKey: "user_name",
        minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.user_name}</p>,
      },
      {
        header: "Role",
        accessorKey: "role",
        minSize: 200,
        cell: (item) => <span>{item.row.original.role}</span>,
      },
      {
        header: "Reports",
        accessorKey: "reports_count",
        minSize: 200,
        cell: (item) => <span>{item.row.original.reports_count}</span>,
      },
      {
        header: " ",
        // accessorKey: "lead_investigator_given",
        minSize: 80,
        cell: (item) => (
          // <button type="button">
          //   <EditIcon />
          // </button>
          <TableDropdown
          // menuItems={menuItems}
          // width="xs"
          // alignment="right"
          // conversation_id={item.row.original.id}
          />
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
      <div className="p-1">
        <h6 className="text-lg font-semibold ml-0">Settings &gt; User management</h6>
        <div className="flex justify-start items-center pt-3">
          <Link to="/profile">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between gap-1 w-full">
        <div className="font-bold text-base ml-1">
          All Users<span className="ml-3">{users.length}</span>
        </div>
        <div className="w-[300px] ml-auto">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div className="">
          <Link to="/add-user">
            <Button type="primary">+ Add User</Button>
          </Link>
        </div>
      </div>
      <ReactTable
        columnsData={columns}
        rowsData={filteredUser}
        size="medium"
        noTopBorder
        rowSelection={rowSelection}
        onRowSelectionChange={handleRowSelectionChange}
      />
    </div>
  );
};

export default Users;
