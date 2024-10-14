import { useCallback, useState } from "react";

import IconButton from "../reusable/icon-button";
import UserIcon from "../reusable/userIcon";

import EditIcon from "../icons/miscs/Edit";
import PN from "../../assets/images/pn.svg";

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
  updateQuery?: (query: string, editIndex: number) => void;
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

  function isMore(query: string) {
    const words = query.trim().split(/\s+/);
    return words.length > 50;
  }

  return (
    <div className="flex items-center justify-start gap-2">
        <div className="pt-3 shrink-0 ">
          <img className="h-3 w-3 " src={PN} alt={"Pn"} />
        </div>
        <div
          className={`mt-2 rounded-2xl rounded-bl-none flex items-center justify-center px-4 py-2 gap-2 relative cursor-pointer bg-appGray-100`}
        >
          <div
            className={`text-secondary-800 text-justify ${showMore ? "" : "line-clamp-3"}`}
            dangerouslySetInnerHTML={{ __html: sanitizedQuery }}
          />
        </div>
    </div>
  );
};

export default ChatQuery;
