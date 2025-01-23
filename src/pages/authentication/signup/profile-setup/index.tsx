import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpLayout from "../_components/layout";
import Button from "src/components/reusable/button";
import { profileAvatarSVG, profileEditSVG } from "../_assets";
import { useLocation, useNavigate } from "react-router-dom";
import { getCompanies, getUserProfile, updateUserProfile } from "src/utils/api/userProfile";
import toast from "react-hot-toast";
import { useAppSelector } from "src/hooks/redux";
import { Countries } from "src/utils/constants";
import { roles } from "./_constants/roles";
import Loading from "src/components/reusable/loading";

type FormValues = {
  fullName: string;
  role: string;
  email: string;
  password: string;
  profileImage: File | null | string;
  country: string;
  otherRole?: string; // Field for additional role-based information
};

const schema = yup.object({
  fullName: yup.string().required("Full name is required"),
  role: yup.string().required("Role is required"),
  country: yup.string().required("Country is required"),
  profileImage: yup.mixed().nullable(),
  otherRole: yup.string().when("role", {
    is: (role: string) => role && role === "Other", // Conditional validation for "Other"
    then: yup.string().required("This field is required"),
  }),
});

function extractName(fullname: string): { first_name: string; last_name: string } {
  const parts = fullname.trim().split(/\s+/);
  return { first_name: parts[0] || "", last_name: parts.slice(1).join(" ") || "" };
}

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const invitedData = location.state?.invitedData;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      role: invitedData?.role || "",
      email: invitedData?.email || "",
      password: "",
      country: "",
      profileImage: null,
      otherRole: "",
    },
  });

  const selectedRole = watch("role");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setValue("profileImage", file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = await getUserProfile();
        setUser(user);
        setImagePreview(user?.profile_photo || null);

        const job_position = roles.includes(user?.job_position as string)
          ? (user?.job_position as string)
          : "";

        console.log(job_position);
        reset({
          fullName:
            user?.first_name && user?.last_name ? `${user?.first_name} ${user?.last_name}` : "",
          role: job_position,
          otherRole: job_position === "Other" ? (user?.job_position as string) : "",
          profileImage: user?.profile_photo || "",
          email: user?.email || "",
          country: user?.country || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { first_name, last_name } = extractName(data.fullName);
    if (!first_name || !last_name) {
      toast.error("Please enter your full name.", {
        position: "top-right",
      });
      return;
    }
    const userProfile = await getUserProfile();
    const totalCompanies = await getCompanies();
    const company_name = totalCompanies.find((c) => c.id === userProfile.company_id)?.name;

    const values = {
      first_name,
      last_name,
      role: data.role,
      registration_completed: true,
      company_name,
      job_position: data.role === "Other" ? data.otherRole : data.role,
      profile_photo: imagePreview || user?.profile_photo || "",
      email: data.email || user?.email,
      country: data.country,
      additional_info: data.otherRole || "", // Include additional info
    };

    try {
      const response = await updateUserProfile(values);
      if (response.status === 200) {
        toast.success("Profile setup completed successfully!", {
          position: "top-right",
        });
        navigate("/signup/team", { replace: true });
      } else {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <SignUpLayout invitedData={invitedData} currentStep={1} completedSteps={[0]}>
      {loading ? (
        <Loading width="50px" height="50px" isLoading={loading} />
      ) : (
        <div className="pt-5 px-8 h-screen">
          <h1 className="text-[19px] font-semibold text-[#373D3F] mb-4">Profile Setup</h1>
          <form className="space-y-4 max-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Image Upload */}
            <div className="flex flex-col gap-y-1">
              <p className="text-sm font-medium text-gray-700">Profile image</p>
              <div className="relative w-[80px] h-[80px] rounded-full bg-gray-300 flex items-center justify-center group">
                <img
                  src={imagePreview || profileAvatarSVG}
                  alt="Profile Avatar"
                  className={`object-cover ${
                    imagePreview ? "w-full h-full rounded-full" : "w-[30px] h-[30px]"
                  }`}
                />
                <div className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-1">
                  <label htmlFor="profileImage">
                    <img src={profileEditSVG} alt="Edit Profile" />
                  </label>
                </div>
              </div>
              <input
                id="profileImage"
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Full name"
                    className={`mt-1 w-full px-3 py-[10px] border rounded-lg ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`mt-1 w-full px-3 py-[10px] border rounded-lg ${
                      errors.role ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            {/* Additional Info for Other Roles */}
            {selectedRole === "Other" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Specify your role</label>
                <Controller
                  name="otherRole"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Provide additional details for your role"
                      className={`mt-1 w-full px-3 py-[10px] border rounded-lg ${
                        errors.otherRole ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.otherRole && (
                  <p className="text-red-500 text-sm">{errors.otherRole.message}</p>
                )}
              </div>
            )}

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className={`mt-1 w-full px-3 py-[10px] border rounded-lg ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="" disabled>
                      Select country
                    </option>
                    {Countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
            </div>

            {/* Buttons */}
            <div className="flex gap-x-4">
              <Button
                htmlType="button"
                classname="w-[120px]"
                type="secondary"
                rounded="full"
                handleClick={() => navigate("/signup/organization-setting")}
              >
                Back
              </Button>
              <Button
                htmlType="submit"
                rounded="full"
                classname="w-[120px] bg-primary-600 text-white p-2"
                loading={isSubmitting}
              >
                Next
              </Button>
            </div>
          </form>
        </div>
      )}
    </SignUpLayout>
  );
};

export default ProfileSetup;
