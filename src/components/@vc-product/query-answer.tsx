import { useCallback, useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import sanitizeHtml from "sanitize-html";
import classNames from "classnames";
import toast from "react-hot-toast";
import axios from "axios";

//
import parse from "html-react-parser";
import { Element } from "domhandler/lib/node";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//
import ToolTip from "../reusable/tool-tip";

//
import ThumbsDownIcon from "../icons/common/ThumbsDown";
import ThumbsUpIcon from "../icons/common/ThumbsUp";
import RefreshIcon from "../icons/common/refresh";
import CopyIcon from "../icons/common/copy";
import { CheckIcon, ErrorIcon } from "../icons";
//
import PN from "../../assets/images/pn.svg";

//
import IconButton from "../reusable/icon-button";
import DotLoader from "../reusable/dot-loader";

//
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// import { setUpdateQuery } from "../../stores/knownow-market";

//
// import "./style.css";
import { AppConfig } from "src/config/app.config";
import { udateChatResponse } from "src/stores/know-now";
import { useLocation, useParams } from "react-router-dom";
import jsCookie from "js-cookie";
import { saveMarketChat } from "src/stores/knownow-market";

import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import UserIcon from "../reusable/userIcon";

interface Props {
  isLoading: boolean;
  //   error?: string;
  //   updateQuery: (query: string, editInex: number | null) => void;
  handleClick: (id: number, value: string) => void;
  //   editIndex: any;
  query: string;
  message_id: number;
  //   loadingCompleted?: boolean;
  answer: string;
  //   scrollToItem : (index: string ) => void;
  ido: string;
  hasbutton: boolean;
  hasselected: string;
}

const ItemTypes = {
  IMAGE: "image",
};

const DraggableImage = ({ src }: any) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.IMAGE,
    item: { src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={src}
      alt="Draggable"
      style={{
        width: "200px",
        height: "auto",
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    />
  );
};

type IFeedback = "good" | "bad";

/**
 *
 */
const QueryAnswer = ({
  answer,
  isLoading,
  //   error,
  //   updateQuery,
  //   editIndex,
  query,
  //   loadingCompleted,
  message_id,
  hasselected,
  ido,
  hasbutton,
  handleClick,
}: //   scrollToItem
Props) => {
  const dispatch = useAppDispatch();
  const userDetail = useAppSelector((state) => state.auth.user);
  const location = useLocation();
  const { id } = useParams();

  const userId = jsCookie.get("user_id");

  const copyRef = useRef<any>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [response, setResponse] = useState<IFeedback | null>(null);
  const [dislikePopup, setDislikePopup] = useState(false);
  const [isAdditionalFeedbackOpen, setAdditionalFeedbackOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  // //
  // const copyText = useCallback(() => {
  //   setIsCopied(true);
  // }, []);

  //
  const convertTableToText = (tableElement: HTMLTableElement) => {
    if (!tableElement) return "";

    const rows = Array.from(tableElement.querySelectorAll("tr")) as HTMLTableRowElement[];
    const textRows = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("th, td")) as HTMLTableCellElement[];
      return "| " + cells.map((cell) => (cell.textContent ?? "").trim()).join(" | ") + " |";
    });

    const columnCount = rows[0].querySelectorAll("th, td").length;
    const separator = "".repeat(columnCount);

    textRows.splice(1, 0, separator);

    return textRows.join("\n");
  };

  const convertHtmlToMarkdown = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.body;
    let markdown = "";

    body.childNodes.forEach((node) => {
      if (node.nodeName === "TABLE") {
        markdown += "\n" + convertTableToText(node as HTMLTableElement) + "\n";
      } else {
        markdown += (node.textContent || "") + "\n";
      }
    });

    return markdown;
  };

  //
  const fullTextToCopy = convertHtmlToMarkdown(answer);

  const onCopy = async () => {
    setIsCopied(true);
    try {
      await navigator.clipboard.writeText(fullTextToCopy);
      // console.log('Text copied to clipboard');
    } catch (err) {
      // console.error('Failed to copy text: ', err);
    }
  };

  const formattedAnswer = answer
    .replace(/\n/, "<br>")
    // .replace(/(\r\n|\r|\n)/g, "<br>")
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/<a /, '<a target="_blank" rel="noopener noreferrer" ');

  const sanitizedAnswer = sanitizeHtml(formattedAnswer, {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "a",
      "br", // Allow <br> tags
      "p",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "img",
      "span",
      "div",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    transformTags: {
      img: (tagName, attribs) => {
        // Set fixed width and height
        attribs.width = attribs.width || "800";
        attribs.height = attribs.height || "200";
        return { tagName, attribs };
      },
    },
  });

  return (
    <>
      {answer && answer !== "template" && (
        <div className="flex flex-wrap items-center justify-end gap-2 mt-2">
          {answer === "Loading..." ? (
            <DotLoader />
          ) : (
            <>
              {hasbutton ? (
                // <button onClick={()=>{handleClick(message_id)}} className={` ${hasselected ? 'bg-foundationOrange-100 border-secondary-500':''} rounded-md p-1 border hover:border-secondary-500 hover:bg-foundationOrange-100 `}>
                //   {answer}
                // </button>
                (() => {
                  let stages: any = [];
                  try {
                    stages = answer
                      .replace(/[\[\]"']/g, "")
                      .split(",")
                      .map((stage) => stage.trim())
                      .filter((stage) => stage);
                  } catch (e) {
                    console.error("Failed to parse stages:", e);
                  }

                  return stages.map((stage: any, index: any) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleClick(message_id, stage);
                      }}
                      className={`${
                        hasselected === stage ? "bg-foundationOrange-100 border-secondary-500" : ""
                      } text-sm rounded-lg py-1 px-2 border hover:border-secondary-500 hover:bg-foundationOrange-100 text-secondary-800`}
                    >
                      {stage}
                    </button>
                  ));
                })()
              ) : (
                <div
                  className={`rounded-2xl rounded-br-none flex items-center justify-center px-4 py-2 gap-2 relative cursor-pointer bg-foundationOrange-100`}
                >
                  <div
                    className={`text-secondary-800 text-justify `}
                    dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}
                  />
                </div>
              )}
            </>
          )}
          <div className="pt-3 shrink-0">
            <UserIcon
              first_name={userDetail?.first_name || ""}
              last_name={userDetail?.last_name || ""}
              profile_photo={userDetail?.profile_photo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default QueryAnswer;
