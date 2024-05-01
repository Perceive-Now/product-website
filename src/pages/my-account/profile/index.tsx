import React, { ChangeEvent, useEffect, useState } from "react";
import ProfileIcon from "../../../components/icons/common/profile";
import EditIcon from "../../../components/icons/miscs/Edit";
// import IconButton from "../../../components/reusable/icon-button";
import ProfileComponent from "./profile";
import { useAppSelector } from "../../../hooks/redux";
// import { convertToBase64String } from "../../../utils/helpers";

const UserProfile = () => {
  const UserDetail = useAppSelector((state) => state.auth.user);

  // convertToBase64String(userDetail?.profile_photo)
  const [photo, setPhoto] = useState<any>();

  useEffect(() => {
    setPhoto(UserDetail?.profile_photo);
  }, [UserDetail]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e?.target?.files?.[0];
    setPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const ProfilesData = [
    {
      label: "Username",
      value: UserDetail?.username || "",
    },
    {
      label: "Full name",
      value: UserDetail?.full_name || "",
    },
    {
      label: "Email",
      value: UserDetail?.email || "",
    },
    {
      label: "Phone no.",
      value: UserDetail?.phone_number || "",
    },
    {
      label: "Company",
      value: UserDetail?.company_id || "",
    },
    {
      label: "Job title",
      value: UserDetail?.job_position || "",
    },
    {
      label: "Country",
      value: UserDetail?.country || "",
    },
  ];

  return (
    <div>
      <h6 className="text-2xl font-bold text-primary-900">Profile</h6>
      <div className="w-full">
        <div className="flex flex-col w-[900px] items-center justify-center">
          <div className="rounded-full over w-[100px] h-[100px] bg-appGray-200 flex items-center justify-center relative mt-0.5">
            {photo ? (
              <img src={photo} alt="profile_picture" className="h-full w-full rounded-full" />
            ) : (
              <ProfileIcon />
            )}
            <label className="hover:cursor-pointer bottom-0 right-0 rounded-full w-[24px] h-[24px] bg-appGray-200 flex items-center justify-center absolute">
              <EditIcon />
              <input type="file" onChange={onSelectFile} accept="image/*" className="hidden" />
            </label>
          </div>
          <div className="space-y-[20px] w-full mt-2">
            <ProfileComponent title={"Profile"}>
              <div className="p-[20px] space-y-[8px]">
                {ProfilesData.map((profile, idx) => (
                  <div key={idx * 79} className="flex items-center gap-[60px] text-secondary-800">
                    <div className="w-[80px]">{profile.label}</div>
                    <div>{profile.value}</div>
                  </div>
                ))}
              </div>
            </ProfileComponent>

            {/* <ProfileComponent title={"Topics of interest"}>
              <div className="p-[20px] space-y-[8px]">
              </div>
            </ProfileComponent> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
