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
import industries from "./option";
import Loading from "src/components/reusable/loading";
import axios from "axios";
import { NEW_BACKEND_URL } from "../env";
import { useAppSelector } from "src/hooks/redux";
import RightArrow from "src/components/icons/common/right-arrow";
import PrimaryButton from "src/components/reusable/button/primary-button";

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

const OrganizationSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const invitedData = location.state?.invitedData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [company, setCompany] = useState<any | null>("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [loading, setLoading] = useState(false);

  const session = useAppSelector((state) => state.sessionDetail.session);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: formSubmitting },
    reset,
  } = useForm<OrganizationDetails>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: {
      organizationName: invitedData?.organization_name || company?.name || "",
      industry: invitedData?.organization_industry || user?.about_me || "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const [user, companies] = await Promise.all([getUserProfile(), getCompanies()]);
        const user_company = companies.find((company) => company.id === user.company_id);
        setUser(user);
        if (user_company) {
          setCompany(user_company);
        }

        if (user_company) {
          reset({
            organizationName: user_company?.name || "",
            industry: industries.includes(user?.about_me as string)
              ? user?.about_me
              : user?.about_me
              ? "Other"
              : "",
            otherIndustry: industries.includes(user?.about_me as string) ? "" : user?.about_me,
          });

          if (!industries.includes(user?.about_me as string) && user?.about_me) {
            setSelectedIndustry("Other");
          }
        } else {
          reset({
            organizationName: "",
            industry: "",
          });
        }

        if (!industries.includes(user?.about_me as string) && user?.about_me) {
          setSelectedIndustry("Other");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleIndustryChange = (event: any) => {
    setSelectedIndustry(event.target.value);
  };

  const onSubmit: SubmitHandler<OrganizationDetails> = async (data) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);

    try {
      const value = {
        company_name: data.organizationName,
        about_me: data.industry === "Other" ? data.otherIndustry : data.industry,
        registration_completed: true,
      };

      const result = await updateUserProfile(value);
      const company = await getCompanies().then((companies) => {
        return companies.find((company) => company.name === data.organizationName);
      });

      const organizationValues = {
        company_name: data.organizationName,
        company_id: company?.id,
        preference: data.industry === "Other" ? data.otherIndustry : data.industry,
      };

      const organizationUpdateResult = await axios.post(
        `${NEW_BACKEND_URL}/user/${session?.user_id}/company`,
        organizationValues,
      );

      if (organizationUpdateResult.status === 200) {
        console.log("Organization Settings Saved Successfully!");
      }

      if (result.status === 200) {
        toast.success("Organization Settings Saved Successfully!", {
          position: "top-right",
        });
        navigate("/signup/profile", {
          replace: true,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SignUpLayout invitedData={invitedData} currentStep={0} completedSteps={[]}>
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
                  "mt-1 block w-full px-3 py-[13px] bg-gray-100 border-[1px] rounded-full focus:outline-none focus:ring-2",
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

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Which industry does your organization belong to?
              </label>
              <select
                id="industry"
                {...register("industry")}
                onChange={handleIndustryChange}
                className={classNames(
                  "mt-1 block w-full px-3 py-[13px] bg-gray-100 border-[1px] rounded-full focus:outline-none focus:ring-2",
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

              {/* for first signup */}
              {selectedIndustry === "Other" && !user?.about_me && !company && (
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
                    className="mt-1 block w-full px-3 py-[13px] bg-gray-100 border-[1px] rounded-full focus:outline-none focus:ring-2"
                    placeholder="Enter industry"
                  />
                </div>
              )}

              {selectedIndustry === "Other" && user?.about_me && (
                <div>
                  <label
                    htmlFor="otherIndustry"
                    className="block text-sm font-medium text-gray-700 mt-3"
                  >
                    Please specify:
                  </label>
                  <input
                    id="otherIndustry"
                    type="text"
                    {...register("otherIndustry")}
                    className="mt-1 block w-full px-3 py-[13px] bg-gray-100 border-[1px] rounded-full focus:outline-none focus:ring-2"
                    placeholder="Enter industry"
                  />
                </div>
              )}

              {errors.industry && (
                <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
              )}
            </div>

            <div className="flex justify-start">
              {/* <Button
                htmlType="submit"
                loading={isSubmitting || formSubmitting}
                disabled={isSubmitting || formSubmitting}
                rounded="full"
                classname="w-[120px] bg-primary-600 text-white p-2"
              >
                <span className="font-normal">Next</span>
              </Button> */}
              <PrimaryButton
                type="submit"
                text="Next"
                icon={<RightArrow />}
                variant="primary"
                loading={isSubmitting || formSubmitting}
              />
              {/* <button
                type="submit"
                className="flex w-[150px] items-center justify-evenly border-4 bg-secondary-500  border-[#442873] rounded-[32px] py-1 px-2 text-lg text-white"
              >
                Next
                <RightArrow className="ml-1" />
              </button> */}
            </div>
          </form>
        </div>
      )}
    </SignUpLayout>
  );
};

export default OrganizationSettings;
