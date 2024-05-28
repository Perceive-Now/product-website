/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from "react";
import AddQuery from "../../../components/@chat/add-query";
import QueryAnswer from "../../../components/@chat/query-answer";
import axios from "axios";
import ChatQuery from "../../../components/@chat/chat-question";
import jsCookie from "js-cookie";
import KnowNowRightSideBar from "./side-bar";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUpdateQuery } from "../../../stores/know-now";

interface IChat {
  query: string;
  answer: string;
  error?: string;
}

function KnowNowIP() {
  const dispatch = useAppDispatch();
  const chatRef = useRef<HTMLInputElement>(null);

  const sessionID = jsCookie.get("session_id");
  const userId = jsCookie.get("user_id");

  const [query, setQuery] = useState("");
  const [chats, setChats] = useState<IChat[]>([]);

  console.log(chats);

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const [isLoading, setIsloading] = useState(false);

  const editIndex = useAppSelector((state) => state.KnowNow.editIndex);
  const editQuery = useAppSelector((state) => state.KnowNow.query);

  const onSendQuery = useCallback(async () => {
    setLoadingIndex(chats.length);
    // setIsloading(true);
    setQuery("");

    const newChat = {
      query: query,
      answer: "",
    };

    const queries = [
      {
        query: query,
        user_id: userId,
        thread_id: sessionID,
      },
    ];

    setChats((prevChats) => [...prevChats, newChat]);
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

    try {
      const res = await axios.post(`https://knownow.perceivenow.ai/query_to_response`, queries, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer c8af0589063bc32ce05ed53d4f0c388fe40b64a7bef8c06058308b9885006907",
        },
      });
      const answer = res.data;
      setIsloading(false);

      if (editIndex !== null) {
        // const newChats = [...chats.slice(0, index), editIndex];

        setChats((prevChats) => {
          // Clone the previous chats array
          const updatedChats = [...prevChats];

          // Update the last chat's answer and response_time
          if (updatedChats.length > 0) {
            updatedChats[updatedChats.length - 1].answer = answer;
            // updatedChats[updatedChats.length - 1].response_time = responseTime;
          }

          // Create a new array that includes chats up to editIndex (inclusive)
          const newChats = updatedChats.slice(0, editIndex + 1);

          console.log("New", newChats);

          return newChats;
        });
      }

      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[updatedChats.length - 1].answer = answer;
        return updatedChats;
      });
    } catch (error: any) {
      const errorMsg = error.response.statusText;
      setIsloading(false);

      if (editIndex !== null) {
        setChats((prevChats) => {
          const updatedChats = [...prevChats];
          updatedChats[updatedChats.length - 1].query = editQuery || "";
          const newChats = updatedChats.slice(0, editIndex + 1);

          console.log("update", updatedChats);
          console.log("New", newChats);
          return newChats;
        });
        dispatch(setUpdateQuery({ editIndex: null }));
      }

      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[updatedChats.length - 1].error =
          errorMsg || "Error while generating the response";
        return updatedChats;
      });
    } finally {
      setLoadingIndex(null);
    }
  }, [chats.length, dispatch, editIndex, editQuery, query, sessionID, userId]);

  console.log(editIndex);

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
          className="h-[calc(100vh-200px)] overflow-y-auto pn_scroller pb-2 pr-2 w-full"
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
                />
              </div>
            ))}
          </div>
        </div>
        <AddQuery isLoading={isLoading} setQuery={setQuery} sendQuery={onSendQuery} query={query} />
      </div>
      <div className="w-[300px] shrink-0 ml-5">
        <KnowNowRightSideBar />
      </div>
    </div>
  );
}

export default KnowNowIP;
