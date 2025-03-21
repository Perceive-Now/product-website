import { useState, useEffect, useCallback } from "react";
import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef } from "@tanstack/react-table";
import Pagination from "src/components/reusable/pagination";
import Button from "src/components/reusable/button";
import { LoadingIcon } from "src/components/icons";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { API_PROD_URL } from "src/utils/axios";

const AgentAdminDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    {
      user_name: "John Doe",
    },
    {
      user_name: "Jane Doe",
    },
    {
      user_name: "John Smith",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const fetchUsers = async () => {
    setLoading(true);
    setPasswordError("");

    try {
      const response = await fetch(`${API_PROD_URL}/agents/unique-users`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Basic " + btoa("admin:securepass"), // Basic Auth
        },
      });

      if (response.ok) {
        const data = await response.json();
        const formattedUsers = data.map((user: any) => ({
          user_id: user.user_id,
          user_name: `${user.first_name} ${user.last_name}`.trim(),
        }));
        setUsers(formattedUsers);
      } else {
        setPasswordError("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setPasswordError("An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch users when component mounts
  useEffect(() => {
    fetchUsers();

    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, []);

  const filteredUsers = users.filter((user) =>
    user.user_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const columns = [
    {
      header: "Users",
      accessorKey: "user_name",
      cell: (item: any) => (
        <div
          className="flex items-center"
          onClick={() => navigate(`/agent-admin-reports/${item.row.original.user_id}`)}
        >
          {/* Your SVG and User Name Here */}
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 2048 2048">
            <g>
              <path
                fill="#f09e1a"
                d="M256.029 575.999v-1.122l-.026-106.669a72.546 72.546 0 0 1 5.482-28.335 73.67 73.67 0 0 1 16.11-24.085 73.874 73.874 0 0 1 24.056-15.953c9.054-3.717 18.667-5.685 28.31-5.685h338.131c15.226 0 29.736 4.703 41.868 12.962 11.786 8.023 21.252 19.5 26.849 33.36l.019-.007 58.089 135.406.055.127H256.03z"
              />
              <path
                fill="#fbc02d"
                d="m1730.45 701.451-.285 157.115c12.574 3.078 24.048 8.238 33.682 15.7 17.393 13.466 28.01 32.987 28.048 59.363l-.011 628.23h.12c0 25.328-10.44 48.302-27.32 64.976-16.729 16.522-39.768 26.74-65.153 26.74h-94.165a32.51 32.51 0 0 1-4.268.274H381.988c-34.541 0-65.927-13.94-88.704-36.44-22.93-22.652-37.139-53.875-37.139-88.25h.12L256.033 576h538.943l.86 2.007 811.849.674v-.12c34.66 0 65.26 13.43 87.322 35.497 22.192 22.193 35.563 52.952 35.563 87.394h-.12z"
              />
              <path
                fill="#f09e1a"
                d="M1728 858.566H529.98c-7.985 0-14.822 3.152-19.643 8.206-5.435 5.698-8.674 13.855-8.674 22.95v764.127h-61.447V889.722c0-25.1 9.6-48.3 25.717-65.194 16.107-16.882 38.428-27.409 64.047-27.409H1728v61.447z"
              />
            </g>
          </svg>
          <p className="line-clamp-1">{item.row.original.user_name}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10 p-2">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">Settings &gt; Admin Agent Report management</h6>
      </div>
      <div className="flex items-center gap-1 justify-between ">
        <div className="font-bold text-base">
          Total User<span className="ml-3">{users.length}</span>
        </div>
        <div className="w-[300px]">
          <input
            type="text"
            className="block w-full pl-2 pr-7 py-[10px] bg-gray-100 border-1 rounded-md"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
        </div>
      ) : (
        <>
          <ReactTable columnsData={columns} rowsData={filteredUsers} size="medium" noTopBorder />
          <div className="flex items-center justify-end mb-10 custom-padding">
            <Pagination
              page={1} // Placeholder for current page
              total={0} // Placeholder for total pages
              onChange={() => {
                console.log("Pagination clicked");
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AgentAdminDashboard;
