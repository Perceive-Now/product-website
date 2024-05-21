import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
//
import AddQuery from "../../../components/@chat/add-query";
//
import QueryAnswer from "../../../components/@chat/query-answer";
import ChatQuery from "../../../components/@chat/chat-question";
//
import KnowNowRightSideBar from "./side-bar";

//
interface IChat {
  query: string;
  answer: string;
  response_time?: string;
  error?: string;
}

function MarketIntelligenceKnowNow() {
  const chatRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [chats, setChats] = useState<IChat[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);

  const [editIndex, setEditIndex] = useState<number | null>(null);

  // console.log(chats)

  const onSendQuery = useCallback(async () => {
    setLoadingIndex(chats.length);

    setIsloading(true);
    setQuery("");

    const newChat = {
      query: query,
      answer: "",
    };

    const queries = {
      query: query,
      thread_id: "45545",
    };

    setChats((prevChats) => [...prevChats, newChat]);

    try {
      const res = await axios.post(
        `https://percievenowchat2.azurewebsites.net/ask-question`,
        queries,
        {
          headers: {
            "Content-Type": "application/json",
            "x-token": "secret-token",
            "x-user-id": "user123",
          },
        },
      );
      const answer = res.data.message;

      // For development only
      const responseTime = res.data.time;

      setIsloading(false);

      // const index = chats.findIndex((chat, idx) => idx === editIndex);

      if (editIndex !== null) {
        // const newChats = [...chats.slice(0, index), editIndex];

        setChats((prevChats) => {
          // Clone the previous chats array
          const updatedChats = [...prevChats];

          // Update the last chat's answer and response_time
          if (updatedChats.length > 0) {
            updatedChats[updatedChats.length - 1].answer = answer;
            updatedChats[updatedChats.length - 1].response_time = responseTime;
          }

          // Create a new array that includes chats up to editIndex (inclusive)
          const newChats = updatedChats.slice(0, editIndex + 1);

          return newChats;
        });
      }

      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[updatedChats.length - 1].answer = answer;
        updatedChats[updatedChats.length - 1].response_time = responseTime;

        return updatedChats;
      });
    } catch (error: any) {
      const errorMsg = error.response.statusText;
      setIsloading(false);

      setChats((prevChats) => {
        const updatedChats = [...prevChats];
        updatedChats[updatedChats.length - 1].error =
          errorMsg || "Error while generating the response";
        return updatedChats;
      });

      // setErrorMessage("Error while generating the response");
      // console.log(error)
    } finally {
      setLoadingIndex(null);
      // setIsError(false)
    }

    // console.log('')
  }, [chats.length, editIndex, query]);

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
          <div className="space-y-6">
            {chats.map((chat, idx) => (
              <div key={idx * 5} className="space-y-3">
                <ChatQuery
                  query={chat.query}
                  updateQuery={onSendQuery}
                  setEditIndex={setEditIndex}
                  editIndex={idx}
                />
                <QueryAnswer
                  responseTime={chat.response_time}
                  answer={chat.answer}
                  isLoading={loadingIndex === idx}
                  error={chat.error && chat.error}
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

export default MarketIntelligenceKnowNow;
