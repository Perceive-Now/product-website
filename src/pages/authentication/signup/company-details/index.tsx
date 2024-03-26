import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Label from "../../../../components/reusable/label";
import Input from "../../../../components/reusable/input";
import Button from "../../../../components/reusable/button";
import { useCallback } from "react";
import AdduserIcon from "../../../../components/icons/common/add-user";
import ArrowLeftIcon from "../../../../components/icons/common/arrow-left";

interface ICompanyForm {
  company_name: string;
  job_position: string;
  member_email: string;
}

interface Props {
  changeActiveStep: (step: number) => void;
}

const CompanyProfile = ({ changeActiveStep }: Props) => {
  const formInitialValue: ICompanyForm = {
    company_name: "",
    job_position: "",
    member_email: "",
  };

  const formResolver = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    phone_number: yup.string().required("Phone Number is required"),
    country: yup.string().required("Country is required"),
  });

  const {
    // watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const onContinue = useCallback(() => {
    changeActiveStep(3);
  }, [changeActiveStep]);

  return (
    <div className="">
      <div className="flex items-center gap-0.5">
        <Button type="default" size="default" handleClick={() => changeActiveStep(1)}>
          <ArrowLeftIcon />
        </Button>
        <h4 className="font-bold text-[22px] text-primary-900">Company Details</h4>
      </div>
      <form onSubmit={handleSubmit(onContinue)} className="mt-2.5">
        <div className=" p-5 bg-appGray-100 rounded-lg">
          <div className="grid grid-cols-2 gap-x-5 gap-y-2 w-full">
            <fieldset className="col-span-1">
              <Label required className="font-semibold text-secondary-800">
                Company name
              </Label>
              <Input
                register={register("company_name")}
                type="text"
                error={errors.company_name}
                placeholder="Company name"
              />
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
            <div className="col-span-1 space-y-1.5">
              <h6 className="text-secondary-800 font-semibold">
                Invite Team members to collaborate.
              </h6>
              <fieldset className="">
                <Label required className="font-semibold text-secondary-800">
                  Member 1
                </Label>
                <Input
                  register={register("member_email")}
                  type="text"
                  error={errors.member_email}
                  placeholder="Enter email address to invite"
                />
              </fieldset>
              <Button startIcon={<AdduserIcon />} type="default" classname="mt-2.5" size="default">
                <p className="text-primary-900 font-medium">Add more team members</p>
              </Button>
            </div>
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

export default CompanyProfile;
