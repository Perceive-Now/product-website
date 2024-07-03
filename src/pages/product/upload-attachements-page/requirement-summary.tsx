import { ReactNode } from "react";
import { UseCaseOptions } from "src/components/@report/use-case/__use-cases";
import { useAppSelector } from "src/hooks/redux";
import { questionList } from "../report-q&a/_question";
import { Link } from "react-router-dom";

export default function RequirementSummary({ children }: { children: ReactNode }) {
  const { fetchRequirementSummaryState, requirementSummary } = useAppSelector(
    (state) => state.uploadAttachments,
  );
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
      (question) => usecases.includes(question.usecase) || question.usecase === "common-question",
    )
    .filter((question) => {
      if (question.usecase !== "common-question") return true;
      const usecase = usecases.find((usecase) => usecase === question.usecase);
      const usecaseOption = UseCaseOptions.find((option) => option.value === usecase);
      return usecaseOption?.commonQuestionIds.includes(question.questionId) ?? false;
    })
    .map((question) => {
      return question.question;
    });

  return (
    <div className="flex flex-row justify-between gap-x-[50px]">
      <div className="flex xl:grid xl:grid-cols-2 flex-col lg:min-w-[400px] xl:max-w-[800px] 2xl:max-w-[900px] w-full min-h-[400px] max-h-[500px] pn_scroller overflow-y-auto bg-white rounded-lg p-2 shadow-page-content">
        <div className="flex flex-col">
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

        <div className="flex flex-row h-fit w-full">
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
                    console.log("hello");
                  }}
                  className="text-right text-primary-900 font-bold underline mt-1"
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
