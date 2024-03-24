import ArrowLeftIcon from "../../../../components/icons/common/arrow-left";
import Button from "../../../../components/reusable/button";

interface Props {
  changeActiveStep: (step: number) => void;
}

const SubscriptionPlans = [
  {
    title: "Basic",
    plan: "$200/month",
    description: [
      "Reports at $1780 each with rollover",
      "Dashboard with summaries",
      "Latest research insights",
      "Visual data highlights",
    ],
  },
  {
    title: "Pro",
    plan: "$4,400/month",
    description: [
      "Includes all Basic features",
      "3 reports/month included",
      "Extra reports at $1480 per report",
      "Advanced analytics dashboard",
      "Quarterly trend insights",
      "Sector-specific updates",
    ],
  },
  {
    title: "Premium",
    plan: "$7,800/month",
    description: [
      "Includes all Pro features",
      "10 reports/month included",
      "Strategic guidance from a dedicated manager",
      "Custom research on demand",
      "Detailed trend analysis",
      "Extra reports at $1180 per report",
      "Monthly executive summaries",
      "Full regulatory and impact updates",
    ],
  },
];

const SubscriptionPlan = ({ changeActiveStep }: Props) => {
  return (
    <div className="">
      <div className="flex items-center gap-0.5">
        <Button type="default" size="default" handleClick={() => changeActiveStep(2)}>
          <ArrowLeftIcon />
        </Button>
        <h4 className="font-bold text-[22px] text-primary-900">Select your plan</h4>
      </div>
      <div className="grid grid-cols-3 gap-2.5 mt-2.5">
        {SubscriptionPlans.map((plan) => (
          <div
            key={plan.title}
            className="p-2.5 rounded-lg bg-appGray-100 text-secondary-800 h-[481px] flex flex-col justify-between"
          >
            <div>
              <h6 className="font-bold ">{plan.title}</h6>
              <p className="text-secondary-800 text-sm font-semibold">{plan.plan}</p>
              <hr className="my-2.5 border-appGray-600 border-1 h-px" />
              <ul className="list-disc text-sm">
                {plan.description.map((d) => (
                  <li key={d} className="ml-2.5 text-sm">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <Button type="secondary" classname="w-full" size="small">
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
