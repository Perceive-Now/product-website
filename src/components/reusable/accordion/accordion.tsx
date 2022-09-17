import { Disclosure, Transition } from "@headlessui/react";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import { ChevronDown } from "../../icons";
import ExpandBtn from "../expand-btn";

export default function Accordion({
  title,
  description,
  children,
}: PropsWithChildren<IAccordionProps>) {
  return (
    <Disclosure>
      {({ open, close }) => (
        <div>
          <Disclosure.Button>
            <div className="flex text-start">
              <div className="mr-3">
                <ChevronDown
                  className={classNames(
                    "text-primary-900",
                    open ? "rotate-180 transform" : ""
                  )}
                />
              </div>

              <div>
                <div className="text-primary-900 font-medium text-xl mb-1">
                  {title}
                </div>

                <div>{description}</div>
              </div>
            </div>
          </Disclosure.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="text-appGray-900 border-t-2 border-appGray-300 mx-3 mt-4">
              {children}

              <div>
                <ExpandBtn
                  isExpanded={true}
                  handleExpandToggle={() => close()}
                />
              </div>
            </Disclosure.Panel>
          </Transition>
        </div>
      )}
    </Disclosure>
  );
}

interface IAccordionProps {
  title: string;
  description: string;
}
