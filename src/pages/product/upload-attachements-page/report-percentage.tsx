import { LiquidSphereLoaderIcon } from "src/components/icons";
import { useAppSelector } from "src/hooks/redux";

export default function ReportPercentage() {
  // fetch report percentage from here

  const { requirementPercentage } = useAppSelector((state) => state.uploadAttachments);

  const percentageContent = percentageContentSets.find(
    (content) => requirementPercentage >= content.percentageMargin,
  );

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-x-1">
        <div className="h-[60px] min-w-[60px] max-w-[61px] grid grid-cols-1 justify-center items-center grid-rows-1 overflow-hidden">
          <LiquidSphereLoaderIcon className="row-start-1 col-start-1" />
          <div className="col-start-1 row-start-1 text-white w-fit translate-x-2">
            {requirementPercentage}%
          </div>
        </div>
        <p className="text-purple-900 font-bold text-lg">{percentageContent?.title}</p>
      </div>
      <p className="text-secondary-800 mt-1">{percentageContent?.subtitle}</p>
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
