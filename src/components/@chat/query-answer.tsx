import { useCallback, useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import sanitizeHtml from "sanitize-html";
import classNames from "classnames";
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
import { setUpdateQuery } from "../../stores/know-now";
//
import "./style.css";
interface Props {
  answer: string;
  isLoading: boolean;
  error?: string;
  updateQuery: (query: string, editInex: number | null) => void;
  editIndex: any;
  query: string;
}

/**
 *
 */

const QueryAnswer = ({ answer, isLoading, error, updateQuery, editIndex, query }: Props) => {
  const dispatch = useAppDispatch();

  const copyRef = useRef<any>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  const copyText = useCallback(() => {
    setIsCopied(true);
  }, []);

  const convertTableToText = (tableElement: HTMLTableElement) => {
    if (!tableElement) return "";

    const rows = Array.from(tableElement.querySelectorAll("tr")) as HTMLTableRowElement[];
    const textRows = rows.map((row) => {
      const cells = Array.from(row.querySelectorAll("th, td")) as HTMLTableCellElement[];
      return "| " + cells.map((cell) => (cell.textContent ?? "").trim()).join(" | ") + " |";
    });

    const columnCount = rows[0].querySelectorAll("th, td").length;
    const separator = "| " + "--- | ".repeat(columnCount);

    textRows.splice(1, 0, separator);

    return textRows.join("\n");
  };

  // const extractText = (html: string) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(html, 'text/html');
  //   return doc.body.textContent || '';
  // };

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

  const fullTextToCopy = convertHtmlToMarkdown(answer);

  // const formattedAnswer = answer.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  const sanitizedAnswer = sanitizeHtml(answer, {
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

  const onRegenerate = useCallback(() => {
    dispatch(setUpdateQuery({ editIndex: editIndex, query: query }));
    updateQuery(query, editIndex);
  }, [dispatch, editIndex, query, updateQuery]);

  return (
    <div className="flex items-start gap-3">
      <div className="p-1 shrink-0">
        <img className="h-full w-full" src={PN} alt={"Pn"} />
      </div>
      <div>
        {isLoading ? (
          <DotLoader />
        ) : (
          <>
            {error || error !== undefined ? (
              <span className="text-danger-500 font-semibold text flex items-center gap-0.5 text-sm">
                <ErrorIcon className="h-3 w-3" />
                {error}
              </span>
            ) : (
              <>
                <div
                  ref={copyRef}
                  style={{ textAlign: "justify" }}
                  className="text-secondary-800"
                  dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}
                />
              </>
            )}
          </>
        )}
        <div className="flex items-center gap-2 mt-5">
          <div className="flex items-center gap-2">
            <ToolTip title="Good" placement="top">
              <IconButton color="default" disabled>
                <ThumbsUpIcon />
              </IconButton>
            </ToolTip>
            <ToolTip title="Bad" placement="top">
              <IconButton color="default" disabled>
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
                <IconButton onClick={copyText} color="default">
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
