import React, { useState, useRef, useCallback, useEffect } from "react";
import AddQuery from "src/components/@vc-product/add-query";
import InitialScreening from "./InitialScreening";
import DataSources from "./DataSources";
import ReportDefault from "./default";
import jsCookie from "js-cookie";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { LoadingIcon } from "src/components/icons";
import ChatQuery from "src/components/@vc-product/chat-question";
import QueryAnswer from "src/components/@vc-product/query-answer";
import Modal from "src/components/reusable/modal";
import { Switch } from "@headlessui/react";
import debounce from "lodash.debounce";
import { AppConfig } from "src/config/app.config";
import DotLoader from "src/components/reusable/dot-loader";
import { generateKnowId } from "src/utils/helpers";
import ExtractInfo from "src/components/@vc-product/extractInfo";
import { sendQuery, extractFileData } from "src/stores/vs-product";

import {
  setVSChats,
  updateChatAnswer,
  updateChatQuery,
  updateButtonSelection,
  updateButtonResponse,
  resetChats,
  setprevres,
  setCurrentStep,
} from "src/stores/vs-product";
import StepBar from "./stepBar";
const VCReport = () => {
  const dispatch = useAppDispatch();
  const userId = jsCookie.get("user_id");
  const { Step } = useAppSelector((state) => state.VSProduct);

  const [query, setQuery] = useState("");
  const [answer, setanswer] = useState<string>("");
  const chatRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [sidescreen, setSideScreen] = useState(false);

  const template = ``;
  const { chats } = useAppSelector((state) => state.VSProduct);
  console.log("chattsss", chats);
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

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const sortedChats = [
    {
      query:
        "Hi there! Let's get started with the diligence process.\nCould you please upload the pitch desk?",
      answer: "xyz.ptx",
    },
  ];

  // const onSendQuery = useCallback(
  //   async (query: string, answer: string, file?: File) => {
  //     setIsloading(true);
  //     const newQueryIndex = generateKnowId();

  //     if (query && !file) {
  //       const queries = {
  //         id: newQueryIndex,
  //         query: query,
  //         answer: "",
  //       };
  //       const ai_query = {
  //         user_input: query,
  //         user_id:userId
  //       };

  //       dispatch(setVSChats(queries));
  //       setQuery("");

  //       try {
  //         const response: any = await fetch(
  //           `https://templateuserrequirements.azurewebsites.net/interact_openai/`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(ai_query),
  //           },
  //         );
  // const reader = response.body.getReader();
  // const decoder = new TextDecoder();

  //         // const debouncedUpdate = debounce((newAnswer) => {
  //         //   console.log("ajooo",chats.length);
  //         //   dispatch(
  //         //     updateChatAnswer({
  //         //       index: chats.length,
  //         //       answer: newAnswer,
  //         //     }),
  //         //   );
  //         // });

  // const { value } = await reader.read();
  // if (value) {
  //   const chunk = decoder.decode(value);

  //   const answer = JSON.parse(chunk);
  //   const newanswer = JSON.parse(answer);

  //           console.log("Response:", newanswer.response);
  //           dispatch(
  //             updateChatAnswer({
  //               index: newQueryIndex,
  //               answer: newanswer.response,
  //             }),
  //           );

  //           const stepValue = parseInt(newanswer.Step);
  //           if (!isNaN(stepValue) && Number.isInteger(stepValue) && stepValue >= 0) {
  //             dispatch(setCurrentStep(stepValue));
  //           }
  //           // debouncedUpdate(newanswer.response);
  //         }
  //         setIsloading(false);
  //       } catch (error) {
  //         console.error("Failed to send query", error);
  //         setIsloading(false);
  //         return;
  //       }
  //     } else if (file) {
  //       const formData = new FormData();
  //       formData.append("file", file);

  //       const extractIndex = generateKnowId();

  //       const firstquery = {
  //         id: newQueryIndex,
  //         query:
  //           "Hi there! Let's get started with the diligence process.\nCould you please upload the pitch desk?",
  //         answer: file.name,
  //       };

  //       dispatch(setVSChats(firstquery));

  //       const secondquery = {
  //         id: extractIndex,
  //         query: "Great! Let me deep dive into the file.",
  //         answer: "",
  //       };

  //       dispatch(setVSChats(secondquery));

  //       const createPitchDeckSummary = (slides: { slide: number; text: string[] }[]): string => {
  //         const summary = slides
  //           .flatMap(slide => slide.text.map(text => text.replace(/\n/g, ' ')))
  //           .join(" ");

  //         return `Here is my pitch deck: ${summary}`;
  //       };

  //       try {
  //         const response: any = await fetch(
  //           "https://templateuserrequirements.azurewebsites.net/extract-ppt-data",
  //           {
  //             method: "POST",
  //             headers: {
  //               Accept: "application/json",
  //             },
  //             body: formData,
  //           },
  //         );
  //         const reader = response.body.getReader();
  //         const decoder = new TextDecoder();

  //         // const debouncedUpdate = debounce((newAnswer) => {
  //         //   dispatch(
  //         //     updateChatAnswer({
  //         //       index: newQueryIndex,
  //         //       answer: newAnswer,
  //         //     }),
  //         //   );
  //         // }, 100);

  //         const { value } = await reader.read();
  //         if (value) {
  //           const chunk = decoder.decode(value);
  //           const answer = JSON.parse(chunk);
  //           console.log("ooo", typeof answer);
  //           if (answer.message === "Text extracted successfully") {

  //             const summary = createPitchDeckSummary(answer.slides_data)
  //             if(summary){
  //               const response: any = await fetch(
  //                 `https://templateuserrequirements.azurewebsites.net/interact_openai/`,
  //                 {
  //                   method: "POST",
  //                   headers: {
  //                     "Content-Type": "application/json",
  //                   },
  //                   body: JSON.stringify({user_id:userId,user_input:summary}),
  //                 },
  //               );
  //               const reader = response.body.getReader();
  //               const decoder = new TextDecoder();
  //               if (value) {
  //                 const chunk = decoder.decode(value);
  //                 const answer = JSON.parse(chunk);
  //                 if(answer.response){
  //                dispatch(
  //               updateChatAnswer({
  //                 index: extractIndex,
  //                 answer: "",
  //                 extract: answer.response,
  //               }),
  //             );
  //                 }
  //               }
  //             }

  //             // debouncedUpdate(answer.response);
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Failed to send query", error);
  //         setIsloading(false);
  //         return;
  //       }
  //     }

  //   },
  //   [dispatch],
  // );

  const onSendQuery = useCallback(
    async (query: string, answer: string, file?: File, button?: boolean) => {
      console.log("anserrrrr", answer);
      setIsloading(true);
      const newQueryIndex = generateKnowId();
      const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const length = Math.floor(Math.random() * 2) + 4; // Random length of 4 or 5
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      }; 

      try {
        if (answer) {
        

          const ai_query = { user_input: answer, user_id: generateRandomString() ,button:button};
          const queries = { id: newQueryIndex, query: "", answer: answer };

          if (button) {
            dispatch(setprevres({answer:answer}));
            const { response, Step } = await dispatch(sendQuery(ai_query)).unwrap();
            // if (Step !== 3)
              // await dispatch(updateButtonResponse({ answer: answer, query: response }));
          } else {
            dispatch(setVSChats(queries));
            // setQuery("");
            // await dispatch(updateChatAnswer({answer:answer}))
            setanswer("");

            // Dispatch the thunk for sending the query
            const { response } = await dispatch(sendQuery(ai_query)).unwrap();
            //  if (!response.includes("@"))      {
            // await dispatch(updateChatQuery({ query: response }));

            // }
            //           else{
            //             await dispatch(updateChatAnswer({answer:response}))
            // //both cond are same
            //           }
            console.log("oooo", response);
          }
        } else if (file) {
          const extractIndex = generateKnowId();

          // const firstQuery = {
          //   id: newQueryIndex,
          //   query:
          //     "Hi there! Let's get started with the diligence process.\nCould you please upload the pitch desk?",
          //   answer: file.name,
          // };
          const firstQuery = {
            id: newQueryIndex,
            query: "Great! Let me deep dive into the file.",
            answer: file.name,
          };

          dispatch(setVSChats(firstQuery));
          setCurrentStep(1);

          // const secondQuery = {
          //   id: extractIndex,
          //   query: "Great! Let me deep dive into the file.",
          //   answer: "",
          // };
          // dispatch(setVSChats(secondQuery));
          const fileResponse = await dispatch(extractFileData(file)).unwrap();
          console.log("file ress", fileResponse);
          if (fileResponse) {
            const res = await dispatch(
              sendQuery({ user_input: fileResponse, user_id: userId || "" }),
            ).unwrap();
            if (res) {
              dispatch(
                setVSChats({
                  id: newQueryIndex + 1,
                  query: "",
                  answer: "",
                  options: ["Confirm"],
                  hasbutton: true,
                }),
              );
            }
          }
        }
      } catch (error) {
        console.error("Failed to send query", error);
      } finally {
        setIsloading(false);
      }
    },
    [dispatch, userId],
  );

  return (
    <>
      <div className="px-3 w-full mx-auto h-full">
        <div className="flex h-full gap-x-5">
          <div className="flex-auto relative flex flex-col gap-2 max-w-[780px] mx-auto">
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

                        {chat.extract && 
                        <ExtractInfo 
                        info={chat.extract} />}
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
                setQuery={setQuery}
                query={query}
                answer={answer}
                sendQuery={onSendQuery}
              />
            </div>
          </div>

          {Step === 4 && <InitialScreening />}
          {/* {Step === 5 && <DataSources />} */}

          {/* <InitialScreening /> */}
          {/* <DataSources/> */}
        </div>
      </div>
    </>
  );
};

export default VCReport;
