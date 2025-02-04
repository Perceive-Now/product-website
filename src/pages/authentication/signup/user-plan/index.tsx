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

const UserPlan = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = React.useState("Launch");

  const plans = [
    { title: "Launch", price: "39" },
    { title: "Accelerate", price: "39" },
    { title: "Ascend", price: "39" },
  ];

  const handleNext = async () => {
    try {
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
    }
  };

  return (
    <SignUpLayout currentStep={2} completedSteps={[0, 1]}>
      <div className="p-4">
        <h1 className="text-2xl my-6">Plan Selection</h1>
        <div className="flex justify-center space-x-4">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              selected={selectedPlan === plan.title}
              onSelect={() => setSelectedPlan(plan.title)}
            />
          ))}
        </div>
        <div className="flex flex-col gap-y-4 border">
          <AgentTable />
          <ReportCustomizationTable />
          <ReportContentCustomizationTable />
          <KnowNowChat />
          <QuickViewReports />
          <ExplainableAI />
        </div>

        <div className="flex mt-3 gap-x-2">
          <PrimaryButton
            onClick={() => navigate("/authentication/signup/user-info")}
            text="Back"
            icon={<RightArrow className="rotate-180 mr-1" />}
            variant="secondary"
            className="flex-row-reverse"
          />
          <PrimaryButton
            onClick={handleNext}
            text="Next"
            icon={<RightArrow  />}
            variant="primary"
          />
        </div>
      </div>
    </SignUpLayout>
  );
};

export default UserPlan;
