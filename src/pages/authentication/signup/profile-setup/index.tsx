import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpLayout from "../_components/layout";
import Button from "src/components/reusable/button";
import { profileAvatarSVG, profileEditSVG } from "../_assets";
import { useLocation, useNavigate } from "react-router-dom";

type FormValues = {
  fullName: string;
  role: string;
  email: string;
  password: string;
  profileImage: File | null;
};

// Validation schema
const schema = yup.object({
  fullName: yup.string().required("Full name is required"),
  role: yup.string().required("Role is required"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    ),
  profileImage: yup.mixed().nullable(),
});

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const invitedData = location.state?.invitedData;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      role: invitedData?.role || "",
      email: invitedData?.email || "",
      password: "",
      profileImage: null,
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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);

    if (invitedData) {
      navigate("/signup/review", {
        replace: true,
        state: {
          invitedData,
          profileData: data,
        },
      }
      );
      return;
    }

    alert("Form submitted successfully!");
    navigate("/signup/plan", {
      replace: true,
      state: {
        invitedData,
        profileData: data,
      },
    });
  };

  return (
    <SignUpLayout
      invitedData={invitedData}
    currentStep={1} completedSteps={[0]}>
      <div className="pt-5 px-8 h-screen">
        <h1 className="text-[19px] font-semibold text-[#373D3F] mb-4">Profile Setup</h1>

        <form className="space-y-4 max-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Image Upload */}
          <div className="flex flex-col gap-y-1">
            <p className="text-sm font-medium text-gray-700">Profile image</p>
            <div
              className={`relative w-[80px] h-[80px] rounded-full bg-gray-300 flex items-center justify-center group`}
            >
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
            <label className="block text-sm font-medium text-gray-700">
              What is your full name?
            </label>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Full name"
                  className={`mt-1 w-full px-3 py-[10px] border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-primary-500"
                  }`}
                />
              )}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is your role within the organization?
            </label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className={`mt-1 w-full px-3 py-[10px] border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.role
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-primary-500"
                  }`}
                  disabled={invitedData?.role}
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="Founder">Founder</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                  <option value="Other">Other</option>
                </select>
              )}
            />
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is your email address?
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="johndoe@orgname.com"
                  className={`mt-1 w-full px-3 py-[10px] border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-primary-500"
                  }`}
                  disabled={invitedData?.email}
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Please create a secure password.
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Password"
                  className={`mt-1 w-full px-3 py-[10px] border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-primary-500"
                  }`}
                />
              )}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-x-4">
            <Button
              htmlType="button"
              classname="w-[120px]"
              type="secondary"
              rounded="full"
              handleClick={() => {
                if (invitedData) {
                  navigate("/signup/organization-setting", {
                    state: { invitedData },
                  });
                  return;
                } else {
                  navigate("/signup/organization-setting")
                }
              }}
            >
              <span className="font-normal">Back</span>
            </Button>
            <Button
              htmlType="submit"
              rounded="full"
              classname="w-[120px] bg-primary-600 text-white p-2 rounded-full"
            >
              <span className="font-normal">Next</span>
            </Button>
          </div>
        </form>
      </div>
    </SignUpLayout>
  );
};

export default ProfileSetup;
