import classNames from "classnames";
import { Disclosure } from "@headlessui/react";

import type { PropsWithChildren } from "react";

//
import ExpandBtn from "../expand-btn";

//
import { ChevronDown } from "../../icons";

/**
 *
 */
export default function Accordion(props: PropsWithChildren<IAccordionProps>) {
  const shouldShowCollapse = props.showCollapse ?? false;

  //
  return (
    <Disclosure>
      {({ open, close }) => (
        <div>
          <Disclosure.Button onClick={() => !open && props.onOpen?.()}>
            <div className="flex text-start items-center">
              <div className="mr-2 text-primary-900">
                <ChevronDown className={classNames({ "rotate-180 transform": open })} />
              </div>

              <div>
                <div className="text-primary-900 font-medium text-xl">{props.title}</div>
                {props.description && <div className="mt-1">{props.description}</div>}
              </div>
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className="text-appGray-900 border-t-2 border-appGray-300 ml-5 mr-3 mt-4">
            <div>{props.children}</div>

            {shouldShowCollapse && (
              <ExpandBtn isExpanded={true} handleExpandToggle={() => close()} />
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

//
interface IAccordionProps {
  title: string;
  description?: string;
  showCollapse?: boolean;
  onOpen?: () => void;
}
