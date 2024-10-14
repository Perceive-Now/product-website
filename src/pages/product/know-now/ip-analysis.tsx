import { useCallback, useEffect, useRef, useState } from "react";
import {useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import jsCookie from "js-cookie";
import axios from "axios";

//
import AddQuery from "../../../components/@know-now/add-query";
import ChatQuery from "../../../components/@know-now/chat-question";
import QueryAnswer from "../../../components/@know-now/query-answer";

//
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

//
import {
  addQuestion,
  editQueryAndUpdateAnswer,
  generateNewId,
  getIPChat,
  getIPChatById,
  saveIPChat,
  setChatIPIds,
  updateChatAnswer,
} from "../../../stores/knownow-ip";

//
import { AppConfig } from "src/config/app.config";

//
import KnowNowdefault from "./default";

//
import { generateKnowId } from "src/utils/helpers";
import { LoadingIcon } from "src/components/icons";
import toast from "react-hot-toast";
import { setUpdateQuery } from "src/stores/know-now";

/**
 *
 */
function KnowNowIP() {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useParams();
  const { question } = location.state || { question: "" };

  const [searchParams] = useSearchParams();

  const queryStatus = searchParams.get("status");

  const [isSaved, setIsSaved] = useState(false);

  //
  const chatRef = useRef<HTMLInputElement>(null);
  const userId = jsCookie.get("user_id");

  //
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.KnowNowIP);

  //
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [query, setQuery] = useState("");
  const [chatIndex, setChatIndex] = useState<number | null>(null);

  //
  useEffect(() => {
    if (question) {
      setQuery(question);
    }
  }, [question]);
  //
  useEffect(() => {
    if (queryStatus) {
      setIsSaved(true);
    }
  }, [id, queryStatus]);

  //
  useEffect(() => {
    if (
      (id && isSaved) ||
      location.pathname === "/know-now/market-intelligence" ||
      location.pathname === "/know-now/ip-analysis"
    ) {
      dispatch(getIPChat([{ user_id: userId || "", service_name: "ip" }]));
    }
    if (id && isSaved) {
      dispatch(
        getIPChatById({
          user_id: userId || "",
          conversation_id: Number(id),
        }),
      )
        .unwrap()
        .then((res) => {
          if (!res.success) {
            toast.error("Unable to fetch Conversations");
            navigate("/start-conversation");
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
          navigate("/start-conversation");
        });
      setIsSaved(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, isSaved, userId]);

  //
  const onSendQuery = useCallback(
    async (updateQuery: string, editIndex: number | null) => {
      setLoadingIndex(editIndex !== null ? editIndex : chats.length);
      setChatIndex(editIndex !== null ? editIndex : chats.length);
      setIsloading(true);

      //
      const conversationId = id !== undefined ? Number(id) : generateKnowId();

      //
      if (id === undefined) {
        dispatch(generateNewId({ id: conversationId }));
        dispatch(
          setChatIPIds({
            title: '',
            thread_id: conversationId,
            favorite: false
          }),
        );
        navigate(`/know-now/ip-analysis/${conversationId}`);
      }

      //
      await dispatch(
        saveIPChat([
          {
            conversation_id: conversationId,
            user_id: userId || "",
            role: "human",
            service_name: "ip",
            title: "",
            content: query || updateQuery,
          },
        ]),
      );

      //
      const queries = {
        query: query || updateQuery,
        user_id: userId,
        conversation_id: conversationId,
      };

      //
      if (editIndex !== null) {
        dispatch(
          editQueryAndUpdateAnswer({ index: editIndex, newQuery: updateQuery, newAnswer: "" }),
        );
      } else {
        dispatch(addQuestion(query));
      }

      //
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

        //
        const answer = res.data;
        await dispatch(
          saveIPChat([
            {
              conversation_id: conversationId,
              user_id: userId || "",
              role: "ai",
              service_name: "ip",
              title: "",
              content: answer,
            },
          ]),
        )
          .unwrap()
          .then((res) => {
            if (res.success) {
              // toast.success("Saved Successfully")
            } else {
              toast.error("Unable to save conversation ");
            }
          });

        if (editIndex !== null) {
          dispatch(
            editQueryAndUpdateAnswer({
              index: editIndex,
              newQuery: updateQuery,
              newAnswer: answer,
            }),
          );
        } else {
          dispatch(updateChatAnswer({ index: chats.length, answer }));
        }
        setIsloading(false);
        setChatIndex(null);
        navigate(`/know-now/ip-analysis/${conversationId}?status=true`);
        navigate(`/know-now/ip-analysis/${conversationId}?status=true`);
      } catch (error: any) {
        const errorMsg = error.response?.statusText;
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
        navigate(`/know-now/ip-analysis/${conversationId}?status=true`);
      } finally {
        setLoadingIndex(null);
        setChatIndex(null);
      }
    },
    [chats, dispatch, id, navigate, query, userId],
  );

  //
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  
  //
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="h-[calc(100vh-160px)] px-3 pb-0 xl:w-[960px] mx-auto">
      <div className="w-full h-full relative">
        <div
          ref={chatRef}
          className="h-[calc(100vh-260px)] overflow-y-auto pn_scroller pb-2 pr-2 w-full"
        >
          {(chats && chats.length <= 0 && id) || isSaved ? (
            <div className="flex justify-center items-center h-full">
              <LoadingIcon className="h-5 w-5 text-primary-900" />
            </div>
          ) : (
            <>
              {id === undefined ? (
                  <KnowNowdefault setQuery={setQuery} question={query} />
              ) : (
                <div className="space-y-6 w-full">
                  {((chats && chats) || []).map((chat, idx) => (
                    <div key={idx * 5} className="space-y-3">
                      <ChatQuery
                        query={chat.query}
                        updateQuery={onSendQuery}
                        editIndex={idx}
                        setQuery={setQuery}
                        isloadingCompleted={chatIndex === idx && isLoading}
                      />
                      <QueryAnswer
                        ido={`chat-[${idx}]`}                        
                        answer={chat.answer}
                        scrollToItem={()=>{console.log("");}}
                        isLoading={isLoading && loadingIndex === idx}
                        error={chat.error}
                        updateQuery={onSendQuery}
                        editIndex={idx}
                        query={chat.query}
                        message_id={chat.message_id}
                        loadingCompleted={chatIndex === idx && isLoading}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <AddQuery isLoading={isLoading} setQuery={setQuery} sendQuery={onSendQuery} query={query} />
      </div>
    </div>
  );
}

export default KnowNowIP;
