import { ChangeEvent, useCallback, useState } from "react";
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
  const [country, setCountry] = useState<IOption>({
    label: userDetail?.country || "",
    value: userDetail?.country || "",
  });

  // const [keywords, setKeywords] = useState<string[]>([]);

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
    username: userDetail?.username || "",
    first_name: userDetail?.first_name || "",
    last_name: userDetail?.last_name || "",
    phone_number: userDetail?.phone_number || "",
    country: userDetail?.country || "",
    topics_of_interest: userDetail?.topics_of_interest || "",
    company_name: userDetail?.company_name || "",
    job_position: userDetail?.job_position || "",
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
    company_name: yup.string().required(""),
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
      };
      try {
        await updateUserProfile(values).then((res: any) => {
          if (res.status === 200) {
            toast.success("User detail added");
            changeActiveStep(2);
          }
        });
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [changeActiveStep, country?.value, photo],
  );

  // const addKeyword = useCallback(
  //   (value: string) => {
  //     // if (keywords.length >= 0) {
  //     //   setHasKeywords(true);
  //     // }
  //     setKeywords((prevKeywords) => [...prevKeywords, value]);
  //   },
  //   [],
  // );

  // const removeKeyword = useCallback(
  //   (value: string) => {
  //     setKeywords(keywords.filter((keyword) => keyword !== value));
  //   },
  //   [keywords],
  // );

  return (
    <>
      {/* <Loading isLoading={Loading} /> */}
      <div className="">
        <h4 className="font-bold text-[22px] text-primary-900">User Profile</h4>
        <form onSubmit={handleSubmit(onContinue)} className="mt-2.5">
          <div className=" p-5 bg-appGray-100 rounded-lg">
            <div className="">
              <p className="text-secondary-800 font-semibold">Profile Image</p>
              <div className="rounded-full over w-[80px] h-[80px] bg-appGray-200 flex items-center justify-center relative mt-0.5">
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
              <div />
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
              {/* <div className="col-span-1" /> */}
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
                {errors.country?.message && (
                  <div className="mt-1 text-xs text-danger-500">{errors.country.message}</div>
                )}
              </fieldset>
              <div className="col-span-1 " />
              <fieldset className="col-span-2 w-full">
                <Label className="font-semibold text-secondary-800">Topics of interest</Label>
                <div className="mt-0.5 rounded-md shadow-sm">
                  <Input
                    register={register("topics_of_interest")}
                    type="textarea"
                    placeholder="Enter topics of interest"
                    error={errors.topics_of_interest}
                  />
                  {/* <textarea
                    rows={5}
                    {...register("topics_of_interest")}
                    className={classNames(
                      "appearance-none w-full px-2 py-[10px] bg-gray-100 border-1 rounded-md placeholder:text-gray-400 focus:ring-0.5",
                      errors.topics_of_interest
                        ? "border-danger-500 focus:border-danger-500 focus:ring-danger-500"
                        : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                    )}
                    placeholder="Enter Keyword"
                    onKeyDown={(e: any) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent default behavior of Enter key
                        const keyword = (e.target as HTMLTextAreaElement).value.trim(); // Get the keyword and remove leading/trailing spaces
                        if (keyword) {
                          addKeyword(keyword);
                          e.target.value = ""
                        }
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-[10px] mt-5 absolute -top-4 left-2">
                    {keywords.map((keyword) => (
                      <div
                        key={keyword}
                        className="flex items-center justify-between gap-x-1 border rounded-lg border-appGray-600 py-0.5 px-2 text-sm font-medium text-secondary-800 bg-white"
                      >
                        {keyword}
                        <button type="button" onClick={() => removeKeyword(keyword)}>
                          <CrossIcon width={"16px"} className="text-secondary-800" />
                        </button>
                      </div>
                    ))}
                  </div> */}
                </div>
              </fieldset>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center">
            <Button loading={isSubmitting} htmlType="submit" size="small">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
