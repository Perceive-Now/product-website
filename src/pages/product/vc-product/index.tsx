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
  setCompanyName,
  updateButtonSelection,
} from "src/stores/vs-product";
import StepBar from "./stepBar";
import { useNavigate } from "react-router-dom";
const VCReport = () => {
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
  const [answer, setanswer] = useState<string>("");
  const [isfile, setFile] = useState<string>("");
  const chatRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsloading] = useState(false);
  const [delayLoading, setDelayLoading] = useState(false);

  const { chats } = useAppSelector((state) => state.VSProduct);
  let { companyName } = useAppSelector((state) => state.VSProduct);
  const chatOptions = chats[chats.length - 1]?.options;
  console.log("chattsss", chats, chatOptions);

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
        if (answer && !file) {
          console.log("answer");

          if (answer === "Go Home") {
            dispatch(resetChats());
            thread_id = generateKnowIdstring();
            firstRun.current = true;
            setFile("false");
            navigate("/", {
              replace: true
            });
            return;
          }

          if (answer === "Start another report") {
            dispatch(resetChats());
            thread_id = generateKnowIdstring();
            firstRun.current = true;
            setFile("false");
            return;
          }

          if (firstRun.current) {
            companyName = answer;
            dispatch(setCompanyName(companyName));
            setanswer("");

            //First Converstaion //
            setTimeout(() => {
              setDelayLoading(true);
              dispatch(
                setVSChats({
                  query: `Let’s create something amazing! 🚀  
I’m here to turn the startup’s info into a powerful, data-driven report just for you.`,
                  answer: "",
                }),
              );
            }, 500);

            setTimeout(() => {
              //** Second Converstaion **//
              dispatch(
                setVSChats({
                  query:
                    "Great! Thanks for sharing the startup name. Could you select the current stage of your startup from the options below?",
                  answer: companyName,
                }),
              );
            }, 2500);

            setTimeout(() => {
              dispatch(
                setVSChats({
                  query: "",
                  answer: "",
                  options: ["Pre Revenue", "Post Revenue"],
                  hasbutton: true,
                }),
              );
              setDelayLoading(false);
            }, 3500);

            //**   **//

            firstRun.current = false;
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

          if (button) {
            dispatch(updateButtonSelection({ hasselected: true }));
            dispatch(setprevres({ answer: answer }));
            if (answer === "Looks good") {
              //** Fifth Converstaion **//
              setIsloading(false);
              setDelayLoading(true);
              setTimeout(() => {
                dispatch(
                  updateChatQuery({
                    query: `Ready to choose your diligence level? I offer two options— first look or a deep dive. 
                  You can expand any section for more details if needed.`,
                  }),
                );
              }, 1500);
              setTimeout(() => {
                dispatch(
                  setVSChats({
                    query: "",
                    answer: "",
                    options: ["First Look", "Deep Dive"],
                    hasbutton: true,
                  }),
                );
                setDelayLoading(false);
              }, 2500);
              //**     **//
            } else if (Step == 3 && answer == "Continue") {
              ai_query.user_input = "skip";
              await dispatch(sendQuery(ai_query)).unwrap();
            } else if (Step == 5 && answer == "Confirm") {
              dispatch(
                updateChatQuery({
                  query: `Your report will be ready in 24–48 hours. We’ll email you the download link once it’s complete.`,
                }),
              );
              
              dispatch(
                setVSChats({
                  query: "",
                  answer: "",
                  options: ["Start another report", "Go Home"],
                  hasbutton: true,
                }),
              );
            } else await dispatch(sendQuery(ai_query)).unwrap();

            // dispatch(setprevres({answer:answer}));
            // await dispatch(sendQuery(ai_query)).unwrap();
          } else {
            setanswer("");
            console.log("yoooo", chats.length);
            dispatch(updateButtonSelection({ hasselected: true }));
            dispatch(setVSChats(queries));
            if (isfile === "false") {
              dispatch(
                setVSChats({
                  query: `Thanks! Now, please upload the pitch deck for ${companyName} so I can extract the key details.`,
                }),
              );
              return;
            }

            if (chatOptions?.includes("Post Revenue")) {
              //** Third Converstaion **//

              const optionsMap: any = {
                "pre revenue": ["Ideation Stage", "Pre-Seed Stage"],
                "post revenue": ["Seed Stage", "Series A Stage", "Series B+ Stage"],
              };

              if (["pre revenue", "post revenue"].includes(queries.answer.trim().toLowerCase())) {
                setcompanyStage(queries.answer);
                setIsloading(false);
                setDelayLoading(true);
                setTimeout(() => {
                  dispatch(
                    updateChatQuery({
                      query: `Thank you! Since ${companyName} is in the **${queries.answer.trim()}** stage, could you specify the current development phase from the options below?`,
                    }),
                  );
                }, 1500);
                setTimeout(() => {
                  dispatch(
                    setVSChats({
                      query: "",
                      answer: "",
                      options: optionsMap[answer.trim().toLowerCase()],
                      hasbutton: true,
                    }),
                  );
                  setDelayLoading(false);
                }, 2500);
              } else {
                dispatch(
                  setVSChats({
                    query:
                      "**Oops!** It looks like you've entered a wrong input. Please choose one of the available options and try again.",
                    answer: "",
                  }),
                );

                // dispatch(
                //   setVSChats({
                //     query:
                //       "Great! Thanks for sharing the startup name. Could you select the current stage of your startup from the options below?",
                //     answer: "",
                //   }),
                // );

                dispatch(
                  setVSChats({
                    query: "",
                    answer: "",
                    options: ["Pre Revenue", "Post Revenue"],
                    hasbutton: true,
                  }),
                );
              }

              //**   **//
            } else if (chatOptions?.includes("Seed Stage") || chatOptions?.includes("Pre-Seed Stage")) {
              //** Fourth Converstaion **//

              if (
                ["pre-seed stage", "seed stage", "ideation stage","series a stage", "series b+ stage"].includes(
                  queries.answer.trim().toLowerCase(),
                )
              ) {
                setIsloading(false);
                setDelayLoading(true);
                setTimeout(() => {
                  dispatch(
                    updateChatQuery({
                      query: `Thanks! Now, please upload the pitch deck for ${companyName} so I can extract the key details.`,
                    }),
                  );
                  setDelayLoading(false);
                }, 1500);
                setFile("false");
              } else {
                const optionsMap: any = {
                  "pre revenue": ["Ideation Stage", "Pre-Seed Stage"],
                  "post revenue": ["Seed Stage", "Series A Stage", "Series B+ Stage"],
                };

                dispatch(
                  setVSChats({
                    query:
                      "**Oops!** It looks like you've entered a wrong input. Please choose one of the available options and try again.",
                    answer: "",
                  }),
                );

                dispatch(
                  setVSChats({
                    query: "",
                    answer: "",
                    options: optionsMap[companyStage.trim().toLowerCase()],
                    hasbutton: true,
                  }),
                );
              }

              //**     **//
            } else if (chatOptions?.includes("Looks good")) {
              //** Fifth Converstaion **//
              if (["proceed", "looks good"].includes(queries.answer.trim().toLowerCase())) {
                dispatch(
                  updateChatQuery({
                    query: `Ready to choose your diligence level? I offer two options— first look or a deep dive. 
                  You can expand any section for more details if needed.`,
                  }),
                );
                dispatch(
                  setVSChats({
                    query: "",
                    answer: "",
                    options: ["First Look", "Deep Dive"],
                    hasbutton: true,
                  }),
                );
              } else {
                dispatch(
                  setVSChats({
                    query:
                      "**Oops!** It looks like you've entered a wrong input. Please choose one of the available options and try again.",
                    answer: "",
                  }),
                );

                // dispatch(
                //   setVSChats({
                //     query: `I’ve extracted the key details from ${companyName}’s pitch deck. Please review and confirm if everything looks good.`,
                //     answer: "",
                //   }),
                // );
                dispatch(
                  setVSChats({
                    query: "",
                    answer: "",
                    options: ["Looks good"],
                    hasbutton: true,
                  }),
                );
              }
              //**     **//
            } else if (chatOptions?.includes("Deep Dive")) {
              if (["deep dive", "first look"].includes(queries.answer.trim().toLowerCase())) {
                setIsloading(false);
                setDelayLoading(true);
                setTimeout(() => {
                  dispatch(setCurrentStep(3));
                  dispatch(
                    updateChatQuery({
                      query: `The ${answer} option has been selected for the report. It will have the sections to the right. Please modify if necessary by scrolling to the bottom of the list.`,
                    }),
                  );
                }, 1500);
                setTimeout(() => {
                  dispatch(
                    setVSChats({
                      query: "",
                      answer: "",
                      options: ["Continue"],
                      hasbutton: true,
                    }),
                  );
                  setDelayLoading(false);
                }, 2500);
              } else {
                dispatch(
                  setVSChats({
                    query:
                      "**Oops!** It looks like you've entered a wrong input. Please choose one of the available options and try again.",
                    answer: "",
                  }),
                );

                // dispatch(
                //   setVSChats({
                //     query: `Ready to choose your diligence level? I offer two options—quick insights or a deep dive.
                //     You can expand any section for more details if needed.`,
                //   }),
                // );
                dispatch(
                  setVSChats({
                    query: "",
                    answer: "",
                    options: ["First Look", "Deep Dive"],
                    hasbutton: true,
                  }),
                );
              }
            } else if (chatOptions?.includes("Continue") && Step == 3) {
              if (["continue", "proceed"].includes(queries.answer.trim().toLowerCase())) {
                ai_query.user_input = "how many question we want to answer";
                await dispatch(sendQuery(ai_query)).unwrap();
              } else {
                dispatch(
                  updateChatQuery({
                    query: `Please continue to proceed`,
                  }),
                );

                dispatch(
                  setVSChats({
                    query: "",
                    answer: "",
                    options: ["Continue"],
                    hasbutton: true,
                  }),
                );
              }
            } else {
              const { response } = await dispatch(sendQuery(ai_query)).unwrap();
              console.log("oooo", response);
            }

            // dispatch(setVSChats(queries));
            // setanswer("");

            // const { response } = await dispatch(sendQuery(ai_query)).unwrap();
            // console.log("oooo", response);
          }
        } else if (file) {
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
        }
      } catch (error) {
        console.error("Failed to send query", error);
      } finally {
        // setIsloading(false);
        setTimeout(() => setIsloading(false), 500);
      }
    },
    [dispatch, userId, chats],
  );
  return (
    <>
      <div className="px-0 md:px-3 w-full mx-auto h-full">
        <div className="flex flex-col gap-y-3 lg:flex-row lg:gap-y-0 gap-x-5 lg:gap-x-2">
          <div className="flex-auto relative flex flex-col gap-2 max-w-[780px] mx-auto h-[100vh]">
            <div className="relative flex-none">
              <div className="absolute left-[-25px] md:left-[-40px] lg:left-[-45px] top-2 w-[10px]">
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
                          setanswer={setanswer}
                          message_id={chat.id || 0}
                          options={chat.options}
                          hasselected={chat.hasselected || false}
                          hasbutton={chat.hasbutton || false}
                          onSendQuery={onSendQuery}
                        />
                        <ChatQuery query={chat.query} />

                        {chat.extract && (
                          <ExtractInfo
                            onSendQuery={onSendQuery}
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
              <AddQuery
                setanswer={setanswer}
                query={query}
                answer={answer}
                sendQuery={onSendQuery}
              />
            </div>
          </div>

          {/* {Step === 4 && SidescreenOptions && SidescreenOptions.length > 0 && <InitialScreening />} */}
          {Step == 4 && DataSources && Object.keys(DataSources).length > 0 && <SourcesData />}
          {/* {Step == 6 && ReportTemplate && ReportTemplate.length > 0 && <TemplateReport />} */}
          {Step == 3 && <InitialScreening />}
          {Step == 5 && <TemplateReport />}
        </div>
      </div>
    </>
  );
};

export default VCReport;
//
