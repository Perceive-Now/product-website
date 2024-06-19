import { Link } from "react-router-dom";

//
import Button from "src/components/reusable/button";
import KnowNowHistory from "./chat-history";

//
import { useAppSelector } from "src/hooks/redux";

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
      <div className="px-1">
        {chatIds && chatIds.length > 0 && <KnowNowHistory History={chatIds || []} />}
      </div>
    </div>
  );
};

export default ChatSidebar;
