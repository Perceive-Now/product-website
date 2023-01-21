import Button from "../reusable/button";

//
export default function IpPortfolioStep(props: ISignupStepProps) {
  return (
    <div className="p-2 md:p-5 w-full lg:max-w-4xl">
      {/* Publications */}
      <div>
        <fieldset className="w-full">
          <label htmlFor="publications" className="text-lg font-semibold">
            Publications
          </label>

          <input
            id="publications"
            placeholder="Publications"
            className="py-1 px-[1.25rem] w-full my-1 rounded-lg border border-gray-400 focus:outline-primary-500"
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
            className="py-1 px-[1.25rem] col-span-1 w-full my-1 rounded-lg border border-gray-400 focus:outline-primary-500"
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
            className="py-1 px-[1.25rem] w-full my-1 rounded-lg border border-gray-400 focus:outline-primary-500"
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
            className="py-1 px-[1.25rem] w-full min-h-[10rem] my-1 rounded-lg border border-gray-400 focus:ring-primary-500 focus:border-primary-500"
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

        <Button type="optional" rounded="full" handleClick={() => props.handleNext({})}>
          Continue
        </Button>
      </div>
    </div>
  );
}

//
interface ISignupStepProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: (values?: any) => void;
  handlePrevious: () => void;
}
