import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import classNames from "classnames";

//
import PerceiveLogo from "../../../assets/images/logo.svg";

//
import { ChevronDown, ChevronUp, LogoutIcon } from "../../icons";
import { topItems, sidebarItems, bottomItems, ISidebarItem } from "./_data";

/**
 *
 */
export default function AppSidebar() {
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // TODO:: Do the actual logout

    navigate("/login");
  };

  return (
    <div className="w-[256px] h-full pb-3">
      <div className="flex justify-center py-3">
        <img src={PerceiveLogo} alt="PerceiveNow logo" />
      </div>

      <div className="pb-3">
        {/* Level 0 items before expandable group */}
        {topItems.map((item, index) => (
          <NavLinkItem
            key={`top-${index}`}
            to={item.to}
            icon={item.icon}
            title={item.title}
            isTopLevel={true}
          />
        ))}

        {/* Expandable groups */}
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

        {/* Level 0 items after expandable group */}
        {bottomItems.map((item, index) => (
          <NavLinkItem
            key={`bottom-${index}`}
            to={item.to}
            icon={item.icon}
            title={item.title}
            isTopLevel={true}
          />
        ))}

        {/* Logout */}
        <div
          onClick={() => handleLogout()}
          className="flex items-center py-2 text-gray-900 px-3 cursor-pointer"
        >
          <div className="mr-2">
            <LogoutIcon />
          </div>
          <span>Logout</span>
        </div>
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
            "flex items-center py-2 text-gray-900",
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
