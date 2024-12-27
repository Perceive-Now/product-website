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
  const [loading, setLoading] = useState(true);

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

          const transformedUserIds = data.user_ids.map((userId: any, index: number) => ({
            id: index + 1,
            user_id: userId,
            user_name: userId,
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
      //   {
      //   header: "S no.",
      //   accessorKey: "id",
      //   // minSize: 400,
      //   cell: (item) => <p className="line-clamp-1">{item.row.original.id}</p>,
      // },
      {
        header: "Users",
        accessorKey: "user_name",
        // minSize: 400,
        cell: (item) => (
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              width="40"
              height="40"
              viewBox="0 0 2048 2048"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
            >
              <defs>
                <style>{`.fil2{fill:none}.fil0{fill:#f09e1a}`}</style>
              </defs>
              <g id="Layer_x0020_1">
                <path
                  className="fil0"
                  d="M256.029 575.999v-1.122l-.026-106.669a72.546 72.546 0 0 1 5.482-28.335 73.67 73.67 0 0 1 16.11-24.085 73.874 73.874 0 0 1 24.056-15.953c9.054-3.717 18.667-5.685 28.31-5.685h338.131c15.226 0 29.736 4.703 41.868 12.962 11.786 8.023 21.252 19.5 26.849 33.36l.019-.007 58.089 135.406.055.127H256.03z"
                />
                <path
                  d="m1730.45 701.451-.285 157.115c12.574 3.078 24.048 8.238 33.682 15.7 17.393 13.466 28.01 32.987 28.048 59.363l-.011 628.23h.12c0 25.328-10.44 48.302-27.32 64.976-16.729 16.522-39.768 26.74-65.153 26.74h-94.165a32.51 32.51 0 0 1-4.268.274H381.988c-34.541 0-65.927-13.94-88.704-36.44-22.93-22.652-37.139-53.875-37.139-88.25h.12L256.033 576h538.943l.86 2.007 811.849.674v-.12c34.66 0 65.26 13.43 87.322 35.497 22.192 22.193 35.563 52.952 35.563 87.394h-.12z"
                  style={{ fill: "#fbc02d" }}
                />
                <path
                  className="fil0"
                  d="M1728 858.566H529.98c-7.985 0-14.822 3.152-19.643 8.206-5.435 5.698-8.674 13.855-8.674 22.95v764.127h-61.447V889.722c0-25.1 9.6-48.3 25.717-65.194 16.107-16.882 38.428-27.409 64.047-27.409H1728v61.447z"
                />
                <path className="fil2" d="M255.999 256h1536v1536h-1536z" />
                <path className="fil2" d="M0 0h2048v2048H0z" />
              </g>
            </svg>
            <p className="line-clamp-1">{item.row.original.user_id}</p>
          </div>
        ),
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
