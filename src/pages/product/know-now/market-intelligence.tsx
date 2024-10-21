import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import jsCookie from "js-cookie";
import debounce from "lodash.debounce";
import ArrowDown from "src/components/icons/miscs/ArrowDown";
//
import AddQuery from "../../../components/@know-now/add-query";

//
import QueryAnswer from "../../../components/@know-now/query-answer";
import ChatQuery from "../../../components/@know-now/chat-question";

//
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import {
  addQuestion,
  editQueryAndUpdateAnswer,
  generateNewId,
  getMarketChatById,
  getMarketThread,
  saveMarketChat,
  setChatMarketIds,
  updateChatAnswer,
  updateChatError,
  saveKeywordsChat,
  updateMarketThread,
} from "../../../stores/knownow-market";

//
import KnowNowdefault from "./default";
import { AppConfig } from "src/config/app.config";
import { generateKnowId } from "src/utils/helpers";

//
import { LoadingIcon } from "src/components/icons";
import KnowNowRightSideBar from "./side-bar";
// const socket = io('https://percievenowchat2.azurewebsites.net/ws/chat'); // Replace with your WebSocket server URL

/**
 *
 */

function MarketIntelligenceKnowNow() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { question } = location.state || { question: "" };
  //
  const [searchParams] = useSearchParams();
  const queryStatus = searchParams.get("status");

  //
  const chatRef = useRef<HTMLInputElement>(null);
  const userId = jsCookie.get("user_id");
  const { chats } = useAppSelector((state) => state.KnownowMarket);
  //
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [chatIndex, setChatIndex] = useState<number | null>(null);

  const [isSaved, setIsSaved] = useState(false);
  const [query, setQuery] = useState("");

  const [showArrow, setShowArrow] = useState(true);

  //
  useEffect(() => {
    if (question) {
      setQuery(question);
    }
  }, [question]);
  //
  useEffect(() => {
    if (queryStatus) {
      setIsSaved(true);
    }
  }, [id, location, navigate, queryStatus]);

  //
  useEffect(() => {
    if (
      (id && isSaved) ||
      location.pathname === "/know-now/market-intelligence" ||
      location.pathname === "/know-now/ip-analysis"
    ) {
      dispatch(getMarketThread(userId || ""));
    }
    //
    if (id && isSaved) {
      dispatch(
        getMarketChatById({
          user_id: userId || "",
          thread_id: Number(id) || 0,
        }),
      )
        .unwrap()
        .then((res) => {
          if (!res.success) {
            toast.error("Unable to fetch Conversations");
            navigate("/start-conversation");
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
          navigate("/start-conversation");
        });
      setIsSaved(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, userId, isSaved, location]);

  //
  const onSendQuery = useCallback(
    async (updateQuery: string, editIndex: number | null) => {
      setIsloading(true);
      setLoadingIndex(editIndex !== null ? editIndex : chats.length);
      setChatIndex(editIndex !== null ? editIndex : chats.length);

      //

      // const conversationId = id !== undefined ? id : generateKnowId();
      const conversationId = id !== undefined && !Number.isNaN(id) ? Number(id) : generateKnowId();
      console.log("conversationId", conversationId);
      const messageId = generateKnowId();

      //
      if (id === undefined) {
        dispatch(generateNewId({ id: conversationId }));
        dispatch(
          setChatMarketIds({
            title: "New chat",
            thread_id: conversationId,
            favorite: false,
          }),
        );
        navigate(`/know-now/market-intelligence/${conversationId}`);
      }

      //
      const queries = {
        query: query || updateQuery,
        thread_id: conversationId,
        user_id: userId,
      };

      //
      if (editIndex !== null) {
        dispatch(
          editQueryAndUpdateAnswer({ index: editIndex, newQuery: updateQuery, newAnswer: "" }),
        );
      } else {
        dispatch(addQuestion(query));
      }

      setQuery("");

      // ----------------------------------------------------------------------------

      try {
        const response: any = await fetch(`${AppConfig.KNOW_NOW_MARKET_API}/ask-question`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": "secret-token",
            "x-user-id": "user123",
          },
          body: JSON.stringify(queries),
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let answer = "";
        let keywords: string[] = [];
        let title: string[] = [];
        const chunks = [];
        let citationsFound = false;

        // Debounce function to limit UI updates
        const debouncedUpdate = debounce((newAnswer) => {
          if (editIndex !== null) {
            dispatch(
              editQueryAndUpdateAnswer({
                index: editIndex,
                newQuery: updateQuery,
                newAnswer: newAnswer,
              }),
            );
          } else {
            dispatch(
              updateChatAnswer({
                index: chats.length,
                answer: newAnswer,
              }),
            );
          }
        });

        // Stream
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (value) {
            setLoadingIndex(null);
            const chunk = decoder.decode(value);
            console.log("chunk",chunk);
          
            // if (!citationsFound) {
              const titleMatch = chunk.match(/title:\[(.*?)\]/);
              if (titleMatch) {
                citationsFound = true;
                title = titleMatch[1].split(",").map((title) => title.trim().replace(/'/g, ""));
                console.log("titleeeee", title);
              }

              const keywordMatch = chunk.match(/keywords:\[(.*?)\]/);
              if (keywordMatch) {
                keywords = keywordMatch[1]
                  .split(",")
                  .map((keyword) => keyword.trim().replace(/'/g, ""));
              }

            //   const citationMatch = chunk.match(/Citations:\[(.*?)\]/);
            //   if (citationMatch) {
            //     citationsFound = true;
            //   }
            // } else {
              // answer += chunk;
              // chunks.push(chunk);
              if(!citationsFound){
              for (let i = 0; i < chunk.length; i += 10) {
                const segment = chunk.slice(i, i + 10); 
                answer += segment;
                debouncedUpdate(answer);
                await new Promise((resolve) => setTimeout(resolve, 1)); 
              }
            }
            // }

            // if (citationsFound) {
            //   const combinedAnswer =
            //     answer + chunks.join("") ;
            //   debouncedUpdate(combinedAnswer);
            // }
          }

          // answer += chunk;
          // chunks.push(chunk);

          // const combinedAnswer = chunks.join("") ;
          // // + ` <span class="stream-loader"></span>`;
          // debouncedUpdate(combinedAnswer);
        }

        // }
        //debouncedUpdate(answer);
       

        dispatch(saveKeywordsChat(keywords));
        await dispatch(
          updateMarketThread({
            thread_id: conversationId,
            user_id: userId,
            title: title[0],
            favorite: false,
          }),
        );
        await dispatch(
          saveMarketChat({
            thread_id: conversationId,
            user_id: userId || "",
            // conversation_data: {
            // conversation_id: messageId,
            question: queries.query,
            // ai_content: answer,
            like_ai: 0,
            // keywords:keywords
            // }
          }),
        )
          .unwrap()
          .then(() => {
            // setIsSaved(true);
            // toast.success("Saved successfully")
          })
          .catch(() => {
            toast.error("Unable to save");
          });

        // console.log('Stream ended');

        setIsloading(false);
        setLoadingIndex(null);
        setChatIndex(null);
        navigate(`/know-now/market-intelligence/${conversationId}?status=true`);

        // const answer = "res.data";
      } catch (error: any) {
        // const errorMsg = error.response.statusText;
        setIsloading(false);
        setLoadingIndex(null);

        const errorAnswer = "Error while generating the response";

        toast.error("Something went wrong");
        if (editIndex !== null) {
          dispatch(
            editQueryAndUpdateAnswer({
              index: editIndex,
              newQuery: updateQuery,
              newAnswer: errorAnswer,
            }),
          );
        } else {
          dispatch(updateChatError({ index: chats.length, answer: errorAnswer }));
        }
        navigate(`/know-now/ip-analysis/${conversationId}?status=true`);
      } finally {
        setLoadingIndex(null);
      }
    },
    [chats.length, dispatch, id, navigate, query, userId],
  );

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
      setShowArrow(false);
    }
  };


  const scrollToItem = (ido: string) => {
    const element = document.getElementById(ido);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  

  useEffect(() => {
    const handleScroll = () => {
      if (!chatRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
      setShowArrow(scrollHeight - scrollTop > clientHeight);
    };

    const chatElement: any = chatRef.current;
    chatElement.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      chatElement.removeEventListener("scroll", handleScroll);
    };
  }, [chats]);

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  console.log("chatss",chats);
  const sortedChats = (chats || []).slice().sort((a, b) => {
    const dateA: any = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateA - dateB;
  });

  return (
    <div className="h-[calc(100vh-160px)] px-3 pt-0 pb-0 w-full mx-auto flex">
      <div className="flex-1 h-full">
        <div className="relative h-full">
          <div
            ref={chatRef}
            className="h-[calc(100vh-260px)] overflow-y-auto pn_scroller pb-2 pr-2 w-full"
          >
            {sortedChats && sortedChats.length <= 0 && id ? (
              <div className="flex justify-center items-center h-full">
                <LoadingIcon className="h-5 w-5 text-primary-900" />
              </div>
            ) : (
              <>
                {id === undefined ? (
                  <KnowNowdefault setQuery={setQuery} question={query} />
                ) : (
                  <div className="space-y-6 w-full">
                    {((sortedChats && sortedChats) || []).map((chat, idx) => (
                      <div key={idx * 5} className="space-y-3">
                        <ChatQuery
                          query={chat.query}
                          updateQuery={onSendQuery}
                          editIndex={idx}
                          setQuery={setQuery}
                          isloadingCompleted={chatIndex === idx && isLoading}
                        />
                        <QueryAnswer
                          ido={`chat-[${idx}]`}                        
                          answer={chat.answer}
                          isLoading={isLoading && loadingIndex === idx}
                          error={chat.error}
                          updateQuery={onSendQuery}
                          scrollToItem={scrollToItem}
                          editIndex={idx}
                          query={chat.query}
                          message_id={chat.message_id}
                          loadingCompleted={chatIndex === idx && isLoading}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            
            {showArrow && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-2 right-1/2 bg-white rounded-full shadow-sm w-4 h-4 border border-[#ddd] inline-flex justify-center items-center"
              >
                <ArrowDown stroke="#8A2BE2" />
              </button>
            )}
          </div>
          <AddQuery
            isLoading={isLoading}
            setQuery={setQuery}
            sendQuery={onSendQuery}
            query={query}
          />
        </div>
      </div>
      <div>
        {" "}
        <KnowNowRightSideBar />
      </div>
    </div>
  );
}

export default MarketIntelligenceKnowNow;
