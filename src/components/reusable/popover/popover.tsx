import classNames from "classnames";
import { Popover as RawPopover } from "@headlessui/react";
import { Fragment, PropsWithChildren, ReactElement } from "react";

//
import { CrossIcon } from "../../icons";

/**
 *
 */
export default function Popover(props: PropsWithChildren<ITooltipProps>) {
  return (
    <RawPopover className="relative">
      <RawPopover.Button className="focus:outline-none flex items-center">
        {props.trigger}
      </RawPopover.Button>

      {props.isCustomPanel && (
        <RawPopover.Panel
          className={classNames(
            "absolute z-20 bg-white border border-gray-300 shadow-lg right-0 max-w-lg cursor-default",
            props.panelClassName,
          )}
        >
          {props.children}
        </RawPopover.Panel>
      )}

      {!props.isCustomPanel && (
        <RawPopover.Panel className="absolute z-20 rounded-2xl pl-6 pr-8 py-5 min-w-[420px] bg-white border border-gray-300 shadow-lg right-0 max-w-lg cursor-default">
          {({ close }) => (
            <Fragment>
              <div className="absolute top-2 right-2 cursor-pointer" onClick={() => close()}>
                <CrossIcon />
              </div>

              <div className="text-gray-800">{props.children}</div>
            </Fragment>
          )}
        </RawPopover.Panel>
      )}
    </RawPopover>
  );
}

//
interface ITooltipProps {
  trigger: ReactElement;
  isCustomPanel?: boolean;
  panelClassName?: string;
}
