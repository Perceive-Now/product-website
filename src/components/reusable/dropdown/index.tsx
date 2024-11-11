import { Menu } from "@headlessui/react";
import classNames from "classnames";
import IconButton from "../icon-button";
import VerticalEllipsis from "../../icons/common/vertical-ellipsis";
import { useEffect, useRef, useState } from "react";

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState<'up' | 'down'>('down');

  //toggledropdown function logic

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Effect to determine dropdown direction
  useEffect(() => {
    if (buttonRef.current) {
      const { bottom, top } = buttonRef.current.getBoundingClientRect();
      const spaceAbove = top; // Space above the button
      const spaceBelow = window.innerHeight - bottom; // Space below the button

      // Decide whether to open up or down based on available space
      if (spaceBelow < spaceAbove) {
        setDropdownDirection('up');
      } else {
        setDropdownDirection('down');
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [isOpen]); // Recalculate when dropdown opens and useEffect runs only when the height is recalculated

  return (
    <Menu as="div" className="relative inline-block text-left" ref={dropdownRef}>
      <Menu.Button ref={buttonRef} onClick={toggleDropdown}>
        <IconButton
          type="button"
          className={`flex items-center justify-center rounded-full border border-solid hover:cursor-pointer hover:shadow-v1 focus:shadow-v1 ${classname} duration-700 hover:bg-white`}
          icon={
            Icon !== undefined ? (
              <Icon className="h-5 w-5 text-white" />
            ) : (
              <VerticalEllipsis />
            )
          }
          color={"default"}
        />
      </Menu.Button>
      {isOpen && (
        <Menu.Items
          as="div"
          className={classNames(
            width === "xs" && "w-[108px]",
            width === "sm" && "w-[254px]",
            width === "md" && "min-w-72",
            alignment !== undefined ? `${alignment}-0` : "right-0",
            "shadow-all absolute z-50 overflow-hidden rounded-md bg-white shadow border",
            dropdownDirection === 'up' ? 'bottom-full mb-1' : 'top-full mt-1' // Adjust position based on direction
          )}
        >
          <div>
            {menuItems.map((option) => (
              <Menu.Item key={option.label}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "flex cursor-pointer items-center gap-x-0.5 p-1 py-[4px]"
                    )}
                    onClick={() => option.action(conversation_id)}
                  >
                    <span>{option.icon}</span>
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
      )}
    </Menu>
  );
}