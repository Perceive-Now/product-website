import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpLayout from "../_components/InviteLayout";
import Button from "src/components/reusable/button";
import { profileAvatarSVG, profileEditSVG } from "../../signup/_assets";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeClosedIcon, EyeIcon } from "src/components/icons";
import classNames from "classnames";
import toast from "react-hot-toast";
import { Countries } from "src/utils/constants";
import { newSignupUser } from "src/stores/auth";
import { useAppDispatch } from "src/hooks/redux";

// Validation schema using Yup
const schema = yup.object({
  fullName: yup.string().required("Full name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    ),
  profileImage: yup.mixed().nullable(),
  country: yup.string().required("Country is required"),
});

type FormValues = {
  fullName: string;
  password: string;
  profileImage: File | null | string;
  country: string;
};

function extractName(fullname: string): { first_name: string; last_name: string } {
  const parts = fullname.trim().split(/\s+/);
  return { first_name: parts[0] || "", last_name: parts.slice(1).join(" ") || "" };
}

const InviteProfileSetup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const invitedData = location.state?.invitedData;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      password: "",
      profileImage: null,
      country: "",
    },
  });

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { first_name, last_name } = extractName(data.fullName);
    const formData = {
      first_name,
      last_name,
      password: data.password,
      profileImage: imagePreview || "",
      country: data.country,
      email: invitedData?.email,
      company_name: invitedData?.organization_name,
      job_position: invitedData?.role,
      registration_completed: true,
    };

    console.log(formData, "dataa");

    try {
      const response = await dispatch(newSignupUser(formData)).unwrap();
      console.log(response, "response");
      if (response.success) {
        toast.success("Please confirm your email to get started.", {
          position: "top-right",
        });
        navigate("/invite/review", {
          state: {
            invitedData,
            formData,
          },
        });
      } else {
        toast.error(response.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
    }
  };

  const passwordValue = watch("password");

  return (
    <SignUpLayout invitedData={invitedData} currentStep={1} completedSteps={[0]}>
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
                  className="mt-1 w-full px-3 py-[10px] border rounded-lg border-gray-300"
                />
              )}
            />
            {errors.fullName && (
              <p className="text-xs text-danger-500 mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email (Disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-[10px] border rounded-lg border-gray-300"
              value={invitedData?.email || ""}
              disabled
            />
          </div>

          {/* Role (Disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-[10px] border rounded-lg border-gray-300"
              value={invitedData?.role || ""}
              disabled
            />
          </div>

          {/* Country Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="mt-1 w-full px-3 py-[10px] border rounded-lg border-gray-300"
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
            {errors.country && (
              <p className="text-xs text-danger-500 mt-1">{errors.country.message}</p>
            )}
          </div>

          {/* Password */}
          <fieldset className="mt-2">
            <div className="mt-0.5 rounded-md shadow-sm relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type={isPasswordVisible ? "text" : "password"}
                    className={classNames(
                      "appearance-none border block w-full pl-2 pr-7 py-[10px] border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                      errors.password
                        ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                        : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                    )}
                    placeholder="Password"
                  />
                )}
              />

              {passwordValue && (
                <div
                  className="absolute top-0 right-2 h-full flex items-center text-gray-600 cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <EyeClosedIcon /> : <EyeIcon />}
                </div>
              )}
            </div>

            {errors.password && (
              <p className="text-xs text-danger-500 mt-1">{errors.password.message}</p>
            )}
          </fieldset>

          {/* Buttons */}
          <div className="flex gap-x-4">
            <Button
              htmlType="submit"
              rounded="full"
              classname="w-[120px] bg-primary-600 text-white p-2"
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </SignUpLayout>
  );
};

export default InviteProfileSetup;
