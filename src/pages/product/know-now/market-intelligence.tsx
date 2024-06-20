import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import jsCookie from "js-cookie";

//
import AddQuery from "../../../components/@chat/add-query";
//
import QueryAnswer from "../../../components/@chat/query-answer";
import ChatQuery from "../../../components/@chat/chat-question";
//
import KnowNowRightSideBar from "./side-bar";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
// import { setUpdateQuery } from "../../../stores/know-now";

import {
  addQuestion,
  editQueryAndUpdateAnswer,
  generateNewId,
  saveMarketChat,
  setChatIds,
  updateChatAnswer,
  updateChatError,
} from "../../../stores/know-now1";

import KnowNowdefault from "./default";
import { AppConfig } from "src/config/app.config";
import { generateKnowId } from "src/utils/helpers";

//

/**
 *
 */

function MarketIntelligenceKnowNow() {
  const dispatch = useAppDispatch();

  const chatRef = useRef<HTMLInputElement>(null);
  const userId = jsCookie.get("user_id");

  const chats = useAppSelector((state) => state.KnowNowChat.chats);
  const { knownow_id } = useAppSelector((state) => state.KnowNowChat);

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [query, setQuery] = useState("");

  const onSendQuery = useCallback(
    async (updateQuery: string, editIndex: number | null) => {
      setLoadingIndex(editIndex !== null ? editIndex : chats.length);
      setIsloading(true);
      const knownowId = knownow_id === undefined ? generateKnowId() : knownow_id;
      if (knownow_id === undefined) {
        dispatch(generateNewId({ id: knownowId }));
        dispatch(setChatIds(knownowId));
      }

      const queries = {
        query: query || updateQuery,
        thread_id: knownowId,
        user_id: userId,
      };

      if (editIndex !== null) {
        dispatch(
          editQueryAndUpdateAnswer({ index: editIndex, newQuery: updateQuery, newAnswer: "" }),
        );
      } else {
        dispatch(addQuestion(query));
      }

      setQuery("");

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
            user_id: userId ?? "",
            thread_id: knownow_id,
            content: updateQuery,
          }),
        );

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
    [chats.length, dispatch, knownow_id, query, userId],
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
    <div className="p-3 flex">
      <div className="w-full">
        <div ref={chatRef} className="h-[calc(100vh-264px)] overflow-auto pn_scroller pb-2 pr-2">
          {chats && chats.length <= 0 ? (
            <KnowNowdefault />
          ) : (
            <div className="space-y-6">
              {chats.map((chat, idx) => (
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
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <AddQuery isLoading={isLoading} setQuery={setQuery} sendQuery={onSendQuery} query={query} />
      </div>
      <KnowNowRightSideBar />
    </div>
  );
}

export default MarketIntelligenceKnowNow;
