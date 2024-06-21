import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsCookie from "js-cookie";
import axios from "axios";

//
import AddQuery from "../../../components/@chat/add-query";
import ChatQuery from "../../../components/@chat/chat-question";
import QueryAnswer from "../../../components/@chat/query-answer";

//
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setUpdateQuery } from "../../../stores/know-now";

//
import {
  addQuestion,
  editQueryAndUpdateAnswer,
  generateNewId,
  getIPChatById,
  saveIPChat,
  setChatIds,
  updateChatAnswer,
  getIPChat,
} from "../../../stores/know-now1";

//
import { AppConfig } from "src/config/app.config";

//
import KnowNowdefault from "./default";

//
import { generateKnowId } from "src/utils/helpers";
import { LoadingIcon } from "src/components/icons";
import toast from "react-hot-toast";

/**
 *
 */
function KnowNowIP() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isSaved, setIsSaved] = useState(false);

  //
  const chatRef = useRef<HTMLInputElement>(null);
  const userId = jsCookie.get("user_id");

  //
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.KnowNowChat);

  //
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [isLoading, setIsloading] = useState(false);
  const [query, setQuery] = useState("");

  //
  useEffect(() => {
    dispatch(getIPChat([{ user_id: userId || "", service_name: "ip" }]));

    if (id && ((chats && chats.length >= 0) || isSaved)) {
      dispatch(
        getIPChatById({
          user_id: userId || "",
          conversation_id: id,
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
    }
    setIsSaved(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, isSaved, userId]);

  //
  const onSendQuery = useCallback(
    async (updateQuery: string, editIndex: number | null) => {
      setLoadingIndex(editIndex !== null ? editIndex : chats.length);
      setIsloading(true);

      //
      const conversationId = id !== undefined ? id : generateKnowId();

      //
      if (id == undefined) {
        dispatch(generateNewId({ id: conversationId }));
        dispatch(
          setChatIds({
            title: conversationId,
            chat_id: conversationId,
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
            title: conversationId,
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
        setIsloading(false);
        //
        const answer = res.data;

        //
        const saveAnswer: any = await dispatch(
          saveIPChat([
            {
              conversation_id: conversationId,
              user_id: userId || "",
              role: "ai",
              service_name: "ip",
              title: conversationId,
              content: answer,
            },
          ]),
        );

        if (saveAnswer.payload.success) {
          setIsSaved(true);
        }

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
      } catch (error: any) {
        const errorMsg = error.response?.statusText;
        setIsloading(false);
        const errorAnswer = errorMsg || "Error while generating the response";

        //
        // await dispatch(
        //   saveIPChat([
        //     {
        //       conversation_id: conversationId,
        //       user_id: userId || "",
        //       role: "ai",
        //       service_name: "ip",
        //       title: conversationId,
        //       content: "Error while generating the response",
        //     },
        //   ]),
        // );

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
    <div className="p-3 pb-0 w-[960px] mx-auto">
      <div className="w-full grow-0">
        <div
          ref={chatRef}
          className="h-[calc(100vh-260px)] overflow-y-auto pn_scroller pb-2 pr-2 w-full"
        >
          {(chats && chats.length <= 0 && id) || isSaved ? (
            // {(chats && chats.length <= 0 && id) || isFetching ? (
            <div className="flex justify-center items-center h-full">
              <LoadingIcon className="h-5 w-5 text-primary-900" />
            </div>
          ) : (
            <>
              {id === undefined ? (
                <KnowNowdefault />
              ) : (
                <div className="space-y-6 w-full">
                  {((chats && chats) || []).map((chat, idx) => (
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
                        message_id={chat.message_id}
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
      {/* <div className="w-[300px]" /> */}
      {/* // <KnowNowRightSideBar /> */}
    </div>
  );
}

export default KnowNowIP;
