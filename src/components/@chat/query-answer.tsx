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
import { ErrorIcon } from "../icons";

//
import PN from "../../assets/images/pn.svg";

//
import IconButton from "../reusable/icon-button";
import DotLoader from "../reusable/dot-loader";

//
import { useAppDispatch } from "../../hooks/redux";
// import { setUpdateQuery } from "../../stores/knownow-market";

//
import "./style.css";
import { AppConfig } from "src/config/app.config";
import { saveMarketChat, udateChatResponse } from "src/stores/know-now1";
import { useLocation, useParams } from "react-router-dom";
import jsCookie from "js-cookie";

interface Props {
  answer: string;
  isLoading: boolean;
  error?: string;
  updateQuery: (query: string, editInex: number | null) => void;
  editIndex: any;
  query: string;
  message_id: string;
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

/**
 *
 */
const QueryAnswer = ({
  answer,
  isLoading,
  error,
  updateQuery,
  editIndex,
  query,
  message_id,
}: Props) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();

  const userId = jsCookie.get("user_id");

  const copyRef = useRef<any>(null);
  const [isCopied, setIsCopied] = useState(false);

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

  // const extractText = (html: string) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(html, 'text/html');
  //   return doc.body.textContent || '';
  // };

  //
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

    // const textToCopy = "Text to copy to clipboard";
    try {
      await navigator.clipboard.writeText(fullTextToCopy);
      // console.log('Text copied to clipboard');
    } catch (err) {
      // console.error('Failed to copy text: ', err);
    }
  };

  const formattedAnswer = answer.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  formattedAnswer.replace(/<a\s+href="([^"]*)"/g, '<a href="$1" target="_blank"');

  // const parser = new DOMParser();
  // const doc = parser.parseFromString(formattedAnswer, 'text/html');
  // doc.querySelectorAll('a').forEach((a) => {
  //   a.setAttribute('target', '_blank');
  // });

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
    ],
    allowedAttributes: {
      a: ["href"],
      img: ["src", "alt", "width", "height"],
    },
    transformTags: {
      img: (tagName, attribs) => {
        // Set fixed width and height
        attribs.width = attribs.width || "800"; // default width if not specified
        attribs.height = attribs.height || "200"; // default height if not specified
        return { tagName, attribs };
      },
    },
  });

  //
  const onRegenerate = useCallback(() => {
    // dispatch(setUpdateQuery({ editIndex: editIndex, query: query }));
    updateQuery(query, editIndex);
  }, [editIndex, query, updateQuery]);

  //
  const handleLikeRes = useCallback(
    async (value: boolean) => {
      try {
        if (location.pathname.includes("/know-now/ip-analysis")) {
          await axios.post(`${AppConfig.KNOW_NOW_IP_API}/message/like`, {
            message_id: Number(message_id),
            like: value,
          });
        }
        if (location.pathname.includes("/know-now/market-intelligence") && id) {
          dispatch(
            saveMarketChat({
              thread_id: id || "",
              user_id: userId || "",
              conversation_data: {
                conversation_id: "",
                query: query,
                ai_content: answer,
                likes: value ? 1 : 0,
              },
            }),
          );
        }
        toast.success("Thanks for your feedback");
        dispatch(udateChatResponse({ message_id: message_id, liked: value }));
      } catch (error) {
        toast.error("Server Error");
      }
    },
    [answer, dispatch, id, location.pathname, message_id, query, userId],
  );

  //
  useEffect(() => {
    if (answer) {
      parse(answer, {
        replace: (domNode) => {
          // Ensure that domNode is an Element and has the properties we need
          if ((domNode as Element).name === "img" && (domNode as Element).attribs.src) {
            return <DraggableImage src={(domNode as Element).attribs.src} />;
          }
        },
      });
      // setParsedContent(parsed as React.ReactNode[]);
    }
  }, [answer]);

  return (
    <div className="flex items-start gap-3">
      <div className="p-1 shrink-0">
        <img className="h-full w-full" src={PN} alt={"Pn"} />
      </div>
      <div className="w-full ">
        <div className="">
          <>
            {error || error !== undefined ? (
              <span className="text-danger-500 font-semibold text flex items-center gap-0.5 text-sm">
                <ErrorIcon className="h-3 w-3" />
                {error}
              </span>
            ) : (
              <DndProvider backend={HTML5Backend}>
                <div className="relative">
                  <div
                    ref={copyRef}
                    style={{ textAlign: "justify" }}
                    className="text-secondary-800 relative bottom-0 "
                    dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}
                  />
                </div>
              </DndProvider>
            )}
          </>
          {isLoading && <DotLoader />}
        </div>
        <div className="flex items-center gap-2 mt-5">
          <div className="flex items-center gap-2">
            <ToolTip title="Good" placement="top">
              <IconButton color="default" onClick={() => handleLikeRes(true)}>
                <ThumbsUpIcon />
              </IconButton>
            </ToolTip>
            <ToolTip title="Bad" placement="top">
              <IconButton color="default" onClick={() => handleLikeRes(false)}>
                <ThumbsDownIcon />
              </IconButton>
            </ToolTip>
          </div>
          <div className="flex items-center gap-2">
            <ToolTip title="Regenerate" placement="top">
              <IconButton color="default" onClick={onRegenerate}>
                <RefreshIcon className="text-[#87888C]" />
              </IconButton>
            </ToolTip>
            <CopyToClipboard text={fullTextToCopy}>
              <ToolTip title={isCopied ? "Copied" : "Copy"} placement="top">
                <IconButton onClick={onCopy} color="default">
                  <CopyIcon className={classNames(isCopied ? "text-black" : "text-[#87888C]")} />
                </IconButton>
              </ToolTip>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryAnswer;
