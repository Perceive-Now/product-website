import {
  CompetitiveLandscapeIcon,
  EducationIcon,
  FundingIcon,
  ResearchIcon,
} from "../../icons";

/**
 *
 */
export default function Navigator({
  competitiveLandscapeRef,
  expertsNetworkRef,
  researchRef,
  fundingsRef,
}: any) {
  const scrollToTargetAdjusted = (element: HTMLDivElement) => {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-[20px] text-primary-900 font-semibold">
          Navigate to
        </h3>
      </div>

      <div className="flex w-full mb-3">
        <NavigatorButton
          Icon={CompetitiveLandscapeIcon}
          label={"Competitive Landscape"}
          handleClick={() => {
            scrollToTargetAdjusted(competitiveLandscapeRef.current);
          }}
        />

        <NavigatorButton
          Icon={EducationIcon}
          label={"Experts Network"}
          handleClick={() => {
            scrollToTargetAdjusted(expertsNetworkRef.current);
          }}
        />

        <NavigatorButton
          Icon={ResearchIcon}
          label={"Academic R&D"}
          handleClick={() => {
            scrollToTargetAdjusted(researchRef.current);
          }}
        />

        <NavigatorButton
          Icon={FundingIcon}
          label={"Funding"}
          handleClick={() => {
            scrollToTargetAdjusted(fundingsRef.current);
          }}
        />
      </div>
    </div>
  );
}

const NavigatorButton = ({
  Icon,
  label,
  handleClick,
}: INavigatorButtonProps) => {
  return (
    <div
      className="flex items-center flex-grow px-2 py-2 mr-4 shadow-[0_0_12px_0_rgba(36,39,43,0.08)] 
      rounded-2xl min-w-[268px] cursor-pointer hover:bg-primary-50"
      onClick={handleClick}
    >
      <div>{<Icon />}</div>

      <div className="ml-2">{label}</div>
    </div>
  );
};

interface INavigatorButtonProps {
  Icon: any;
  label: string;
  handleClick: () => void;
}
