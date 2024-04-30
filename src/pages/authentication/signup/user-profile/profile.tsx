import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Label from "../../../../components/reusable/label";
import Input from "../../../../components/reusable/input";
import ProfileIcon from "../../../../components/icons/common/profile";
import EditIcon from "../../../../components/icons/miscs/Edit";
import Button from "../../../../components/reusable/button";
import { ChangeEvent, useCallback, useState } from "react";
import { IUserProfile, updateUserProfile } from "../../../../utils/api/userProfile";
import toast from "react-hot-toast";
// import Loading from "../../../../components/reusable/loading";
import SelectBox from "../../../../components/reusable/select-box";
import { Countries } from "../../../../utils/constants";
import PhoneNumberInput from "../../../../components/reusable/phone-input";
import { convertToBase64String } from "../../../../utils/helpers";

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
  const [photo, setPhoto] = useState<any>(convertToBase64String(userDetail?.profile_photo));
  const [country, setCountry] = useState<IOption>({
    label: userDetail?.country || "",
    value: userDetail?.country || "",
  });

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
    company_name: userDetail?.company_id || "",
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
        company_id: userDetail?.company_id,
        job_position: userDetail?.job_position,
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
    [changeActiveStep, country?.value, photo, userDetail],
  );

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
              <div className="col-span-2">
                <Label required className="font-semibold text-secondary-800">
                  Name
                </Label>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2">
                  <fieldset className="">
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
                    <div className="mt-0.5 rounded-md shadow-sm">
                      <Input
                        register={register("last_name")}
                        type="text"
                        placeholder="Last Name"
                        error={errors.last_name}
                      />
                    </div>
                  </fieldset>
                </div>
              </div>
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
