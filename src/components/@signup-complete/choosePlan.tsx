//
import { QuestionIcon } from "../icons";
import BriefcasePlanIcon from "../icons/miscs/Briefcase_signup";

//
import AddOn from "./@choosePlan/AddOn";
import Button from "../reusable/button";
import DiligenceCard from "./@choosePlan/DiligenceCard";
import TailoredFeature from "./@choosePlan/TailoredFeature";
import ConnectedInsightIcon from "../icons/chooseplan/connectedInsightIcon";
import MAndAIcon from "../icons/chooseplan/MAndAIcon";
import SimilarityCheckIcon from "../icons/chooseplan/SimilarityCheckIcon";
import SummarizeIcon from "../icons/chooseplan/SummarizeIcon";
import MascotIcon from "../icons/chooseplan/MascotIcon";
import { useState } from "react";

//
const addOns = [
  {
    id: "123",
    title: "Technologies",
    description: "This is description",
  },
  {
    id: "492",
    title: "Publications",
    description: "This is description",
  },
  {
    id: "345",
    title: "Companies",
    description: "This is description",
  },
  {
    id: "678",
    title: "Experts",
    description: "This is description",
  },
];

//
const diligenceData = [
  {
    icon: <ConnectedInsightIcon />,
    title: "Connected Insights",
    description:
      "Get powerful hidden insights from connected patents, publications, companies, inventors, universities, technologies, and funders.",
  },
  {
    icon: <MAndAIcon />,
    title: "M&A Strategies",
    description:
      "Get AI-picked results for mergers, acquisitions, investment opportunities to automate deal flows and understand your IP positioning.",
  },
  {
    icon: <SimilarityCheckIcon />,
    title: "Similarity check",
    description:
      "Automate prior art search with similarity correlation of your new claims with existing patent claims.",
  },
  {
    icon: <SummarizeIcon />,
    title: "Summarize",
    description:
      "Perform automated summarization and get the highlights from top patents and publications of your choice.",
  },
  {
    icon: <MascotIcon />,
    title: "Ask our AI mascot!s",
    description: "Chat with our AI mascot to get intuitive responses to IP related questions.",
  },
];

//
export default function ChoosePlanStep(props: ISignupStepProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleAddOnClick = (id: string) => {
    const tempSelectedAddons = [...selectedAddons];
    const index = tempSelectedAddons.findIndex((itemId) => itemId === id);
    if (index >= 0) {
      tempSelectedAddons.splice(index, 1);
      setSelectedAddons(tempSelectedAddons);
    } else {
      tempSelectedAddons.push(id);
      setSelectedAddons(tempSelectedAddons);
    }
  };

  return (
    <div className="p-2 md:p-5 w-full lg:max-w-5xl">
      <div className="flex justify-end">
        <div className="flex flex-col items-end">
          <div className="flex">
            <div className={`font-bold text-primary-900`}>Billed Monthly</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex">
          <div className="mr-2">
            <BriefcasePlanIcon />
          </div>

          <div className="flex flex-col">
            <div className="font-bold text-4xl">PRO</div>

            <div className="text-lg">Quick access Dashboard</div>
          </div>
        </div>

        <div className="flex justify-end flex-col items-end">
          <div className="text-xl">
            <span className="font-bold text-3xl">$790</span>/ month
          </div>

          <div className="text-gray-600">
            For quick access dashboard to help you track and share insights
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-2xl font-bold flex">
          Deep Search Add-ons: <QuestionIcon className="ml-1" />
        </div>
        <div>$100 each</div>

        <div className="grid grid-cols-2 gap-3 gap-x-12 mt-3">
          {addOns.map((addOn) => {
            return (
              <AddOn
                key={addOn.id}
                id={addOn.id}
                title={addOn.title}
                description={addOn.description}
                isAdded={selectedAddons.includes(addOn.id)}
                handleClick={handleAddOnClick}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between">
          <div>
            <div className="text-2xl font-bold">Diligence 360°</div>
            <div className="">For $2000/month you will have access to:</div>
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-primary-900 text-white cursor-pointer">
              Add
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-5 gap-x-8 mt-3">
          {diligenceData.map((data) => {
            return (
              <DiligenceCard
                key={data.title}
                title={data.title}
                icon={data.icon}
                description={data.description}
              />
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-x-2 mt-10">
        <Button type="secondary" rounded="full" handleClick={() => props.handlePrevious()}>
          Go Back
        </Button>

        <Button type="optional" rounded="full" handleClick={() => props.handleNext({})}>
          Continue
        </Button>
      </div>

      <div className="mt-6">
        <TailoredFeature values={props.values} />
      </div>
    </div>
  );
}

//
interface ISignupStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (values?: any) => void;
  handlePrevious: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any;
}

export type TBillingMode = "billedMonthly" | "billedAnnually";
