import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Label from "../reusable/label";
import Modal from "../reusable/modal";

import { IOption } from "../../@types/entities/IType";
import { IProfile } from "../../@types/entities/IProfile";

import Input from "../reusable/input";
import Button from "../reusable/button";
import PhoneNumberInput from "../reusable/phone-input";
import SelectBox from "../reusable/select-box";

import { updateUserProfile } from "../../utils/api/userProfile";
import { Countries } from "../../utils/constants";

import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../stores/auth";
import IconButton from "../reusable/icon-button";
import { CrossIcon } from "../icons";

interface Props {
  open: boolean;
  onClose: () => void;
  userDetail: any;
  modalType: "profile" | "interest";
  photo: string;
}

const ProfileModal = ({ open, onClose, userDetail, modalType, photo }: Props) => {
  const dispatch = useAppDispatch();

  const [country, setCountry] = useState<IOption>({
    label: userDetail?.country || "",
    value: userDetail?.country || "",
  });

  const formInitialValue: IProfile = {
    username: userDetail.username || "",
    first_name: userDetail.first_name || "",
    last_name: userDetail.last_name || "",
    phone_number: userDetail.phone_number || "N/A",
    country: userDetail.country || "",
    topics_of_interest: userDetail.topics_of_interest || "",
    company_name: userDetail.company_name || "N/A",
    job_position: userDetail.job_position || "",
  };

  const formResolver = yup.object().shape({
    username: yup.string().trim().required("Username is required"),

    // .username("Username is required")
    first_name: yup.string().trim().required("First Name is required"),
    last_name: yup.string().trim().required("Last Name is required"),
    phone_number: yup.string().trim(),
    country: yup.string(),
    company_name: yup.string().trim().required("Company is required"),
    job_position: yup.string().trim().required("Job position is required"),
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onChange",
  });

  const onContinue = useCallback(
    async (value: IProfile) => {
      const values = {
        first_name: value.first_name,
        last_name: value.first_name,
        username: value.username,
        phone_number: value.phone_number,
        topics_of_interest: value.topics_of_interest,
        country: country?.value,
        profile_photo: photo,
        company_name: value?.company_name,
        job_position: value?.job_position,
        email: userDetail.email || "",
        about_me: "",
        id: userDetail.id || "",
        full_name: `${value.first_name} ${value.last_name}` || "",
        registration_completed: true,
      };
      try {
        await updateUserProfile(values).then((res: any) => {
          if (res.status === 200) {
            dispatch(
              setUser({
                first_name: values.first_name,
                last_name: values.last_name,
                username: values.username,
                phone_number: values.phone_number,
                topics_of_interest: values.topics_of_interest,
                country: values.country,
                profile_photo: values.profile_photo,
                company_name: values?.company_name,
                job_position: values?.job_position,
                email: values.email,
                about_me: "",
                id: values.id || "",
                full_name: values.full_name || "",
                registration_completed: true,
              }),
            );
            toast.success("Profile updated successfully");
            onClose();
          }
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [country?.value, dispatch, onClose, photo, userDetail],
  );

  return (
    <Modal open={open} handleOnClose={onClose}>
      <form onSubmit={handleSubmit(onContinue)}>
        <div className=" p-2.5 bg-white rounded-lg text-start w-[600px]">
          <div className="flex justify-between mb-2">
            <div className="text-2xl font-semibold text-secondary-800">
              {modalType === "interest" ? (
                <span>Topics of interest</span>
              ) : (
                <span>User Profile</span>
              )}
            </div>
            <IconButton
              color={"default"}
              icon={<CrossIcon className="text-black" />}
              onClick={onClose}
            />
          </div>
          {modalType === "profile" ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-2 w-full">
              <div className="col-span-1">
                <Label required className="font-semibold text-secondary-800">
                  Username
                </Label>
                <Input
                  register={register("username")}
                  type="text"
                  error={errors.username}
                  placeholder="Username"
                />
              </div>
              <div className="col-span-1" />
              <div className="">
                <Label required className="font-semibold text-secondary-800">
                  First Name
                </Label>
                <div className="mt-0.5 rounded-md shadow-sm">
                  <Input
                    register={register("first_name")}
                    type="text"
                    placeholder="First Name"
                    error={errors.first_name}
                  />
                </div>
              </div>
              <div className="">
                <Label required className="font-semibold text-secondary-800">
                  Last Name
                </Label>
                <div className="mt-0.5 rounded-md shadow-sm">
                  <Input
                    register={register("last_name")}
                    type="text"
                    placeholder="Last Name"
                    error={errors.last_name}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <Label required className="font-semibold text-secondary-800">
                  Country
                </Label>
                <div className="mt-0.5 rounded-md shadow-sm">
                  <SelectBox
                    onChange={setCountry}
                    options={Countries.map((country) => ({
                      label: country,
                      value: country,
                    }))}
                    value={country || null}
                    // register={register("country")}
                  />
                </div>
                {country === null && (
                  <div className="mt-1 text-xs text-danger-500">Country is required</div>
                )}
              </div>
              {/* phone */}
              <div className="col-span-1">
                <Label className="font-semibold text-secondary-800">Phone number</Label>
                <div className="mt-0.5">
                  <PhoneNumberInput
                    register={register("phone_number")}
                    value={userDetail?.phone_number || "N/A"}
                    placeholder="Phone number"
                    error={errors.phone_number}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <Label required className="font-semibold text-secondary-800">
                  Company name
                </Label>
                <Input
                  register={register("company_name")}
                  type="text"
                  error={errors.company_name}
                  placeholder="Company Name"
                />
                {/* <SelectBox
                onChange={setCompany}
                options={(companies || [])?.map((company) => ({
                  label: company.name,
                  value: company.id,
                }))}
                value={company}
                // register={register("country")}
                placeholder={"Select a Company"}
              /> */}
              </div>
              <div className="col-span-1">
                <Label required className="font-semibold text-secondary-800">
                  Job Position
                </Label>
                <Input
                  register={register("job_position")}
                  type="text"
                  error={errors.job_position}
                  placeholder="Job Position"
                />
              </div>
            </div>
          ) : (
            <div className="w-[600px]">
              {/* <Label className="font-semibold text-secondary-800">Topics of interest</Label> */}
              <div className="mt-0.5 rounded-md shadow-sm">
                <Input
                  register={register("topics_of_interest")}
                  type="textarea"
                  placeholder="Eg: AI, Data"
                  error={errors.topics_of_interest}
                />
              </div>
            </div>
          )}
          <div className="mt-5 w-full">
            <Button
              loading={isSubmitting}
              htmlType="submit"
              size="small"
              classname="w-full"
              disabled={isSubmitting || country === null}
            >
              {isSubmitting ? <span>Saving</span> : <span>Save</span>}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;
