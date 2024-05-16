import React, { ChangeEvent, useEffect, useState } from "react";

import ProfileIcon from "../../../components/icons/common/profile";
import EditIcon from "../../../components/icons/miscs/Edit";

import ProfileComponent from "./profile";
import { useAppSelector } from "../../../hooks/redux";

import ProfileModal from "../../../components/modal/profile-modal";
import ChangePasswordModal from "../../../components/modal/changepassword";
import Button from "../../../components/reusable/button";

type IModal = "profile" | "password";

const UserProfile = () => {
  const [modal, setModal] = useState<IModal | null>(null);
  const [modalType, setModalType] = useState<any>();
  const [photo, setPhoto] = useState<any>();

  const UserDetail = useAppSelector((state) => state.auth.user);

  const TopicOfInterest = UserDetail?.topics_of_interest?.split(",") ?? [];

  useEffect(() => {
    setPhoto(UserDetail?.profile_photo);
  }, [UserDetail]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e?.target?.files?.[0];
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
      value: UserDetail?.company_name || "",
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
    <>
      <h6 className="text-2xl font-bold text-primary-900">Profile</h6>
      <div className="w-full">
        <div className="flex flex-col w-[900px] items-center justify-center">
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
          <div className="space-y-[20px] w-full mt-2">
            <ProfileComponent
              title={"Profile"}
              onEdit={() => {
                setModal("profile");
                setModalType("profile");
              }}
            >
              <div className="p-[20px] space-y-[8px]">
                {ProfilesData.map((profile, idx) => (
                  <div key={idx * 79} className="flex items-center gap-[60px] text-secondary-800">
                    <div className="w-[80px]">{profile.label}</div>
                    <div>{profile.value}</div>
                  </div>
                ))}
                <div className="flex items-center justify-end">
                  <Button
                    startIcon={<EditIcon className="text-primary-900" />}
                    htmlType="button"
                    type={"default"}
                    size="default"
                    handleClick={() => setModal("password")}
                    classname="text-primary-900 p-0"
                  >
                    <span>Change Password</span>
                  </Button>
                </div>
              </div>
            </ProfileComponent>

            <ProfileComponent
              title={"Topics of interest"}
              onEdit={() => {
                setModal("profile");
                setModalType("interest");
              }}
            >
              <div className="p-[20px] flex flex-wrap gap-2 items-center">
                {TopicOfInterest.length > 1 ? (
                  <>
                    {TopicOfInterest?.map((topic, idx) => (
                      <div
                        key={idx * 35}
                        className="border rounded-lg px-1 py-0.5 border-primary-900"
                      >
                        {topic}
                      </div>
                    ))}
                  </>
                ) : (
                  <div>N/A</div>
                )}
              </div>
            </ProfileComponent>
          </div>
        </div>
      </div>
      {/* ----------------Modal--------------- */}
      {UserDetail && (
        <ProfileModal
          open={modal === "profile"}
          onClose={() => setModal(null)}
          userDetail={UserDetail}
          modalType={modalType}
          photo={photo ? photo : UserDetail?.profile_photo}
        />
      )}
      <ChangePasswordModal open={modal === "password"} onClose={() => setModal(null)} />
    </>
  );
};

export default UserProfile;
