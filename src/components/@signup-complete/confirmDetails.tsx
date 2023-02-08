import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";

//
import { ChevronUp } from "../icons";

//
import Button from "../reusable/button";

//
export default function ConfirmDetailsStep(props: ISignupStepProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProfileEditClick = (e: any) => {
    e.preventDefault();
    props.jumpTo("user-profile");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCompanyEditClick = (e: any) => {
    e.preventDefault();
    props.jumpTo("company-details");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleIpClick = (e: any) => {
    e.preventDefault();
    props.jumpTo("ip-portfolio");
  };

  const values = props.values;
  console.log(values, "values");
  //
  return (
    <div className="p-2 md:p-5 w-full lg:max-w-4xl">
      {/* User profile details */}
      <Disclosure>
        {({ open }) => (
          <div className="border border-gray-200 shadow-md rounded-lg">
            <Disclosure.Button className="flex w-full justify-between items-center px-4 py-[20px] focus:outline-none">
              <span className="text-lg">User Profile</span>

              <div className="flex gap-x-5">
                {open && (
                  <div
                    className="px-3 rounded border text-base border-gray-300 bg-gray-200 hover:bg-gray-300 shadow flex items-center text-center"
                    onClick={handleProfileEditClick}
                  >
                    Edit
                  </div>
                )}

                <ChevronUp
                  width={32}
                  height={32}
                  className={classNames({ "rotate-180 transform": !open })}
                />
              </div>
            </Disclosure.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform translate-y-2 opacity-0"
              enterTo="transform translate-y-0 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform translate-y-0 opacity-100"
              leaveTo="transform -translate-y-1 opacity-0"
            >
              <Disclosure.Panel className="px-4">
                <div className="py-4 border-t border-gray-600 grid grid-cols-12">
                  <div className="col-span-3">
                    <div className="w-[100px] h-[100px] rounded-full bg-slate-100 mx-auto" />
                  </div>

                  <div className="col-span-9">
                    <div className="mb-1">
                      <div className="font-bold">
                        {values.first_name} {values.last_name}
                      </div>

                      <div className="">{values.job_position}</div>

                      <div>{values.user_company?.company_name}</div>
                    </div>

                    <div className="mb-1">
                      <div>Preferred keywords to track:</div>

                      <div className="font-bold">{values.preferred_keywords}</div>
                    </div>

                    <div className="mb-1">
                      <div>Journal interest</div>

                      <div className="font-bold">{values.preferred_journals}</div>
                    </div>

                    <div className="mb-1">
                      <div>Strategic goals</div>

                      <div className="font-bold">{values.strategic_goals?.join(", ")}</div>
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>

      {/* Company details */}
      <div className="mt-3">
        <Disclosure>
          {({ open }) => (
            <div className="border border-gray-200 shadow-md rounded-lg">
              <Disclosure.Button className="flex w-full justify-between items-center px-4 py-[20px] focus:outline-none">
                <span className="text-lg">Company Details</span>

                <div className="flex gap-x-5">
                  {open && (
                    <div
                      className="px-3 rounded border text-base border-gray-300 bg-gray-200 hover:bg-gray-300 shadow flex items-center text-center"
                      onClick={handleCompanyEditClick}
                    >
                      Edit
                    </div>
                  )}

                  <ChevronUp
                    width={32}
                    height={32}
                    className={classNames({ "rotate-180 transform": !open })}
                  />
                </div>
              </Disclosure.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform translate-y-2 opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform -translate-y-1 opacity-0"
              >
                <Disclosure.Panel className="px-4">
                  <div className="py-4 border-t border-gray-600 grid grid-cols-12">
                    <div className="col-span-12">
                      <div className="mb-1">
                        <div>Company Location</div>

                        <div className="font-bold">{values.user_company?.company_location}</div>
                      </div>

                      <div className="mb-1">
                        <div>Technology Sector</div>

                        <div className="font-bold">{values.user_company?.tech_sector}</div>
                      </div>

                      <div className="mb-1">
                        <div>Team Size</div>

                        <div className="font-bold">{values.user_company?.team_number}</div>
                      </div>

                      {/* <div className="mb-1">
                        <div>Invited team members</div>

                        <div className="font-bold">{values.strategic_goals?.join(", ")}</div>
                      </div> */}
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </div>

      {/* IP Portfolio details */}
      <div className="mt-3">
        <Disclosure>
          {({ open }) => (
            <div className="border border-gray-200 shadow-md rounded-lg">
              <Disclosure.Button className="flex w-full justify-between items-center px-4 py-[20px] focus:outline-none">
                <span className="text-lg">IP portfolio</span>

                <div className="flex gap-x-5">
                  {open && (
                    <div
                      className="px-3 rounded border text-base border-gray-300 bg-gray-200 hover:bg-gray-300 shadow flex items-center text-center"
                      onClick={handleIpClick}
                    >
                      Edit
                    </div>
                  )}

                  <ChevronUp
                    width={32}
                    height={32}
                    className={classNames({ "rotate-180 transform": !open })}
                  />
                </div>
              </Disclosure.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform translate-y-2 opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform -translate-y-1 opacity-0"
              >
                <Disclosure.Panel className="px-4">
                  <div className="py-4 border-t border-gray-600 grid grid-cols-12">
                    <div className="col-span-12">
                      <div className="mb-1">
                        <div>Publications</div>

                        <div className="font-bold">{values.ip_portfolio?.publications}</div>
                      </div>

                      <div className="mb-1">
                        <div>Scholarly Profile</div>

                        <div className="font-bold">{values.ip_portfolio?.scholarly_profile}</div>
                      </div>

                      <div className="mb-1">
                        <div>ORCId ID</div>

                        <div className="font-bold">{values.ip_portfolio?.orcid_id}</div>
                      </div>

                      <div className="mb-1">
                        <div>Patents</div>

                        <div className="font-bold">{values.ip_portfolio?.patents}</div>
                      </div>
                    </div>
                  </div>
                </Disclosure.Panel>
              </Transition>
            </div>
          )}
        </Disclosure>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-x-2 mt-10">
        <Button type="secondary" rounded="full" handleClick={() => props.handlePrevious()}>
          Go Back
        </Button>

        <Button type="optional" rounded="full" handleClick={() => props.handleNext()}>
          Continue
        </Button>
      </div>
    </div>
  );
}

//
interface ISignupStepProps {
  handleNext: () => void;
  handlePrevious: () => void;
  jumpTo: (id: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  values: any;
}
