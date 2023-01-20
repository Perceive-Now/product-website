import type { ReactElement, RefObject } from "react";

//
import { CompetitiveLandscapeIcon, EducationIcon, FundingIcon, ResearchIcon } from "../../icons";

/**
 *
 */
export default function Navigator(props: INavigatorProps) {
  const { competitiveLandscapeRef, expertsNetworkRef, researchRef, fundingsRef } = props;

  //
  const scrollToTargetAdjusted = (element?: HTMLDivElement | null) => {
    if (!element) return;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  //
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-[20px] text-primary-900 font-semibold">Navigate to</h3>
      </div>

      <div className="grid grid-cols-12 gap-x-2 mb-3">
        <div className="col-span-3">
          <NavigatorButton
            icon={<CompetitiveLandscapeIcon />}
            label={"Competitive Landscape"}
            handleClick={() => {
              scrollToTargetAdjusted(competitiveLandscapeRef?.current);
            }}
          />
        </div>

        <div className="col-span-3">
          <NavigatorButton
            icon={<EducationIcon />}
            label={"Inventors"}
            handleClick={() => {
              scrollToTargetAdjusted(expertsNetworkRef?.current);
            }}
          />
        </div>

        <div className="col-span-3">
          <NavigatorButton
            icon={<ResearchIcon />}
            label={"Academic R&D"}
            handleClick={() => {
              scrollToTargetAdjusted(researchRef?.current);
            }}
          />
        </div>

        <div className="col-span-3">
          <NavigatorButton
            icon={<FundingIcon />}
            label={"Funding"}
            handleClick={() => {
              scrollToTargetAdjusted(fundingsRef?.current);
            }}
          />
        </div>
      </div>
    </div>
  );
}

//
const NavigatorButton = (props: INavigatorButtonProps) => {
  const { icon, label, handleClick } = props;

  return (
    <div
      className="flex items-center gap-x-2 p-2 rounded-2xl cursor-pointer hover:bg-primary-50 shadow-md border border-gray-200"
      onClick={handleClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

//
interface INavigatorButtonProps {
  icon: ReactElement;
  label: string;
  handleClick: () => void;
}

//
interface INavigatorProps {
  researchRef: RefObject<HTMLDivElement> | null;
  fundingsRef: RefObject<HTMLDivElement> | null;
  expertsNetworkRef: RefObject<HTMLDivElement> | null;
  competitiveLandscapeRef: RefObject<HTMLDivElement> | null;
}
