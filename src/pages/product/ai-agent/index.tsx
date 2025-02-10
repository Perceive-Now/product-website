import React, { useState, useRef, useCallback, useEffect } from "react";
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
  generateKnowId,
  generateKnowIdstring,
  getRandomErrorMessage,
  processResponse,
} from "src/utils/helpers";
import ExtractInfo from "./extractInfo";
import { sendQuery, extractFileData } from "src/stores/vs-product";

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
import { sendAiAgentQuery } from "./action";

const AgentName: Record<string, string> = {
  "startup-diligence-agent": "Startup Diligence Agent",
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
  "": "Startup Diligence Agent",
};

const AiAgent = () => {
  const params = new URLSearchParams(window.location.search);
  const agent = params.get("agent");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [thread_id, setthread_id] = useState(generateKnowIdstring());
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
  const [delayLoading, setDelayLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [finalMessage, setFinalMessage] = useState(false);

  const { chats } = useAppSelector((state) => state.VSProduct);
  // let { companyName } = useAppSelector((state) => state.VSProduct);
  const chatOptions = chats[chats.length - 1]?.options;

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    setIsloading(true);
    const fun = async () => {
      try {
        dispatch(resetChats());
        const id = generateKnowIdstring();
        setthread_id(id);
        firstRun.current = true;
        const ai_query = {
          user_input: "",
          // answer == "Continue" && Step == 3 ? "how many question we want to answer" : answer,
          user_id: userId || "",
          thread_id: id,
        };
        const { data } = await dispatch(
          sendAiAgentQuery({
            agentName: AgentName[agent || ""],
            ...ai_query,
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
      }
    };
    fun();
    // setFile("false");
  }, []);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const [jsonType, setJsonType] = useState<string>("");

  const [dataSources, setDataSources] = useState<any>(null);

  const updateVsChat = (payload: { query: string; answer: string }) => {
    dispatch(setVSChats(payload));
  };

  const handleFileSubmitQuery = async (file: File) => {
    const errorUploadingFile = "Error generating extract summary. Please upload file again";
    const newQueryIndex = generateKnowId();
    const firstQuery = {
      id: newQueryIndex,
      query: "Great! Let me deep dive into the file.",
      answer: file.name,
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
    const fileResponse = await dispatch(extractFileData(file)).unwrap();
    if (fileResponse) {
      setIsloading(true);
      try {
        handleSendQuery("", "Looks good", undefined, undefined, true);
        setUploadStatus(false);
      } catch (error) {
        handleFileUploadError();
      }
    } else {
      setIsloading(false);
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
    const cleanedSummary = data.json_response?.replace(/[{}"']/g, "").trim();
    const cleanValue = data.json_response.replace(/\*\*/g, "").trim();
    const extractObject = JSON.parse(cleanValue);
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
      const newQueryIndex = generateKnowId();
      try {
        setJsonResponse(null);
        setDataSources(null);
        setanswer("");
        if (file) {
          handleFileSubmitQuery(file);
        } else {
          if (answer === "Go Home") {
            dispatch(resetChats());
            setthread_id(generateKnowIdstring());
            firstRun.current = true;
            setFile("false");
            navigate("/", {
              replace: true,
            });
            return;
          }
          if (answer === "Start another report") {
            dispatch(resetChats());
            setthread_id(generateKnowIdstring());
            firstRun.current = true;
            setFile("false");
            return;
          }
          const ai_query = {
            user_input: answer,
            // answer == "Continue" && Step == 3 ? "how many question we want to answer" : answer,
            user_id: userId || "",
            thread_id: thread_id,
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
                try {
                  const { data } = await dispatch(
                    sendAiAgentQuery({
                      agentName: AgentName[agent || ""],
                      ...ai_query,
                      sendPitchData: shouldSentPitch ? true : false,
                      // file_upload_status: true,
                    }),
                  ).unwrap();
                  let convoOptions: string[] = [];
                  const { options, remainingText } = processResponse(data.response);
                  if (data.response?.toLowerCase().includes("24-48 hours")) {
                    convoOptions = ["End Conversation"];
                    setSearchParams({ ...(agent ? { agent } : {}), side: "false" });
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

                  const { options, remainingText } = processResponse(data.response);
                  dispatch(
                    setVSChats({
                      query: remainingText,
                      answer: "",
                      options: options || [],
                      hasbutton: !!options?.length,
                    }),
                  );
                } finally {
                  setIsloading(false);
                }
                break;

              case "Edit Summary":
                setModalOpen(true);
                return;

              default:
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
              if (data) {
                setIsloading(false);
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
                    setSearchParams({ ...(agent ? { agent } : {}), side: "false" });
                  } else {
                    if (data.response?.toLowerCase().includes("24-48 hours")) {
                      convoOptions = ["End Conversation"];
                      setSearchParams({ ...(agent ? { agent } : {}), side: "false" });
                    }
                    setJsonType(data.type_json);
                    setJsonResponse(json_response);
                  }
                } catch (error) {
                  if (data.response?.toLowerCase().includes("24-48 hours")) {
                    convoOptions = ["End Conversation"];
                    setSearchParams({ ...(agent ? { agent } : {}), side: "false" });
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
        <div className="flex flex-col gap-y-3 lg:flex-row lg:gap-y-0 gap-x-5 lg:gap-x-2">
          <div className="flex-auto relative flex flex-col gap-2 max-w-[780px] mx-auto h-[100vh]">
            {/* <div className="relative flex-none">
              <div className="absolute left-[-25px] md:left-[-40px] lg:left-[-45px] top-2 w-[10px]">
                <StepBar />
              </div>
            </div> */}

            {/* {chats && chats.length <= 0 ? (
              <div className="flex flex-row justify-between flex-auto">
                <ReportDefault
                  finalMessage={finalMessage}
                  setFinalMessage={() => {
                    setFinalMessage(false);
                  }}
                />
              </div>
            ) : ( */}
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
                  {isLoading && (
                    <div className="flex items-center justify-center p-5 h-full">
                      <DotLoader />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* )} */}

            <div className="flex items-center justify-center mt-auto">
              <AddQueryAgent
                setanswer={setanswer}
                query={query}
                answer={answer}
                uploadStatus={uploadStatus}
                setFile={setAttachedFile}
                // sendQuery={() => {
                //   fetchResponse(query);
                // }}
                fileRequired={!agent || agent === "startup-diligence-agent"}
                sendQuery={handleSendQuery}
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
