import { useCallback, useState } from "react";

import IconButton from "../reusable/icon-button";
import UserIcon from "../reusable/userIcon";

import EditIcon from "../icons/miscs/Edit";

import EditQuery from "./edit-query";

import { useAppSelector } from "../../hooks/redux";
import { useAppDispatch } from "../../hooks/redux";
import { setUpdateQuery } from "../../stores/know-now";
import sanitizeHtml from "sanitize-html";
import ToolTip from "../reusable/tool-tip";
import ArrowDown from "../icons/miscs/ArrowDown";
import ArrowUp from "../icons/miscs/ArrowUp";
import Modal from "../reusable/modal";
// interface IChat {
//   query: string;
//   answer: string;
// }

interface Props {
  query: string;
  updateQuery: (query: string, editIndex: number) => void;
  chatIndex?: any;
  setEditIndex?: any;
  editIndex?: any;
  setQuery?: any;
  isloadingCompleted?: boolean;
}

const ChatQuery = ({ query, updateQuery, editIndex, isloadingCompleted }: Props) => {
  const dispatch = useAppDispatch();

  const userDetail = useAppSelector((state) => state.auth.user);
  const [edit, setEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const onEdit = useCallback(() => {
    setEdit(true);
    dispatch(setUpdateQuery({ editIndex: editIndex, query: "" }));
  }, [dispatch, editIndex]);

  const onCancel = useCallback(() => {
    setEdit(false);
    dispatch(setUpdateQuery({ editIndex: null, query: "" }));
  }, [dispatch]);

  const onHide = useCallback(() => {
    setShowMore((prev) => !prev);
  }, []);

  const formattedQuery = query.replace(/\n/g, "<br>");

  const sanitizedQuery = sanitizeHtml(formattedQuery, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "br",
      "p",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
    ],
    allowedAttributes: {
      a: ["href"],
    },
  });

  function isMore(query:string) {
    const words = query.trim().split(/\s+/);
    return words.length > 50;
  }

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
            onCancel={onCancel}
          />
        ) : (
          // <div
          //   className="text-secondary-800"
          //   dangerouslySetInnerHTML={{ __html: sanitizedQuery }}
          // />
          <div
            className={`text-secondary-800 text-justify ${showMore ? "" : "line-clamp-3"}`}
            dangerouslySetInnerHTML={{ __html: sanitizedQuery }}
          />
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        {isMore(query) && (
        <IconButton
          rounded
          color="gray"
          icon={showMore?<ArrowUp />: <ArrowDown/>}
          onClick={onHide}
          disabled={isloadingCompleted}
        />
      )}
        <ToolTip title="Edit">
          <IconButton
            rounded
            color="gray"
            icon={<EditIcon className="text-secondary-800" />}
            onClick={onEdit}
            disabled={isloadingCompleted}
          />
        </ToolTip>
      </div>
    </div>
  );
};

export default ChatQuery;
