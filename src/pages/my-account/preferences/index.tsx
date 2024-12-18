import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import ProfileModal from "../../../components/modal/profile-modal";
import ChangePasswordModal from "../../../components/modal/changepassword";

import Loading from "../../../components/reusable/loading";
import ProfileIcon from "../../../components/icons/common/profile";
import EditIcon from "../../../components/icons/miscs/Edit";

import { updateUserProfile } from "../../../utils/api/userProfile";
import { setUser } from "../../../stores/auth";
import Button from "src/components/reusable/button";
import { Switch } from "@headlessui/react";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import { Link } from "react-router-dom";
type IModal = "profile" | "password";

/**
 *
 */
const Preferences = () => {
  const dispatch = useAppDispatch();
  const UserDetail = useAppSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    industry:  '',
    agent: '',
    format:'',
  });


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e:any) => {
    console.log("formdata",formData)
    // e.preventDefault();

    // const updatedProfileData = {
    //   first_name: formData.fullName.split(' ')[0],
    //   last_name: formData.fullName.split(' ')[1] || '',
    //   profile_photo: formData.profilePhoto,
    //   company_name: formData.org,
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

//   const updateProfile = useCallback(
//     async (values:any) => {
//       try {
//         console.log("ppppppppppppp")
//         await updateUserProfile(values).then((res) => {
//           if (res.status === 200) {
//             toast.success('Profile updated successfully');
//             dispatch({
//               type: 'SET_USER',
//               payload: { ...values, profile_photo: formData.profilePhoto },
//             });
//           }
//         });
//       } catch (error:any) {
//         toast.error(error.message);
//       }
//     },
//     [dispatch, updateUserProfile]
//   );

 
  if (UserDetail === undefined) {
    return <Loading isLoading={UserDetail === undefined} />;
  }

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
    <div className="p-5">
      <h6 className="text-lg font-semibold ml-0">Settings &gt; Preferences</h6>
      <div className="flex justify-start items-center p-3">
        <Link to="/profile">
          <p className="mr-4 text-secondary-800 flex items-center">
            <ArrowLeftIcon className="mr-1" />
            Back
          </p>
        </Link>
      </div>
    </div>
    <div className="w-[45%] ml-[30%]">
      <form onSubmit={handleSubmit} className="w-full mt-3">
        <div className="mb-2">
          <label htmlFor="industry" className="block text-md text-secondary-800">
            Industry
          </label>
          <select
            id="industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="mt-1 p-[14px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent"
          >
            <option value="">Select</option>
            <option value="founder">Haelthcare</option>
            <option value="admin">Tranport</option>
          </select>
        </div>

        <div className="mb-2">
          <label htmlFor="agent" className="block text-md text-secondary-800">
            Agent
          </label>
          <select
            id="agent"
            name="agent"
            value={formData.agent}
            onChange={handleChange}
            required
            className="mt-1 p-[14px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent"
          >
            <option value="">Select</option>
            <option value="founder">Technology & R&D</option>
            <option value="admin">Healthcare</option>
          </select>
        </div>

        <div className="mb-2">
          <label htmlFor="format" className="block text-md text-secondary-800">
            Report format
          </label>
          <select
            id="format"
            name="format"
            value={formData.format}
            onChange={handleChange}
            required
            className="mt-1 p-[14px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent"
          >
            <option value="">Select</option>
            <option value="pdf">Pdf</option>
            <option value="ppt">PPT</option>
            <option value="word">Word</option>
          </select>
        </div>
        <div className="mt-3 mb-3 flex items-center justify-between">
  <span>Get email alerts when your report is completed</span>
  <Switch
    checked={true}
    onChange={() => {
      // setModalOpen(false);
    }}
    className="bg-primary-900 relative inline-flex mt-1 items-center h-2 rounded-full w-4 mr-1 mb-2"
  >
    <span className="translate-x-2 inline-block w-2 h-2 transform bg-white rounded-full" />
  </Switch>
</div>

        <div className="flex justify-between mt-3">
          <button
            type="submit"
            disabled={Object.values(formData).includes("")} 
            className={`px-5 py-[10px] ${Object.values(formData).includes("") ? "bg-appGray-500 cursor-not-allowed" : "bg-primary-800"} text-white rounded-full focus:outline-none`}
            >
            Save
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Preferences;
