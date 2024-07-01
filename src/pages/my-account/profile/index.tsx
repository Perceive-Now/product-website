import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import ProfileComponent from "./profile";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import ProfileModal from "../../../components/modal/profile-modal";
import ChangePasswordModal from "../../../components/modal/changepassword";

import Loading from "../../../components/reusable/loading";
import ProfileIcon from "../../../components/icons/common/profile";
import EditIcon from "../../../components/icons/miscs/Edit";

import { updateUserProfile } from "../../../utils/api/userProfile";
import { setUser } from "../../../stores/auth";

type IModal = "profile" | "password";

const UserProfile = () => {
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState<IModal | null>(null);
  const [modalType, setModalType] = useState<any>();
  const [photo, setPhoto] = useState<any>();
  // const [size, setSize] = useState<number>(0);

  const UserDetail = useAppSelector((state) => state.auth.user);

  // const TopicOfInterest = UserDetail?.topics_of_interest?.split(",") ?? [];

  useEffect(() => {
    setPhoto(UserDetail?.profile_photo);
  }, [UserDetail]);

  const updateProfile = useCallback(
    async (photo: any) => {
      const values = {
        first_name: UserDetail?.first_name,
        last_name: UserDetail?.last_name,
        username: UserDetail?.username,
        phone_number: UserDetail?.phone_number,
        topics_of_interest: UserDetail?.topics_of_interest,
        country: UserDetail?.country,
        profile_photo: photo,
        company_name: UserDetail?.company_name,
        job_position: UserDetail?.job_position,
        email: UserDetail?.email || "",
        about_me: "",
        id: UserDetail?.id || "",
        full_name: UserDetail?.full_name || "",
        registration_completed: true,
      };

      try {
        await updateUserProfile(values).then((res: any) => {
          if (res.status === 200) {
            toast.success("Profile Image updated successfully");
            dispatch(
              setUser({
                first_name: values.first_name,
                last_name: values.last_name,
                username: values.username,
                phone_number: values.phone_number,
                topics_of_interest: values.topics_of_interest,
                country: values.country,
                profile_photo: photo,
                company_name: values?.company_name,
                job_position: values?.job_position,
                email: values.email,
                about_me: "",
                id: values.id || ("" as any),
                full_name: values.full_name || "",
                registration_completed: true,
              }),
            );
            // toast.success("Profile updated successfully");
          }
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [
      UserDetail?.company_name,
      UserDetail?.country,
      UserDetail?.email,
      UserDetail?.first_name,
      UserDetail?.full_name,
      UserDetail?.id,
      UserDetail?.job_position,
      UserDetail?.last_name,
      UserDetail?.phone_number,
      UserDetail?.topics_of_interest,
      UserDetail?.username,
      dispatch,
    ],
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

  const ProfilesData = useMemo(
    () => [
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
    ],
    [
      UserDetail?.company_name,
      UserDetail?.country,
      UserDetail?.email,
      UserDetail?.full_name,
      UserDetail?.job_position,
      UserDetail?.phone_number,
      UserDetail?.username,
    ],
  );

  if (UserDetail === undefined) {
    return <Loading isLoading={UserDetail === undefined} />;
  }

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
                    <div>{profile.value || "N/A"}</div>
                  </div>
                ))}
                {/* <div className="flex items-center justify-end">
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
                </div> */}
              </div>
            </ProfileComponent>

            {/* <ProfileComponent
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
            </ProfileComponent> */}
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
