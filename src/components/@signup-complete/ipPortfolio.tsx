import { useForm } from "react-hook-form";
import Button from "../reusable/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { createIpPortfolioProfile } from "../../utils/api/userProfile";
import { useMutation } from "@tanstack/react-query";

//
const companyProfileSchema = yup.object({
  ip_portfolio: yup
    .object({
      publications: yup.string().required(),
      scholarly_profile: yup.string().required(),
      patents: yup.string().required(),
      orcid_id: yup.string().required(),
    })
    .required(),
});

//
export default function IpPortfolioStep(props: ISignupStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IIPPortfolioForm>({
    resolver: yupResolver(companyProfileSchema),
    defaultValues: props.values,
  });
  const { mutate } = useMutation(createIpPortfolioProfile);

  //
  const onSubmit = (values: IIPPortfolioForm) => {
    props.handleNext(values);

    const patents = values.ip_portfolio.patents.split(",").map((value) => ({ patent_name: value }));
    const publications = values.ip_portfolio.patents
      .split(",")
      .map((value) => ({ publication_name: value }));
    const body = {
      patents: patents,
      publications: publications,
      scholarly_profile: values.ip_portfolio.scholarly_profile,
      orcid_id: values.ip_portfolio.orcid_id,
    };
    mutate({ body: body });
  };
  return (
    <form className="p-2 md:p-5 w-full lg:max-w-4xl" onSubmit={handleSubmit(onSubmit)}>
      {/* Publications */}
      <div>
        <fieldset className="w-full">
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
          <span className="text-sm">Please provide your Publications</span>
        </fieldset>
      </div>

      {/* Scholarly profile */}
      <div className="mt-4">
        <fieldset className="w-full">
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
          <span className="text-sm">
            Link your google scholar profile or copy-paste your google scholar profile
          </span>
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
          <span className="text-sm">Provide your OCID ID</span>
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
          <span className="text-sm">
            Please list all the patents owned by you or your organization.
          </span>
        </fieldset>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-x-2 mt-10">
        <Button type="secondary" rounded="full" handleClick={() => props.handlePrevious()}>
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

interface IIPPortfolioForm {
  ip_portfolio: {
    publications: string;
    scholarly_profile: string;
    orcid_id: string;
    patents: string;
  };
}
