import { useCallback } from "react";

import Button from "src/components/reusable/button";
import KnowNowHistory from "./chat-history";
//
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
//
import { generateKnowId } from "src/utils/helpers";
import { generateNewId } from "src/stores/know-now1";
import { Link } from "react-router-dom";

const ChatSidebar = () => {
  const dispatch = useAppDispatch();
  const { chatIds } = useAppSelector((state) => state.KnowNowChat);

  const onStart = useCallback(() => {
    const id = generateKnowId();

    dispatch(generateNewId({ id: id }));
  }, [dispatch]);

  return (
    <div className="px-1 space-y-2">
      <Link to={"/start-conversation"}>
        <Button htmlType="button" classname="text-sm" size="small" rounded="small">
          Start new conversation
        </Button>
      </Link>
      <div className="px-1">
        <KnowNowHistory History={(chatIds || []).map((c) => ({ title: c }))} />
      </div>
    </div>
  );
};

export default ChatSidebar;
