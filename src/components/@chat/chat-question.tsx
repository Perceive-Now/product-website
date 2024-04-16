import React from "react";

interface Props {
  query: string;
}

const ChatQuery = ({ query }: Props) => {
  return (
    <div className="flex items-center gap-3">
      {" "}
      <div className="bg-appGray-200 rounded-full h-[30px] w-[30px] shrink-0" />
      <p className="text-secondary-800">{query}</p>
    </div>
  );
};

export default ChatQuery;
