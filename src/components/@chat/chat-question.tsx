import { useState } from "react";

import IconButton from "../reusable/icon-button";
import UserIcon from "../reusable/userIcon";

import EditIcon from "../icons/miscs/Edit";

import EditQuery from "./edit-query";

import { useAppSelector } from "../../hooks/redux";

// interface IChat {
//   query: string;
//   answer: string;
// }

interface Props {
  query: string;
  updateQuery: () => void;
  chatIndex?: any;
  setEditIndex?: any;
  editIndex?: any;
  setQuery?: any;
}

const ChatQuery = ({ query, updateQuery, editIndex, setQuery }: Props) => {
  const userDetail = useAppSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex justify-between w-full gap-2.5">
      <div className="flex gap-3 w-full">
        <div className="shrink-0">
          <UserIcon
            first_name={userDetail?.first_name || ""}
            last_name={userDetail?.last_name || ""}
            profile_photo={userDetail?.profile_photo}
          />
        </div>
        {edit ? (
          <EditQuery
            setEdit={setEdit}
            query={query}
            updateQuery={updateQuery}
            editIndex={editIndex}
            setQuery={setQuery}
          />
        ) : (
          <p className="text-secondary-800">{query}</p>
        )}
      </div>
      <IconButton
        rounded
        color="gray"
        icon={<EditIcon className="text-secondary-800" />}
        onClick={() => setEdit(true)}
      />
    </div>
  );
};

export default ChatQuery;
