import React from "react";
import SignUpLayout from "../_components/layout";
import Button from "src/components/reusable/button";
import { profileAvatarSVG, profileEditSVG } from "../_assets";

const ProfileSetup = () => {
  return (
    <SignUpLayout currentStep={1} completedSteps={[0]}>
      <div className="pt-5 px-8 h-screen">
        <h1 className="text-[19px] font-semibold text-[#373D3F] mb-4">Profile Setup</h1>

        {/* Profile Setup Form */}
        <form className="space-y-4 max-w-[500px]">
          {/* Profile Image Upload */}
          <div className="flex flex-col gap-y-1">
            <p className="text-sm font-medium text-gray-700">Profile image</p>
            <div className="relative w-[80px] h-[80px] rounded-full bg-gray-300 flex items-center justify-center">
              <img src={profileAvatarSVG} alt="Profile Avatar" />
              <div className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-1">
                <img
                  src={profileEditSVG}
                  alt="Edit Profile"
                />
              </div>
            </div>
            <input id="profileImage" type="file" className="hidden" />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is your full name?
            </label>
            <input
              type="text"
              placeholder="Full name"
              className="mt-1 w-full px-3 py-[10px] border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is your role within the organization?
            </label>
            <select
              className="mt-1 w-full px-3 py-[10px] border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="Founder">Founder</option>
              <option value="Manager">Manager</option>
              <option value="Developer">Developer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What is your email address?
            </label>
            <input
              type="email"
              placeholder="johndoe@orgname.com"
              className="mt-1 w-full px-3 py-[10px] border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Please create a secure password.
            </label>
            <input
              type="password"
              placeholder="Password"
              className="mt-1 w-full px-3 py-[10px] border bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-x-4">
            <Button htmlType="button" classname="w-[120px]" type="secondary" rounded="full">
              <span className="font-normal">Back</span>
            </Button>
            <Button
              htmlType="submit"
              classname="w-[120px] bg-primary-600 text-white p-2 rounded-full"
              rounded="full"
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
