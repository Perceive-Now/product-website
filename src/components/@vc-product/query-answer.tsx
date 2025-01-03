import { useRef, useState } from "react";
import sanitizeHtml from "sanitize-html";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { useLocation, useParams } from "react-router-dom";
import jsCookie from "js-cookie";
import UserIcon from "../reusable/userIcon";
import { setprevres } from "src/stores/vs-product";

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
  onSendQuery: (query: string, answer: string, file?: File,button?:boolean) => void;
}




type IFeedback = "good" | "bad";

const QueryAnswer = ({
  answer,
  query,
  options,
  setanswer,
  onSendQuery,
  hasselected
}:
Props) => {

  const dispatch = useAppDispatch();
  const userDetail = useAppSelector((state) => state.auth.user);
  const { Step } = useAppSelector((state) => state.VSProduct);


  const userId = jsCookie.get("user_id");

  if (answer === "" && (options === undefined || options?.length === 0 )) return <></>;


  return (
    <>
      {/* {answer!== "" && options!== undefined && ( */}
      <div className="flex flex-wrap items-center justify-end gap-2 mt-2">
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
                    if(options.length === 1 || options.includes("Edit Summary"))
                      onSendQuery(query, stage,undefined,true);
                    else{
                      setanswer(stage);
                      dispatch(setprevres({ answer: stage }));
                    }
                  }}
                  // disabled={stage !== "Edit Summary" ? hasselected : false}
                  disabled = {hasselected}
                  className={`${
                    answer === stage ? "bg-foundationOrange-100 border-secondary-500" : ""
                  } cursor-pointer text-sm rounded-lg py-1 px-2 border hover:border-secondary-500 hover:bg-foundationOrange-100 text-secondary-800`}
                >
                  {stage}
                </button>
              ));
            })()
          ) : (
            <div
              className={`rounded-2xl rounded-br-none flex items-center justify-center px-4 py-2 gap-2 relative select-text bg-foundationOrange-100`}
            >
              {/* <div
                className={`text-secondary-800 text-justify `}
                dangerouslySetInnerHTML={{ __html: sanitizedAnswer }}
              /> */}
              {answer}
            </div>
          )}
        </>
        {/* )} */}
        <div className="pt-3 shrink-0">
          <UserIcon
            first_name={userDetail?.first_name || ""}
            last_name={userDetail?.last_name || ""}
            profile_photo={userDetail?.profile_photo}
          />
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default QueryAnswer;
