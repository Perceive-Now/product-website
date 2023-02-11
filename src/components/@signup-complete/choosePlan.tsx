import { useState } from "react";
import { BriefcaseIcon } from "../icons";
import BriefcasePlanIcon from "../icons/miscs/Briefcase_signup";
import Button from "../reusable/button";
import AddOn from "./AddOn";
import DiligenceCard from "./DiligenceCard";

const addOns = [
  {
    id: 123,
    title: "Technologies",
    description: "This is description",
  },
  {
    id: 492,
    title: "Publications",
    description: "This is description",
  },
  {
    id: 345,
    title: "Companies",
    description: "This is description",
  },
  {
    id: 678,
    title: "Experts",
    description: "This is description",
  },
];
//
export default function ChoosePlanStep(props: ISignupStepProps) {
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
          <div className="mr-1">
            <BriefcasePlanIcon />
          </div>

          <div className="flex flex-col">
            <div className="font-bold text-4xl">PRO</div>

            <div className="text-lg">Quick access Dashboard</div>
          </div>
        </div>

        <div className="flex justify-end flex-col items-end">
          <div className="text-xl">
            <span className="font-bold text-3xl">$7,110</span>/ year
          </div>

          <div className="text-gray-600">
            For quick access dashboard to help you track and share insights
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-2xl font-bold">Deep Search Add-ons:</div>
        <div className="">$100 each</div>

        <div className="grid grid-cols-2 gap-3 gap-x-12 mt-2">
          {addOns.map((addOn) => {
            return (
              <AddOn
                key={addOn.id}
                id={addOn.id}
                title={addOn.title}
                description={addOn.description}
                isAdded={false}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <div className="text-2xl font-bold">Diligence 360°</div>
        <div className="">For $2000/month you will have access to:</div>

        <div className="grid grid-cols-2 gap-y-5 gap-x-8 mt-3">
          {addOns.map((addOn) => {
            return <DiligenceCard key={addOn.id} />;
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

      <div className="mt-6 p-2">
        <div className="font-bold text-2xl mb-1">Looking for Tailored feature set ?</div>

        <div className="text-xl">
          Contact us for accessing features only specific to your use cases and for customized
          diligence.
        </div>
      </div>
    </div>
  );
}

//
interface ISignupStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (values?: any) => void;
  handlePrevious: () => void;
}

export type TBillingMode = "billedMonthly" | "billedAnnually";
