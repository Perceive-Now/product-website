import { useState, Fragment } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import classNames from "classnames";

//
import PerceiveLogo from "../../../assets/images/logo.svg";

//
import { ChevronDown, ChevronUp, LogoutIcon } from "../../icons";
import { sidebarItems, ISidebarListItem } from "./_data";

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
    sidebarItems.map((itm) => itm.key),
  );

  const [expandedSubGroups, setExpandedSubGrups] = useState<string[]>([]);

  //
  const updateActiveGroup = (group: string) => {
    if (expandedGroups.includes(group)) {
      setExpandedGroups(expandedGroups.filter((g) => g !== group));
    } else {
      setExpandedGroups([...expandedGroups, group]);
    }
  };

  //
  const updateActiveSubGroup = (group: string) => {
    if (expandedSubGroups.includes(group)) {
      setExpandedSubGrups(expandedSubGroups.filter((g) => g !== group));
    } else {
      setExpandedSubGrups([...expandedSubGroups, group]);
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);

    await dispath(logoutUser()).unwrap();
    navigate("/login");

    setIsLoggingOut(false);
  };

  return (
    <div className="w-[256px] h-full flex flex-col justify-between my-auto">
      <div>
        <div className="flex justify-center py-3">
          <Link to="/">
            <img src={PerceiveLogo} alt="PerceiveNow logo" />
          </Link>
        </div>

        <div>
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.children && (
                <Fragment>
                  <div
                    className="px-2 py-2 flex items-center text-primary-600 cursor-pointer"
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
                      {item.children?.map((child, jndex) => (
                        <div key={jndex} className="">
                          {child.children && (
                            <Fragment>
                              <div
                                className="px-2 py-2 flex items-center cursor-pointer ml-2"
                                onClick={() => updateActiveSubGroup(child.key)}
                              >
                                <div className="mr-1">
                                  {expandedSubGroups.includes(child.key) && <ChevronUp />}
                                  {!expandedSubGroups.includes(child.key) && <ChevronDown />}
                                </div>
                                <span>{child.title}</span>
                              </div>

                              {expandedSubGroups.includes(child.key) &&
                                child.children.map((subChild, kndex) => (
                                  <div className="ml-3" key={kndex}>
                                    <NavLinkItem
                                      key={`sub-content-${kndex}`}
                                      to={subChild.to}
                                      icon={subChild.icon}
                                      title={subChild.title}
                                      isTopLevel={false}
                                    />
                                  </div>
                                ))}
                            </Fragment>
                          )}

                          {!child.children && (
                            <NavLinkItem
                              key={`main-content-${jndex}`}
                              to={child.to}
                              icon={child.icon}
                              title={child.title}
                              isTopLevel={false}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </Fragment>
              )}

              {!item.children && (
                <NavLinkItem
                  key={`top-${index}`}
                  to={item.to}
                  icon={item.icon}
                  title={item.title}
                  isTopLevel={true}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="pb-3 text-gray-900">
        <div className="px-2 py-2 flex items-center cursor-pointer" onClick={() => handleLogout()}>
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
    <NavLink to={props.to ?? ""}>
      {({ isActive }) => (
        <div
          className={classNames(
            "flex items-center py-2 text-gray-900 hover:bg-primary-50 pr-2",
            props.isTopLevel ? "pl-2" : "pl-4",
            { "bg-appGray-200": isActive },
          )}
        >
          {props.icon && (
            <div
              className={classNames("mr-1", {
                "text-[#87888C]": !props.isTopLevel,
              })}
            >
              {props.icon}
            </div>
          )}
          <span className="h-4 flex items-center">{props.title}</span>
        </div>
      )}
    </NavLink>
  );
}

interface INavLinkItemProps extends ISidebarListItem {
  isTopLevel: boolean;
}
