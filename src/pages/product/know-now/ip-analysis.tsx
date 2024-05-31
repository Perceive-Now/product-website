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

import { addQuestion, editQueryAndUpdateAnswer, updateChatAnswer } from "../../../stores/know-now1";

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

  const [query, setQuery] = useState("");

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);

  // const editIndex = useAppSelector((state) => state.KnowNow.editIndex);

  const onSendQuery = useCallback(
    async (updateQuery: string, editIndex: number | null) => {
      setLoadingIndex(editIndex !== null ? editIndex : chats.length);
      setIsloading(true);

      const queries = [
        {
          query: query || updateQuery,
          user_id: userId,
          thread_id: sessionID,
        },
      ];

      if (editIndex !== null) {
        dispatch(
          editQueryAndUpdateAnswer({ index: editIndex, newQuery: updateQuery, newAnswer: "" }),
        );
      } else {
        dispatch(addQuestion(query));
      }

      setQuery("");
      try {
        const res = await axios.post(`https://knownow.perceivenow.ai/query_to_response`, queries, {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer c8af0589063bc32ce05ed53d4f0c388fe40b64a7bef8c06058308b9885006907",
          },
        });
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
    [chats.length, dispatch, editQuery, query, sessionID, userId],
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
        </div>
        <AddQuery isLoading={isLoading} setQuery={setQuery} sendQuery={onSendQuery} query={query} />
      </div>
      <KnowNowRightSideBar />
    </div>
  );
}

export default KnowNowIP;

// setIsloading(false);

// const streamEndpoint = "https://knownow.perceivenow.ai/query_to_response";
// const token = "c8af0589063bc32ce05ed53d4f0c388fe40b64a7bef8c06058308b9885006907";

// fetch(streamEndpoint, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   body: JSON.stringify(queries),
// })
//   .then((response: any) => {
//     const reader = response.body.getReader();

//     const readChunk = () => {
//       reader
//         .read()
//         .then(({ done, value }: any) => {
//           if (done) {
//             console.log("Stream ended");
//             return;
//           }
//           const textDecoder = new TextDecoder();
//           const answer = textDecoder.decode(value);

//           setValue((prev) => prev + answer);
//           setChats((prevChats) => {
//             const updatedChats = [...prevChats];
//             updatedChats[updatedChats.length - 1].answer = answer;
//             return updatedChats;
//           });
//           // Process the chunk of data here
//           console.log("Received chunk of data:", value);

//           // Read the next chunk
//           readChunk();
//         })
//         .catch((error: any) => {
//           console.error("Error reading chunk:", error);
//         });
//     };

//     // Start reading chunks
//     readChunk();
//   })
//   .catch((error) => {
//     console.error("Error occurred:", error);
//   });

// const response: any = await fetch(streamEndpoint, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`,
//   },
//   body: JSON.stringify(queries),
// })
// console.log(response.body.Js)
// const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

// // eslint-disable-next-line no-constant-condition
// while (true) {
//   const { value, done } = await reader.read();
//   if (done) break;

//   // Update UI with the received chunk of data
//   console.log('Received: ', value);
//   setValue(prev => prev + value);
// }
