import React from "react";
import Button from "src/components/reusable/button";
import SignUpLayout from "../_components/layout";
import PricingCard from "./_components/PricingCard";
import AgentTable from "./_components/tables/AgentTable";
import ReportCustomizationTable from "./_components/tables/ReportDesignCustomizationTable";
import ReportContentCustomizationTable from "./_components/tables/ReportContentCustomizationTable";
import KnowNowChat from "./_components/tables/KnowNowChat";
import QuickViewReports from "./_components/tables/QuickViewReport";
import ExplainableAI from "./_components/tables/ExplainableAI";
import PrimaryButton from "src/components/reusable/button/primary-button";
import RightArrow from "src/components/icons/common/right-arrow";
import { useNavigate } from "react-router-dom";
import { getCompanies, getUserProfile, updateUserProfile } from "src/utils/api/userProfile";
import toast from "react-hot-toast";
import DataSetsTable from "./_components/tables/Datasets";
import PlansTable from "./_components/tables/PlansTable";

const UserPlan = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = React.useState("Ascend");
  const [loading, setLoading] = React.useState(false);

  const plans = [
    {
      title: "Launch",
      designedFor: "Investors & Startup Founders",
      description:
        "Equip yourself with a foundational AI toolkit designed to turn ideas into action and build early momentum. Best suited for those at the inception stage of their journey, navigating the complexities of innovation and investment.",
    },
    {
      title: "Accelerate",
      designedFor: "SMBs, Consultants, and Marketing Firms",
      description:
        "Streamline decision-making and optimize strategies for sustained growth with AI-powered insights. Best suited for professionals and organizations focused on scaling operations, refining business models, and maximizing efficiency.",
    },
    {
      title: "Ascend",
      designedFor: "Enterprises, PE Firms, and Investment Banks",
      description:
        "Drive measurable ROI and elevate your strategic decision-making with advanced analytics and predictive insights. Best suited for leaders and organizations making high-stakes, data-driven business moves with long-term vision.",
    },
  ];

  const handleNext = async () => {
    try {
      setLoading(true);
      const UserDetails = await getUserProfile();
      const totalCompanies = await getCompanies();
      const company_name = totalCompanies.find((c) => c.id === UserDetails.company_id)?.name;

      const values = {
        subscription_type: selectedPlan,
        registration_completed: true,
        company_name,
      };

      const result = await updateUserProfile(values);
      if (result.status === 200) {
        toast.success("Plan selected successfully", {
          position: "top-right",
        });
        navigate("/signup/team");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpLayout currentStep={2} completedSteps={[0, 1]}>
      <div className="p-4">
        <h1 className="text-lg my-4">Solution Overview</h1>
        <div className="bg-[#FFA300] w-fit py-1 px-2 text-[#373D3F] rounded-sm my-2 text-base">
          Your 30-Day Free Trial – Explore Everything!
        </div>
        <p className="text-base text-[#373D3F] mb-4">
          You’ll have full access to all features for 30 days. When your trial ends, simply choose
          the plan that fits you best—no rush!
        </p>
        <div className="flex justify-center space-x-4">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              designedFor={plan.designedFor}
              description={plan.description}
              selected={selectedPlan === plan.title}
              onSelect={() => console.log("plan")}
            />
          ))}
        </div>
        <div className="flex flex-col gap-y-4 border mt-5">
          <AgentTable currentPlan={selectedPlan} />
          <DataSetsTable />
          <ReportCustomizationTable />
          <KnowNowChat />
          <QuickViewReports />
          <ExplainableAI />
          <ReportContentCustomizationTable />
        </div>

        <div className="flex mt-3 gap-x-2">
          <PrimaryButton
            onClick={() => navigate("/signup/profile")}
            text="Back"
            icon={<RightArrow className="rotate-180 mr-1" />}
            variant="secondary"
            className="flex-row-reverse"
          />
          <PrimaryButton
            onClick={handleNext}
            text="Next"
            icon={<RightArrow />}
            variant="primary"
            loading={loading}
          />
        </div>
      </div>
    </SignUpLayout>
  );
};

export default UserPlan;
