import React, { useState, useRef, useCallback, useEffect, useSyncExternalStore } from "react";
import AddQuery from "src/components/@vc-product/add-query";
import InitialScreening from "./InitialScreening";
import ReportDefault from "./default";
import jsCookie from "js-cookie";
import SourcesData from "./DataSources";
import TemplateReport from "./ReportTemplate";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { LoadingIcon } from "src/components/icons";
import ChatQuery from "src/components/@vc-product/chat-question";
import QueryAnswer from "src/components/@vc-product/query-answer";
import Modal from "src/components/reusable/modal";
import { Switch } from "@headlessui/react";
import debounce from "lodash.debounce";
import { AppConfig } from "src/config/app.config";
import DotLoader from "src/components/reusable/dot-loader";
import {
  generateAgentThreadName,
  generateKnowId,
  generateKnowIdstring,
  getRandomErrorMessage,
  processResponse,
} from "src/utils/helpers";
import ExtractInfo from "./extractInfo";
import {
  sendQuery,
  extractFileData,
  updatePitchdeckData,
  dynamicThreadName,
} from "src/stores/vs-product";

import {
  setVSChats,
  setprevres,
  setCurrentStep,
  resetChats,
  updateChatQuery,
  setCompanyName,
  updateButtonSelection,
  setUploadStatus,
} from "src/stores/vs-product";
import StepBar from "./stepBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReportCustomization from "./ReportCustomization";
import axios from "axios";
import AddQueryAgent from "./add-query";
import { endChatThread, sendAiAgentQuery } from "./action";
import LoadingUI from "./LoadingUi";
import { v4 as uuidv4 } from "uuid";
import AgentHead from "./AgentHead";
import { fetchAgentThreadDetails } from "src/pages/my-account/my-agent-reports/agent-report.action";
import { useListing } from "src/layouts/sidebar/DraftProvider";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import { API_PROD_URL } from "src/utils/axios";
import AgentInfo from "./AgentInfo";
import DiligenceAgentThinking from "./AgentInit";

const AgentName: Record<string, string> = {
  "company-diligence-agent": "Company Diligence Agent",
  "fundraising-strategy-agent": "Fundraising Strategy Agent",
  "report-on-anything-agent": "Report on Anything Agent",
  "market-strategy-agent": "Market Strategy Agent",
  "portfolio-support-agent": "Portfolio Support Agent",
  "technology-agent": "Technology & R&D Agent",
  "product-engineering-agent": "Product & Engineering Agent",
  "corporate-venture-capital-agent": "Corporate Venture Capital Agent",
  "finance-strategy-agent": "Finance & Strategy Agent",
  "marketing-sales-agent": "Marketing & Sales Agent",
  "legal-compliance-agent": "Legal & Compliance Agent",
  "": "Company Diligence Agent",
};

const AiAgent = () => {
  const params = new URLSearchParams(window.location.search);
  const agent = params.get("agent");

  const { fetchListing } = useListing();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [thread_id, setthread_id] = useState("");
  const { Step, pitchdeck_data } = useAppSelector((state) => state.VSProduct);
  const firstRun = useRef(true);
  const userId = jsCookie.get("user_id");

  const [query, setQuery] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [answer, setanswer] = useState<string>("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isfile, setFile] = useState<string>("");
  const chatRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsloading] = useState(false);
  const [isInitLoad, setIsInitLoad] = useState(false);
  const [delayLoading, setDelayLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [finalMessage, setFinalMessage] = useState(false);

  const { chats } = useAppSelector((state) => state.VSProduct);
  // let { companyName } = useAppSelector((state) => state.VSProduct);
  const chatOptions = chats[chats.length - 1]?.options;

  useEffect(() => {
    scrollToBottom();
  }, [chats]);
  const [searchParams, setSearchParams] = useSearchParams();
  const threadId = searchParams.get("threadId");

  const updateUrlParam = (newKey: string, newValue: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(newKey, newValue); // Add or update the search param
    setSearchParams(newParams);
  };

  const handleRenameThread = async (user_input: string) => {
    if (chats.length === 1) {
      const url = new URL(window.location.href);
      const searchParamsCurrent = new URLSearchParams(url.search);
      const threadIdCurrent = searchParamsCurrent.get("threadId");
      if (user_input) {
        const dynaminc = await fetch(
          `${API_PROD_URL}/agents/rename_thread/${userId}/${
            thread_id || threadId || threadIdCurrent || ""
          }?thread_name=${user_input
            .trim()
            .split(/\s+/)
            .slice(0, Math.min(3, user_input.trim().split(/\s+/).length))
            .join(" ")}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );
        if (dynaminc) {
          fetchListing && fetchListing();
        }
      }
    }
  };

  useEffect(() => {
    setIsloading(true);

    if (threadId) {
      dispatch(resetChats());
      setthread_id(threadId);
      fetchAgentThreadDetails(threadId || "", userId || "", (response) => {
        setIsloading(false);
        response.reports?.conversations
          ?.sort((a: any, b: any) => {
            const dateA = a.id;
            const dateB = b.id;
            return dateA - dateB; // Descending order
          })
          ?.map((report: any) => {
            const { options, remainingText } = processResponse(report.user_message || "");
            const { options: optionAnswer, remainingText: remainingTextAnswer } = processResponse(
              report.assistant_message || "",
            );

            if (remainingText) {
              if (remainingText.includes("pitchdeck_summary")) {
                dispatch(
                  setVSChats({
                    query: report.user_message,
                    answer: "",
                    extract: report.user_message,
                    extractObject: report.json_report,
                    options: options || [],
                    hasbutton: !!options?.length,
                  }),
                );
                dispatch(updatePitchdeckData({ pitchdeckSummary: remainingText }));
              } else {
                dispatch(
                  setVSChats({
                    query: "",
                    answer: remainingText,
                    options: [],
                    hasbutton: false,
                  }),
                );
              }
            }
            if (remainingTextAnswer) {
              dispatch(
                setVSChats({
                  query: remainingTextAnswer,
                  answer: "",
                  options: optionAnswer,
                  hasbutton: !!optionAnswer.length || false,
                }),
              );
            }
            // dispatch(
            //   setVSChats({
            //     query: remainingText,
            //     answer: "",
            //     options: options || [],
            //     hasbutton: !!options?.length,
            //   }),
            // );
          });
      });
    } else {
      setIsInitLoad(true);
      const fun = async () => {
        try {
          dispatch(resetChats());

          // Create agent thread
          const threadCreateBodyData = {
            user_id: userId || "",
            thread_name: generateAgentThreadName(AgentName[agent || ""]),
            use_case: "AI",
            industry: "AI",
            agent_name: AgentName[agent || ""] || "Company Diligence Agent",
          };
          console.log({ "Thread Data": threadCreateBodyData });

          // Call API
          const createThreadResponse: any = await axios.post(
            `${API_PROD_URL}/agents/threads/create/?user_id=${
              userId || ""
            }&thread_name=${generateAgentThreadName(
              AgentName[agent || ""],
            )}&use_case=AI&industry=AI&agent_name=${
              AgentName[agent || ""] || "Company Diligence Agent"
            }`,
            { headers: { "Content-Type": "application/json" }, responseType: "stream" },
          );

          const newTthreadRef =
            createThreadResponse.data.thread_id || generateAgentThreadName(AgentName[agent || ""]);

          const newParams = new URLSearchParams(searchParams);
          newParams.set("threadId", newTthreadRef); // Add or update the search param
          setSearchParams(newParams);
          setthread_id(newTthreadRef);

          // const id = generateKnowIdstring();
          // setthread_id(id);
          firstRun.current = true;
          const ai_query = {
            user_input: "",
            // answer == "Continue" && Step == 3 ? "how many question we want to answer" : answer,
            user_id: userId || "",
            thread_id:
              createThreadResponse.data.thread_id ||
              generateAgentThreadName(AgentName[agent || ""]),
          };
          const { data } = await dispatch(
            sendAiAgentQuery({
              agentName: AgentName[agent || ""],
              ...ai_query,
              shouldRename: chats.length === 2,
            }),
          ).unwrap();

          const { options, remainingText } = processResponse(data.response);
          dispatch(
            setVSChats({
              query: remainingText,
              answer: "",
              options: options || [],
              hasbutton: !!options?.length,
            }),
          );
        } catch (error) {
          console.log(error);
        } finally {
          setQuery(""); // Clear input field
          setIsloading(false);
          setIsInitLoad(false);
        }
      };
      fun();
    }
    // setFile("false");
  }, [threadId]);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const [jsonResponse, setJsonResponse] = useState<any>(null);

  const [jsonType, setJsonType] = useState<string>("");

  const [dataSources, setDataSources] = useState<any>(null);

  const updateVsChat = (payload: { query: string; answer: string }) => {
    dispatch(setVSChats(payload));
  };

  const [uploadingfile, setUplaodingFile] = useState(false);
  const [analysingfile, setAnalysingFile] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);

  const handleFileSubmitQuery = async (file: File) => {
    const url = new URL(window.location.href);
    const searchParamsCurrent = new URLSearchParams(url.search);
    const threadIdCurrent = searchParamsCurrent.get("threadId");
    const errorUploadingFile = "Error generating extract summary. Please upload file again";
    const newQueryIndex = generateKnowId();
    const firstQuery = {
      id: newQueryIndex,
      query: "Great! Let me deep dive into the file.",
      answer: file.name,
      isFile: true,
      file,
    };
    const handleFileUploadError = () => {
      updateVsChat({
        query: errorUploadingFile,
        answer: "",
      });
    };
    setTimeout(() => {
      dispatch(setVSChats(firstQuery));
      dispatch(setCurrentStep(1));
    }, 1000);
    setUplaodingFile(true);
    const pptResp = await dispatch(extractFileData(file)).unwrap();
    const fileResponse = pptResp?.fileData;
    const dynaminc = await dispatch(
      dynamicThreadName({
        fileData: fileResponse,
        userId: userId || "",
        threadId: thread_id || threadId || threadIdCurrent || "",
      }),
    ).unwrap();
    if (dynaminc) {
      fetchListing && fetchListing();
    }
    if (fileResponse) {
      setUplaodingFile(false);
      setIsloading(true);
      try {
        setAnalysingFile(true);
        handleSendQuery("", "Looks good", undefined, undefined, true);
        setUploadStatus(false);
      } catch (error) {
        handleFileUploadError();
      }
    } else {
      setIsloading(false);
      setUplaodingFile(true);
      handleFileUploadError();
    }
  };

  const checkIfFileUpload = (response: string) => {
    if (
      response?.includes("upload the pitch deck") ||
      response?.includes(" upload your pitch deck")
    ) {
      setUploadStatus(true);
    } else {
      setUploadStatus(false);
    }
  };

  const processStatusMain = (data: any) => {
    const cleanedSummary = data.json_response;
    // const cleanValue = data.json_response?.replace(/'/g, '"');
    const extractObject = data.json_response;
    const { options, remainingText } = processResponse(data.response);
    dispatch(
      setVSChats({
        query: remainingText,
        answer: "",
        extract: cleanedSummary,
        extractObject,
        options: options || [],
        hasbutton: !!options?.length,
      }),
    );
    dispatch(
      setVSChats({
        query: "",
        answer: "",
        options: ["Edit Summary", "Looks good"],
        hasbutton: true,
      }),
    );
  };

  const handleSendQuery = useCallback(
    async (
      query: string,
      answer: string,
      file?: File,
      button?: boolean,
      shouldSentPitch?: boolean,
    ) => {
      setIsloading(true);
      const url = new URL(window.location.href);
      const searchParamsCurrent = new URLSearchParams(url.search);
      const threadIdCurrent = searchParamsCurrent.get("threadId");
      const newQueryIndex = generateKnowId();
      try {
        setJsonResponse(null);
        setDataSources(null);
        setanswer("");
        console.log("LSDKLSKD", file);
        if (file) {
          handleFileSubmitQuery(file);
        } else {
          if (answer === "Go Home") {
            dispatch(resetChats());
            setthread_id(generateAgentThreadName(AgentName[agent || ""]));
            firstRun.current = true;
            setFile("false");
            navigate("/", {
              replace: true,
            });
            return;
          }
          if (answer === "Start another report") {
            dispatch(resetChats());
            setthread_id(generateAgentThreadName(AgentName[agent || ""]));
            firstRun.current = true;
            setFile("false");
            return;
          }
          const ai_query = {
            user_input: answer,
            // answer == "Continue" && Step == 3 ? "how many question we want to answer" : answer,
            user_id: userId || "",
            thread_id: thread_id || threadIdCurrent || "",
            button: button,
          };

          //
          if (button) {
            if (answer !== "Edit Summary") {
              dispatch(updateButtonSelection({ hasselected: true }));
            }
            dispatch(setprevres({ answer }));

            switch (answer) {
              case "End Conversation":
                ai_query.user_input = "chat_ended";
                setChatEnded(true);
                try {
                  const { data } = await dispatch(
                    sendAiAgentQuery({
                      agentName: AgentName[agent || ""],
                      ...ai_query,
                      sendPitchData: shouldSentPitch ? true : false,
                      // file_upload_status: true,
                    }),
                  ).unwrap();
                  dispatch(
                    endChatThread({
                      thread_id: thread_id,
                      user_id: userId || "",
                    }),
                  );
                  let convoOptions: string[] = [];
                  const { options, remainingText } = processResponse(data.response);
                  if (data.response?.toLowerCase().includes("24-48 hours")) {
                    convoOptions = ["End Conversation"];
                    // updateUrlParam("side", "false");
                  }
                  const userOptions = options?.length
                    ? options
                    : convoOptions.length
                    ? convoOptions
                    : [];
                  dispatch(
                    setVSChats({
                      query: remainingText,
                      answer: "",
                      options: userOptions,
                      hasbutton: !!userOptions?.length,
                    }),
                  );
                } finally {
                  setIsloading(false);
                }
                break;

              case "Looks good":
                ai_query.user_input = "Looks good";
                setIsloading(true);
                try {
                  const { data } = await dispatch(
                    sendAiAgentQuery({
                      agentName: AgentName[agent || ""],
                      ...ai_query,
                      sendPitchData: shouldSentPitch ? true : false,
                      // file_upload_status: true,
                    }),
                  ).unwrap();

                  if (
                    data?.response?.includes("upload the pitch deck") ||
                    data?.response?.includes("upload your pitch deck")
                  ) {
                    setUploadStatus(true);
                  }
                  let convoOptions: string[] = [];
                  const json_response = data.json_response;
                  try {
                    if (data.type_json === "Data_sources") {
                      setDataSources(JSON.parse(json_response));
                      updateUrlParam("side", "false");
                    } else {
                      if (data.response?.toLowerCase().includes("24-48 hours")) {
                        convoOptions = ["End Conversation"];
                        updateUrlParam("side", "false");
                      }
                      setJsonType(data.type_json);
                      setJsonResponse(json_response);
                    }
                  } catch (error) {
                    if (data.response?.toLowerCase().includes("24-48 hours")) {
                      convoOptions = ["End Conversation"];
                      updateUrlParam("side", "false");
                    }
                    setJsonType(data.type_json);
                    setJsonResponse(json_response);
                  }

                  const { options, remainingText } = processResponse(data.response);
                  dispatch(
                    setVSChats({
                      query: remainingText,
                      answer: "",
                      options: options || [],
                      hasbutton: !!options?.length,
                    }),
                  );
                  if (data.type_json === "Data_sources") {
                    dispatch(
                      setVSChats({
                        query: "",
                        answer: "",
                        options: ["Next Step"],
                        hasbutton: true,
                      }),
                    );
                  } else if (
                    data.type_json === "Final_report" ||
                    data.response?.toLowerCase().includes("24-48 hours")
                  ) {
                    dispatch(
                      setVSChats({
                        query: "",
                        answer: "",
                        options: ["Submit"],
                        hasbutton: true,
                      }),
                    );
                  }
                } finally {
                  setIsloading(false);
                  setAnalysingFile(false);
                }
                break;

              case "Edit Summary":
                setModalOpen(true);
                setIsloading(false);
                return;

              default:
                ai_query.user_input = answer === "Next Step" ? "proceed further" : answer;
                setIsloading(true);
                try {
                  const { data } = await dispatch(
                    sendAiAgentQuery({
                      agentName: AgentName[agent || ""],
                      ...ai_query,
                      sendPitchData: shouldSentPitch ? true : false,
                      // file_upload_status: true,
                    }),
                  ).unwrap();

                  if (
                    data?.response?.includes("upload the pitch deck") ||
                    data?.response?.includes("upload your pitch deck")
                  ) {
                    setUploadStatus(true);
                  }

                  const { options, remainingText } = processResponse(data.response);
                  const json_response = data.json_response;

                  let convoOptions: string[] = [];
                  try {
                    if (data.type_json === "Data_sources") {
                      setDataSources(JSON.parse(json_response));
                      updateUrlParam("side", "false");
                    } else {
                      if (data.response?.toLowerCase().includes("24-48 hours")) {
                        convoOptions = ["End Conversation"];
                        updateUrlParam("side", "false");
                      }
                      setJsonType(data.type_json);
                      setJsonResponse(json_response);
                    }
                  } catch (error) {
                    if (data.response?.toLowerCase().includes("24-48 hours")) {
                      convoOptions = ["End Conversation"];
                      updateUrlParam("side", "false");
                    }
                    setJsonType(data.type_json);
                    setJsonResponse(json_response);
                  }
                  const userOptions = options?.length
                    ? options
                    : convoOptions.length
                    ? convoOptions
                    : [];
                  dispatch(
                    setVSChats({
                      query: remainingText,
                      answer: "",
                      options: userOptions,
                      hasbutton: !!userOptions?.length,
                    }),
                  );
                  if (data.type_json === "Data_sources") {
                    dispatch(
                      setVSChats({
                        query: "",
                        answer: "",
                        options: ["Next Step"],
                        hasbutton: true,
                      }),
                    );
                  } else if (data.type_json === "Final_report") {
                    dispatch(
                      setVSChats({
                        query: "",
                        answer: "",
                        options: ["Submit"],
                        hasbutton: true,
                      }),
                    );
                  }
                } finally {
                  setIsloading(false);
                  setAnalysingFile(false);
                }
                break;
            }
          }

          //
          else {
            if (answer === "Looks good") {
              //** Fifth Converstaion **//
              ai_query.user_input = "Looks good";
              const { data } = await dispatch(
                sendAiAgentQuery({
                  agentName: AgentName[agent || ""],
                  ...ai_query,
                  sendPitchData: true,
                  file_upload_status: true,
                }),
              ).unwrap();
              handleRenameThread(answer);
              if (data) {
                setIsloading(false);
                setAnalysingFile(false);
              }
              checkIfFileUpload(data?.response);

              if (data.status_main) {
                processStatusMain(data);
              } else {
                const { options, remainingText } = processResponse(data.response);
                dispatch(
                  setVSChats({
                    query: remainingText,
                    answer: "",
                    options: options || [],
                    hasbutton: !!options?.length,
                  }),
                );
              }
              // dispatch(setVSChats({ query: data?.response, answer: answer }));
              //**     **//
            } else {
              dispatch(
                setVSChats({
                  query: "",
                  answer: answer,
                  hasbutton: false,
                }),
              );
              const { data } = await dispatch(
                sendAiAgentQuery({
                  agentName: AgentName[agent || ""],
                  ...ai_query,
                  sendPitchData: shouldSentPitch ? true : false,
                  // sendPitchData: !!Object.keys(dataSources || {}).length,
                }),
              ).unwrap();
              handleRenameThread(answer);
              if (data) {
                setIsloading(false);
              }
              if (data.status_main) {
                processStatusMain(data);
              } else {
                checkIfFileUpload(data?.response);
                const { options, remainingText } = processResponse(data.response);
                const json_response = data.json_response;

                let convoOptions: string[] = [];
                try {
                  if (data.type_json === "Data_sources") {
                    setDataSources(JSON.parse(json_response));
                    updateUrlParam("side", "false");
                  } else {
                    if (data.response?.toLowerCase().includes("24-48 hours")) {
                      convoOptions = ["End Conversation"];
                      updateUrlParam("side", "false");
                    }
                    setJsonType(data.type_json);
                    setJsonResponse(json_response);
                  }
                } catch (error) {
                  if (data.response?.toLowerCase().includes("24-48 hours")) {
                    convoOptions = ["End Conversation"];
                    updateUrlParam("side", "false");
                  }
                  setJsonType(data.type_json);
                  setJsonResponse(json_response);
                }

                dispatch(
                  setVSChats({
                    query: remainingText,
                    answer: "",

                    hasbutton: false,
                  }),
                );
                const userOptions = options?.length
                  ? options
                  : convoOptions.length
                  ? convoOptions
                  : [];
                dispatch(
                  setVSChats({
                    query: "",
                    answer: "",
                    options: userOptions,
                    hasbutton: !!userOptions?.length,
                  }),
                );
                if (data.type_json === "Data_sources") {
                  dispatch(
                    setVSChats({
                      query: "",
                      answer: "",
                      options: ["Next Step"],
                      hasbutton: true,
                    }),
                  );
                } else if (data.type_json === "Final_report") {
                  dispatch(
                    setVSChats({
                      query: "",
                      answer: "",
                      options: ["Submit"],
                      hasbutton: true,
                    }),
                  );
                }
              }
            }
          }
        }
        // dispatch(setVSChats({ query: response?.response, answer: query }));
      } catch (error) {
        setIsloading(false);
        console.error("Error fetching API response:", error);
      } finally {
        setQuery(""); // Clear input field
        // setIsloading(false);
      }
    },
    [dispatch, query, answer],
  );

  return (
    <>
      <div className="px-0 md:px-3 w-full mx-auto h-full">
        <div className="flex justify-start items-center mt-3">
          <Link to="/ai-agent/landing">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
        <AgentHead agentName={AgentName[agent || ""] || "Company Diligence Agent"} />
        <div className="flex flex-col gap-y-3 lg:flex-row lg:gap-y-0 gap-x-5 lg:gap-x-2">
          <div>
            <AgentInfo />
          </div>
          <div className="flex-auto relative flex flex-col gap-2 max-w-[780px] mx-auto h-[100vh]">
            {/* <div className="relative flex-none">
              <div className="absolute left-[-25px] md:left-[-40px] lg:left-[-45px] top-2 w-[10px]">
                <StepBar />
              </div>
            </div> */}

            {chatEnded ? (
              <div className="flex flex-row justify-between flex-auto">
                <ReportDefault
                  finalMessage={chatEnded}
                  setFinalMessage={() => {
                    setChatEnded(false);
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-row flex-auto justify-center">
                <div
                  ref={chatRef}
                  className="bg-white rounded-lg p-3 w-full max-h-[calc(100vh-244px)] overflow-y-auto pn_scroller shadow-[0_4px_4px_0] shadow-[#000]/[0.06]"
                >
                  <div className="">
                    {chats.map((chat, idx) => (
                      <>
                        {chat.options?.length ? <ChatQuery query={chat.query} /> : null}
                        <QueryAnswer
                          ido={`chat-[${idx}]`}
                          query={chat.query}
                          answer={chat.answer || ""}
                          isLoading={isLoading}
                          setanswer={setanswer}
                          message_id={chat.id || 0}
                          options={chat.options}
                          hasselected={chat.hasselected || false}
                          hasbutton={chat.hasbutton || false}
                          onSendQuery={handleSendQuery}
                          file={chat.file}
                          threadId={thread_id}
                        />
                        {isLoading}

                        {chat.extract ? (
                          <ExtractInfo
                            onSendQuery={handleSendQuery}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            info={chat.extract}
                            query={chat.query}
                            obj={chat.extractObject}
                          />
                        ) : !chat.options?.length ? (
                          <ChatQuery query={chat.query} />
                        ) : null}
                      </>
                    ))}
                    {delayLoading && (
                      <div className="flex items-center justify-center p-5 h-full">
                        <DotLoader />
                      </div>
                    )}
                    {uploadingfile || analysingfile ? (
                      <LoadingUI uploadingFile={uploadingfile} analyzing={analysingfile} />
                    ) : isInitLoad ? (
                      <div className="flex items-center justify-center p-5 h-full">
                        <DiligenceAgentThinking agentName={AgentName[agent || ""]} />
                      </div>
                    ) : (
                      isLoading && (
                        <div className="flex items-center justify-center p-5 h-full">
                          <DotLoader />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center mt-auto">
              <AddQueryAgent
                setanswer={setanswer}
                query={query}
                answer={answer}
                uploadStatus={
                  uploadStatus ||
                  chats?.[chats?.length - 1]?.query
                    ?.toLowerCase()
                    ?.includes("upload the pitch deck") ||
                  chats?.[chats?.length - 1]?.query
                    ?.toLowerCase()
                    ?.includes("upload your pitch deck")
                }
                setFile={setAttachedFile}
                // sendQuery={() => {
                //   fetchResponse(query);
                // }}
                fileRequired={!agent || agent === "company-diligence-agent"}
                sendQuery={handleSendQuery}
                allDisabled={chats?.filter((chat) => chat.answer === "chat_ended")?.length > 0}
              />
            </div>
          </div>

          {/* {Step === 4 && SidescreenOptions && SidescreenOptions.length > 0 && <InitialScreening />} */}
          <div>
            {/* <ReportCustomization /> */}
            {dataSources && Object.keys(dataSources || {}) && (
              <SourcesData dataSource={dataSources} />
            )}
            {jsonType === "Final_report" && Object.keys(jsonResponse || {}).length > 0 && (
              <TemplateReport reportSummary={jsonResponse.sections} />
            )}
            {Step == 3 && <InitialScreening />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AiAgent;
//
