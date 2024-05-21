import { ChangeEvent, useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Label from "../../../../components/reusable/label";
import Input from "../../../../components/reusable/input";
import ProfileIcon from "../../../../components/icons/common/profile";
import EditIcon from "../../../../components/icons/miscs/Edit";

import { IUserProfile, updateUserProfile } from "../../../../utils/api/userProfile";
// import Loading from "../../../../components/reusable/loading";

import Button from "../../../../components/reusable/button";
import SelectBox from "../../../../components/reusable/select-box";
import PhoneNumberInput from "../../../../components/reusable/phone-input";

import { Countries } from "../../../../utils/constants";
import { useAppDispatch } from "../../../../hooks/redux";
import { setUser } from "../../../../stores/auth";
// import classNames from "classnames";
// import { CrossIcon } from "../../../../components/icons";

// import PhoneNumberInput from "../../../../components/reusable/phone-input";

interface IProfileForm {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  country: string;
  topics_of_interest?: string;
  company_name: string;
  job_position: string;
}
interface IOption {
  value: string;
  label: string;
}

interface Props {
  changeActiveStep: (step: number) => void;
  userDetail?: IUserProfile;
}

const UserProfile = ({ changeActiveStep, userDetail }: Props) => {
  const [photo, setPhoto] = useState<any>(userDetail?.profile_photo);

  const [country, setCountry] = useState<IOption | null>(null);
  // const [countryError, setCountryError] = useState<string | null>(null)

  useEffect(() => {
    if (userDetail?.country) {
      setCountry({
        label: userDetail?.country || "",
        value: userDetail?.country || "",
      });
    }
  }, [userDetail?.country]);

  const dispatch = useAppDispatch();

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

  const formInitialValue: IProfileForm = {
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    country: "",
    topics_of_interest: "",
    company_name: "",
    job_position: "",
  };

  const formResolver = yup.object().shape({
    username: yup.string().required("Username is required"),
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
    async (value: IProfileForm) => {
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
        registration_completed: true,
      };
      try {
        await updateUserProfile(values).then((res: any) => {
          if (res.status === 200) {
            dispatch(setUser({ ...values, registration_completed: false }));
            toast.success("User detail added");
            changeActiveStep(2);
          }
        });
      } catch (error: any) {
        toast.error(error.response.data.error || error.message);
      }
    },
    [changeActiveStep, country, dispatch, photo],
  );
  return (
    <>
      <div className="">
        <h4 className="font-bold text-[22px] text-primary-900">User Profile</h4>
        <form onSubmit={handleSubmit(onContinue)} className="mt-2.5">
          <div className=" p-5 bg-appGray-100 rounded-lg">
            <div className="">
              <p className="text-secondary-800 font-semibold">Profile Image</p>
              <div className="rounded-full over w-[80px] h-[80px] bg-appGray-200 flex items-center justify-center relative mt-0.5">
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
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2 w-full mt-5">
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
                    placeholder={"Select an options"}
                  />
                </div>
                {/* {countryError !== null && (
                  <div className="mt-1 text-xs text-danger-500">{countryError}</div>
                )} */}
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
          </div>
          <div className="mt-5 flex items-center justify-center">
            <Button
              loading={isSubmitting}
              htmlType="submit"
              size="small"
              disabled={country === null || isSubmitting}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
