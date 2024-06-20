/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from "react";
import jsCookie from "js-cookie";
import axios from "axios";

import AddQuery from "../../../components/@chat/add-query";
import QueryAnswer from "../../../components/@chat/query-answer";
import ChatQuery from "../../../components/@chat/chat-question";

import KnowNowRightSideBar from "./side-bar";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUpdateQuery } from "../../../stores/know-now";

import {
  addQuestion,
  editQueryAndUpdateAnswer,
  generateNewId,
  setChatIds,
  updateChatAnswer,
} from "../../../stores/know-now1";
import { AppConfig } from "src/config/app.config";
import KnowNowdefault from "./default";
import { generateKnowId } from "src/utils/helpers";

interface IChat {
  query: string;
  answer: string;
  error?: string;
}

function KnowNowIP() {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.KnowNowChat.chats);

  const chatRef = useRef<HTMLInputElement>(null);

  const sessionID = jsCookie.get("session_id");
  const userId = jsCookie.get("user_id");

  const editQuery = useAppSelector((state) => state.KnowNow);
  const { knownow_id } = useAppSelector((state) => state.KnowNowChat);

  const [query, setQuery] = useState("");

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);

  // const editIndex = useAppSelector((state) => state.KnowNow.editIndex);

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
        user_id: userId,
        conversation_id: knownowId,
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
        const res = await axios.post(
          `${AppConfig.KNOW_NOW_IP_API}/message/conversation/query`,
          queries,
          {
            headers: {
              "Content-Type": "application/json",
              // Authorization:
              //   "Bearer c8af0589063bc32ce05ed53d4f0c388fe40b64a7bef8c06058308b9885006907",
            },
          },
        );
        const answer = res.data;
        setIsloading(false);
        if (editIndex !== null) {
          dispatch(
            editQueryAndUpdateAnswer({
              index: editIndex,
              newQuery: updateQuery,
              newAnswer: answer,
            }),
          );
          dispatch(setUpdateQuery({ ...editQuery, editIndex: null }));
        } else {
          dispatch(updateChatAnswer({ index: chats.length, answer }));
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
          dispatch(setUpdateQuery({ editIndex: null }));
        } else {
          dispatch(updateChatAnswer({ index: chats.length, answer: errorAnswer }));
        }
      } finally {
        setLoadingIndex(null);
      }
    },
    [chats.length, dispatch, editQuery, knownow_id, query, userId],
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
    <div className="p-3 pb-0 flex items-start">
      <div className="w-full grow-0">
        <div
          ref={chatRef}
          className="h-[calc(100vh-260px)] overflow-y-auto pn_scroller pb-2 pr-2 w-full"
        >
          {" "}
          {chats && chats.length <= 0 ? (
            <KnowNowdefault />
          ) : (
            <div className="space-y-6 w-full">
              {(chats || []).map((chat, idx) => (
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

export default KnowNowIP;
