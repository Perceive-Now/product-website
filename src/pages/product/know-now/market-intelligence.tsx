import { useCallback, useEffect, useRef, useState } from "react";
import jsCookie from "js-cookie";

//
import AddQuery from "../../../components/@chat/add-query";

//
import QueryAnswer from "../../../components/@chat/query-answer";
import ChatQuery from "../../../components/@chat/chat-question";

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
} from "../../../stores/knownow-market";

import KnowNowdefault from "./default";
import { AppConfig } from "src/config/app.config";
import { generateKnowId } from "src/utils/helpers";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { LoadingIcon } from "src/components/icons";
import toast from "react-hot-toast";

/**
 *
 */

function MarketIntelligenceKnowNow() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();

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

  const [isSaved, setIsSaved] = useState(false);
  const [query, setQuery] = useState("");

  //
  useEffect(() => {
    if (queryStatus) {
      setIsSaved(true);
    }
  }, [id, queryStatus]);

  // || (location.pathname === "/know-now/market-intelligence" || location.pathname === "/know-now/ip-analysis")
  useEffect(() => {
    if (id && isSaved) {
      dispatch(getMarketThread(userId || ""));
      dispatch(
        getMarketChatById({
          user_id: userId || "",
          thread_id: id || "",
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
    // setIsSaved(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, userId, isSaved]);

  //
  const onSendQuery = useCallback(
    async (updateQuery: string, editIndex: number | null) => {
      setIsloading(true);
      setLoadingIndex(editIndex !== null ? editIndex : chats.length);

      //
      const conversationId = id !== undefined ? id : generateKnowId();
      const messageId = generateKnowId();

      //
      if (id === undefined) {
        dispatch(generateNewId({ id: conversationId }));
        dispatch(
          setChatMarketIds({
            title: conversationId,
            chat_id: conversationId,
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

        // Stream
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (value) {
            setLoadingIndex(null);
            const chunk = decoder.decode(value);
            answer += chunk;

            if (editIndex !== null) {
              dispatch(
                editQueryAndUpdateAnswer({
                  index: editIndex,
                  newQuery: updateQuery,
                  newAnswer: answer,
                }),
              );
            } else {
              dispatch(
                updateChatAnswer({
                  index: chats.length,
                  answer: answer,
                }),
              );
            }
            // console.log('Chunk received:', decoder.decode(value));
          }
        }

        await dispatch(
          saveMarketChat({
            thread_id: conversationId,
            user_id: userId || "",
            conversation_data: {
              conversation_id: messageId,
              query: queries.query,
              ai_content: answer,
              likes: 0,
            },
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
      } finally {
        setLoadingIndex(null);
      }
    },
    [chats.length, dispatch, id, navigate, query, userId],
  );

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="px-3 pt-0 pb-0 w-[960px] mx-auto">
      <div className="w-full">
        <div
          ref={chatRef}
          className="h-[calc(100vh-260px)] overflow-y-auto pn_scroller pb-2 pr-2 w-full"
        >
          {chats && chats.length <= 0 && id ? (
            <div className="flex justify-center items-center h-full">
              <LoadingIcon className="h-5 w-5 text-primary-900" />
            </div>
          ) : (
            <>
              {id === undefined ? (
                <KnowNowdefault />
              ) : (
                <div className="space-y-6 w-full">
                  {((chats && chats) || []).map((chat, idx) => (
                    <div key={idx * 5} className="space-y-3">
                      <ChatQuery
                        query={chat.query}
                        updateQuery={onSendQuery}
                        editIndex={idx}
                        setQuery={setQuery}
                      />
                      <QueryAnswer
                        answer={chat.answer}
                        isLoading={isLoading && loadingIndex === idx}
                        error={chat.error}
                        updateQuery={onSendQuery}
                        editIndex={idx}
                        query={chat.query}
                        message_id={chat.message_id}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <AddQuery isLoading={isLoading} setQuery={setQuery} sendQuery={onSendQuery} query={query} />
      </div>
    </div>
  );
}

export default MarketIntelligenceKnowNow;
