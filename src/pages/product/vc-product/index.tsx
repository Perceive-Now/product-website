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
import { generateKnowId, generateKnowIdstring } from "src/utils/helpers";
import ExtractInfo from "src/components/@vc-product/extractInfo";
import { sendQuery, extractFileData } from "src/stores/vs-product";

import {
  setVSChats,
  setprevres,
  setCurrentStep,
  resetChats,
  updateChatQuery,
} from "src/stores/vs-product";
import StepBar from "./stepBar";
const VCReport = () => {
  const dispatch = useAppDispatch();
  // const userId = "tes1234567";
  let thread_id = generateKnowIdstring();
  let companyName = "";
  // const thread_id = "c8d3d805-de26-4545-af52-c43fc68f057e";
  const { Step } = useAppSelector((state) => state.VSProduct);
  const firstRun = useRef(true);
  const userId = jsCookie.get("user_id");
  const { SidescreenOptions } = useAppSelector((state) => state.VSProduct);
  const { DataSources } = useAppSelector((state) => state.VSProduct);
  const { ReportTemplate } = useAppSelector((state) => state.VSProduct);

  // console.log("SidescreenOptions screen index", SidescreenOptions);

  const [query, setQuery] = useState("");
  const [answer, setanswer] = useState<string>("");
  const chatRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsloading] = useState(false);

  const { chats } = useAppSelector((state) => state.VSProduct);
  // console.log("chattsss", chats);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const onSendQuery = useCallback(
    async (query: string, answer: string, file?: File, button?: boolean) => {
      console.log("anserrrrr", answer);
      setIsloading(true);
      const newQueryIndex = generateKnowId();

      try {
        if (answer) {
          console.log("answer");
          if (answer === "Start another report") {
            dispatch(resetChats());
            thread_id = generateKnowIdstring();
            return;
          }

          if (firstRun.current) {

            companyName = answer;
            setanswer("");

            //First Converstaion //
            dispatch(
              setVSChats({
                query: `Let’s create something amazing! 🚀  
I’m here to turn the startup’s info into a powerful, data-driven report just for you.

Hi there! Let’s start with the basics. What’s the name of the startup, and what stage is it in (e.g., Seed, Series A)?

            `,
                answer: "",
              }),
            );

           //** Second Converstaion **//
            dispatch(
              setVSChats({
                query:
                  "Great! Thanks for sharing the startup name. Could you select the current stage of your startup from the options below?",
                answer: companyName,
              }),
            );

            dispatch(
              setVSChats({
                query: "",
                answer: "",
                options: ["Pre Revenue", "Post Revenue"],
                hasbutton: true,
              }),
            );

            //**   **//

            firstRun.current = false;
            return;
          }

          const ai_query = {
            user_input: answer,
            user_id: userId || "",
            thread_id: thread_id,
            button: button,
          };
          const queries = { id: newQueryIndex, query: "", answer: answer };

          if (button) {
            dispatch(setprevres({ answer: answer }));
            if (answer === "Post Revenue" || answer === "Pre Revenue") {
              //** Third Converstaion **//
              dispatch(
                updateChatQuery({
                  query: `Thank you! Since ${companyName} is in the **${answer}** stage, could you specify the current development phase from the options below?`,
                }),
              );
              dispatch(
                setVSChats({
                  query: "",
                  answer: "",
                  options: ["Ideation Stage", "Pre-Seed Stage", "Seed Stage"],
                  hasbutton: true,
                }),
              );

              //**   **//
            } else if (
              answer === "Ideation Stage" ||
              answer === "Pre-Seed Stage" ||
              answer === "Seed Stage"
            ) {
              //** Fourth Converstaion **//
              dispatch(
                updateChatQuery({
                  query: `Thanks! Now, please upload the pitch deck for ${companyName} so I can extract the key details.`,
                }),
              );
              //**     **//
            } else if (answer === "Looks good") {

             //** Fifth Converstaion **//
              dispatch(
                updateChatQuery({
                  query: `Ready to choose your diligence level? I offer two options—quick insights or a deep dive. 
                  You can expand any section for more details if needed.`,
                }),
              );
              dispatch(
                setVSChats({
                  query: "",
                  answer: "",
                  options: ["Quick Insights", "Deep Dive"],
                  hasbutton: true,
                }),
              );
            //**     **//
            } else await dispatch(sendQuery(ai_query)).unwrap();

            // dispatch(setprevres({answer:answer}));
            // await dispatch(sendQuery(ai_query)).unwrap();
          } else {
            dispatch(setVSChats(queries));
            setanswer("");

            const { response } = await dispatch(sendQuery(ai_query)).unwrap();
            console.log("oooo", response);
          }
        } else if (file) {
          const firstQuery = {
            id: newQueryIndex,
            query: "Great! Let me deep dive into the file.",
            answer: file.name,
          };

          dispatch(setVSChats(firstQuery));
          setCurrentStep(1);

          const fileResponse = await dispatch(extractFileData(file)).unwrap();
          console.log("file ress", fileResponse);
          if (fileResponse) {
            // const res = await dispatch(
            //   sendQuery({ user_input: fileResponse, user_id: userId || "", thread_id: thread_id }),
            // ).unwrap();
            dispatch(
              setVSChats({
                query: "",
                answer: "",
                extract:fileResponse
              }),
            );

            if (fileResponse) {
              dispatch(
                setVSChats({
                  query: `I’ve extracted the key details from ${companyName}’s pitch deck. Please review and confirm if everything looks good.`,
                  answer: "",
                }),
              );
              dispatch(
                setVSChats({
                  query: "",
                  answer: "",
                  options: ["Looks good"],
                  hasbutton: true,
                }),
              );
            }
          }
        }
      } catch (error) {
        console.error("Failed to send query", error);
      } finally {
        // setIsloading(false);
        setTimeout(() => setIsloading(false), 500);

      }
    },
    [dispatch, userId],
  );
 console.log("loading...........",isLoading)
  return (
    <>
      <div className="px-3 w-full mx-auto h-full">
        <div className="flex h-full gap-x-5">
          <div className="flex-auto relative flex flex-col gap-2 max-w-[780px] mx-auto h-[90vh]">
            <div className="relative flex-none">
              <div className="absolute left-[-50px] top-2 w-[10px]">
                <StepBar />
              </div>
            </div>

            {chats && chats.length <= 0 ? (
              <div className="flex flex-row justify-between flex-auto">
                <ReportDefault />
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
                          message_id={chat.id || 0}
                          options={chat.options}
                          hasselected={chat.hasselected || ""}
                          hasbutton={chat.hasbutton || false}
                          onSendQuery={onSendQuery}
                        />
                        <ChatQuery query={chat.query} />

                        {chat.extract && (
                          <ExtractInfo onSendQuery={onSendQuery} info={chat.extract} />
                        )}

                        {/* <ExtractInfo 
                        info={"yoo"}
                        onSendQuery={onSendQuery}
                        /> */}
                      </>
                    ))}
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
              <AddQuery
                setanswer={setanswer}
                query={query}
                answer={answer}
                sendQuery={onSendQuery}
              />
            </div>
          </div>

          {Step === 4 && SidescreenOptions && SidescreenOptions.length > 0 && <InitialScreening />}
          {Step == 6 && DataSources && Object.keys(DataSources).length > 0 && <SourcesData />}
          {Step == 7 && ReportTemplate && ReportTemplate.length > 0 && <TemplateReport />}
          {/* <TemplateReport/> */}
          {/* <InitialScreening /> */}
        </div>
      </div>
    </>
  );
};

export default VCReport;
//
