import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Label from "../../../../components/reusable/label";
import Input from "../../../../components/reusable/input";
import ProfileIcon from "../../../../components/icons/common/profile";
import EditIcon from "../../../../components/icons/miscs/Edit";
import Button from "../../../../components/reusable/button";
import { useCallback } from "react";

interface IProfileForm {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  country: string;
  topics_of_interest?: string;
}

interface Props {
  changeActiveStep: (step: number) => void;
}

const UserProfile = ({ changeActiveStep }: Props) => {
  const formInitialValue: IProfileForm = {
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    country: "",
    topics_of_interest: "",
  };

  const formResolver = yup.object().shape({
    // username: yup
    //   .string()
    //   // .username("Username is required")
    //   .required("Username is required"),
    // first_name: yup.string().required("First Name is required"),
    // last_name: yup.string().required("Last Name is required"),
    // phone_number: yup.string().required("Phone Number is required"),
    // country: yup.string().required("Country is required"),
  });

  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const onContinue = useCallback(
    (value: IProfileForm) => {
      console.log(value);
      changeActiveStep(2);
    },
    [changeActiveStep],
  );

  return (
    <div className="">
      <h4 className="font-bold text-[22px] text-primary-900">User Profile</h4>
      <form onSubmit={handleSubmit(onContinue)} className="mt-2.5">
        <div className=" p-5 bg-appGray-100 rounded-lg">
          <div className="">
            <p className="text-secondary-800 font-semibold">Profile Image</p>
            <div className="rounded-full w-[80px] h-[80px] bg-appGray-200 flex items-center justify-center relative mt-0.5">
              <ProfileIcon />
              <div className="bottom-0 right-0 rounded-full w-[24px] h-[24px] bg-appGray-200 flex items-center justify-center absolute">
                <EditIcon />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-2 w-full mt-5">
            <fieldset className="col-span-1">
              <Label required className="font-semibold text-secondary-800">
                Username
              </Label>
              <Input
                {...register("username")}
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
                      {...register("first_name")}
                      type="text"
                      placeholder="First Name"
                      error={errors.first_name}
                    />
                  </div>
                </fieldset>
                <fieldset className="">
                  <div className="mt-0.5 rounded-md shadow-sm">
                    <Input
                      {...register("last_name")}
                      type="text"
                      placeholder="Last Name"
                      error={errors.last_name}
                    />
                  </div>
                </fieldset>
              </div>
            </div>
            <fieldset className="col-span-1">
              <Label className="font-semibold text-secondary-800">Phone number</Label>
              <div className="mt-0.5 rounded-md shadow-sm">
                <Input
                  {...register("phone_number")}
                  type="text"
                  placeholder="Phone number"
                  error={errors.phone_number}
                />
              </div>
            </fieldset>
            <div className="col-span-1" />
            <fieldset className="col-span-1">
              <Label required className="font-semibold text-secondary-800">
                Country
              </Label>
              <div className="mt-0.5 rounded-md shadow-sm">
                <Input
                  {...register("country")}
                  type="text"
                  placeholder="Select country"
                  error={errors.country}
                />
              </div>
            </fieldset>
            <div className="col-span-1 " />
            <fieldset className="col-span-2 w-full">
              <Label className="font-semibold text-secondary-800">Topics of interest</Label>
              <div className="mt-0.5 rounded-md shadow-sm">
                <Input
                  {...register("topics_of_interest")}
                  type="textarea"
                  placeholder="Enter topics of interest and hit enter."
                  error={errors.topics_of_interest}
                />
              </div>
            </fieldset>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <Button htmlType="submit" size="small">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
