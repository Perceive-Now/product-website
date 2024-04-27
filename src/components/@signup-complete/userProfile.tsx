import classNames from "classnames";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//
import Button from "../reusable/button";
import { useMutation } from "@tanstack/react-query";
import { patchUserProfile } from "../../utils/api/userProfile";
import { useEffect, useMemo } from "react";

//
export const goalOptions = [
  {
    title: "Growth Insights",
    value: "Growth Insights",
  },
  {
    title: "IP portfolio expansion",
    value: "IP Portfolio Expansion",
  },
  {
    title: "Technical diligence",
    value: "Technical Diligence",
  },
  {
    title: "Networking",
    value: "Networking",
  },
  {
    title: "Academic collaborations",
    value: "Academic Collaborations",
  },
  {
    title: "Business development",
    value: "Business Development",
  },
  {
    title: "R&D innovation",
    value: "R&D Innovation",
  },
  {
    title: "Prior art search",
    value: "Prior Art Search",
  },
];

//
export const userProfileSchema = yup.object({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  user_company: yup
    .object({
      company_name: yup.string().required(),
    })
    .required(),
  job_position: yup.string().required(),
  preferred_journals: yup.string().required(),
  preferred_keywords: yup.string().required(),
});

//
export default function UserProfileStep(props: IUserProfileStepProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserProfileFormValues>({
    resolver: yupResolver(userProfileSchema),
    defaultValues: useMemo(() => {
      return props.values;
    }, [props.values]),
  });

  useEffect(() => {
    let preferredKeywords = "";
    let preferredJournels = "";
    if (props.values?.preferred_keywords) {
      if (typeof props.values?.preferred_keywords === "string") {
        preferredKeywords = props.values?.preferred_keywords;
      } else {
        preferredKeywords = props.values?.preferred_keywords
          ?.map((keyword: { name: string }) => keyword.name)
          ?.join(", ");
      }
    }
    if (props.values?.preferred_journals) {
      if (typeof props.values?.preferred_journals === "string") {
        preferredJournels = props.values?.preferred_journals;
      } else {
        preferredJournels = props.values?.preferred_journals
          ?.map((journal: { name: string }) => journal.name)
          ?.join(", ");
      }
    }

    reset({
      ...props.values,
      preferred_keywords: preferredKeywords,
      preferred_journals: preferredJournels,
    });
  }, [props.values, reset]);

  const { mutate } = useMutation(patchUserProfile);

  const handleOnSuccess = (data: IUserProfile) => {
    const values: IUserProfileFormValues = {
      ...data,
      preferred_keywords: data.preferred_keywords.map((value) => value.name).join(", "),
      preferred_journals: data.preferred_journals.map((value) => value.name).join(", "),
    };

    props.handleNext(values);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnError = () => {
    // console.log('error', error);
  };

  //
  const onSubmit = (values: IUserProfileFormValues) => {
    const body: IUserProfile = {
      first_name: values.first_name,
      last_name: values.last_name,
      user_company: {
        company_name: values.user_company.company_name,
      },
      job_position: values.job_position,
      preferred_keywords: values.preferred_keywords.split(",").map((value) => ({ name: value })),
      preferred_journals: values.preferred_journals.split(",").map((value) => ({ name: value })),
      strategic_goals: values.strategic_goals,
    };
    mutate(
      { body: body },
      {
        onSuccess: handleOnSuccess,
        onError: handleOnError,
      },
    );
  };

  //
  return (
    <form className="p-2 md:p-5 w-full lg:max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
      {/* Name row */}
      <div>
        <p className="text-lg font-semibold mb-1">Name*</p>

        <div className="grid grid-cols-2 gap-x-3">
          <fieldset className="col-span-1 w-full">
            <input
              id="first_name"
              placeholder="First Name"
              className={classNames(
                "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                errors.first_name
                  ? "outline-red-500 border-red-500"
                  : "focus:outline-primary-500 border-gray-400",
              )}
              {...register("first_name")}
            />
            <label htmlFor="first_name" className="text-sm">
              First Name
            </label>
          </fieldset>

          <fieldset className="col-span-1 w-full">
            <input
              id="last_name"
              placeholder="Last Name"
              className={classNames(
                "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                errors.last_name
                  ? "outline-red-500 border-red-500"
                  : "focus:outline-primary-500 border-gray-400",
              )}
              {...register("last_name")}
            />
            <label htmlFor="last_name" className="text-sm">
              Last Name
            </label>
          </fieldset>
        </div>
      </div>

      {/* Company info row */}
      <div className="mt-4">
        <p className="text-lg font-semibold mb-1">Company*</p>

        <div className="grid grid-cols-2 gap-x-3">
          <fieldset className="col-span-1 w-full">
            <input
              id="company_name"
              placeholder="Company Name"
              className={classNames(
                "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                errors.user_company?.company_name
                  ? "outline-red-500 border-red-500"
                  : "focus:outline-primary-500 border-gray-400",
              )}
              {...register("user_company.company_name")}
            />
            <label htmlFor="company_name" className="text-sm">
              Company Name
            </label>
          </fieldset>

          <fieldset className="col-span-1 w-full">
            <input
              id="company_position"
              placeholder="Your position in the company"
              className={classNames(
                "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                errors.job_position
                  ? "outline-red-500 border-red-500"
                  : "focus:outline-primary-500 border-gray-400",
              )}
              {...register("job_position")}
            />
            <label htmlFor="company_position" className="text-sm">
              Position
            </label>
          </fieldset>
        </div>
      </div>

      {/* Keywords to track */}
      <div className="mt-4">
        <fieldset className="w-full">
          <label htmlFor="keywords" className="text-lg font-semibold">
            Preferred keywords to track*
          </label>

          <input
            id="keywords"
            placeholder="E.g. COVID-19, Big data, Clean energy, Gene therapy, Fluid dynamics"
            className="py-1 px-[1.25rem] w-full my-1 rounded-lg border border-gray-400 focus:outline-primary-500"
            {...register("preferred_keywords")}
          />
          <span className="text-sm">Provide 5 keywords separated by commas</span>
        </fieldset>
      </div>

      {/* Journal of interest */}
      <div className="mt-4">
        <fieldset className="w-full">
          <label htmlFor="journals" className="text-lg font-semibold">
            Please provide journals of interest
          </label>

          <input
            id="journals"
            placeholder="E.g. Journal of Microbiology, Analytical Chemistry"
            className="py-1 px-[1.25rem] w-full my-1 rounded-lg border border-gray-400 focus:outline-primary-500"
            {...register("preferred_journals")}
          />
          <span className="text-sm">
            Please list the scholarly journals and the magazines you subscribe to. It could also be
            journals or magazines you prefere to read from around your topic.
          </span>
        </fieldset>
      </div>

      {/* Strategic goals */}
      <div className="mt-4 w-full">
        <p className="text-lg font-semibold">Strategic goals</p>
        <p className="text-sm my-1">Please check all options that apply</p>

        <div className="mt-2">
          {goalOptions.map((goal, index) => (
            <fieldset key={index} className="flex gap-x-1 items-center mb-1">
              <input
                id={`goals-${index}`}
                type="checkbox"
                value={goal.value}
                className="appearance-none rounded peer focus:checked:bg-primary-500 checked:bg-primary-500 checked:hover:bg-primary-600 focus:outline-none focus:ring-0"
                {...register("strategic_goals")}
              />
              <label htmlFor={`goals-${index}`} className="peer-checked:font-semibold">
                {goal.title}
              </label>
            </fieldset>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center mt-10">
        <Button type="optional" rounded="full" htmlType="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}

//
interface IUserProfileStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (values?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any;
}

//
export interface IUserProfileFormValues {
  first_name: string;
  last_name: string;
  user_company: {
    company_name: string | null;
  };
  job_position: string | null;
  preferred_keywords: string;
  preferred_journals: string;
  strategic_goals: string[];
}

//
export interface IUserProfile {
  first_name: string;
  last_name: string;
  user_company: {
    company_name: string | null;
  };
  job_position: string | null;
  preferred_keywords: {
    name: string;
  }[];
  preferred_journals: {
    name: string;
  }[];
  strategic_goals: string[];
}
