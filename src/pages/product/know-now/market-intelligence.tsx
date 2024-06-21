import axios from "axios";
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
  setChatIds,
  updateChatAnswer,
  updateChatError,
} from "../../../stores/know-now1";

import KnowNowdefault from "./default";
import { AppConfig } from "src/config/app.config";
import { generateKnowId } from "src/utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingIcon } from "src/components/icons";
import toast from "react-hot-toast";
// import { connect, disconnect } from "src/utils/websocket-service";

//

// const socket = io('https://percievenowchat2.azurewebsites.net/ws/chat'); // Replace with your WebSocket server URL

/**
 *
 */

function MarketIntelligenceKnowNow() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const chatRef = useRef<HTMLInputElement>(null);
  const userId = jsCookie.get("user_id");

  const { chats } = useAppSelector((state) => state.KnowNowChat);

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [query, setQuery] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    dispatch(getMarketThread(userId || ""));

    if (id) {
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
  }, [dispatch, id, userId]);

  const onSendQuery = useCallback(
    async (updateQuery: string, editIndex: number | null) => {
      setIsloading(true);
      setLoadingIndex(editIndex !== null ? editIndex : chats.length);
      //
      const conversationId = id !== undefined ? id : generateKnowId();

      //
      if (id == undefined) {
        dispatch(generateNewId({ id: conversationId }));
        dispatch(
          setChatIds({
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

      // -------------------------------------------------------------------

      try {
        const res = await axios.post(`${AppConfig.KNOW_NOW_MARKET_API}/ask-question`, queries, {
          headers: {
            "Content-Type": "application/json",
            "x-token": "secret-token",
            "x-user-id": "user123",
          },
        });
        const answer = res.data;
        setIsloading(false);

        await dispatch(
          saveMarketChat({
            thread_id: conversationId,
            user_id: userId || "",
            conversation_data: {
              conversation_id: "",
              query: queries.query,
              ai_content: "",
              likes: 0,
            },
          }),
        )
          .unwrap()
          .then(() => {
            setIsSaved(true);
          })
          .catch(() => {
            toast.error("Unable to save");
          });

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
      } catch (error: any) {
        const errorMsg = error.response.statusText;
        setIsloading(false);
        const errorAnswer = errorMsg || "Error while generating the response";

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
    [chats, dispatch, id, navigate, query, userId],
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
    <div className="p-3 pb-0 w-[960px] mx-auto">
      <div className="w-full">
        <div
          ref={chatRef}
          className="h-[calc(100vh-260px)] overflow-y-auto pn_scroller pb-2 pr-2 w-full"
        >
          {chats && chats.length <= 0 && id ? (
            // {(chats && chats.length <= 0 && id) || isFetching ? (
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
                        isLoading={loadingIndex === idx}
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
