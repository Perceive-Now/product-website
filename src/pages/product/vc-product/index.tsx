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
  setprevres,
  setCurrentStep,
} from "src/stores/vs-product";
import StepBar from "./stepBar";
const VCReport = () => {
  const dispatch = useAppDispatch();
  // const userId = "testing1234";
  const userId = jsCookie.get("user_id");
  const { SidescreenOptions } = useAppSelector((state) => state.VSProduct);
  console.log("SidescreenOptions screen index",SidescreenOptions);

  const [query, setQuery] = useState("");
  const [answer, setanswer] = useState<string>("");
  const chatRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsloading] = useState(false);

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


  const onSendQuery = useCallback(
    async (query: string, answer: string, file?: File, button?: boolean) => {
      console.log("anserrrrr", answer);
      setIsloading(true);
      const newQueryIndex = generateKnowId();

      try {
        if (answer) {
        

          const ai_query = { user_input: answer, user_id: userId || "" ,button:button};
          const queries = { id: newQueryIndex, query: "", answer: answer };

          if (button) {
            dispatch(setprevres({answer:answer}));
            await dispatch(sendQuery(ai_query)).unwrap();
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

                        {chat.extract && 
                        <ExtractInfo 
                        onSendQuery={onSendQuery}
                        info={chat.extract} />
                         }

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
                setQuery={setQuery}
                query={query}
                answer={answer}
                sendQuery={onSendQuery}
              />
            </div>
          </div>

          {SidescreenOptions && SidescreenOptions.length > 0 && <InitialScreening />}
          {/* <InitialScreening /> */}
          {/* {Step === 5 && <DataSources />} */}

          {/* <InitialScreening /> */}
          {/* <DataSources/> */}
        </div>
      </div>
    </>
  );
};

export default VCReport;
