import * as yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import Label from "../../../../components/reusable/label";
import Input from "../../../../components/reusable/input";
import Button from "../../../../components/reusable/button";

import ArrowLeftIcon from "../../../../components/icons/common/arrow-left";
import AdduserIcon from "../../../../components/icons/common/add-user";
import SelectBox from "../../../../components/reusable/select-box";

import { IUserProfile, getCompanies } from "../../../../utils/api/userProfile";

import Loading from "../../../../components/reusable/loading";

import { IOption } from "../../../../@types/entities/IType";
import axiosInstance from "../../../../utils/axios";

interface ICompanyForm {
  company_name: string;
  job_position: string;
  member_email: string;
}
interface Props {
  changeActiveStep: (step: number) => void;
  userDetail?: IUserProfile;
}

type TeamMember = {
  name: string;
};

const CompanyProfile = ({ changeActiveStep, userDetail }: Props) => {
  const authCode = process.env.REACT_APP_AUTH_CODE;

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [company, setCompany] = useState<IOption>({
    label: userDetail?.company_id || "",
    value: "",
  });

  //
  const { data: companies, isLoading } = useQuery(["get-company"], async () => {
    return await getCompanies();
  });
  // Fetching time period
  useEffect(() => {
    if (!companies) return;

    //
  }, [companies]);

  const formInitialValue: ICompanyForm = {
    company_name: "",
    job_position: userDetail?.job_position || "",
    member_email: "",
  };

  const formResolver = yup.object().shape({
    company_name: yup.string(),
    job_position: yup.string().required("Job position is required"),
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const onContinue = useCallback(
    async (value: ICompanyForm) => {
      const values = {
        first_name: userDetail?.first_name,
        last_name: userDetail?.last_name,
        username: userDetail?.username,
        phone_number: userDetail?.phone_number,
        topics_of_interest: userDetail?.topics_of_interest,
        country: userDetail?.country,
        profile_photo: userDetail?.profile_photo,
        company_id: company?.value,
        job_position: value.job_position,
        member_email: value.member_email,
      };
      try {
        const res = await axiosInstance.put(
          `/api/update_user_profile?code=${authCode}&clientId=default&u`,
          values,
        );
        reset();
        changeActiveStep(3);
        toast.success(res.data.message);
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    },
    [authCode, company, changeActiveStep, reset, userDetail],
  );

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
      <Loading isLoading={isLoading} />
      <form onSubmit={handleSubmit(onContinue)} className="mt-2.5">
        <div className=" p-5 bg-appGray-100 rounded-lg">
          <div className="grid grid-cols-2 gap-x-5 gap-y-2 w-full">
            <fieldset className="col-span-1">
              <Label required className="font-semibold text-secondary-800">
                Company name
              </Label>
              <SelectBox
                onChange={setCompany}
                options={(companies || [])?.map((company) => ({
                  label: company.name,
                  value: company.id,
                }))}
                value={company}
                // register={register("country")}
                placeholder={"Select a Company"}
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
          <Button loading={isSubmitting} htmlType="submit" size="small" disabled={!company}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfile;
