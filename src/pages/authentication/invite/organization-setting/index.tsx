import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import InviteLayout from "../_components/InviteLayout";
import Button from "src/components/reusable/button";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import industries from "./option";
import Loading from "src/components/reusable/loading";

// Define form types
type OrganizationDetails = {
  organizationName: string;
  industry: string;
  otherIndustry?: string;
};

// Yup Schema for Validation
const schema = yup.object({
  organizationName: yup.string().required("Organization name is required"),
  industry: yup.string().required("Please select an industry"),
  otherIndustry: yup.string().when("industry", {
    is: "Other",
    then: yup.string().required("Please specify the industry"),
    otherwise: yup.string(),
  }),
});

const OrganizationInviteSetting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract invite data from navigation state
  const invitedData = location.state?.invitedData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(
    invitedData?.organization_industry || "",
  );
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: formSubmitting },
    reset,
  } = useForm<OrganizationDetails>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      organizationName: invitedData?.organization_name || "",
      industry: invitedData?.organization_industry || "",
    },
  });

  useEffect(() => {
    // Initialize form values based on invited data
    if (invitedData) {
      reset({
        organizationName: invitedData.organization_name || "",
        industry: industries.includes(invitedData.organization_industry)
          ? invitedData.organization_industry
          : invitedData.organization_industry
          ? "Other"
          : "",
        otherIndustry: industries.includes(invitedData.organization_industry)
          ? ""
          : invitedData.organization_industry,
      });

      if (
        !industries.includes(invitedData.organization_industry) &&
        invitedData.organization_industry
      ) {
        setSelectedIndustry("Other");
      }
    }
  }, [invitedData, reset]);

  const handleIndustryChange = (event: any) => {
    setSelectedIndustry(event.target.value);
  };

  const onSubmit: SubmitHandler<OrganizationDetails> = async (data) => {
    setIsSubmitting(true);

    try {
      const value = {
        company_name: data.organizationName,
        about_me: data.industry === "Other" ? data.otherIndustry : data.industry,
        registration_completed: true,
      };

      toast.success("Organization Settings Saved Successfully!", {
        position: "top-right",
      });

      navigate("/invite/profile", {
        replace: true,
        state: {
          invitedData: {
            ...invitedData,
            organization_name: data.organizationName,
            organization_industry: data.industry === "Other" ? data.otherIndustry : data.industry,
          },
        },
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <InviteLayout invitedData={invitedData} currentStep={0} completedSteps={[]}>
      {loading ? (
        <Loading width="50px" height="50px" isLoading={loading} />
      ) : (
        <div className="pt-5 px-8">
          <h1 className="text-[19px] font-semibold text-[#373D3F]">Organization Settings</h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-4 max-w-[550px]"
            noValidate
          >
            <div>
              <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
                What is your organization’s name?
              </label>
              <input
                id="organizationName"
                type="text"
                {...register("organizationName")}
                className={classNames(
                  "mt-1 block w-full px-3 py-[13px] bg-gray-100 border rounded-lg focus:outline-none focus:ring-2",
                  errors.organizationName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary-500",
                )}
                disabled={!!invitedData?.organization_name}
                placeholder="Enter organization name"
              />
              {errors.organizationName && (
                <p className="mt-1 text-sm text-red-600">{errors.organizationName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Which industry does your organization belong to?
              </label>
              <select
                id="industry"
                {...register("industry")}
                onChange={handleIndustryChange}
                className={classNames(
                  "mt-1 block w-full px-3 py-[13px] bg-gray-100 border rounded-lg focus:outline-none focus:ring-2",
                  errors.industry
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary-500",
                )}
              >
                <option value="" disabled>
                  Select an industry
                </option>
                {industries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              {selectedIndustry === "Other" && (
                <div>
                  <label
                    htmlFor="otherIndustry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Please specify:
                  </label>
                  <input
                    id="otherIndustry"
                    type="text"
                    {...register("otherIndustry")}
                    className="mt-1 block w-full px-3 py-[13px] bg-gray-100 border rounded-lg focus:outline-none focus:ring-2"
                    placeholder="Enter industry"
                  />
                </div>
              )}

              {errors.industry && (
                <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
              )}
            </div>

            <div className="flex justify-start">
              <Button
                htmlType="submit"
                loading={isSubmitting || formSubmitting}
                disabled={isSubmitting || formSubmitting}
                rounded="full"
                classname="w-[120px] bg-primary-600 text-white p-2"
              >
                <span className="font-normal">Next</span>
              </Button>
            </div>
          </form>
        </div>
      )}
    </InviteLayout>
  );
};

export default OrganizationInviteSetting;
