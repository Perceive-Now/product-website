import React, { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import { fetchAgentThreadDetails } from "../agent-report.action";
import { useParams } from "react-router-dom";
import DotLoader from "src/components/reusable/dot-loader";
import ChatQuery from "src/components/@vc-product/chat-question";
import QueryAnswer from "src/components/@vc-product/query-answer";
import { processResponse } from "src/utils/helpers";
import ExtractInfo from "src/pages/product/ai-agent/extractInfo";
import PitchDeck from "./Pitch";

interface Props {
  loading: boolean;
  reports: any;
}

const ReportConversation = (props: Props) => {
  const { loading, reports } = props;

  const renderChat = (chat: any, idx: number) => {
    const { options, remainingText } = processResponse(chat.user_message || "");
    const filename_url = chat?.filename_url;
    const { options: optionAnswer, remainingText: remainingTextAnswer } = processResponse(
      chat.assistant_message || "",
    );

    const jsonReportKeys = Object.keys(chat?.json_report || {});

    console.log("jsonReportKeysjsonReportKeys", jsonReportKeys);

    const json_report =
      jsonReportKeys && jsonReportKeys?.[0]?.toLowerCase() === "sections" ? chat.json_report : {};

    console.log("json_report", json_report);

    const dataSources = chat.json_datasources || {};

    return (
      <>
        {remainingText.includes("pitchdeck_summary") ? (
          <PitchDeck user_message={remainingText} filename_url={filename_url} />
        ) : (
          <QueryAnswer
            ido={`chat-[${idx}]`}
            query={chat.query}
            answer={remainingText === "chat_ended" ? "End Conversation" : remainingText || ""}
            isLoading={false}
            setanswer={() => undefined}
            message_id={chat.id || 0}
            options={[]}
            hasselected={true}
            hasbutton={chat.hasbutton || false}
            onSendQuery={() => undefined}
            file={chat.file}
          />
        )}
        <ChatQuery
          query={remainingTextAnswer}
          shouldStream={false}
          json_report={json_report}
          dataSource={dataSources}
        />
        {optionAnswer?.length ? (
          <QueryAnswer
            ido={`chat-[${idx}]`}
            query={chat.query}
            answer={""}
            isLoading={false}
            setanswer={() => undefined}
            message_id={chat.id || 0}
            options={optionAnswer || []}
            hasselected={true}
            hasbutton={chat.hasbutton || false}
            onSendQuery={() => undefined}
            file={chat.file}
          />
        ) : null}
      </>
    );
  };

  return (
    <>
      <div className="px-0 md:px-3 w-full mx-auto ">
        <div className="flex flex-col gap-y-3 lg:flex-row lg:gap-y-0 gap-x-5 lg:gap-x-2">
          <div className="flex-auto relative flex flex-col gap-2 max-w-[780px] mx-auto ">
            <div className="bg-white rounded-lg p-3 w-full  overflow-y-auto pn_scroller shadow-[0_4px_4px_0] shadow-[#000]/[0.06]">
              {loading ? (
                <div className="flex items-center justify-center p-5 h-full">
                  <DotLoader />
                </div>
              ) : null}
              {reports?.conversations
                ?.sort((a: any, b: any) => {
                  const dateA = a.id;
                  const dateB = b.id;
                  return dateA - dateB; // Descending order
                })
                ?.map((chat: any, idx: number) => (
                  <>{renderChat(chat, idx)}</>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportConversation;
