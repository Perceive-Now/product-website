import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Link } from "react-router-dom";
import ProfileModal from "../../../components/modal/profile-modal";
import ChangePasswordModal from "../../../components/modal/changepassword";

import Loading from "../../../components/reusable/loading";
import ProfileIcon from "../../../components/icons/common/profile";
import EditIcon from "../../../components/icons/miscs/Edit";

import { updateUserProfile } from "../../../utils/api/userProfile";
import { setUser } from "../../../stores/auth";
import Button from "src/components/reusable/button";
import TrashIcon from "src/components/icons/common/trash";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
type IModal = "profile" | "password";

/**
 *
 */
const EditUser = () => {
  const dispatch = useAppDispatch();
  const UserDetail = useAppSelector((state) => state.auth.user);

  const [modal, setModal] = useState<IModal | null>(null);
  const [modalType, setModalType] = useState<any>();
  const [photo, setPhoto] = useState<any>();

  const [formData, setFormData] = useState({
    fullName: "Robert Junior",
    email: "peterdenkewy@companyname.com",
    role: "admin",
    report: 4,
    profilePhoto: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // const updatedProfileData = {
    //   first_name: formData.fullName.split(' ')[0],
    //   last_name: formData.fullName.split(' ')[1] || '',
    //   profile_photo: formData.profilePhoto,
    //   job_position: formData.role,
    //   email: formData.email,
    //   full_name: formData.fullName,
    //   registration_completed: true,
    //   id: UserDetail?.id,
    // };

    // try {
    //   await updateProfile(updatedProfileData);
    //   toast.success('Profile updated successfully!');
    // } catch (error) {
    //   toast.error('Failed to update profile!');
    // }
  };

  const updateProfile = useCallback(
    async (values: any) => {
      try {
        console.log("ppppppppppppp");
        await updateUserProfile(values).then((res) => {
          if (res.status === 200) {
            toast.success("Profile updated successfully");
            dispatch({
              type: "SET_USER",
              payload: { ...values, profile_photo: formData.profilePhoto },
            });
          }
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [dispatch, updateUserProfile],
  );

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e?.target?.files?.[0];
    if (file) {
      // const sizeInMB = (file.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB and fix to 2 decimal places
      // setSize(parseFloat(sizeInMB));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        updateProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (UserDetail === undefined) {
    return <Loading isLoading={UserDetail === undefined} />;
  }

  return (
    <>
      <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
        <div className="p-5">
          <h6 className="text-lg font-semibold ml-0">Settings &gt; User management &gt; User</h6>
          <div className="flex justify-start items-center p-3">
            <Link to="/my-users">
              <p className="mr-4 text-secondary-800 flex items-center">
                <ArrowLeftIcon className="mr-1" />
                Back
              </p>
            </Link>
            <p className="ml-auto text-secondary-800 flex items-center">
              Delete Member
              <TrashIcon className="ml-1" />
            </p>{" "}
          </div>
        </div>

        <div className="w-[45%] mt-6 ml-[30%]">
          <div className="rounded-full over w-[100px] h-[100px] bg-appGray-200 flex items-center justify-center relative mt-0.5">
            {photo ? (
              <img
                src={photo}
                alt="profile_picture"
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <ProfileIcon />
            )}
            <label className="hover:cursor-pointer bottom-0 right-0 rounded-full w-[24px] h-[24px] bg-appGray-200 flex items-center justify-center absolute">
              <EditIcon />
              <input type="file" onChange={onSelectFile} accept="image/*" className="hidden" />
            </label>
          </div>

          <div className="mt-5 flex flex-row">
            <div className="flex flex-col mr-4">
              <label htmlFor="fullName" className="text-md text-secondary-800">
                Full Name
              </label>
              <label htmlFor="email" className="text-md text-secondary-800 mt-4">
                Email address
              </label>
              <label htmlFor="report" className="text-md text-secondary-800 mt-4">
                Report
              </label>
            </div>

            <div className="flex flex-col">
              <span className="p-1 bg-appGray-200 rounded-md">{formData.fullName}</span>
              <span className="p-1 bg-appGray-200 mt-2 rounded-md">{formData.email}</span>
              <span className="p-1 bg-appGray-200 mt-2 rounded-md">{formData.report}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full mt-3">
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
                <option value="founder">Founder</option>
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="px-5 py-[10px] bg-appGray-500 text-white rounded-full hover:bg-gray-500 focus:outline-none"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
