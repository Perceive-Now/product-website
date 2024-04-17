import { useState } from "react";

import IconButton from "../reusable/icon-button";
import EditIcon from "../icons/miscs/Edit";
import EditQuery from "./edit-query";

// interface IChat {
//   query: string;
//   answer: string;
// }

interface Props {
  query: string;
  updateQuery: () => void;
  // setChats: () => void
}

const ChatQuery = ({ query, updateQuery }: Props) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex justify-between w-full gap-2.5">
      <div className="flex items-center gap-3 w-full">
        <div className="bg-appGray-200 rounded-full h-[30px] w-[30px] shrink-0" />
        {edit ? (
          <EditQuery setEdit={setEdit} query={query} updateQuery={updateQuery} />
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
