import uuid from "react-uuid";
import classNames from "classnames";
import { Listbox } from "@headlessui/react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//
import Button from "../reusable/button";

//
import { CheckIcon, ChevronUpDown, TeamPlusIcon } from "../icons";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { patchCompanyDetailProfile } from "../../utils/api/userProfile";

//
export const companyProfileSchema = yup.object({
  user_company: yup
    .object({
      company_location: yup.string().required(),
      tech_sector: yup.string().required(),
      team_number: yup.number().required(),
    })
    .required(),
});

//
export const technologyOptions = [
  { name: "Agriculture Technology" },
  { name: "Finance" },
  { name: "Biotechnology & Healthcare" },
  { name: "Aerospace & Defense" },
  { name: "Manufacturing Copanies" },
  { name: "Private Equity" },
  { name: "Research Institution & Higher Education" },
  { name: "Electronics & Telecom" },
  { name: "Computer Technologies" },
  { name: "Though Leaders & Consultants" },
];

const InitialTeamMembersInputCount = 3;

//
export default function CompanyDetailsStep(props: ISignupStepProps) {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompanyProfileForm>({
    resolver: yupResolver(companyProfileSchema),
    defaultValues: props.values,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { fields, append, remove } = useFieldArray<any>({
    control,
    name: "user_company.team_member",
  });
  const { mutate } = useMutation(patchCompanyDetailProfile);

  //
  const techSector = watch("user_company.tech_sector");

  const handleOnSuccess = (data: ICompanyDetailProfile) => {
    props.handleNext(data);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnError = () => {
    // console.log('error', error);
  };

  //
  const onSubmit = (values: ICompanyProfileForm) => {
    props.handleNext(values);
    const body = {
      user_company: {
        company_location: values.user_company.company_location,
        team_number: values.user_company.team_number,
        tech_sector: values.user_company.tech_sector,
      },
    };
    mutate(
      { body: body },
      {
        onSuccess: handleOnSuccess,
        onError: handleOnError,
      },
    );
  };

  const handleAddTeamMember = () => {
    append({ email: "" });
  };

  //
  return (
    <form className="p-2 md:p-5 w-full lg:max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
      {/* Company Location */}
      <div>
        <fieldset className="w-full">
          <label htmlFor="company_location" className="text-lg font-semibold">
            Company Location*
          </label>

          <input
            id="company_location"
            placeholder="Add Company Location"
            className={classNames(
              "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
              errors.user_company?.company_location
                ? "outline-red-500 border-red-500"
                : "focus:outline-primary-500 border-gray-400",
            )}
            {...register("user_company.company_location")}
          />
          <span className="text-sm">Country/Region</span>
        </fieldset>
      </div>

      {/* Technology sectors */}
      <div className="mt-4 grid grid-cols-2">
        <fieldset className="col-span-1">
          <label htmlFor="technology_sector" className="text-lg font-semibold">
            Technology Sector*
          </label>

          <div className="my-1">
            <Controller
              name="user_company.tech_sector"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Listbox {...field}>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className={classNames(
                        "w-full rounded-lg py-1 pl-3 pr-10 text-left border bg-gray-100",
                        errors.user_company?.tech_sector
                          ? "border-red-400 outline-red-500"
                          : "border-gray-400 focus:outline-primary-500",
                      )}
                    >
                      <span className="block truncate">
                        {techSector ? techSector : "Select a technology sector"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-700">
                        <ChevronUpDown width={20} height={20} aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Listbox.Options className="absolute mt-[4px] max-h-[20rem] w-full overflow-auto rounded-md bg-white text-base shadow-lg border border-gray-300 focus:outline-none sm:text-sm">
                      {technologyOptions.map((tech, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            classNames(
                              "relative cursor-pointer select-none focus:outline-none",
                              active ? "bg-primary-50 text-primary-800" : "text-gray-900",
                            )
                          }
                          value={tech.name}
                        >
                          {({ selected }) => (
                            <div
                              className={classNames("flex gap-x-2 items-center h-6 py-2 px-2", {
                                "bg-primary-50": selected,
                              })}
                            >
                              <span className={selected ? "font-semibold" : "font-normal"}>
                                {tech.name}
                              </span>

                              {selected && (
                                <span className="flex items-center text-primary-900">
                                  <CheckIcon height={32} width={32} aria-hidden="true" />
                                </span>
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              )}
            />
          </div>

          <span className="text-sm">Select the Technology sector from list</span>
        </fieldset>
      </div>

      {/* Team Size */}
      <div className="mt-4 grid grid-cols-2">
        <fieldset className="col-span-1">
          <label htmlFor="team_size" className="text-lg font-semibold">
            How big is your team?
          </label>

          <input
            type="number"
            min={1}
            id="team_size"
            placeholder="Number of members"
            // classNames="py-1 px-[1.25rem] w-full my-1 rounded-lg border border-gray-400 focus:ring-primary-500"
            className={classNames(
              "py-1 px-[1.25rem] w-full my-1 rounded-lg border bg-gray-100 focus:bg-white",
              errors.user_company?.team_number
                ? "!ring-red-500  !border-red-500"
                : "focus:!ring-primary-500 focus:!border-primary-500 border-gray-400",
            )}
            {...register("user_company.team_number")}
          />
          <span className="text-sm">Provide the number of team members</span>
        </fieldset>
      </div>

      {/* Team Members */}
      <div className="mt-4 grid grid-cols-1">
        <fieldset className="col-span-1">
          <span className="text-lg font-semibold">Invite team members</span>

          <div className="mt-1">
            {fields.map((field, index) => (
              <div className="d-flex mb-4" key={field.id}>
                <label htmlFor={`user_company.team_member.${field.id}`} className="mb-1 font-bold">
                  Team member {index + 1}
                </label>

                <input
                  type="email"
                  id={`user_company.team_member.${field.id}`}
                  placeholder="Team member email"
                  className={classNames(
                    "py-1 px-[1.25rem] w-full my-1 rounded-lg border bg-gray-100 focus:bg-white",
                    errors.user_company?.team_number
                      ? "!ring-red-500  !border-red-500"
                      : "focus:!ring-primary-500 focus:!border-primary-500 border-gray-400",
                  )}
                  {...register(`user_company.team_member.${index}.email`)}
                  defaultValue={props?.values["user_company.team_member"][index].email ?? null}
                />

                <span className="mt-1 flex justify-between">
                  Email
                  <div className="cursor-pointer" onClick={() => remove(index)}>
                    Remove
                  </div>
                </span>
              </div>
            ))}

            <button
              className="flex py-0.5 rounded-lg text-primary-500 font-medium"
              type="button"
              onClick={handleAddTeamMember}
            >
              <TeamPlusIcon className="mr-1" />
              Invite more team members
            </button>
          </div>
        </fieldset>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-x-2 mt-10">
        <Button
          type="secondary"
          rounded="full"
          htmlType="button"
          handleClick={() => props.handlePrevious()}
        >
          Go Back
        </Button>

        <Button type="optional" rounded="full" htmlType="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}

//
interface ISignupStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (values?: any) => void;
  handlePrevious: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any;
}

//
export interface ICompanyProfileForm {
  name: string;
  user_company: {
    company_location: string;
    tech_sector: string;
    team_number: number;
    team_member: {
      [key: string]: string;
    } | null;
  };
}

//
export interface ICompanyDetailProfile {
  user_company: {
    company_location: string;
    tech_sector: string;
    team_number: number;
  };
}
