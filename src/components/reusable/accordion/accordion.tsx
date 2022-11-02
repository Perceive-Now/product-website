import { Disclosure } from "@headlessui/react";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import { ChevronDown } from "../../icons";
import ExpandBtn from "../expand-btn";

export default function Accordion({
  title,
  description,
  children,
  onOpen,
}: PropsWithChildren<IAccordionProps>) {
  return (
    <Disclosure>
      {({ open, close }) => (
        <div>
          <Disclosure.Button onClick={() => !open && onOpen?.()}>
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

          <Disclosure.Panel className="text-appGray-900 border-t-2 border-appGray-300 mx-3 mt-4">
            {children}

            <div>
              <ExpandBtn isExpanded={true} handleExpandToggle={() => close()} />
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

interface IAccordionProps {
  title: string;
  description: string;
  onOpen?: () => void;
}
