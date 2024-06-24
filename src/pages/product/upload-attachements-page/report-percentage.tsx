import { useEffect } from "react";
import toast from "react-hot-toast";
import { LiquidSphereLoaderIcon, LoadingIcon } from "src/components/icons";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import {
  fetchRequirementPercentage,
  resetFetchRequirementPercentageState,
} from "src/stores/upload-attachments";

export default function ReportPercentage({
  isAdditionalQuestions,
}: {
  isAdditionalQuestions?: boolean;
}) {
  const dispatch = useAppDispatch();

  const { requirementPercentage, fetchRequirementPercentageState } = useAppSelector(
    (state) => state.uploadAttachments,
  );
  const { requirementGatheringId } = useAppSelector((state) => state.usecases);

  useEffect(() => {
    if (fetchRequirementPercentageState.isError) {
      toast.error(fetchRequirementPercentageState.message);
      dispatch(resetFetchRequirementPercentageState());
      return;
    }

    if (fetchRequirementPercentageState.isSuccess) {
      dispatch(resetFetchRequirementPercentageState());
      return;
    }
  }, [dispatch, fetchRequirementPercentageState]);

  useEffect(() => {
    dispatch(
      fetchRequirementPercentage({
        requirement_gathering_id: requirementGatheringId,
      }),
    );
  }, [dispatch, requirementGatheringId]);

  const percentageContent = percentageContentSets.find(
    (content) => requirementPercentage >= content.percentageMargin,
  );

  const isLoading = fetchRequirementPercentageState.isLoading;

  return (
    <>
      <div className="flex flex-row justify-start items-center gap-x-1">
        <div className="h-[60px] min-w-[60px] max-w-[61px] grid grid-cols-1 justify-center items-center grid-rows-1 overflow-hidden">
          <LiquidSphereLoaderIcon
            className="row-start-1 col-start-1"
            percentage={requirementPercentage}
          />
          <p className="col-start-1 row-start-1 text-white text-center w-full mix-blend-difference">
            {isLoading ? (
              <LoadingIcon className="col-start-1 row-start-1 text-center" />
            ) : (
              <>{requirementPercentage}%</>
            )}
          </p>
        </div>
        {!isAdditionalQuestions && (
          <p className="text-purple-900 font-bold text-lg">{percentageContent?.title}</p>
        )}
      </div>
      {!isAdditionalQuestions && (
        <p className="text-secondary-800 mt-1">{percentageContent?.subtitle}</p>
      )}
    </>
  );
}

const percentageContentSets = [
  {
    percentageMargin: 95,
    title: "Excellent Input! Let’s Create Your Report. ",
    subtitle:
      "The requirements document meets our criteria, we’re all set to begin the report-writing process.",
  },
  {
    percentageMargin: 60,
    title: "Solid Start! A little refinement will make this report truly shine.",
    subtitle: "A little refinement will make this report truly shine.",
  },
  {
    percentageMargin: 0,
    title: "Great first step! Needs Improvement",
    subtitle: "A few more details will help us tailor the report perfectly to your needs.",
  },
];
