import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Label from "../../../../components/reusable/label";
import Input from "../../../../components/reusable/input";
import Button from "../../../../components/reusable/button";
import { useCallback, useState } from "react";
// import AdduserIcon from "../../../../components/icons/common/add-user";
import ArrowLeftIcon from "../../../../components/icons/common/arrow-left";
import AdduserIcon from "../../../../components/icons/common/add-user";
import toast from "react-hot-toast";

interface ICompanyForm {
  company_name: string;
  job_position: string;
  member_email: string;
}

interface Props {
  changeActiveStep: (step: number) => void;
}

type TeamMember = {
  name: string;
};
const CompanyProfile = ({ changeActiveStep }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const formInitialValue: ICompanyForm = {
    company_name: "",
    job_position: "",
    member_email: "",
  };

  const formResolver = yup.object().shape({
    company_name: yup.string().required("Company name is required"),
    job_position: yup.string().required("Job position is required"),
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
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Company details added");
      changeActiveStep(3);
      setIsLoading(false);
    }, 3000);
  }, [changeActiveStep]);

  const addMembers = useCallback(() => {
    const newMemberName = `Member${teamMembers.length + 1}`;
    setTeamMembers((prevMembers: any) => [...prevMembers, { name: newMemberName }]);
  }, [teamMembers]);

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
              <div className="space-y-2">
                <fieldset className="">
                  <Label className="font-semibold text-secondary-800">Member</Label>
                  <Input
                    register={register("member_email")}
                    type="text"
                    error={errors.member_email}
                    placeholder="Enter email address to invite"
                  />
                </fieldset>
                {teamMembers?.map((m: any, idx: any) => (
                  <fieldset key={idx * 59} className="">
                    <Label className="font-semibold text-secondary-800">{m.name}</Label>
                    <Input
                      register={register("member_email")}
                      type="text"
                      error={errors.member_email}
                      placeholder="Enter email address to invite"
                    />
                  </fieldset>
                ))}
              </div>

              <Button
                htmlType="button"
                startIcon={<AdduserIcon />}
                type="default"
                handleClick={addMembers}
                classname="mt-2.5"
                size="default"
              >
                <p className="text-primary-900 font-medium">Add more team members</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <Button loading={isLoading} htmlType="submit" size="small">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfile;
