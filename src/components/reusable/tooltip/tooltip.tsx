import { Popover } from "@headlessui/react";
import classNames from "classnames";
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

      {props.isCustomPanel && (
        <Popover.Panel
          className={classNames(
            "absolute z-20 bg-white border border-gray-300 shadow-lg right-0 max-w-lg cursor-default",
            props.panelClassName,
          )}
        >
          {props.children}
        </Popover.Panel>
      )}

      {!props.isCustomPanel && (
        <Popover.Panel className="absolute z-20 rounded-2xl pl-6 pr-8 py-5 min-w-[420px] bg-white border border-gray-300 shadow-lg right-0 max-w-lg cursor-default">
          {({ close }) => (
            <Fragment>
              <div className="absolute top-2 right-2 cursor-pointer" onClick={() => close()}>
                <CrossIcon />
              </div>

              <div className="text-gray-800">{props.children}</div>
            </Fragment>
          )}
        </Popover.Panel>
      )}
    </Popover>
  );
}

interface ITooltipProps {
  trigger: ReactElement;
  isCustomPanel?: boolean;
  panelClassName?: string;
}
