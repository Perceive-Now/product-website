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
import { Switch } from "@headlessui/react";
import SourcesData from "src/pages/product/ai-agent/DataSources";
import TemplateReport from "src/pages/product/ai-agent/ReportTemplate";
import { getTimeCurrent } from "src/utils/helpers";
import pdot from "src/assets/images/icons/p-dot.svg";
import blinkSpinner from "src/assets/images/icons/blink-spinner.svg";

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
  json_report?: any;
  dataSource?: any;
  index?: number;
  initLoading?: boolean;
  agentName?: string;
}

const ChatQuery = ({
  query,
  updateQuery,
  editIndex,
  isloadingCompleted,
  shouldStream = true,
  json_report,
  dataSource,
  index,
  initLoading,
  agentName,
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

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (!query) return <></>;

  return (
    <div className="flex items-center justify-start gap-2">
      <div className="pt-3 shrink-0 ">
        <img className="h-3 w-3 " src={PN} alt={"Pn"} />
      </div>
      <div
        className={`shadow-md border border-gray-200 ${
          index === 0 ? "" : "mt-2"
        } rounded-2xl rounded-bl-none flex items-center justify-center px-4 py-2 gap-2 relative  bg-white`}
      >
        {/* <div
          className={`text-secondary-800 text-justify ${showMore ? "" : ""}`}
          dangerouslySetInnerHTML={{ __html: sanitizedQuery }}
        /> */}
        {index === 0 ? (
          <div className=" w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1">
                <img src={pdot} alt={"Pn"} className="h-4 w-4 " />
                <h2 className="text-gray-900 font-semibold">{agentName}</h2>
              </div>
              <span className="relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-[2px] before:h-full before:bg-gray-200 before:mr-2 pl-2 text-gray-400 text-sm">
                {getTimeCurrent()}
              </span>
            </div>
            <hr className="border-gray-300 my-1"></hr>

            {/* Status Indicator */}

            {initLoading ? (
              <div className="flex items-center space-x-2 bg-primary-900  text-white px-3 py-1 rounded-full w-fit mb-3 mt-2">
                <span>Thinking</span>
                <img
                  style={{ animation: "spin 2s linear infinite" }}
                  className=""
                  src={blinkSpinner}
                  alt={"Pn"}
                />
              </div>
            ) : null}

            <Markdown
              className="markdownWrapper text-gray-500 text-justify text-align relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-[2px] before:h-full before:bg-gray-300 before:mr-2 pl-2"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[
                [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
              ]}
            >
              {query}
            </Markdown>
          </div>
        ) : (
          <Markdown
            className="markdownWrapper text-secondary-800 text-justify text-align"
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              [rehypeExternalLinks, { target: "_blank", rel: "noopener noreferrer" }],
            ]}
          >
            {query}
          </Markdown>
        )}
      </div>
      {Object.keys(dataSource || {}).length || Object.keys(json_report || {}).length ? (
        <div className="font-semibold text-md text-end">
          <Switch
            checked={true}
            onChange={() => {
              setModalOpen(true);
            }}
            className={`border border-appGray-500 relative inline-flex items-center h-2 rounded-full w-4 mr-1`}
          >
            <span
              className={`translate-x-0 inline-block w-[12px] h-[12px] transform bg-appGray-500 rounded-full`}
            />
          </Switch>
          {Object.keys(dataSource || {}).length ? "Data Sources" : "Report Template"}
        </div>
      ) : null}
      <Modal width="mx-auto" open={modalOpen} handleOnClose={handleModalClose}>
        <div className="bg-foundationOrange-100 p-4 border border-secondary-500 mx-auto rounded-lg h-[90vh] overflow-y-auto pn_scroller">
          <div className="font-bold text-md text-end">
            <Switch
              checked={true}
              onChange={() => {
                setModalOpen(false);
              }}
              className={`bg-primary-900 relative inline-flex items-center h-2 rounded-full w-4 mr-1 mb-2`}
            >
              <span
                className={`translate-x-2 inline-block w-2 h-2 transform bg-white rounded-full`}
              />
            </Switch>
            {Object.keys(dataSource || {}).length ? "Data Sources" : "Report Template"}
          </div>
          {Object.keys(dataSource || {}).length ? (
            <div className="mx-auto justify-center flex">
              <SourcesData dataSource={dataSource} disabled />
            </div>
          ) : null}
          {Object.keys(json_report || {}).length ? (
            <div className="mx-auto justify-center flex">
              <TemplateReport reportSummary={json_report.sections} disabled />
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
};

export default ChatQuery;
