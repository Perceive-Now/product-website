import classNames from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//
import {
  goalOptions,
  IUserProfileForm,
  userProfileSchema,
} from "../../../components/@signup-complete/userProfile";

//
import Button from "../../../components/reusable/button";
import { useAppSelector } from "../../../hooks/redux";
import { useMutation } from "@tanstack/react-query";
import { patchUserProfile } from "../../../utils/api/userProfile";

/**
 *
 */
export default function UserProfilePage() {
  const user = useAppSelector((state) => state?.auth?.user);

  const { mutate } = useMutation(patchUserProfile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserProfileForm>({
    resolver: yupResolver(userProfileSchema),
    defaultValues: {
      first_name: user?.firstName,
      last_name: user?.lastName,
      user_company: {
        company_name: user?.companyName,
      },
    },
  });

  //
  const onSubmit = async (values: IUserProfileForm) => {
    try {
      if (!user) {
        return;
      }
      const response = await mutate({ pkId: user.pkId, body: values });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div>
      <form className="w-full lg:max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="text-2xl text-primary-900 font-semibold mb-2">Personal Details</p>

          <div className="grid grid-cols-2 gap-x-3">
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
          <div className="grid grid-cols-2 gap-x-3">
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
                  value={goal.title}
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
          <Button type="optional" rounded="full" htmlType="submit" classname="mr-3">
            Save Changes
          </Button>

          <Button type="secondary" rounded="full">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
