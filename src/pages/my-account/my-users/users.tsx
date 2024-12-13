import { useMemo ,useState} from "react";

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
  const [users, setusers] = useState([{id:1,user_name:"robert",role:"admin",reports_count:6},{id:2,user_name:"john cena",role:"admin",reports_count:6},{id:3,user_name:"roman",role:"admin",reports_count:6}]);
  const [searchQuery, setSearchQuery] = useState("");
 
 
  const filteredUser = users.filter(user =>
   user.user_name.toLowerCase().includes(searchQuery.toLowerCase())
 );

  interface IOptions {
    label: string;
    icon: JSX.Element;
    action: () => void;
  }
  

const menuItems =  [
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
      // {
      //   id: "select-col",
      //   // minSize: ,
      //   header: ({ table }) => (
      //     <div className="pl-1 pt-1">
      //       <CheckboxInput
      //         className="border-white"
      //         checked={table.getIsAllRowsSelected()}
      //         // indeterminate={table.getIsSomeRowsSelected()}
      //         onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
      //       />
      //     </div>
      //   ),
      // },
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
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10 p-1">
        <div className="">
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
        <div className="flex items-center gap-1 w-full">
          <p className="font-bold text-base">All Users<span className="ml-3">{users.length}</span></p>
          {/* <div className="h-2 w-2 rounded-full p-[12px] border-2 border-primary-900 text-secondary-500 flex justify-center items-center font-bold">
            0
          </div> */}
          <div className="w-[300px] ml-[60%]">
          <TableSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>

                <div className="ml-auto">
                <Link to="/add-user">
            <Button type="primary"  >
             +  Add User
            </Button>
            </Link>
                </div>

        </div>
      {/* <div className="flex items-center justify-end gap-1 mt-2">
        <IconButton color={"primary"} rounded icon={<ShareIcon className="text-white"/>} />
        <IconButton color={"primary"} rounded icon={<TrashIcon className="text-white" />} />
      </div> */}
      <ReactTable columnsData={columns} rowsData={filteredUser} size="medium" noTopBorder />
    </div>
  );
};

export default Users;
