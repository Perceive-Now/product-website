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
import ExtractInfo from "src/components/@vc-product/extractInfo";
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
const AiAgent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [thread_id, setthread_id] = useState(generateKnowIdstring());
  const { Step, pitchdeck_data } = useAppSelector((state) => state.VSProduct);
  const firstRun = useRef(true);
  const userId = jsCookie.get("user_id");
  const { SidescreenOptions } = useAppSelector((state) => state.VSProduct);
  const { DataSources } = useAppSelector((state) => state.VSProduct);
  const { ReportTemplate } = useAppSelector((state) => state.VSProduct);

  const [query, setQuery] = useState("");
  const [companyStage, setcompanyStage] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [slideData, setSlideData] = useState<any>(null);
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
    dispatch(resetChats());
    setthread_id(generateKnowIdstring());
    firstRun.current = true;
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

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const fetchResponse = async (userInput: string) => {
    const threadId = generateKnowIdstring();
    try {
      const response = await axios.post(
        "https://templateuserrequirements.azurewebsites.net/process-step",
        {
          userId: String(userId), // Convert userId to string
          threadId,
          industry: "AI",
          agent: "Startup Diligence Agent",
          useCase: "AI",
          step: 0,
          data: { user_input: userInput },
        },
      );
      return response.data || "No response received.";
    } catch (error) {
      console.error("Error fetching API response:", error);
      return "An error occurred while processing your request. Please try again.";
    }
  };

  const onSendQuery = useCallback(async () => {
    if (!query.trim()) return; // Prevent sending empty messages
    setIsloading(true);

    // Add user query to chat
    // dispatch(setVSChats({ query, answer: "" }));

    try {
      // const answer = await fetchResponse(query);
      // Add the response to chat
      // dispatch(setVSChats({ query: "", answer }));
    } catch (error) {
      dispatch(setVSChats({ query: "", answer: "Error while processing the request." }));
    } finally {
      setQuery(""); // Clear input field
      setIsloading(false);
    }
  }, [dispatch, query]);

  const { companyName } = useAppSelector((state) => state.VSProduct);

  const [jsonResponse, setJsonResponse] = useState<any>(null);
  const [websites, setWebsited] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [dataSources, setDataSources] = useState<any>(null);

  const handleSendQuery = useCallback(
    async (query: string, answer: string, file?: File, button?: boolean) => {
      setIsloading(true);
      const newQueryIndex = generateKnowId();
      try {
        setJsonResponse(null);
        setDataSources(null);
        setanswer("");
        if (file) {
          setanswer("");
          setFile("true");
          const firstQuery = {
            id: newQueryIndex,
            query: "Great! Let me deep dive into the file.",
            answer: file.name,
          };
          setTimeout(() => {
            dispatch(setVSChats(firstQuery));
            dispatch(setCurrentStep(1));
          }, 1000);

          const fileResponse = await dispatch(extractFileData(file)).unwrap();
          console.log("file ress", fileResponse);
          if (fileResponse) {
            // const res = await dispatch(
            //   sendQuery({ user_input: fileResponse, user_id: userId || "", thread_id: thread_id }),
            // ).unwrap();
            try {
              const cleanedSummary = fileResponse.replace(/[{}"']/g, "").trim();
              const cleanValue = fileResponse.replace(/\*\*/g, "").trim();
              const extractObject = JSON.parse(cleanValue);
              dispatch(
                setVSChats({
                  query: "",
                  answer: "",
                  extract: cleanedSummary,
                  extractObject,
                }),
              );
              dispatch(setCurrentStep(2));

              dispatch(
                setVSChats({
                  query: `Here’s the summary of key details from ${companyName}’s pitch deck. Edit as needed or confirm if it looks good.`,
                  answer: "",
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
              setUploadStatus(false);
            } catch (error) {
              dispatch(
                setVSChats({
                  query: "Error generating extract summary. Please upload file again",
                  answer: "",
                }),
              );
              setFile("false");
            }
          } else {
            dispatch(
              setVSChats({
                query: "Error generating extract summary. Please upload file again",
                answer: "",
              }),
            );
            setFile("false");
          }
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
          const queries = { id: newQueryIndex, query: "", answer: answer };

          //
          if (button) {
            if (answer !== "Edit Summary") dispatch(updateButtonSelection({ hasselected: true }));
            dispatch(setprevres({ answer: answer }));
            if (answer === "Looks good") {
              //** Fifth Converstaion **//
              ai_query.user_input = "skip";
              const { data } = await dispatch(
                sendAiAgentQuery({ ...ai_query, sendPitchData: true }),
              ).unwrap();
              if (
                data?.response?.includes("upload the pitch deck") ||
                data?.response?.includes(" upload your pitch deck")
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
              // dispatch(setVSChats({ query: data?.response, answer: answer }));
              //**     **//
            } else if (answer === "Edit Summary") {
              setModalOpen(true);
              return;
            } else if (Step == 3 && answer == "Continue") {
              ai_query.user_input = "skip";
              await dispatch(sendQuery(ai_query)).unwrap();
            } else if (Step == 5 && answer == "Submit") {
              dispatch(resetChats());
              setthread_id(generateKnowIdstring());
              firstRun.current = true;
              setFile("false");
              setFinalMessage(true);
              return;
              // dispatch(
              //   updateChatQuery({
              //     query: `Your report will be ready in 24–48 hours. We’ll email you the download link once it’s complete.`,
              //   }),
              // );

              // dispatch(
              //   setVSChats({
              //     query: "",
              //     answer: "",
              //     options: ["Start another report", "Go Home"],
              //     hasbutton: true,
              //   }),
              // );
            } else await dispatch(sendQuery(ai_query)).unwrap();

            // dispatch(setprevres({answer:answer}));
            // await dispatch(sendQuery(ai_query)).unwrap();
          }
          //
          else {
            dispatch(
              setVSChats({
                query: "",
                answer: answer,
                hasbutton: false,
              }),
            );
            const { data } = await dispatch(
              sendAiAgentQuery({
                ...ai_query,
                sendPitchData: !!Object.keys(dataSources || {}).length,
              }),
            ).unwrap();
            if (
              data?.response?.includes("upload the pitch deck") ||
              data?.response?.includes(" upload your pitch deck")
            ) {
              setUploadStatus(true);
            }
            const { options, remainingText } = processResponse(data.response);
            const json_response = data.json_response;

            if (data.response?.toLowerCase().includes("data source suggestions")) {
              setDataSources(JSON.parse(json_response));
              setSearchParams({ side: "false" });
            } else {
              if (Object.keys(json_response || {}).length) {
                setSearchParams({ side: "false" });
              }
              setJsonResponse(json_response);
            }
            dispatch(
              setVSChats({
                query: remainingText,
                answer: "",

                hasbutton: false,
              }),
            );
            dispatch(
              setVSChats({
                query: "",
                answer: "",
                options: options || [],
                hasbutton: !!options?.length,
              }),
            );
          }
        }
        // dispatch(setVSChats({ query: response?.response, answer: query }));
      } catch (error) {
        console.error("Error fetching API response:", error);
      } finally {
        setQuery(""); // Clear input field
        setIsloading(false);
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

            {chats && chats.length <= 0 ? (
              <div className="flex flex-row justify-between flex-auto">
                <ReportDefault
                  finalMessage={finalMessage}
                  setFinalMessage={() => {
                    setFinalMessage(false);
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
                        <ChatQuery query={chat.query} />

                        {chat.extract && (
                          <ExtractInfo
                            onSendQuery={handleSendQuery}
                            modalOpen={modalOpen}
                            setModalOpen={setModalOpen}
                            info={chat.extract}
                            obj={chat.extractObject}
                          />
                        )}
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
            )}

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
                sendQuery={handleSendQuery}
              />
            </div>
          </div>

          {/* {Step === 4 && SidescreenOptions && SidescreenOptions.length > 0 && <InitialScreening />} */}
          <div>
            {/* <ReportCustomization /> */}
            {dataSources && Object.keys(dataSources) && <SourcesData dataSource={dataSources} />}
            {jsonResponse && Object.keys(jsonResponse).length > 0 && (
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
