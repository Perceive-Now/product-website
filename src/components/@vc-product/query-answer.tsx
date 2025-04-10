import { useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import jsCookie from "js-cookie";
import UserIcon from "../reusable/userIcon";
import { setprevres } from "src/stores/vs-product";
import UploadedFileItem from "./UploadedFile";
import { Dialog } from "@headlessui/react";
import Button from "../reusable/button";
import DiligenceAgentThinking from "src/pages/product/ai-agent/AgentInit";

interface Props {
  isLoading: boolean;
  query: string;
  message_id: number;
  setanswer: (query: string) => void;
  options?: string[];
  answer: string;
  ido: string;
  hasbutton: boolean;
  hasselected: boolean;
  onSendQuery: (query: string, answer: string, file?: File, button?: boolean) => void;
  file?: File;
  disabled?: boolean;
  threadId?: string;
  initLoading?: boolean;
  index?: number;
}

type IFeedback = "good" | "bad";

const QueryAnswer = ({
  answer,
  query,
  options,
  setanswer,
  onSendQuery,
  hasselected,
  file,
  disabled,
  threadId,
  initLoading,
  index,
}: Props) => {
  const dispatch = useAppDispatch();
  const userDetail = useAppSelector((state) => state.auth.user);
  const { Step } = useAppSelector((state) => state.VSProduct);

  const navigate = useNavigate();

  const userId = jsCookie.get("user_id");

  const [showSubmit, setShowSubmit] = useState(false);

  const closeSubmit = () => {
    setShowSubmit(false);
  };

  const [directSubmit, setDirectSubmit] = useState(false);

  // if (answer === "" && (options === undefined || options?.length === 0)) return <></>;

  return (
    <>
      {/* {answer!== "" && options!== undefined && ( */}
      <div className={`flex flex-wrap items-center justify-end gap-2 ${index === 0 ? "" : "mt-2"}`}>
        {/* {answer === "Loading..." ? (
            <DotLoader />
          ) : ( */}
        <>
          {options && options.length > 0 ? (
            (() => {
              let stages: any = [];
              try {
                stages = options
                  // .replace(/[\[\]"']/g, "")
                  // .split(",")
                  .map((stage) => stage.trim())
                  .filter((stage) => stage);
              } catch (e) {
                console.error("Failed to parse stages:", e);
              }

              return stages.map((stage: any, index: any) => (
                <button
                  key={index}
                  onClick={() => {
                    // onSendQuery(query, stage,undefined,true);
                    // setanswer(stage);
                    // dispatch(setprevres({ answer: stage }));

                    // if(Step == 2 && stage === "Looks good" || Step == 3 && stage === "Continue" || Step == 4  && stage === "Skip and proceed to step 5" ||Step == 5 && stage === "Continue")
                    if (
                      options.length === 1 &&
                      (options.includes("Submit") || options.includes("End Conversation"))
                    ) {
                      setShowSubmit(true);
                      setDirectSubmit(true);
                    } else if (options.length === 1 || options.includes("Edit Summary")) {
                      onSendQuery(query, stage, undefined, true);
                      setDirectSubmit(true);
                    } else {
                      setanswer(stage);
                      setDirectSubmit(false);
                      dispatch(setprevres({ answer: stage }));
                    }
                  }}
                  // disabled={stage !== "Edit Summary" ? hasselected : false}
                  disabled={hasselected}
                  className={`${
                    answer === stage ? "bg-foundationOrange-100 border-secondary-500" : ""
                  } cursor-pointer text-sm rounded-lg py-1 px-2 border border-secondary-500 hover:bg-foundationOrange-100 text-secondary-800`}
                >
                  {stage}
                </button>
              ));
            })()
          ) : file !== undefined ? (
            <div className="bg-foundationOrange-100 border-secondary-500 p-2 rounded-2xl rounded-br-none">
              <UploadedFileItem file={file} />
            </div>
          ) : (
            answer && (
              <div
                className={`rounded-2xl rounded-br-none whitespace-pre-line flex items-center justify-center px-4 py-2 gap-2 relative select-text bg-foundationOrange-100`}
              >
                {index === 0 ? <DiligenceAgentThinking agentName="" loading={initLoading} /> : null}
                {answer}
              </div>
            )
          )}
        </>
        {/* )} */}

        <>
          {directSubmit || (!options?.length && answer) ? (
            <div className="pt-3 shrink-0">
              <UserIcon
                first_name={userDetail?.first_name || ""}
                last_name={userDetail?.last_name || ""}
                profile_photo={userDetail?.profile_photo}
              />
            </div>
          ) : null}
        </>
      </div>
      <Dialog
        open={showSubmit}
        onClose={() => {
          undefined;
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-white w-full max-w-[400px] min-w-[400px] p-5 rounded-xl shadow-[7px_9px_14px_0] shadow-[#000]/[0.25]">
            <p className="text-lg font-bold mb-4">{"Ready to submit?"}</p>
            <p>
              {"If needed, review your requirements again. Edits won’t be possible once submitted."}
            </p>
            <div className="flex gap-2 mt-4">
              <Button type="gray" handleClick={closeSubmit}>
                Go Back
              </Button>
              <Button
                type="primary"
                handleClick={() => {
                  onSendQuery("", "End Conversation", undefined, true);
                  navigate(`/ai-agent-customization?thread_id=${threadId}&user_id=${userId}`);
                  closeSubmit();
                }}
              >
                Confirm Submission
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {/* )} */}
    </>
  );
};

export default QueryAnswer;
