import { useEffect, useRef, useState } from "react";
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
  action: (id: number) => void;
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
  conversation_id: number;
}

export default function Dropdown({
  menuItems,
  classname,
  icon: Icon,
  alignment,
  width = "sm",
  conversation_id,
}: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the parent scrollable container
  const [isDropdownBelow, setIsDropdownBelow] = useState(true); // Flag to determine if the dropdown is below the button

  // Effect to calculate whether dropdown needs to be adjusted based on the container height
  useEffect(() => {
    if (dropdownRef.current && containerRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const parentRect = containerRef.current.offsetParent?.getBoundingClientRect();

      // Check if the parent container has an offset from the top of the viewport
      const parentOffsetTop = parentRect ? parentRect.top : 0;

      const isOverflowingBottom =
        dropdownRect.bottom > containerRect.bottom; // Check if dropdown goes beyond the container's bottom

      const isOverflowingTop = dropdownRect.top < containerRect.top; // Check if dropdown goes above the container's top

      if (isOverflowingBottom) {
        setIsDropdownBelow(false); // Move dropdown above
      } else {
        setIsDropdownBelow(true); // Keep dropdown below
        
      }

      // Scroll the container if the dropdown is not fully visible
      if (isOverflowingBottom) {
        const scrollAmount = dropdownRect.bottom - containerRect.bottom;

        // Scroll to the bottom of the dropdown considering the parent container's position
        containerRef.current.scrollTo({
          top: containerRef.current.scrollTop + scrollAmount - parentOffsetTop,
          behavior: "smooth",
        });
      } else if (isOverflowingTop) {
        const scrollAmount = dropdownRect.top - containerRect.top;

        // Scroll to the top of the dropdown considering the parent container's position
        containerRef.current.scrollTo({
          top: containerRef.current.scrollTop + scrollAmount - parentOffsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [menuItems, alignment]);

  return (
    <Menu as="div" className="relative inline-block text-left" ref={containerRef}>
      <Menu.Button as="div">
        <IconButton
          type="button"
          className={`flex items-center justify-center rounded-full border border-solid hover:cursor-pointer hover:shadow-v1 focus:shadow-v1 ${classname} duration-700 hover:bg-white`}
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
        ref={dropdownRef}
        className={classNames(
          width === "xs" && "w-[108px]",
          width === "sm" && "w-[254px]",
          width === "md" && "min-w-72",
          alignment !== undefined ? `${alignment}-0` : "right-0",
          "shadow-all absolute z-50 origin-top-right overflow-hidden rounded-md bg-white shadow border",
          isDropdownBelow ? "top-[100%]" : "bottom-[100%]", 
        )}
      >
        <div>
          {menuItems.map((option) => (
            <Menu.Item key={option.label}>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "flex cursor-pointer items-center gap-x-0.5 p-1 py-[4px]",
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
