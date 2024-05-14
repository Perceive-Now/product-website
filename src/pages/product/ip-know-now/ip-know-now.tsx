/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useCallback, useEffect, useRef, useState } from "react";
import AddQuery from "../../../components/@chat/add-query";
import QueryAnswer from "../../../components/@chat/query-answer";
import axios from "axios";
import ChatQuery from "../../../components/@chat/chat-question";
import jsCookie from "js-cookie";

interface IChat {
  query: string;
  answer: string;
  error?: string;
}

export function KnowNowIP() {
  const chatRef = useRef<HTMLInputElement>(null);

  const sessionID = jsCookie.get("session_id");
  const userId = jsCookie.get("user_id");

  const [query, setQuery] = useState("");
  const [chats, setChats] = useState<IChat[]>([]);
  const [value, setValue] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);

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
        session_id: sessionID,
      },
    ];

    setChats((prevChats) => [...prevChats, newChat]);
    // setIsloading(false);

    const streamEndpoint = "https://knownow.perceivenow.ai/query_to_response";
    const token = "c8af0589063bc32ce05ed53d4f0c388fe40b64a7bef8c06058308b9885006907";

    fetch(streamEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(queries),
    })
      .then((response: any) => {
        const reader = response.body.getReader();

        const readChunk = () => {
          reader
            .read()
            .then(({ done, value }: any) => {
              if (done) {
                console.log("Stream ended");
                return;
              }
              const textDecoder = new TextDecoder();
              const answer = textDecoder.decode(value);

              setValue((prev) => prev + answer);
              setChats((prevChats) => {
                const updatedChats = [...prevChats];
                updatedChats[updatedChats.length - 1].answer = answer;
                return updatedChats;
              });
              // Process the chunk of data here
              console.log("Received chunk of data:", value);

              // Read the next chunk
              readChunk();
            })
            .catch((error: any) => {
              console.error("Error reading chunk:", error);
            });
        };

        // Start reading chunks
        readChunk();
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });

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

    // try {
    //   const res = await axios.post(`https://knownow.perceivenow.ai/query_to_response`, queries, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer c8af0589063bc32ce05ed53d4f0c388fe40b64a7bef8c06058308b9885006907",
    //     },
    //   });

    //   console.log(res)

    //   const answer = res.data;

    //   setIsloading(false);

    //   setChats((prevChats) => {
    //     const updatedChats = [...prevChats];
    //     updatedChats[updatedChats.length - 1].answer = answer;
    //     return updatedChats;
    //   });
    // } catch (error: any) {
    //   const errorMsg = error.response.statusText;
    //   setIsloading(false);

    //   setChats((prevChats) => {
    //     const updatedChats = [...prevChats];
    //     updatedChats[updatedChats.length - 1].error =
    //       errorMsg || "Error while generating the response";
    //     return updatedChats;
    //   });
    //   // console.log(error)
    // } finally {
    //   setLoadingIndex(null);
    // }
  }, [chats, query, sessionID, userId]);

  console.log(value);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="p-3 pb-6 flex">
      <div className="w-full">
        <div ref={chatRef} className="h-[calc(100vh-205px)] overflow-auto pn_scroller pb-2 pr-2">
          {/* <div style={{ whiteSpace: 'pre-wrap' }}>{value}</div> */}

          <div className="space-y-6">
            {chats.map((chat, idx) => (
              <div key={idx * 5} className="space-y-3">
                <ChatQuery
                  query={chat.query}
                  // updateQuery={onSendQuery}
                />
                <QueryAnswer
                  answer={chat.answer}
                  // isLoading={loadingIndex === idx}
                  isLoading={false}
                  error={chat.error}
                />
              </div>
            ))}
          </div>
        </div>
        <AddQuery isLoading={isLoading} setQuery={setQuery} sendQuery={onSendQuery} query={query} />
      </div>
      <div className="w-[200px] 2xl:w-[300px] shrink-0"></div>
    </div>
  );
}
