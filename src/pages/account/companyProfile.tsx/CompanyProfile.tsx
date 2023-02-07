import { Listbox } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import {
  companyProfileSchema,
  ICompanyProfileForm,
  technologyOptions,
} from "../../../components/@signup-complete/companyDetails";
import { CheckIcon, ChevronUpDown } from "../../../components/icons";
import Button from "../../../components/reusable/button";

export default function CompanyProfilePage() {
  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompanyProfileForm>({
    resolver: yupResolver(companyProfileSchema),
    defaultValues: {},
  });

  //
  const onSubmit = (values: ICompanyProfileForm) => {
    console.log(values, "values");
  };

  const techSector = watch("user_company.tech_sector");

  return (
    <div>
      <form className="w-full lg:max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
        {/* Company Location */}
        <p className="text-2xl text-primary-900 font-semibold mb-2">Company Details</p>

        <div className="mt-2 grid grid-cols-2">
          <fieldset className="w-full">
            <label
              htmlFor="company_location"
              className="text-appGray-900 font-semibold block mb-0.5"
            >
              Company Location
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
          </fieldset>
        </div>

        {/* Technology sectors */}
        <div className="mt-2 grid grid-cols-2">
          <fieldset className="col-span-1">
            <label
              htmlFor="technology_sector"
              className="text-appGray-900 font-semibold block mb-0.5"
            >
              Technology Sector
            </label>

            <Controller
              name="user_company.tech_sector"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Listbox {...field}>
                  <div className="relative">
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
          </fieldset>
        </div>

        <p className="text-2xl text-primary-900 font-semibold mb-2">Team</p>
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

        {/* Actions */}
        <div className="flex gap-x-2 mt-10">
          <Button type="optional" rounded="full" htmlType="submit">
            Save Changes
          </Button>

          <Button type="secondary" rounded="full" htmlType="button">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
