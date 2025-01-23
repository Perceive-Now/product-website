import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useCallback } from "react";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { LoadingIcon } from "src/components/icons";
import PerceiveLogo from "../../../assets/images/logo.svg";

import ChatQuery from "src/components/@know-now/share/chat-question";
import QueryAnswer from "src/components/@know-now/share/query-answer";

import KnowNowdefault from "../know-now/default";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { getMarketChatById } from "src/stores/knownow-market";
import Button from "src/components/reusable/button";
import { AppConfig } from "src/config/app.config";
import { useSearchParams } from "react-router-dom";

const ShareKnowNowPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { chats } = useAppSelector((state) => state.KnownowMarket);
  const userId = searchParams.get("userId");

  const userDetail = useAppSelector((state) => state.auth.user);

  const { id } = useParams();

  const chatRef = useRef<HTMLInputElement>(null);
  // const userId = jsCookie.get("user_id");

  useEffect(() => {
    dispatch(
      getMarketChatById({
        user_id: userId || "",
        thread_id: Number(id) || 0,
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
  }, [dispatch]);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const handleButtonClick = () => {
    window.location.href = `https://develop.app.perceivenow.ai/start-conversation`;
  };

  return (
    // <div className="h-screen w-full flex flex-col items-center gap-5 justify-center text-2xl font-bold bg-white-gradient ">
    //   <Link to="/" className="border-b border-black">
    //     <img src={PerceiveLogo} alt="PerceiveNow logo" className="h-[100px] w-[400px]" />
    //   </Link>
    //   <div>In Progress</div>
    // </div>
    <div className="h-[calc(100vh-160px)] px-3 pt-0 pb-0 w-[960px] mx-auto mt-10">
      <div className="w-full relative h-full">
        <div
          ref={chatRef}
          className="h-[calc(100vh-260px)] overflow-y-auto pn_scroller pb-2 pr-2 w-full"
        >
          {chats && chats.length <= 0 && id ? (
            <div className="flex justify-center items-center h-full">
              <LoadingIcon className="h-5 w-5 text-primary-900" />
            </div>
          ) : (
            <>

              {id === undefined ? null : (
                <div className="space-y-6 w-full mt-lg">
                  {((chats && chats) || []).map((chat, idx) => (
                    <div key={idx * 5} className="space-y-3">
                      <ChatQuery query={chat.query} userDetail={userDetail} />
                      <QueryAnswer answer={chat.answer} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center">
        <Button handleClick={handleButtonClick} classname="w-[300px]" rounded="large">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default ShareKnowNowPage;
