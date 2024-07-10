import { Menu } from "@headlessui/react";

import classNames from "classnames";
import IconButton from "../icon-button";
import VerticalEllipsis from "../../icons/common/vertical-ellipsis";

interface IMoreOption {
  label: string;
  toggle?: any;
}

interface IOptions {
  label: string;
  action: (id: string) => void;
  icon?: any;
  moreOption?: IMoreOption;
}

interface Props {
  onSelect?: any;
  menuItems: IOptions[];
  classname?: string;
  icon?: any;
  alignment?: "left" | "right";
  tooltip?: string;
  width?: "sm" | "md" | "xs";
  conversation_id: string;
}

export default function Dropdown({
  menuItems,
  classname,
  icon: Icon,
  alignment,
  width = "sm",
  conversation_id,
}: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as="div">
        <IconButton
          type="button"
          className={`flex items-center justify-center rounded-full border border-solid  hover:cursor-pointer hover:shadow-v1 focus:shadow-v1 ${classname}  duration-700 hover:bg-white`}
          icon={
            Icon !== undefined ? (
              <Icon className="h-5 w-5 text-white" />
            ) : (
              <VerticalEllipsis className="" />
            )
          }
          color={"default"}
        />
      </Menu.Button>
      <Menu.Items
        className={classNames(
          width === "xs" && "w-[108px]",
          width === "sm" && "w-[254px]",
          width === "md" && " min-w-72",
          alignment !== undefined ? `${alignment}-0` : "right-0",
          "shadow-all absolute z-50 origin-top-right overflow-hidden rounded-md bg-white shadow border",
        )}
      >
        <div className="">
          {menuItems.map((option) => (
            <Menu.Item key={option.label}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex cursor-pointer items-center gap-x-0.5 pl-1 py-[4px] ",
                  )}
                  onClick={() => option.action(conversation_id)}
                >
                  <span className="">{option.icon}</span>
                  <div>
                    <span className="text-sm font-medium text-secondary-800 shrink-0">
                      {option.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {option.moreOption?.toggle}
                      <span className="text-xs text-silver">{option.moreOption?.label}</span>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
}
