import { useCallback, useEffect, useState } from "react";

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
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
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
  shouldStream?: boolean;
}

const ChatQuery = ({
  query,
  updateQuery,
  editIndex,
  isloadingCompleted,
  shouldStream = true,
}: Props) => {
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

  if (!query) return <></>;

  return (
    <div className="flex items-center justify-start gap-2">
      <div className="pt-3 shrink-0 ">
        <img className="h-3 w-3 " src={PN} alt={"Pn"} />
      </div>
      <div
        className={`mt-2 rounded-2xl rounded-bl-none flex items-center justify-center px-4 py-2 gap-2 relative  bg-appGray-100`}
      >
        {/* <div
          className={`text-secondary-800 text-justify ${showMore ? "" : ""}`}
          dangerouslySetInnerHTML={{ __html: sanitizedQuery }}
        /> */}
        <Markdown
          className="markdownWrapper text-secondary-800 text-justify text-align"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }]]}
        >
          {query}
        </Markdown>
      </div>
    </div>
  );
};

export default ChatQuery;
