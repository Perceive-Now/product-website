import { CompetitiveLandscapeIcon, EducationIcon, FundingIcon, ResearchIcon } from "../../icons";

/**
 *
 */
export default function Navigator(props: any) {
  const { competitiveLandscapeRef, expertsNetworkRef, researchRef, fundingsRef } = props;

  //
  const scrollToTargetAdjusted = (element: HTMLDivElement) => {
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
            Icon={CompetitiveLandscapeIcon}
            label={"Competitive Landscape"}
            handleClick={() => {
              scrollToTargetAdjusted(competitiveLandscapeRef.current);
            }}
          />
        </div>

        <div className="col-span-3">
          <NavigatorButton
            Icon={EducationIcon}
            label={"Experts Network"}
            handleClick={() => {
              scrollToTargetAdjusted(expertsNetworkRef.current);
            }}
          />
        </div>

        <div className="col-span-3">
          <NavigatorButton
            Icon={ResearchIcon}
            label={"Academic R&D"}
            handleClick={() => {
              scrollToTargetAdjusted(researchRef.current);
            }}
          />
        </div>

        <div className="col-span-3">
          <NavigatorButton
            Icon={FundingIcon}
            label={"Funding"}
            handleClick={() => {
              scrollToTargetAdjusted(fundingsRef.current);
            }}
          />
        </div>
      </div>
    </div>
  );
}

const NavigatorButton = (props: INavigatorButtonProps) => {
  const { Icon, label, handleClick } = props;

  return (
    <div
      className="flex items-center gap-x-2 p-2 rounded-2xl cursor-pointer hover:bg-primary-50 shadow-md border border-gray-200"
      onClick={handleClick}
    >
      <Icon />
      <span>{label}</span>
    </div>
  );
};

interface INavigatorButtonProps {
  Icon: any;
  label: string;
  handleClick: () => void;
}
