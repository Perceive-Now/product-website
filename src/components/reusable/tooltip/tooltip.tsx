import { Popover } from "@headlessui/react";
import { Fragment, PropsWithChildren, ReactElement } from "react";

//
import { CrossIcon } from "../../icons";

/**
 *
 */
export default function Tooltip(props: PropsWithChildren<ITooltipProps>) {
  return (
    <Popover className="relative">
      <Popover.Button className="focus:outline-none flex items-center">
        {props.trigger}
      </Popover.Button>

      <Popover.Panel className="absolute z-10 rounded-2xl bg-white border border-gray-300 shadow-lg pl-6 pr-8 py-5 right-0 max-w-lg cursor-default min-w-[420px]">
        {({ close }) => (
          <Fragment>
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => close()}
            >
              <CrossIcon />
            </div>

            <div className="text-gray-800">{props.children}</div>
          </Fragment>
        )}
      </Popover.Panel>
    </Popover>
  );
}

interface ITooltipProps {
  trigger: ReactElement;
}
