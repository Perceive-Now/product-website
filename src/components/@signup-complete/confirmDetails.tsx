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
                <div className="py-4 border-t border-gray-600">User details goes here</div>
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
                  <div className="py-4 border-t border-gray-600">Company details goes here</div>
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
                  <div className="py-4 border-t border-gray-600">
                    IP portfolio details goes here
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
}
