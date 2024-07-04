import { ReactNode } from "react";
import { UseCaseOptions } from "src/components/@report/use-case/__use-cases";
import { useAppSelector } from "src/hooks/redux";
import { questionList } from "../report-q&a/_question";
import { Link } from "react-router-dom";
import classNames from "classnames";
import uploadAttachmentsPages from "./upload-attachment-pages-list";
import {
  decrementStep,
  EUploadAttachmentsPages,
  setCurrentPageId,
} from "../../../stores/upload-attachments";
import { useDispatch } from "react-redux";

export default function RequirementSummary({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();

  const { fetchRequirementSummaryState, requirementSummary, requirementPercentage, currentPageId } =
    useAppSelector((state) => state.uploadAttachments);
  const { usecases } = useAppSelector((state) => state.usecases);

  const transformedRequirementSummary = requirementSummary
    .map((summaryItem) => {
      if (summaryItem && "summary" in summaryItem) {
        return {
          summary: summaryItem.summary,
          useCaseName:
            UseCaseOptions.find((option) => option.useCaseId === Number(summaryItem.useCaseId))
              ?.label ?? "",
          useCaseId: summaryItem.useCaseId,
        };
      } else if (summaryItem && "contentSummary" in summaryItem) {
        return {
          contentSummary: summaryItem.contentSummary,
        };
      } else return null;
    })
    .filter((f) => f !== null);

  const fullQuestionsList = questionList
    .filter(
      (question) =>
        usecases.includes(question.usecase) ||
        question.usecase === "common-question" ||
        question.usecase === "ip-validity-analysis" ||
        question.usecase === "prior-art-search",
    )
    .filter((question) => {
      if (question.usecase !== "ip-validity-analysis" && question.usecase !== "prior-art-search")
        return true;
      if (usecases.includes("ip-validity-analysis") && question.usecase === "ip-validity-analysis")
        return true;
      if (usecases.includes("prior-art-search") && question.usecase === "prior-art-search")
        return true;
      if (usecases.includes("ip-validity-analysis") && question.usecase === "prior-art-search")
        return true;
      if (usecases.includes("prior-art-search") && question.usecase === "ip-validity-analysis")
        return true;
    })
    .filter((question) => {
      if (question.usecase !== "common-question") return true;
      let isIncludeCommonQuestion = false;
      usecases.forEach((usecase) => {
        const usecaseOption = UseCaseOptions.find((option) => option.value === usecase);
        if (usecaseOption?.commonQuestionIds.includes(question.questionId))
          isIncludeCommonQuestion = true;
      });
      return isIncludeCommonQuestion;
    })
    .map((question) => {
      return question.question;
    });

  const handleBackToAttachments = () => {
    const currentPageIdIndex = uploadAttachmentsPages.findIndex(
      (page) => page.id === currentPageId,
    );
    const uploadAttachmentsPageIndex = uploadAttachmentsPages.findIndex(
      (page) => page.id === EUploadAttachmentsPages.UploadAttachments,
    );
    const difference = currentPageIdIndex - uploadAttachmentsPageIndex;
    for (let i = 0; i < difference; i++) dispatch(decrementStep());

    dispatch(setCurrentPageId(EUploadAttachmentsPages.UploadAttachments));
  };

  return (
    <div className="flex flex-row justify-between gap-x-[50px]">
      <div className="flex xl:grid xl:grid-cols-2 flex-col lg:min-w-[400px] xl:max-w-[800px] 2xl:max-w-[900px] w-full min-h-[400px] max-h-[500px] pn_scroller overflow-y-auto bg-white rounded-lg p-2 shadow-page-content">
        <div className={classNames("flex flex-col", { "col-span-2": requirementPercentage > 95 })}>
          {transformedRequirementSummary.length > 0 && (
            <>
              <p className="font-bold text-[32px] text-secondary-900">Here's a sneak peek!</p>
              <p className="font-semibold text-xl text-secondary-800">
                This summary is based on your requirement, generated by our AI.
              </p>
            </>
          )}
          <div className="text-gray-600 mt-[20px]">
            {!fetchRequirementSummaryState.isLoading ? (
              transformedRequirementSummary.map((item) => {
                if (item && "contentSummary" in item) {
                  return (
                    <div key={item.contentSummary} className="mb-2">
                      {item.contentSummary === "" ? (
                        <div>
                          The provided information is not enough to generate a summary. Please
                          continue with the requirement gathering process
                        </div>
                      ) : (
                        <p className="text-sm font-medium">{item.contentSummary}</p>
                      )}
                    </div>
                  );
                } else if (item && "summary" in item) {
                  return (
                    <div key={item.useCaseId} className="mb-2">
                      <p className="text-base font-bold">
                        {item.useCaseName}
                        {":"}
                      </p>

                      {item.summary === "" ? (
                        <div>
                          The provided information is not enough to generate a summary. Please
                          continue with the requirement gathering process
                        </div>
                      ) : (
                        <p className="text-sm">{item.summary}</p>
                      )}
                    </div>
                  );
                }
              })
            ) : (
              <div>Fetching requirement summary</div>
            )}
          </div>
        </div>

        <div
          className={classNames("flex flex-row h-fit w-full", {
            hidden: requirementPercentage > 95,
          })}
        >
          <div className="w-[2px] min-h-[400px]  my-[5px] bg-appGray-200 mx-[20px] xl:block hidden"></div>
          <div className="flex flex-col">
            {fullQuestionsList.length > 0 && (
              <>
                <p className="font-bold text-[32px] text-secondary-900">Improve Your Score!</p>
                <p className="font-semibold text-xl text-secondary-800">
                  To enhance your performance percentages, add more relevant details that address
                  the questions below.
                </p>
                <Link
                  to=""
                  onClick={() => {
                    handleBackToAttachments();
                  }}
                  className={classNames("text-right text-primary-900 font-bold underline mt-1", {
                    hidden: requirementPercentage > 60,
                  })}
                >
                  Add attachments
                </Link>
              </>
            )}
            <div className="text-gray-600 mt-[20px]">
              {fullQuestionsList.map((question, index) => {
                return (
                  <div key={question} className="mb-2">
                    <p className="text-sm font-medium">
                      <span>{index + 1}</span>
                      <span>{". "}</span>
                      <span>{question}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
