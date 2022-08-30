import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import classNames from "classnames";

//
import PerceiveLogo from "../../../assets/images/logo.svg";

//
import { ChevronDown, ChevronUp, LogoutIcon } from "../../icons";
import { topItems, sidebarItems, ISidebarItem } from "./_data";

// Redux
import { logoutUser } from "../../../stores/auth";
import { useAppDispatch } from "../../../hooks/redux";

/**
 *
 */
export default function AppSidebar() {
  const navigate = useNavigate();
  const dispath = useAppDispatch();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    const response = await dispath(logoutUser()).unwrap();

    if (response.success) {
      navigate("/login");
    } else {
      alert(response.message);
    }

    setIsLoggingOut(false);
  };

  return (
    <div className="w-[256px] h-full flex flex-col justify-between my-auto">
      <div>
        <div className="flex justify-center py-3">
          <img src={PerceiveLogo} alt="PerceiveNow logo" />
        </div>

        <div>
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
                <div className="mr-1">
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
        </div>
      </div>

      {/* Logout */}
      <div className="pb-3 text-gray-900">
        <div
          className="px-3 py-2 flex items-center cursor-pointer"
          onClick={() => handleLogout()}
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
            "flex items-center py-2 text-gray-900 hover:bg-primary-50 pr-2",
            props.isTopLevel ? "pl-3" : "pl-6",
            { "bg-appGray-200": isActive }
          )}
        >
          <div className="mr-1">{props.icon}</div>
          <span className="h-4 flex items-center">{props.title}</span>
        </div>
      )}
    </NavLink>
  );
}

interface INavLinkItemProps extends ISidebarItem {
  isTopLevel: boolean;
}
