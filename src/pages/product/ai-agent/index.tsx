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
import { generateKnowId, generateKnowIdstring, getRandomErrorMessage } from "src/utils/helpers";
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
import { useNavigate } from "react-router-dom";
import ReportCustomization from "./ReportCustomization";
import axios from "axios";
import AddQueryAgent from "./add-query";
const AiAgent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const userId = "tes1234567";
  let thread_id = generateKnowIdstring();
  // let companyName = "";
  // const thread_id = "c8d3d805-de26-4545-af52-c43fc68f057e";
  const { Step } = useAppSelector((state) => state.VSProduct);
  const firstRun = useRef(true);
  const userId = jsCookie.get("user_id");
  const { SidescreenOptions } = useAppSelector((state) => state.VSProduct);
  const { DataSources } = useAppSelector((state) => state.VSProduct);
  const { ReportTemplate } = useAppSelector((state) => state.VSProduct);

  // console.log("SidescreenOptions screen index", SidescreenOptions);

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
  console.log("chattsss", chats, chatOptions);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    dispatch(resetChats());
    thread_id = generateKnowIdstring();
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

  const handleSendQuery = useCallback(async () => {
    console.log(answer, "answer");
    setIsloading(true);
    try {
      if (attachedFile) {
        const formData = new FormData();

        formData.append("file", attachedFile);
        const res = await axios.post(
          "https://templateuserrequirements.azurewebsites.net/extract-ppt-data",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "application/json",
            },
          },
        );
        setSlideData(res?.data?.slides_data);
        setanswer(res?.data?.slides_data);
      }
      const response = await fetchResponse(answer);
      if (response?.response?.includes("upload the pitch deck")) {
        setUploadStatus(true);
      }
      dispatch(setVSChats({ query: response?.response, answer: answer }));
      // dispatch(setVSChats({ query: response?.response, answer: query }));
    } catch (error) {
      console.error("Error fetching API response:", error);
    } finally {
      setQuery(""); // Clear input field
      setIsloading(false);
    }
  }, [dispatch, query, answer]);

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
            {Step == 4 && DataSources && Object.keys(DataSources).length > 0 && <SourcesData />}
            {Step == 5 && ReportTemplate && Object.keys(ReportTemplate).length > 0 && (
              <TemplateReport />
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
