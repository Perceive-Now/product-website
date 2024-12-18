import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import ProfileModal from "../../../components/modal/profile-modal";
import ChangePasswordModal from "../../../components/modal/changepassword";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import { Link } from "react-router-dom";
import Loading from "../../../components/reusable/loading";
import ProfileIcon from "../../../components/icons/common/profile";
import EditIcon from "../../../components/icons/miscs/Edit";

import { updateUserProfile } from "../../../utils/api/userProfile";
import { setUser } from "../../../stores/auth";
import Button from "src/components/reusable/button";
type IModal = "profile" | "password";

/**
 *
 */
const Basics = () => {
  const dispatch = useAppDispatch();
  const UserDetail = useAppSelector((state) => state.auth.user);
  const [modal, setModal] = useState<IModal | null>(null);
  const [modalType, setModalType] = useState<any>();
  const [photo, setPhoto] = useState<any>();

  const [formData, setFormData] = useState({
    fullName: UserDetail?.full_name || '',
    email: UserDetail?.email || '',
    org: UserDetail?.company_name || '',
    role: UserDetail?.job_position || '',  
    profilePhoto: UserDetail?.profile_photo || null ,
  });


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const updatedProfileData = {
      first_name: formData.fullName.split(' ')[0],
      last_name: formData.fullName.split(' ')[1] || '',
      profile_photo: formData.profilePhoto,
      company_name: formData.org,
      job_position: formData.role,
      email: formData.email,
      full_name: formData.fullName,
      registration_completed: true,
      id: UserDetail?.id,
    };

    try {
      await updateProfile(updatedProfileData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile!');
    }
  };

  const updateProfile = useCallback(
    async (values:any) => {
      try {
        console.log("ppppppppppppp")
        await updateUserProfile(values).then((res) => {
          if (res.status === 200) {
            toast.success('Profile updated successfully');
            dispatch(
              setUser({
                first_name: values.first_name,
                last_name: values.last_name,
                profile_photo: values.profile_photo,
                company_name: values?.company_name,
                job_position: values?.job_position,
                email: values.email,
                id: values.id || ("" as any),
                full_name: values.full_name || "",
                registration_completed: true,
              }),
            );
          }
        });
      } catch (error:any) {
        toast.error(error.message);
      }
    },
    [dispatch, updateUserProfile]
  );

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e?.target?.files?.[0];
    if (file) {
      // const sizeInMB = (file.size / (1024 * 1024)).toFixed(2); // Convert bytes to MB and fix to 2 decimal places
      // setSize(parseFloat(sizeInMB));

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string; 
        // setPhoto(reader.result);
        setFormData(prevData => ({
          ...prevData,
          profilePhoto: result,
        }));
        // updateProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  
  if (UserDetail === undefined) {
    return <Loading isLoading={UserDetail === undefined} />;
  }

  return (
    // <>
    // <div>
    // <div className="flex flex-col items-center justify-center h-screen">
    //   <h6 className="text-2xl font-bold text-primary-900">Profile</h6>
    //   <div className="w-full">
    //     <div className="flex flex-col w-[900px] items-center justify-center">
    //       <div className="rounded-full over w-[100px] h-[100px] bg-appGray-200 flex items-center justify-center relative mt-0.5">
    //         {photo ? (
    //           <img
    //             src={photo}
    //             alt="profile_picture"
    //             className="h-full w-full rounded-full object-cover"
    //           />
    //         ) : (
    //           <ProfileIcon />
    //         )}
    //         <label className="hover:cursor-pointer bottom-0 right-0 rounded-full w-[24px] h-[24px] bg-appGray-200 flex items-center justify-center absolute">
    //           <EditIcon />
    //           <input type="file" onChange={onSelectFile} accept="image/*" className="hidden" />
    //         </label>
    //       </div>
    //       <div className="space-y-[20px] w-full mt-2">

    //           <div className="p-[20px] space-y-[8px]">
    //             {ProfilesData.map((profile, idx) => (
    //               <div key={idx * 79} className="flex items-center gap-[60px] text-secondary-800">
    //                 <div className="w-[80px]">{profile.label}</div>
    //                 <div>{profile.value || "N/A"}</div>
    //               </div>
    //             ))}
    //             {/* <div className="flex items-center justify-end">
    //               <Button
    //                 startIcon={<EditIcon className="text-primary-900" />}
    //                 htmlType="button"
    //                 type={"default"}
    //                 size="default"
    //                 handleClick={() => setModal("password")}
    //                 classname="text-primary-900 p-0"
    //               >
    //                 <span>Change Password</span>
    //               </Button>
    //             </div> */}
    //           </div>
    //       </div>
    //     </div>
    //   </div>
    //   </div>
    //   {/* ----------------Modal--------------- */}
    //   {UserDetail && (
    //     <ProfileModal
    //       open={modal === "profile"}
    //       onClose={() => setModal(null)}
    //       userDetail={UserDetail}
    //       modalType={modalType}
    //       photo={photo ? photo : UserDetail?.profile_photo}
    //     />
    //   )}
    //   <ChangePasswordModal open={modal === "password"} onClose={() => setModal(null)} />
    //   </div>
    // </>

    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10">
    <div className="p-5">
      <h6 className="text-lg font-semibold ml-0">Settings &gt; Basics</h6>
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
      <div className="rounded-full over w-[100px] h-[100px] bg-appGray-200 flex items-center justify-center relative mt-0.5">
        {formData?.profilePhoto ? (
          <img
            src={formData.profilePhoto}
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
      <form onSubmit={handleSubmit} className="w-full mt-3">
        <div className="mb-2 w-full">
          <label htmlFor="fullName" className="block text-md  text-secondary-800">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block text-md text-secondary-800">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            disabled={true}
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="mt-1 p-[14px] w-full border rounded-lg"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="org" className="block text-md text-secondary-800">
            Organization
          </label>
          <input
            type="text"
            id="org"
            name="org"
            disabled={true}
            value={formData.org}
            onChange={handleChange}
            placeholder="Organization"
            required
            className="mt-1 p-[14px] w-full rounded-lg"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="role" className="block text-md text-secondary-800">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            disabled={true}
            value={formData.role}
            onChange={handleChange}
            placeholder="Organization"
            required
            className="mt-1 p-[14px] w-full rounded-lg"
          />
        </div>

        {/* <div className="mb-2">
          <label htmlFor="role" className="block text-md text-secondary-800">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={true}
            required
            className="mt-1 p-[14px] w-full  bg-[#EFEFEF4D]  rounded-lg"
          >
            <option value="">Select Role</option>
            <option value="founder">Founder</option>
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </div> */}

        <div className="text-end m-0 text underline cursor-pointer" onClick={() => setModal("password")}>Change password</div>
        <div className="flex justify-between mt-2">
          <button
            type="submit"
            disabled={Object.values(formData).includes("")} 
            className={`px-5 py-[10px] ${Object.values(formData).includes("") ? "bg-appGray-500 cursor-not-allowed" : "bg-primary-800"} text-white rounded-full focus:outline-none`}
            >
            Save
          </button>
        </div>
      </form>
      <ChangePasswordModal open={modal === "password"} onClose={() => setModal(null)} />
    </div>
    </div>
  );
};

export default Basics;
