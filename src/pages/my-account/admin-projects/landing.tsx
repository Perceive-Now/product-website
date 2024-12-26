import { useMemo, useState, useEffect } from "react";

import ReactTable from "../../../components/reusable/ReactTable";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { VerticalThreeDots } from "src/components/icons";
import ShareModal from "src/components/reusable/share-modal";
import Tooltip from "src/components/reusable/popover";
import jsCookie from "js-cookie";
import { LoadingIcon, ShareIcon } from "src/components/icons";
import TrashIcon from "src/components/icons/common/trash";

//
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import CheckboxInput from "../../../components/reusable/check-box/checkbox";
import TableSearch from "../../../components/reusable/table-search";
import TableDropdown from "../../../components/reusable/table-dropdown";
import Button from "src/components/reusable/button";
import DownloadIcon from "src/components/icons/common/download-icon";
import { useNavigate } from "react-router-dom";
/**
 *
 */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const userId = jsCookie.get("user_id");

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const filteredUser =
  users.length > 0
      ? users.filter((report: any) =>
          report.user_name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

 
  useEffect(() => {
      
    const fetchUsers = async () => {
        try {
          const response = await fetch(
            `https://templateuserrequirements.azurewebsites.net/admin/projects/users?password=gautam_Hero`,
            {
              method: "GET",
              headers: { Accept: "application/json" },
            },
          );
  
          if (response.ok) {
            const data = await response.json();

            const transformedUserIds = data.user_ids.map((userId:any,index:number) => ({
                id: index + 1,
                user_id: userId,
                user_name: userId 
              }));
        
              setUsers(transformedUserIds);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

    fetchUsers();
  }, []);

  const columnHelper = createColumnHelper<any>();
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
        {
        header: "S no.",
        accessorKey: "id",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.id}</p>,
      },
      {
        header: "User Name",
        accessorKey: "user_name",
        // minSize: 400,
        cell: (item) => <p className="line-clamp-1">{item.row.original.user_id}</p>,
      },
      // columnHelper.display({
      //   id: "actions",
      //   minSize: 100,
      //   cell: ({ row }) => (
      //     <RowActions
      //       row={row}
      //       deleteReportHandler={deleteReportHandler}
      //       openFileHandler={openFileHandler}
      //     />
      //   ),
      // }),
    ],
    [],
  );

  const getRowProps = (row: any) => ({
    onClick: () => {
      const id = row.original.user_id;
      navigate(`/admin-projects/${id}`);
    },
    style: {
      cursor: "pointer",
    },
  });

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">Settings &gt; Admin Report management</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1 justify-between ">
        <div className="font-bold text-base">
          Total User<span className="ml-3">{users.length}</span>
        </div>
        <div className="w-[300px]">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      </div>
      {loading ? (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <LoadingIcon fontSize={40} className="animate-spin text-primary-900" />
        </div>
      ) : (
        <ReactTable
          columnsData={columns}
          rowsData={filteredUser}
          getRowProps={getRowProps} 
          size="medium"
          noTopBorder
        />
      )}
    </div>
  );
};

export default AdminDashboard;
