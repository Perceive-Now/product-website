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
import Select from "react-select";

/**
 *
 */
const Preferences = () => {
  const dispatch = useAppDispatch();
  const UserDetail = useAppSelector((state) => state.auth.user);
  const [selectedAgentOptions, setSelectedAgentOptions] = useState([]);
  const [selectedFormatOptions, setSelectedFormatOptions] = useState([]);
  const [alertEnabled, setAlertEnabled] = useState(true);

  const agentOptions = [
    { value: "founder", label: "Technology & R&D" },
    { value: "admin", label: "Healthcare" },
  ];
  const formatOptions = [
    { value: "pdf", label: "Pdf" },
    { value: "ppt", label: "PPT" },
    { value: "word", label: "Word" },
  ];

  const handleAgentChange = (selected: any) => {
    setSelectedAgentOptions(selected);
  };

  const handleFormatChange = (selected: any) => {
    setSelectedFormatOptions(selected);
  };

  const [formData, setFormData] = useState({
    industry: "",
    agent: "",
    format: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    console.log("formdata", formData);
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

  const customStyles = {
    control: (base: any) => ({
      ...base,
      padding: "8px",
      width: "100%",
      borderColor: "#87888C",
      borderRadius: "8px",
      backgroundColor: "transparent",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#87888C",
      },
    }),

    placeholder: (base: any) => ({
      ...base,
      color: "black",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      display: "none",
    }),
  };

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
      <div className="p-1">
        <h6 className="text-lg font-semibold ml-0">Settings &gt; Preferences</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/profile">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
      </div>
      <div className="w-[660px] mx-auto">
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
              className="mt-1 p-[14px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent appearance-none"
            >
              <option value="">Select</option>
              <option value="founder">Healthcare</option>
              <option value="admin">R&D</option>
            </select>
          </div>

          <div className="mb-2">
            <label htmlFor="agent" className="block text-md text-secondary-800">
              Agent
            </label>
            <Select
              id="agent"
              name="agent"
              // value={""}
              onChange={handleAgentChange}
              options={agentOptions}
              isMulti
              placeholder="Select"
              className="mt-1 w-full"
              // closeMenuOnSelect={false}
              styles={customStyles}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="format" className="block text-md text-secondary-800">
              Report format
            </label>
            <Select
              id="format"
              name="format"
              // value={""}
              onChange={handleFormatChange}
              options={formatOptions}
              isMulti
              placeholder="Select"
              className="mt-1 w-full"
              // closeMenuOnSelect={false}
              styles={customStyles}
            />
          </div>
          <div className="mb-2 flex items-center justify-between">
            <span>Get email alerts when your report is completed</span>
            {/* <Switch
              checked={true}
              onChange={() => {
                // setModalOpen(false);
              }}
              className="bg-primary-900 relative inline-flex mt-1 items-center h-2 rounded-full w-4 mr-1 mb-2"
            >
              <span className="translate-x-2 inline-block w-2 h-2 transform bg-white rounded-full" />
            </Switch> */}

            <Switch
              checked={alertEnabled}
              onChange={setAlertEnabled}
              className={`${
                alertEnabled ? "bg-primary-900" : "bg-gray-200"
              } relative inline-flex h-3 w-7 items-center rounded-full transition-colors duration-200 ease-in-out`}
            >
              <span
                className={`${
                  alertEnabled ? "translate-x-5" : "translate-x-1"
                } inline-block h-2 w-2 transform rounded-full bg-white transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>

            <button
              type="submit"
              disabled={!formData.industry || selectedAgentOptions.length > 0 || setSelectedFormatOptions.length > 0}
              className={`px-5 py-[10px] ${!formData.industry || selectedAgentOptions.length === 0 || setSelectedFormatOptions.length === 0
                  ? "bg-appGray-500 cursor-not-allowed"
                  : "bg-primary-800"
              } text-white rounded-full focus:outline-none`}
            >
              Save
            </button>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
