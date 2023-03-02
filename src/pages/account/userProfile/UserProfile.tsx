import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//
import {
  goalOptions,
  IUserProfile,
  IUserProfileFormValues,
  userProfileSchema,
} from "../../../components/@signup-complete/userProfile";

//
import Button from "../../../components/reusable/button";
import { useAppSelector } from "../../../hooks/redux";
import { useMutation } from "@tanstack/react-query";
import { patchUserProfile } from "../../../utils/api/userProfile";
import { toast } from "react-hot-toast";
import { LoadingIcon } from "../../../components/icons";

/**
 *
 */
export default function UserProfilePage() {
  const user = useAppSelector((state) => state?.auth?.user);

  const { mutate, isLoading } = useMutation(patchUserProfile);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserProfileFormValues>({
    resolver: yupResolver(userProfileSchema),
    defaultValues: {
      first_name: user?.firstName,
      last_name: user?.lastName,
      job_position: user?.jobPosition,
      user_company: {
        company_name: user?.userCompany.companyName,
      },
      preferred_keywords: (user?.preferredKeywords ?? [])?.map(keyword => keyword.name).join(', ')
      ,
      preferred_journals: (user?.preferredJournals ?? [])?.map(journal => journal.name).join(', '),
      strategic_goals: user?.strategicGoals
    },
  });

  const handleOnSuccess = () => {
    toast.success("User profile updated Successfully!");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnError = () => {
    // console.log('error', error);
  };

  //
  const onSubmit = async (values: IUserProfileFormValues) => {
    try {
      if (!user) {
        return;
      }
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, "error");
    }
  };

  return (
    <div>
      <form className="w-full lg:max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="text-2xl text-primary-900 font-semibold mb-2">Personal Details</p>

          <div className="grid grid-cols-2 gap-x-3 mb-2">
            <fieldset className="col-span-1 w-full">
              <label htmlFor="first_name" className="text-appGray-900 font-semibold">
                First Name
              </label>
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
            </fieldset>
          </div>

          <div className="grid grid-cols-2 gap-x-3 mb-2">
            <fieldset className="col-span-1 w-full">
              <label htmlFor="last_name" className="text-appGray-900 font-semibold">
                Last Name
              </label>

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
            </fieldset>
          </div>
        </div>

        {/* Company info row */}
        <div className="mt-1">
          <div className="grid grid-cols-2 gap-x-3 mb-2">
            <fieldset className="col-span-1 w-full">
              <label htmlFor="company_name" className="text-appGray-900 font-semibold">
                Company Name
              </label>

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
            </fieldset>
          </div>

          <div className="grid grid-cols-2 gap-x-3 mb-2">
            <fieldset className="col-span-1 w-full">
              <label htmlFor="company_position" className="text-appGray-900 font-semibold">
                Position
              </label>

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
            </fieldset>
          </div>
        </div>

        <p className="text-2xl text-primary-900 font-semibold">Personal Details</p>

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
              Please list the scholarly journals and the magazines you subscribe to. It could also
              be journals or magazines you prefere to read from around your topic.
            </span>
          </fieldset>
        </div>

        {/* Strategic goals */}
        <div className="mt-4 w-full">
          <p className="text-lg font-semibold">Strategic goals</p>

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
        <div className="flex mt-10">
          <Button
            type={isLoading ? "primary" : "optional"}
            rounded="full"
            htmlType="submit"
            disabled={isLoading}
            classname="mr-3"
          >
            {isLoading ? <LoadingIcon /> : "Save Changes"}
          </Button>

          <Button type="secondary" rounded="full" disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
