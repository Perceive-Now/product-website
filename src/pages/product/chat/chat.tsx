import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
//
import AddQuery from "../../../components/@chat/add-query";
//
import QueryAnswer from "../../../components/@chat/query-answer";
import ChatQuery from "../../../components/@chat/chat-question";

//
interface IChat {
  query: string;
  answer: string;
}

export function KnowNow() {
  const chatRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [chats, setChats] = useState<IChat[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const [isLoading, setIsloading] = useState(false);

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
    };

    setChats((prevChats) => [...prevChats, newChat]);

    try {
      const res = await axios.post(
        `https://perceivenowchat.azurewebsites.net/ask-question`,
        queries,
        {
          headers: {
            "x-token": "secret-token",
            "x-user-id": "user123",
            // Authorization: "Bearer c8af0589063bc32ce05ed53d4f0c388fe40b64a7bef8c06058308b9885006907",
          },
        },
      );

      // console.log(res)
      const responseCode = res.data.code;
      const answer = res.data.message;

      setIsloading(false);

      if (responseCode === 500) {
        setIsError(true);
        setErrorMessage("Error while generating the response");
      } else {
        const updatedChats = [...chats];
        updatedChats[updatedChats.length - 1].answer = answer;
        setChats(updatedChats);
      }

      // setChats((prevChats) => [...prevChats, newChat]);
    } catch (error) {
      setIsloading(false);
      setErrorMessage("Error");
      // console.log(error)
    } finally {
      setLoadingIndex(null);
    }

    // console.log('')
  }, [chats, query]);

  // useEffect(() => {
  //   chatRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [chatRef]);

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
        <div ref={chatRef} className="h-[calc(100vh-200px)] overflow-auto pn_scroller pb-2">
          <div className="space-y-6">
            {chats.map((chat, idx) => (
              <div key={idx * 5} className="space-y-3">
                <ChatQuery query={chat.query} />
                <QueryAnswer
                  answer={chat.answer}
                  isLoading={loadingIndex === idx}
                  error={errorMessage}
                  isError={isError}
                />
              </div>
            ))}
          </div>
        </div>
        <AddQuery isLoading={isLoading} setQuery={setQuery} sendQuery={onSendQuery} query={query} />
      </div>
      <div className="w-[300px] shrink-0"></div>
    </div>
  );
}
