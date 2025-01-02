import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import SignUpLayout from "../_components/layout";
import Button from "src/components/reusable/button";
import { useLocation, useNavigate } from "react-router-dom";
import { getCompanies, getUserProfile, updateUserProfile } from "src/utils/api/userProfile";
import toast from "react-hot-toast";

type OrganizationDetails = {
  organizationName: string;
  industry: string;
};

// Yup Schema for Validation
const schema = yup.object({
  organizationName: yup.string().required("Organization name is required"),
  industry: yup.string().required("Please select an industry"),
});

const OrganizationSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const invitedData = location.state?.invitedData;
  console.log(invitedData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [company, setCompany] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: formSubmitting  },
    reset
  } = useForm<OrganizationDetails>({
    resolver: yupResolver(schema),
    mode: "onTouched", // Show errors on blur/touch
    defaultValues: {
      organizationName: invitedData?.organization_name || company?.name || "",
      industry: invitedData?.organization_industry || company?.industry || "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserProfile();
        const companies = await getCompanies();
        const user_company = companies.find((company) => company.id === user.company_id);
        setUser(user);
        setCompany(user_company);

        // Update the form values with the fetched data
      reset({
        organizationName: invitedData?.organization_name || user_company?.name || "",
        industry: invitedData?.organization_industry || user_company?.industry || "",
      });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const onSubmit: SubmitHandler<OrganizationDetails> = async (data) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);

    try {
      const value = {
        company_name: data.organizationName,
        about_me: data.industry,
        registration_completed: true
      };
      const result = await updateUserProfile(value);
      if (result.status === 200) {
        toast.success("Organization Settings Saved Successfully!");
        navigate("/signup/profile", {
          replace: true,
        })
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SignUpLayout
    invitedData={invitedData}
      currentStep={0}
      completedSteps={[]} // Pass an empty array since no steps are completed yet
    >
      <div className="pt-5 px-8">
        <h1 className="text-[19px] font-semibold text-[#373D3F]">Organization Settings</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 max-w-[550px]" noValidate>
          {/* Organization Name Input */}
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
              disabled={invitedData?.organization_name}
              placeholder="Enter organization name"
            />
            {errors.organizationName && (
              <p className="mt-1 text-sm text-red-600">{errors.organizationName.message}</p>
            )}
          </div>

          {/* Industry Select */}
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
              Which industry does your organization belong to?
            </label>
            <select
              id="industry"
              {...register("industry")}
              className={classNames(
                "mt-1 block w-full px-3 py-[13px] bg-gray-100 border rounded-lg focus:outline-none focus:ring-2",
                errors.industry
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary-500",
              )}
              defaultValue="Healthcare"
              disabled={invitedData?.organization_industry}
            >
              <option value="" disabled>
                Select an industry
              </option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
            </select>
            {errors.industry && (
              <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
            )}
          </div>

          {/* Submit Button */}
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
    </SignUpLayout>
  );
};

export default OrganizationSettings;
