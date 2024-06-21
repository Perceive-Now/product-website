import { useCallback, useEffect, useRef, useState } from "react";
import jsCookie from "js-cookie";

import AddQuery from "../../../components/@chat/add-query";
import QueryAnswer from "../../../components/@chat/query-answer";
import ChatQuery from "../../../components/@chat/chat-question";
import KnowNowdefault from "./default";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  addQuestion,
  editQueryAndUpdateAnswer,
  generateNewId,
  saveMarketChat,
  setChatIds,
  updateChatAnswer,
  updateChatError,
} from "../../../stores/know-now1";

import { generateKnowId } from "src/utils/helpers";
import { useNavigate, useParams } from "react-router-dom";

const wsUri = "wss://percievenowchat2.azurewebsites.net/ws/chat?user_id=12&thread_id=12";

function MarketIntelligenceKnowNow() {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [answer, setAnswer] = useState("");

  const chatRef = useRef<HTMLDivElement>(null);
  const userId = jsCookie.get("user_id");

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const chats = useAppSelector((state) => state.KnowNowChat.chats);

  console.log(answer);

  useEffect(() => {
    let ws: WebSocket;

    const connectWebSocket = () => {
      ws = new WebSocket(wsUri);

      ws.onopen = () => {
        console.log("Connected to WebSocket server!");
      };

      ws.onmessage = (ev: MessageEvent) => {
        const newMessage = ev.data;
        setAnswer((prev) => prev + newMessage);
        console.log("Message received from server:", answer);
        dispatch(updateChatAnswer({ index: chats.length, answer }));

        setIsLoading(false);
      };

      ws.onerror = (ev: Event) => {
        console.error("WebSocket error:", ev);
      };

      ws.onclose = (ev: CloseEvent) => {
        console.log("WebSocket closed:", ev);
        if (!ev.wasClean) {
          console.log("Reconnecting to WebSocket server...");
          setTimeout(connectWebSocket, 3000); // Attempt to reconnect after 3 seconds
        }
      };

      setWebsocket(ws);
    };

    connectWebSocket();

    return () => {
      ws.close();
    };
  }, [answer, chats.length, dispatch]);

  const onSendQuery = useCallback(
    async (updateQuery: string, editIndex: number | null) => {
      setIsLoading(true);
      setLoadingIndex(editIndex !== null ? editIndex : chats.length);
      const conversationId = id !== undefined ? id : generateKnowId();

      if (id === undefined) {
        dispatch(generateNewId({ id: conversationId }));
        // setAnswer((prev) => prev + newMessage + "<br>");

        dispatch(setChatIds({ title: conversationId, chat_id: conversationId }));
        // navigate(`/know-now/market-intelligence/${conversationId}`);
      }

      const queries = {
        query: query || updateQuery,
        thread_id: conversationId,
        user_id: userId,
      };

      await dispatch(
        saveMarketChat({
          thread_id: conversationId,
          user_id: userId || "",
          conversation_data: {
            conversation_id: "",
            query: queries.query,
            ai_content: answer,
            likes: 0,
          },
        }),
      );

      if (editIndex !== null) {
        dispatch(
          editQueryAndUpdateAnswer({ index: editIndex, newQuery: updateQuery, newAnswer: "" }),
        );
      } else {
        dispatch(addQuestion(query));
      }

      setQuery("");

      try {
        if (websocket) {
          console.log("Sending message via WebSocket:", queries);
          websocket.send(JSON.stringify(queries));
        } else {
          throw new Error("WebSocket is not connected");
        }
        setIsLoading(false);
      } catch (error: any) {
        console.error("WebSocket send error:", error);
        const errorMsg = error.message || "Error while generating the response";
        setIsLoading(false);

        if (editIndex !== null) {
          dispatch(
            editQueryAndUpdateAnswer({
              index: editIndex,
              newQuery: updateQuery,
              newAnswer: errorMsg,
            }),
          );
        } else {
          dispatch(updateChatError({ index: chats.length, answer: errorMsg }));
        }
      } finally {
        setLoadingIndex(null);
      }
    },
    [chats.length, dispatch, id, query, userId, websocket],
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
                    answer={answer}
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
        </div>
        <AddQuery isLoading={isLoading} setQuery={setQuery} sendQuery={onSendQuery} query={query} />
      </div>
    </div>
  );
}

export default MarketIntelligenceKnowNow;
