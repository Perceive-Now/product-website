import React, { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SignUpLayout from "../_components/InviteLayout";
import Button from "src/components/reusable/button";
import { profileAvatarSVG, profileEditSVG } from "../../signup/_assets";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";
import toast from "react-hot-toast";
import { Countries } from "src/utils/constants";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import { NEW_BACKEND_URL } from "../../signup/env";
import { AppConfig } from "src/config/app.config";
import { getCompanies, updateUserProfile } from "src/utils/api/userProfile";

const schema = yup.object({
  fullName: yup.string().required("Full name is required"),
  profileImage: yup.mixed().nullable(),
  country: yup.string().required("Country is required"),
});

type FormValues = {
  fullName: string;
  profileImage: File | null | string;
  country: string;
};

const InviteProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const session = useAppSelector((state) => state.sessionDetail.session);
  const user = useAppSelector((state) => state.auth.user);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState({
    email: "",
    role: "",
  });
  const [company, setCompany] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      profileImage: null,
      country: "",
    },
  });

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`${NEW_BACKEND_URL}/user/details/${session?.user_id}`, {
        headers: {
          Accept: "application/json",
          "secret-code": AppConfig.ORGANIZATION_SECRET as string,
        },
      });
      const data = await res.json();

      const companies = await getCompanies();
      const user_company = companies.find(
        (company) => company.id === data?.user_details?.company_id,
      );
      setCompany(user_company?.name || null);
      // Populate email and role
      setUserDetails({
        email: data?.user_details?.email || "",
        role: data?.user_details?.role || "",
      });
      reset({
        fullName: user?.first_name && user?.last_name ? `${user?.first_name} ${user?.last_name}` : "",
        country: user?.country || "",
      });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

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

  function extractName(fullname: string): { first_name: string; last_name: string } {
    const parts = fullname.trim().split(/\s+/);
    return { first_name: parts[0] || "", last_name: parts.slice(1).join(" ") || "" };
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = {
      ...data,
      email: userDetails.email,
      role: userDetails.role,
    };

    const { first_name, last_name } = extractName(data.fullName);
    if (!first_name || !last_name) {
      toast.error("Please enter your full name");
      return;
    }

    const values = {
      first_name,
      last_name,
      country: data.country,
      profile_image: imagePreview,
      company_name: company,
      registration_completed: true,
    };

    if (!company) {
      toast.error("Failed to fetch company details");
      return;
    }

    try {
      const result = await updateUserProfile(values);

      if (result.status === 200) {
        toast.success("Profile details saved successfully", {
          position: "top-right",
        });
        navigate("/invite/review", {
          replace: true,
        });
      } else {
        toast.error("Failed to save profile details", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Failed to save profile details:", error);
      toast.error("Failed to save profile details", {
        position: "top-right",
      });
    }
  };

  return (
    <SignUpLayout currentStep={1} completedSteps={[0]}>
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
              value={userDetails.email}
              disabled
            />
          </div>

          {/* Role (Disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-[10px] border rounded-lg border-gray-300"
              value={userDetails.role}
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
