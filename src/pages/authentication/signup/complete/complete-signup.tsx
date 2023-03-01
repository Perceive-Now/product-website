/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

//
import { CheckIcon } from "../../../../components/icons";

import {
  ChoosePlanStep,
  CompanyDetailsStep,
  ConfirmDetailsStep,
  IpPortfolioStep,
  PaymentStep,
  UserProfileStep,
} from "../../../../components/@signup-complete";

//
import PerceiveLogo from "../../../../assets/images/logo.svg";

//
import "./complete-signup.css";
import { useAppSelector } from "../../../../hooks/redux";

//
const steps: IStepItem[] = [
  {
    key: "user-profile",
    title: "User Profile",
  },
  {
    key: "company-details",
    title: "Company Details",
  },
  {
    key: "ip-portfolio",
    title: "IP Portfolio",
  },
  {
    key: "confirm-details",
    title: "Confirm Details",
  },
  {
    key: "choose-plan",
    title: "Choose a Plan",
  },
  {
    key: "payment",
    title: "Payment",
  },
];

//
export default function CompleteSignup() {
  const user = useAppSelector((state) => state?.auth?.user);
  const isFirstRef = useRef<isFirstRefProps>({ first: true });

  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  //
  const activeStepItem = steps[activeStep] ?? { key: "success" };

  useEffect(() => {
    if (isFirstRef.current.first && user) {
      const values = {
        first_name: user.firstName,
        last_name: user.lastName,
        "user_company.company_name": user.userCompany?.companyName,
        "user_company.company_location": user.userCompany?.companyLocation,
        "user_company.tech_sector": user.userCompany?.techSector,
        "user_company.team_number": user.userCompany?.teamNumber,
        "user_company.team_member": [{ email: "" }, { email: "" }, { email: "" }],
        job_position: user.jobPosition,
        preferred_keywords: user.preferredKeywords.map((value: any) => value.name).join(", "),
        preferred_journals: user.preferredJournals.map((value: any) => value.name).join(", "),
        strategic_goals: user.strategicGoals,
        "ip_portfolio.publications": user.ipPortfolio?.publications
          ?.map((value: any) => value.publication_name)
          .join(", "),
        "ip_portfolio.patents": user.ipPortfolio?.patents
          ?.map((value: any) => value.patent_name)
          .join(", "),
        "ip_portfolio.scholarly_profile": user.ipPortfolio?.scholarlyProfile,
        "ip_portfolio.orcid_id": user.ipPortfolio?.orcidId,
      };
      setFormValues(values);
      if (user.userCompany.companyLocation) {
        return setActiveStep(1);
      }
      if (user.firstName) {
        return setActiveStep(0);
      }
      isFirstRef.current.first = false;
    }
  }, [user]);

  //
  const gotoPreviousStep = () => {
    const newValue = Math.max(activeStep - 1, 0);
    setActiveStep(newValue);
  };

  //
  const gotoNextStep = (values?: Record<string, unknown>) => {
    const newValue = Math.min(activeStep + 1, steps.length);
    setActiveStep(newValue);

    //
    if (values) {
      setFormValues((current) => ({ ...current, ...values }));
    }
  };

  //
  const jumpToStep = (id: string) => {
    const foundStep = steps.find((step) => step.key === id);
    if (!foundStep) return;

    //
    const foundIndex = steps.indexOf(foundStep);
    if (foundIndex < 0) return;

    //
    setActiveStep(foundIndex);
  };

  // Scroll to top when the form step is changed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeStep]);

  useEffect(() => {
    if (user) {
      if (user?.subscription?.has_subscription) {
        setActiveStep(5);
      } else if (user?.isIpPortfolioCompleted) {
        setActiveStep(3);
      } else if (user?.isCompanyDetailCompleted) {
        setActiveStep(2);
      } else if (user?.isProfileDetailCompleted) {
        setActiveStep(1);
      }
    }
  }, [user]);

  //
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex w-full px-4 py-3 bg-gray-100">
        <img src={PerceiveLogo} alt="PerceiveNow logo" />
      </div>

      <div className="grow flex flex-col items-center px-4 py-7">
        <div className="grid grid-cols-6 gap-x-2 w-full items-start lg:max-w-5xl">
          {steps.map((step, index) => (
            <div
              key={step.key}
              className={classNames("col-span-1", { "step-item": index !== steps.length - 1 })}
            >
              <div className="flex flex-col justify-center items-center text-center">
                <div className="border-2 border-white rounded-full z-20">
                  <div
                    className={classNames(
                      "w-4 h-4 border-2 rounded-full font-semibold flex justify-center items-center",
                      { "bg-green-600 border-green-600 text-white": activeStep > index },
                      { "bg-primary-900 border-primary-900 text-white": activeStep === index },
                      { "bg-white border-gray-400 text-gray-700": activeStep < index },
                    )}
                  >
                    {activeStep > index ? <CheckIcon width={32} height={32} /> : index + 1}
                  </div>
                </div>

                <p
                  className={classNames(
                    { "text-green-600": activeStep > index },
                    { "text-primary-900": activeStep === index },
                    { "text-gray-500": activeStep < index },
                  )}
                >
                  {step.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="my-5 w-full flex justify-center">
          {activeStepItem.key === "user-profile" && (
            <UserProfileStep handleNext={gotoNextStep} values={formValues} />
          )}

          {activeStepItem.key === "company-details" && (
            <CompanyDetailsStep
              handlePrevious={gotoPreviousStep}
              handleNext={gotoNextStep}
              values={formValues}
            />
          )}

          {activeStepItem.key === "ip-portfolio" && (
            <IpPortfolioStep
              handlePrevious={gotoPreviousStep}
              handleNext={gotoNextStep}
              values={formValues}
            />
          )}

          {activeStepItem.key === "confirm-details" && (
            <ConfirmDetailsStep
              handlePrevious={gotoPreviousStep}
              handleNext={gotoNextStep}
              jumpTo={jumpToStep}
              values={formValues}
            />
          )}

          {activeStepItem.key === "choose-plan" && (
            <ChoosePlanStep
              handlePrevious={gotoPreviousStep}
              handleNext={gotoNextStep}
              values={formValues}
            />
          )}

          {activeStepItem.key === "payment" && (
            <PaymentStep handlePrevious={gotoPreviousStep} handleNext={gotoNextStep} />
          )}
        </div>
      </div>
    </div>
  );
}

//
interface IStepItem {
  title: string;
  key: string;
}

interface isFirstRefProps {
  first: boolean;
}
