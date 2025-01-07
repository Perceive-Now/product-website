import React, { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import SignUpLayout from "../_components/InviteLayout";
import Button from "src/components/reusable/button";
import { profileAvatarSVG, profileEditSVG } from "../../signup/_assets";
import { useLocation } from "react-router-dom";

type FormValues = {
  fullName: string;
  password: string;
  profileImage: File | null | string;
};

const InviteProfileSetup: React.FC = () => {
  const location = useLocation();
  const invitedData = location.state?.invitedData;

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
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
    const formData = {
      fullName: data.fullName,
      password: data.password,
      profileImage: imagePreview,
      email: invitedData?.email,
      role: invitedData?.role,
    };

    // try {
    //   const res =
    // }

    console.log(formData);
  };

  return (
    <SignUpLayout invitedData={invitedData} currentStep={1} completedSteps={[0]}>
      <div className="pt-5 px-8 h-screen">
        <h1 className="text-[19px] font-semibold text-[#373D3F] mb-4">Profile Setup</h1>
        <form className="space-y-4 max-w-[500px]" onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Image Upload */}
          <div className="flex flex-col gap-y-1">
            <p className="text-sm font-medium text-gray-700">Profile image</p>
            <div
              className="relative w-[80px] h-[80px] rounded-full bg-gray-300 flex items-center justify-center group"
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="mt-1 w-full px-3 py-[10px] border rounded-lg border-gray-300"
                  placeholder="Enter password"
                />
              )}
            />
          </div>

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
