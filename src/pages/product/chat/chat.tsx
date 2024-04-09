import { useCallback, useEffect, useRef, useState } from "react";
import AddQuery from "../../../components/@chat/add-query";
import QueryAnswer from "../../../components/@chat/query-answer";
import axios from "axios";

interface IChat {
  query: string;
  answer: string;
}

export function ChatWithAI() {
  const chatRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [chats, setChats] = useState<IChat[]>([]);

  const [isLoading, setIsloading] = useState(false);

  const onSendQuery = useCallback(async () => {
    setIsloading(true);

    const queries = [
      {
        query: query,
      },
    ];
    try {
      const res = await axios.post(`http://104.196.233.1/query_to_response`, queries, {
        headers: {
          Authorization: "Bearer c8af0589063bc32ce05ed53d4f0c388fe40b64a7bef8c06058308b9885006907",
        },
      });
      const answer = res.data.ai_message;

      setIsloading(false);

      setQuery("");

      const newChat = {
        query: query,
        answer: answer,
      };
      setChats((prevChats) => [...prevChats, newChat]);
    } catch (errror) {
      setIsloading(false);
      // console.log(error)
    }
    // console.log('')
  }, [query]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatRef]);

  return (
    <div className="p-3 flex">
      <div className="w-full">
        <div className="h-[calc(100vh-200px)] overflow-auto pn_scroller pb-2">
          <div ref={chatRef} className="space-y-6">
            {chats.map((chat, idx) => (
              <div key={idx * 5} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-appGray-200 rounded-full h-[30px] w-[30px] shrink-0" />
                  <p className="text-secondary-800">{chat.query}</p>
                </div>
                <QueryAnswer answer={chat.answer} />
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
