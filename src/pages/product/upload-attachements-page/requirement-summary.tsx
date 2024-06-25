import { ReactNode } from "react";
import { UseCaseOptions } from "src/components/@report/use-case/__use-cases";
import { LoadingIcon } from "src/components/icons";
import { useAppSelector } from "src/hooks/redux";

export default function RequirementSummary({ children }: { children: ReactNode }) {
  const { fetchRequirementSummaryState, requirementSummary } = useAppSelector(
    (state) => state.uploadAttachments,
  );

  const transformedRequirementSummary: {
    useCaseId: string;
    useCaseName: string;
    summary: string;
  }[] = requirementSummary.map((summaryItem) => {
    return {
      summary: summaryItem.summary,
      useCaseName:
        UseCaseOptions.find((option) => option.useCaseId === Number(summaryItem.useCaseId))
          ?.label ?? "",
      useCaseId: summaryItem.useCaseId,
    };
  });

  const isLoading = fetchRequirementSummaryState.isLoading;

  return (
    <div className="flex flex-row justify-between gap-x-[150px]">
      <div className="flex flex-col min-w-[900px] min-h-[400px] bg-white rounded-lg p-2 shadow-page-content">
        {transformedRequirementSummary.length > 0 && (
          <>
            <p className="font-bold text-[32px] text-secondary-900">Here's a sneak peek!</p>
            <p className="font-semibold text-xl text-secondary-800">
              This summary is based on your requirement, generated by our AI.
            </p>
          </>
        )}
        <div className="text-gray-600 mt-[20px]">
          {isLoading ? (
            <div className="flex flex-row gap-x-1 items-center">
              <p> Fetching requirement summary</p>
              <LoadingIcon />
            </div>
          ) : (
            transformedRequirementSummary.map((item) => (
              <div key={item.useCaseId} className="mb-2">
                <p className="text-base font-bold">
                  {item.useCaseName}
                  {":"}
                </p>

                {item.summary === "" ? (
                  <div>
                    The provided information is not enough to generate a summary. Please continue
                    with the requirement gathering process
                  </div>
                ) : (
                  <p className="text-sm">{item.summary}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
