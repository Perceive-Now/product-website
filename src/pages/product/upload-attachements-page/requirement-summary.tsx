import { ReactNode, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { UseCaseOptions } from "src/components/@report/use-case/__use-cases";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import {
  fetchRequirementSummary,
  resetFetchRequirementSummaryState,
} from "src/stores/upload-attachments";

export default function RequirementSummary({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isInitialLoad = useRef<boolean>(true);

  const { requirementGatheringId, useCaseIds } = useAppSelector((state) => state.usecases);
  const { fetchRequirementSummaryState, requirementSummary } = useAppSelector(
    (state) => state.uploadAttachments,
  );

  useEffect(() => {
    if (fetchRequirementSummaryState.isError) {
      if (location.pathname !== "/quick-prompt") toast.error("Unable to fetch requirement summary");
      dispatch(resetFetchRequirementSummaryState());
      return;
    }

    if (fetchRequirementSummaryState.isSuccess) {
      dispatch(resetFetchRequirementSummaryState());
      return;
    }
  }, [fetchRequirementSummaryState, dispatch, location]);

  useEffect(() => {
    dispatch(
      fetchRequirementSummary({
        requirement_gathering_id: String(requirementGatheringId),
        useCaseIds: useCaseIds,
      }),
    );
    isInitialLoad.current = false;
  }, [dispatch, requirementGatheringId, useCaseIds]);

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

      {children}
    </div>
  );
}
