import { Link, useLocation } from "react-router-dom";

//
import Button from "src/components/reusable/button";
import KnowNowHistory from "./chat-history";

//
import { useAppSelector } from "src/hooks/redux";
import { LoaderIcon } from "react-hot-toast";
import { useEffect, useState } from "react";

/**
 *
 */
const ChatSidebar = () => {
  const location = useLocation();

  //
  const [chats, setChats] = useState([]);

  //
  const { chatIPIds, isFetching } = useAppSelector((state) => state.KnowNowIP);
  const { chatMarketIds, marketChatLoading } = useAppSelector((state) => state.KnownowMarket);

  //
  useEffect(() => {
    if (location.pathname.includes("/know-now/market-intelligence")) {
      setChats(chatMarketIds as any);
    }

    if (location.pathname.includes("/know-now/ip-analysis")) {
      setChats(chatIPIds as any);
    }
    // setChats([]);
  }, [chatIPIds, chatMarketIds, location]);

  console.log("chats knownow",chats);
  return (
    <div className="px-1 space-y-2">
      <Link to={"/start-conversation"}>
        <Button htmlType="button" classname="text-sm" size="small" rounded="small">
          Start new conversation
        </Button>
      </Link>
      <div className="px-1 space-y-">
        <h6 className="text-black">History</h6>
        {(!marketChatLoading && chats.length > 0) || (!isFetching && chats.length >= 0) ? (
          <>
            {chats.length > 0 ? (
              <KnowNowHistory History={chats || []} />
            ) : (
              <div className="text-sm mt-2 text-primary-900 font-semibold">No chats found</div>
            )}
          </>
        ) : (
          <div className="mt-5 flex justify-center ">
            <LoaderIcon className="h-3 w-3" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
