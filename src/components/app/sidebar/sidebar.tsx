import { useState } from "react";
import { NavLink } from "react-router-dom";

import classNames from "classnames";

//
import PerceiveLogo from "../../../assets/images/logo.svg";

//
import { ChevronDown, ChevronUp } from "../../icons";
import { topItems, sidebarItems, bottomItems, ISidebarItem } from "./_data";

/**
 *
 */
export default function AppSidebar() {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    sidebarItems.map((itm) => itm.key)
  );

  const updateActiveGroup = (group: string) => {
    if (expandedGroups.includes(group)) {
      setExpandedGroups(expandedGroups.filter((g) => g !== group));
    } else {
      setExpandedGroups([...expandedGroups, group]);
    }
  };

  return (
    <div className="w-[256px] h-full pb-3">
      <div className="flex justify-center py-3">
        <img src={PerceiveLogo} alt="PerceiveNow logo" />
      </div>

      <div className="pb-3">
        {topItems.map((item, index) => (
          <NavLinkItem
            key={`top-${index}`}
            to={item.to}
            icon={item.icon}
            title={item.title}
            isTopLevel={true}
          />
        ))}

        {sidebarItems.map((item, index) => (
          <div key={index}>
            <div
              className="px-3 py-2 flex items-center text-primary-600 cursor-pointer"
              onClick={() => updateActiveGroup(item.key)}
            >
              <div className="mr-[20px] pl-[4px]">
                {expandedGroups.includes(item.key) && <ChevronUp />}
                {!expandedGroups.includes(item.key) && <ChevronDown />}
              </div>
              <span>{item.title}</span>
            </div>

            {expandedGroups.includes(item.key) && (
              <div>
                {item.children.map((child, jndex) => (
                  <NavLinkItem
                    key={`main-content-${jndex}`}
                    to={child.to}
                    icon={child.icon}
                    title={child.title}
                    isTopLevel={false}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {bottomItems.map((item, index) => (
          <NavLinkItem
            key={`bottom-${index}`}
            to={item.to}
            icon={item.icon}
            title={item.title}
            isTopLevel={true}
          />
        ))}
      </div>
    </div>
  );
}

function NavLinkItem(props: INavLinkItemProps) {
  return (
    <NavLink to={props.to}>
      {({ isActive }) => (
        <div
          className={classNames(
            "flex items-center py-2",
            props.isTopLevel ? "px-3" : "px-6",
            { "bg-appGray-200": isActive }
          )}
        >
          <div className="mr-2">{props.icon}</div>
          <span>{props.title}</span>
        </div>
      )}
    </NavLink>
  );
}

interface INavLinkItemProps extends ISidebarItem {
  isTopLevel: boolean;
}
