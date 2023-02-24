import classNames from "classnames";
import { useForm } from "react-hook-form";
import { IIPPortfolioForm } from "../../../components/@signup-complete/ipPortfolio";
import Button from "../../../components/reusable/button";

export default function IpPortfolioPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IIPPortfolioForm>({
    defaultValues: {},
  });

  //
  const onSubmit = (values: IIPPortfolioForm) => {
    console.log(values, "values");
  };
  return (
    <div>
      <form className="w-full lg:max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
        {/* Publications */}
        <div className="mt-4 grid grid-cols-2">
          <fieldset className="col-span-1">
            <label htmlFor="publications" className="text-lg font-semibold">
              Publications
            </label>

            <input
              id="publications"
              placeholder="Publications"
              className={classNames(
                "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                errors.ip_portfolio?.publications
                  ? "outline-red-500 border-red-500"
                  : "focus:outline-primary-500 border-gray-400",
              )}
              {...register("ip_portfolio.publications")}
            />
          </fieldset>
        </div>

        {/* Scholarly profile */}
        <div className="mt-4 grid grid-cols-2">
          <fieldset className="col-span-1">
            <label htmlFor="scholarly_profile" className="text-lg font-semibold">
              Scholalry Profile
            </label>

            <input
              id="scholarly_profile"
              placeholder="Google Scholar Profile"
              className={classNames(
                "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                errors.ip_portfolio?.publications
                  ? "outline-red-500 border-red-500"
                  : "focus:outline-primary-500 border-gray-400",
              )}
              {...register("ip_portfolio.scholarly_profile")}
            />
          </fieldset>
        </div>

        {/* ORCID ID */}
        <div className="mt-4 grid grid-cols-2">
          <fieldset className="col-span-1">
            <label htmlFor="orcid_id" className="text-lg font-semibold">
              ORCID ID
            </label>

            <input
              id="orcid_id"
              placeholder="ID"
              className={classNames(
                "py-1 px-[1.25rem] w-full mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                errors.ip_portfolio?.publications
                  ? "outline-red-500 border-red-500"
                  : "focus:outline-primary-500 border-gray-400",
              )}
              {...register("ip_portfolio.orcid_id")}
            />
          </fieldset>
        </div>

        {/* Patents */}
        <div className="mt-4">
          <fieldset className="w-full">
            <label htmlFor="patents" className="text-lg font-semibold">
              Patents
            </label>

            <textarea
              id="patents"
              placeholder="Patent titles"
              className={classNames(
                "py-1 px-[1.25rem] w-full min-h-[10rem]  mb-1 rounded-lg border bg-gray-100 focus:bg-white",
                errors.ip_portfolio?.publications
                  ? "outline-red-500 border-red-500"
                  : "focus:outline-primary-500 border-gray-400",
              )}
              {...register("ip_portfolio.patents")}
            />
          </fieldset>
        </div>

        {/* Actions */}
        <div className="flex gap-x-2 mt-4">
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
