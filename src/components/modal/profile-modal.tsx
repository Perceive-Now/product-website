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
    phone_number: userDetail.phone_number || "",
    country: userDetail.country || "",
    topics_of_interest: userDetail.topics_of_interest || "",
    company_name: userDetail.company_name || "N/A",
    job_position: userDetail.job_position || "",
  };

  const formResolver = yup.object().shape({
    username: yup
      .string()
      // .username("Username is required")
      .required("Username is required"),
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    phone_number: yup.string().required("Phone Number is required"),
    country: yup.string(),
    company_name: yup.string().required("Company is required"),
    job_position: yup.string().required("Job position is required"),
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
        last_name: value.last_name,
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
        full_name: userDetail.full_name || "",
        registration_completed: true,
      };
      try {
        await updateUserProfile(values).then((res: any) => {
          if (res.status === 200) {
            dispatch(setUser(values as any));
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
        <div className=" p-2.5 bg-white rounded-lg text-start w-full">
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
              <fieldset className="col-span-1">
                <Label required className="font-semibold text-secondary-800">
                  Username
                </Label>
                <Input
                  register={register("username")}
                  type="text"
                  error={errors.username}
                  placeholder="Username"
                />
              </fieldset>
              <div className="col-span-1" />
              <fieldset className="">
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
              </fieldset>
              <fieldset className="">
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
              </fieldset>
              <fieldset className="col-span-1">
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
              </fieldset>
              {/* phone */}
              <fieldset className="col-span-1">
                <Label className="font-semibold text-secondary-800">Phone number</Label>
                <div className="mt-0.5">
                  <PhoneNumberInput
                    register={register("phone_number")}
                    // type="text"
                    value={userDetail?.phone_number || ""}
                    placeholder="Phone number"
                    error={errors.phone_number}
                  />
                </div>
              </fieldset>
              <fieldset className="col-span-1">
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
              </fieldset>
              <fieldset className="col-span-1">
                <Label required className="font-semibold text-secondary-800">
                  Job Position
                </Label>
                <Input
                  register={register("job_position")}
                  type="text"
                  error={errors.job_position}
                  placeholder="Job Position"
                />
              </fieldset>
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
            <Button loading={isSubmitting} htmlType="submit" size="small" classname="w-full">
              {isSubmitting ? <span>Saving</span> : <span>Save</span>}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;
