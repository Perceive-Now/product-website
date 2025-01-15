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
  first_name?: string | null;
  last_name?: string | null;
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
      first_name: "John",
      last_name: "Doe",
      email: "hello@xyz.com",
      role: "Admin",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredUsers = users?.filter((user) =>
    (user?.first_name || "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const fetchOrganizationUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${NEW_BACKEND_URL}/team/users?user_id=${session?.user_id}`);
      const result = await res.json();

      if (res.status === 200) {
        setUsers(result);
      } else {
        toast.error("Error fetching organization users");
      }
    } catch (error) {
      toast.error("Error fetching organization users");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = async (userId: number) => {
    if (!session?.user_id) return;

    const confirmRemove = window.confirm(
      "Are you sure you want to remove this user from the organization?",
    );

    if (!confirmRemove) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${NEW_BACKEND_URL}/team/remove-user?admin_id=${session?.user_id}&user_id=${userId}`,
        { method: "DELETE" },
      );

      if (response.status === 200) {
        toast.success("User removed successfully", {
          position: "top-right",
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } else {
        toast.error("Failed to remove user", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Error removing user", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationUsers();
  }, []);

  const columns = useMemo<ColumnDef<OrganizationUser>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "first_name",
        minSize: 200,
        cell: ({ row }) => {
          const { first_name, last_name } = row.original;
          const displayName =
            first_name && last_name
              ? `${first_name} ${last_name}`
              : first_name || last_name || "N/A";

          return (
            <span className="line-clamp-1">
              {displayName.length > 20 ? displayName.substring(0, 20) + "..." : displayName}
            </span>
          );
        },
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
      {
        header: "Invitation Status",
        accessorKey: "is_accepted",
        minSize: 200,
        cell: ({ row }) => (
          <span className={`${session?.user_id === row.original.id ? "hidden" : ""}`}>
            {row.original.is_accepted ? "Accepted Invitation" : "Pending"}
          </span>
        ),
      },
      {
        header: "Remove Member",
        minSize: 200,
        cell: ({ row }) => (
          <button
            className={`text-red-600 hover:underline ${
              session?.user_id === row.original.id ? "hidden" : ""
            }`}
            onClick={() => handleRemoveUser(row.original.id)}
          >
            Remove
          </button>
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
