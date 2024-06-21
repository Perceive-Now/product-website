import { Link } from "react-router-dom";

//
import Button from "src/components/reusable/button";
import KnowNowHistory from "./chat-history";

//
import { useAppSelector } from "src/hooks/redux";
import { LoaderIcon } from "react-hot-toast";

/**
 *
 */
const ChatSidebar = () => {
  const { chatIds } = useAppSelector((state) => state.KnowNowChat);

  return (
    <div className="px-1 space-y-2">
      <Link to={"/start-conversation"}>
        <Button htmlType="button" classname="text-sm" size="small" rounded="small">
          Start new conversation
        </Button>
      </Link>
      <div className="px-1 space-y-">
        <h6 className="text-black">History</h6>
        {chatIds ? (
          <>
            {chatIds.length > 0 ? (
              <KnowNowHistory History={chatIds || []} />
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
