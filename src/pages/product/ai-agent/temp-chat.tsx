import React, { useState, useRef, useCallback, useEffect } from "react";
import AddQuery from "src/components/@vc-product/add-query";
import DotLoader from "src/components/reusable/dot-loader";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setVSChats } from "src/stores/vs-product";
import { generateKnowIdstring } from "src/utils/helpers";

const AiAgent = () => {
  const dispatch = useAppDispatch();
  const chatRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { chats } = useAppSelector((state) => state.VSProduct);
  const session = useAppSelector((state) => state.sessionDetail.session);
  const userId = session?.user_id;

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const fetchResponse = async (userInput: string) => {
    const threadId = generateKnowIdstring();
    try {
      const response = await axios.post("https://templateuserrequirements.azurewebsites.net/process-step", {
        userId: String(userId), // Convert userId to string
        threadId,
        industry: "AI",
        agent: "Startup Diligence Agent",
        useCase: "AI",
        step: 0,
        data: { user_input: userInput },
      });
      return response.data.response || "No response received.";
    } catch (error) {
      console.error("Error fetching API response:", error);
      return "An error occurred while processing your request. Please try again.";
    }
  };
  

  const onSendQuery = useCallback(
    async () => {
      if (!query.trim()) return; // Prevent sending empty messages
      setIsLoading(true);

      // Add user query to chat
      dispatch(setVSChats({ query, answer: "" }));

      try {
        const answer = await fetchResponse(query);
        // Add the response to chat
        dispatch(setVSChats({ query: "", answer }));
      } catch (error) {
        dispatch(setVSChats({ query: "", answer: "Error while processing the request." }));
      } finally {
        setQuery(""); // Clear input field
        setIsLoading(false);
      }
    },
    [dispatch, query]
  );

  return (
    <div className="px-0 md:px-3 w-full mx-auto h-full flex flex-col">
      <div className="flex-grow overflow-y-auto bg-white rounded-lg shadow-md p-3" ref={chatRef}>
        {chats.map((chat, idx) => (
          <div key={idx} className="mb-3">
            {chat.query && (
              <div className="text-right bg-gray-200 p-2 rounded-lg mb-1">
                <strong>User:</strong> {chat.query}
              </div>
            )}
            {chat.answer && (
              <div className="text-left bg-blue-100 p-2 rounded-lg">
                <strong>AI:</strong> {chat.answer}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center p-3">
            <DotLoader />
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="flex items-center border-t p-3">
        <input
          type="text"
          className="flex-grow border rounded-lg p-2"
          placeholder="Type your message..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSendQuery();
          }}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg ml-2"
          onClick={onSendQuery}
          disabled={isLoading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiAgent;
