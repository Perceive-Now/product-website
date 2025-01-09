import { ChangeEvent, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import Loading from "../../../components/reusable/loading";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import { CrossIcon } from "src/components/icons";
import { updateUserProfile } from "../../../utils/api/userProfile";
import { roles } from "./_constants/roles";
import { NEW_BACKEND_URL } from "src/pages/authentication/signup/env";
import Button from "src/components/reusable/button";

type IModal = "profile" | "password";

const AddUser = () => {
  const dispatch = useAppDispatch();
  const UserDetail = useAppSelector((state) => state.auth.user);
  const session = useAppSelector((state) => state.sessionDetail.session);

  const [formData, setFormData] = useState({
    email: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedProfileData = {
      email: formData.email,
      role: formData.role,
    };

    const data = {
      ...updatedProfileData,
      permissions: ["read"],
    };

    try {
      const res = await fetch(`${NEW_BACKEND_URL}/team/invite?user_id=${session?.user_id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.status === 200) {
        toast.success(`Invitation sent to ${formData.email}.`, {
          position: "top-right",
        });
        // reset
        setFormData({
          email: "",
          role: "",
        });
        return;
      } else {
        toast.error("Failed to send user invite!", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to send user invite!", {
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (UserDetail === undefined) {
    return <Loading isLoading={UserDetail === undefined} />;
  }

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
      <div className="p-1">
        <h6 className="text-lg font-semibold ml-0">Settings &gt; User management &gt; User</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/my-users">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
          {/* <p className="ml-auto text-secondary-800 flex items-center cursor-pointer">
            Cancel Invite
            <CrossIcon className="ml-1" />
          </p> */}
        </div>
      </div>
      <div className="w-[660px] mx-auto">
        <form onSubmit={handleSubmit} className="w-full mt-3">
          <div className="mb-2">
            <label htmlFor="email" className="block text-md text-secondary-800">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="mt-1 p-[14px] w-full border border-appGray-600 focus:outline-none rounded-lg bg-transparent"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="role" className="block text-md text-secondary-800">
              Change Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 p-[14px] w-full border border-appGray-600 focus:outline-none rounded-lg bg-transparent"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between mt-4">
            <Button
              htmlType="submit"
              disabled={Object.values(formData).includes("")}
              loading={isSubmitting}
            >
              Send Invite
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
