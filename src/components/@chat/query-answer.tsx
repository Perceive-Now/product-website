import "./style.css";
import ThumbsUpIcon from "../icons/common/ThumbsUp";
import ThumbsDownIcon from "../icons/common/ThumbsDown";
import { ErrorIcon } from "../icons";
import CopyIcon from "../icons/common/copy";

import { CopyToClipboard } from "react-copy-to-clipboard";

import sanitizeHtml from "sanitize-html";

import PN from "../../assets/images/pn.svg";
import IconButton from "../reusable/icon-button";
import { useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import DotLoader from "../reusable/dot-loader";
import RefreshIcon from "../icons/common/refresh";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setUpdateQuery } from "../../stores/know-now";

interface Props {
  answer: string;
  isLoading: boolean;
  error?: string;
  responseTime?: string;
  updateQuery: (query: string) => void;
  editIndex: any;
  query: string;
}

const QueryAnswer = ({
  answer,
  isLoading,
  error,
  responseTime,
  updateQuery,
  editIndex,
  query,
}: Props) => {
  const dispatch = useAppDispatch();
  const updateIndex = useAppSelector((state) => state.KnowNow.editIndex);

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

  const formattedAnswer = answer.replace(/\n/g, "<br>");
  const sanitizedAnswer = sanitizeHtml(formattedAnswer, {
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

  const onRegenerate = useCallback(() => {
    dispatch(setUpdateQuery({ editIndex: editIndex, query: query }));
    if (updateIndex !== null) {
      updateQuery(query);
    }
  }, [dispatch, editIndex, query, updateIndex, updateQuery]);

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
                <p className="text-xs text-secondary-800 font-bold mt-1">
                  ResponseTime:{" "}
                  <span className="text-primary-500">{responseTime && responseTime}</span>
                </p>
              </>
            )}
          </>
        )}
        <div className="flex items-center gap-2 mt-5">
          <div className="flex items-center gap-2">
            <IconButton color="default" title="Good response" disabled>
              <ThumbsUpIcon />
            </IconButton>
            <IconButton color="default" title="Bad response" disabled>
              <ThumbsDownIcon />
            </IconButton>
          </div>
          <div className="flex items-center gap-2">
            <IconButton color="default" title="Regenerate" onClick={onRegenerate}>
              <RefreshIcon className="text-[#87888C]" />
            </IconButton>
            <CopyToClipboard text={fullTextToCopy}>
              <IconButton onClick={copyText} color="default" title="Copy">
                <CopyIcon className={classNames(isCopied ? "text-black" : "text-[#87888C]")} />
              </IconButton>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryAnswer;
