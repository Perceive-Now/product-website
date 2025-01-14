import { useEffect, useMemo, useState } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef } from "@tanstack/react-table";
import Tooltip from "src/components/reusable/popover";
import TrashIcon from "src/components/icons/common/trash";
import { VerticalThreeDots } from "src/components/icons";
import DownloadIcon from "src/components/icons/common/download-icon";

import EditIcon from "../../../components/icons/miscs/Edit";
import TableSearch from "../../../components/reusable/table-search";
import TableDropdown from "../../../components/reusable/table-dropdown";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import Button from "src/components/reusable/button";
import { NEW_BACKEND_URL } from "src/pages/authentication/signup/env";
import { useAppSelector } from "src/hooks/redux";
import toast from "react-hot-toast";
import Loading from "src/components/reusable/loading";

interface OrganizationUser {
  id: number;
  full_name?: string | null;
  email: string;
  role: string;
  job_position?: string;
  created_at?: string; // ISO 8601 date-time string
  is_accepted?: boolean;
}

const Users = () => {
  const session = useAppSelector((state) => state.sessionDetail.session);

  const [users, setUsers] = useState<OrganizationUser[]>([
    {
      id: 1,
      full_name: "John Doe",
      email: "hello@xyz.com",
      role: "Admin",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredUsers = users?.filter((user) =>
    (user?.full_name || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const fetchOrganizationUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${NEW_BACKEND_URL}/team/users?user_id=${session?.user_id}`);
      const result = await res.json();

      if (res.status === 200) {
        console.log(result);
        setUsers(result);
      } else {
        console.log("Error fetching organization users");
      }
    } catch (error) {
      toast.error("Error fetching organization users", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationUsers();
  }, []);

  // Menu items for actions
  const menuItems = [
    {
      label: "Pin",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("Pin clicked"),
    },
    {
      label: "Delete",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("Delete clicked"),
    },
    {
      label: "Share",
      icon: <EditIcon className="h-2 w-2" />,
      action: () => console.log("Share clicked"),
    },
  ];

  const columns = useMemo<ColumnDef<OrganizationUser>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "full_name",
        minSize: 200,
        cell: ({ row }) => (
          <span className="line-clamp-1">
            {row.original.full_name
              ? row.original.full_name.length > 20
                ? row.original.full_name.substring(0, 20) + "..."
                : row.original.full_name
              : "N/A"}
          </span>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        minSize: 300,
        cell: ({ row }) => <span>{row.original.email}</span>,
      },
      {
        header: "Role",
        accessorKey: "role",
        minSize: 200,
        cell: ({ row }) => <span className="capitalize">{row.original.role}</span>,
      },
      // {
      //   header: "Job Position",
      //   accessorKey: "job_position",
      //   minSize: 200,
      //   cell: ({ row }) => <span className="capitalize">{row.original.job_position || "N/A"}</span>,
      // },
      {
        header: "Invitation Status",
        accessorKey: "is_accepted",
        minSize: 200,
        cell: ({ row }) => (
          <span>{row.original.is_accepted ? "Accepted Invitation" : "Pending"}</span>
        ),
      },
      {
        header: " ",
        minSize: 80,
        cell: () => (
          // Commenting out the menu icon
          // <TableDropdown
          //   menuItems={menuItems}
          // />
          <></>
        ),
      },
    ],
    [],
  );

  return loading ? (
    <Loading isLoading={loading} width="100" height="100" />
  ) : (
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
          All Users<span className="ml-3">{users?.length}</span>
        </div>
        <div className="w-[300px] ml-auto">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div>
          <Link to="/add-user">
            <Button type="primary">+ Add User</Button>
          </Link>
        </div>
      </div>
      <ReactTable columnsData={columns} rowsData={filteredUsers} size="medium" noTopBorder />
    </div>
  );
};

export default Users;
