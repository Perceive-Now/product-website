import React, { useState, useRef, useCallback, useEffect } from "react";
import AddQuery from "src/components/@vc-product/add-query";
import SideScreen from "./sideScreen";
import ReportDefault from "./default";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { LoadingIcon } from "src/components/icons";
import ChatQuery from "src/components/@vc-product/chat-question";
import QueryAnswer from "src/components/@vc-product/query-answer";
import Modal from "src/components/reusable/modal";
import { Switch } from "@headlessui/react";
import {
  setVSChats, 
  updateChatAnswer,
  updateButtonSelection,
  resetChats,
} from "src/stores/vs-product";
import StepBar from "./stepBar";
const VCReport = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [answer, setanswer] = useState<string>("");
  const chatRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [sidescreen, setSideScreen] = useState(false);

  const template = ``;
  const { chats } = useAppSelector((state) => state.VSProduct);

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

  const handleClick = (id: number, value: string) => {
    const ido = id + 1;
    dispatch(updateButtonSelection({ id: id, hasselected: value }));

    if (value === "Start another report") {
      dispatch(resetChats());
      setSideScreen(false);
      return;
    }
    if (id === 6) setSideScreen(true);

    const queries: any = {
      4: {
        query: "What's the company stage?",
        answer:
          "[Idea Stage, Seed Stage, Pre-Seed Stage, Early Stage, Growth Stage, Scaling Stage]",
      },
      5: {
        query: "Please select what describes best your idea stage?",
        answer: "[Concept development, Initial brainstorming, Problem-solving assignment]",
      },
      6: {
        query:
          "Ready to choose your diligence level? I offer two options - quick insight or a deep dive. You can expand any section for more detail if needed.",
        answer: "[Level 1, Level 2]",
      },
      7: {
        query: "Do you want to make any changes?",
        answer: "No, please continue.",
      },
      8: {
        query:
          "I didn’t see much detail about [Startup Name]’s market size. Could you provide some insights?",
        answer: "",
      },
      9: {
        query: "What makes [Startup Name] stand out from its competitors?",
        answer: "",
      },
      10: {
        query:
          "Based on what we’ve gathered so far, here are some sample data sources I’ll tap into for the report. Feel free to add any additional sources you'd like.",
        answer: "",
      },
      11: {
        query: "If everything looks good, please confirm to generate report.",
        answer: "confirm.",
      },
      12: {
        query:
          "Your final report for [Startup Name] will be ready in 48 to 72 hours. We will notify you as soon as it is available.",
        answer: "[Start another report, Learn more]",
      },
    };

    const currentQuery = queries[ido];

    if (currentQuery) {
      const hasButton = !(ido === 8 || ido === 9 || ido === 10);
      dispatch(
        setVSChats({
          id: ido,
          query: currentQuery.query,
          answer: currentQuery.answer,
          hasbutton: hasButton,
        }),
      );
      setQuery(currentQuery.query);
    }
    setanswer("");
  };

  const onSendQuery = useCallback(
    async (query: string, answer: string, file?: File) => {
      console.log("ajaja", query, answer);
      setIsloading(true);
      if (query) {
        if (
          query ===
          "I didn’t see much detail about [Startup Name]’s market size. Could you provide some insights?"
        ) {
          dispatch(updateChatAnswer({ id: 8, answer }));
          handleClick(8, "");
        } else if (query === "What makes [Startup Name] stand out from its competitors?") {
          dispatch(updateChatAnswer({ id: 9, answer }));
          handleClick(9, "");
        } else {
          dispatch(updateChatAnswer({ id: 10, answer }));
          handleClick(10, "");
        }
        setanswer("");
      } else if (file) {
        const initialQuery =
          "Hi there! Let's get started with the diligence process.\nCould you please upload the pitch desk?";
        const answer = file.name;
        const chatId = Date.now();

        dispatch(setVSChats({ id: 1, query: initialQuery, answer: "Loading..." }));

        await new Promise((resolve) => setTimeout(resolve, 1000));

        dispatch(updateChatAnswer({ id: 1, answer }));
        setIsloading(false);

        const followUpQuery = "Great! Let me deep dive into the file.";
        const followUpAnswer = "template";
        const followUpChatId = Date.now() + 1;
        const thirdquestion = "Does everything looks good?";

        setIsloading(true);
        dispatch(setVSChats({ id: 2, query: followUpQuery, answer: "" }));

        await new Promise((resolve) => setTimeout(resolve, 2000));

        dispatch(updateChatAnswer({ id: 2, answer: followUpAnswer }));

        await new Promise((resolve) => setTimeout(resolve, 500));
        dispatch(setVSChats({ id: 3, query: thirdquestion, answer: "[Yes]", hasbutton: true }));

        setIsloading(false);

        // setQuery("");
      }
    },
    [dispatch],
  );

  return (
    <>
      <div className="px-3 w-full mx-auto h-full">
        <div className="flex h-full gap-x-5">
          {/* <div className="w-[10px] mt-2">
            <StepBar />
          </div> */}
          <div className="flex-auto relative flex flex-col gap-2 max-w-[780px] mx-auto">
            {chats && chats.length <= 0 ? (
              <div className="flex flex-row justify-between flex-auto">
                <ReportDefault setQuery={setQuery} query={query} />
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
                        <ChatQuery query={chat.query} />
                        <QueryAnswer
                          ido={`chat-[${idx}]`}
                          query={chat.query}
                          answer={chat.answer}
                          isLoading={isLoading}
                          message_id={chat.id}
                          hasselected={chat.hasselected || ""}
                          hasbutton={chat.hasbutton || false}
                          handleClick={handleClick}
                        />
                        {chat.answer === "template" && (
                          <div className="bg-foundationOrange-100 p-3 rounded-md mt-2 mb-2">
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
                              Edit Extract
                            </div>
                            <div className="font-bold text-sm">Startup Overview:</div>
                            <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
                              <li>
                                <span className="font-bold">Mission Statement:</span> [AI extraxted
                                mission]
                              </li>
                              <li>
                                <span className="font-bold">Vision:</span> [AI extraxted mission]
                              </li>
                              <li>
                                <span className="font-bold">Problem:</span> [AI extraxted mission]
                              </li>
                              <li>
                                <span className="font-bold">Solution:</span> [AI extraxted mission]
                              </li>
                            </ul>
                            <div className="font-bold mt-2 text-sm">Market Insights:</div>
                            <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
                              <li>
                                <span className="font-bold">Target Audience:</span> [AI extraxted
                                mission]
                              </li>
                              <li>
                                <span className="font-bold">Market size and opportunity:</span> [AI
                                extraxted mission]
                              </li>
                              <li>
                                <span className="font-bold">Competetive Landscape:</span> [AI
                                extraxted mission]
                              </li>
                            </ul>
                            <div className="font-bold mt-2 text-sm">Buissness Model:</div>
                            <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
                              <li>
                                <span className="font-bold">Target Audience:</span> [AI extraxted
                                mission]
                              </li>
                              <li>
                                <span className="font-bold">Market size and opportunity:</span> [AI
                                extraxted mission]
                              </li>
                              <li>
                                <span className="font-bold">Competetive Landscape:</span> [AI
                                extraxted mission]
                              </li>
                            </ul>
                            <div className="font-bold mt-2 text-sm">Financial Overview:</div>
                            <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
                              <li>
                                <span className="font-bold">Target Audience:</span> [AI extraxted
                                mission]
                              </li>
                              <li>
                                <span className="font-bold">Market size and opportunity:</span> [AI
                                extraxted mission]
                              </li>
                              <li>
                                <span className="font-bold">Competetive Landscape:</span> [AI
                                extraxted mission]
                              </li>
                            </ul>
                            <div className="font-bold mt-2 text-sm">Team:</div>
                            <ul className="list-disc list-inside text-sm flex flex-col gap-[4px]">
                              <li>
                                <span className="font-bold">Target Audience:</span> [AI extraxted
                                mission]
                              </li>
                              <li>
                                <span className="font-bold">Market size and opportunity:</span> [AI
                                extraxted mission]
                              </li>
                              <li>
                                <span className="font-bold">Competetive Landscape:</span> [AI
                                extraxted mission]
                              </li>
                            </ul>
                          </div>
                        )}
                      </>
                    ))}
                  </div>
                </div>
              </div>
            )}

        <div className="flex items-center justify-center mt-auto">
          <AddQuery setanswer={setanswer} query={query} answer={answer} sendQuery={onSendQuery} />
        </div>

          </div>

          {sidescreen && (
            <SideScreen />          
          )}
        </div>
        

       
        <Modal open={modalOpen} handleOnClose={handleModalClose}>
  <div className="bg-foundationOrange-100 p-4 border border-secondary-500 mx-auto rounded-lg">
    <div className="font-bold text-md text-end">
      <Switch
        checked={true}
        onChange={() => {
          setModalOpen(false);
        }}
        className={`bg-blue-600 relative inline-flex items-center h-2 rounded-full w-4 mr-1`}
      >
        <span
          className={`translate-x-2 inline-block w-2 h-2 transform bg-white rounded-full`}
        />
      </Switch>
      Edit Extract
    </div>

    <div className="font-bold mt-2 text-start">Startup Overview:</div>
    <ul className="list-disc list-inside w-full">
      {['Mission Statement', 'Vision', 'Problem'].map((item, index) => (
        <li key={index} className="flex justify-between items-center mt-1">
          <span className="font-bold text-start">{item}:</span>
          <input
            type="text"
            defaultValue={`[AI extracted ${item.toLowerCase().replace(" ", "_")}]`}
            className="w-[70%] ml-2 p-1 bg-foundationOrange-100 border border-gray-300 rounded"
          />
        </li>
      ))}
    </ul>

    <div className="font-bold mt-4 text-start">Market Insights:</div>
    <ul className="list-disc list-inside w-full">
      {['Target Audience', 'Market size and opportunity', 'Competitive Landscape'].map((item, index) => (
        <li key={index} className="flex justify-between items-center mt-1">
          <span className="font-bold text-start">{item}:</span>
          <input
            type="text"
            defaultValue={`[AI extracted ${item.toLowerCase().replace(/ /g, "_")}]`}
            className="w-[70%] ml-2 p-1 bg-foundationOrange-100 border border-gray-300 rounded"
          />
        </li>
      ))}
    </ul>

    <div className="font-bold mt-4 text-start">Business Model:</div>
    <ul className="list-disc list-inside w-full">
      {['Business Strategy', 'Revenue Streams', 'Cost Structure'].map((item, index) => (
        <li key={index} className="flex justify-between items-center mt-1">
          <span className="font-bold text-start">{item}:</span>
          <input
            type="text"
            defaultValue={`[AI extracted ${item.toLowerCase().replace(" ", "_")}]`}
            className="w-[70%] ml-2 p-1 bg-foundationOrange-100 border border-gray-300 rounded"
          />
        </li>
      ))}
    </ul>

    <button className="mt-4 bg-secondary-500 text-white p-2 rounded-full pr-5 pl-5">
      Submit
    </button>
  </div>
</Modal>

      </div>
    </>
  );
};

export default VCReport;
