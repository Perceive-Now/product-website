import { Popover } from "@headlessui/react";
import { PropsWithChildren, ReactElement } from "react";

//
import { CrossIcon } from "../../icons";

/**
 *
 */
export default function Tooltip(props: PropsWithChildren<ITooltipProps>) {
  return (
    <Popover className="relative">
      <Popover.Button className="focus:outline-none">
        {props.trigger}
      </Popover.Button>

      <Popover.Panel className="absolute z-10 rounded-2xl bg-white border border-gray-200 shadow-md px-5 py-4 right-0 max-w-lg cursor-default">
        {({ close }) => (
          <>
            <div
              className="absolute top-1 right-1 cursor-pointer"
              onClick={() => close()}
            >
              <CrossIcon />
            </div>

            <div>{props.children}</div>
          </>
        )}
      </Popover.Panel>
    </Popover>
  );
}

interface ITooltipProps {
  trigger: ReactElement;
}
