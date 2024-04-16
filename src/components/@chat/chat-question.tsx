import React, { useState } from "react";
import IconButton from "../reusable/icon-button";
import EditIcon from "../icons/miscs/Edit";
// import EditQuery from "./edit-query";

interface Props {
  query: string;
}

const ChatQuery = ({ query }: Props) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="bg-appGray-200 rounded-full h-[30px] w-[30px] shrink-0" />
        <p className="text-secondary-800">{query}</p>
        {/* {
          edit ?
            <EditQuery /> :
        } */}
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
