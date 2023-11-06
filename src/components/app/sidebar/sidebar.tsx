import { useState, Fragment, FunctionComponent } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import classNames from "classnames";

//
import PerceiveLogo from "../../../assets/images/logo.svg";

//
import { ChevronDown, ChevronUp } from "../../icons";
import { sidebarItems, ISidebarListItem } from "./_data";

// Redux
// import { logoutUser } from "../../../stores/auth";
// import { useAppDispatch } from "../../../hooks/redux";
import { Dialog } from "@headlessui/react";
import SidebarTransition from "./sidebarTransition";
import ToggleBarIcon from "../../icons/sidenav/bars";

/**
 *
 */
interface Props {
  show: boolean;
  handleShow: () => void;
}
const AppSidebar: FunctionComponent<Props> = ({ show, handleShow }) => {
  // const navigate = useNavigate();
  // const dispath = useAppDispatch();

  // const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  // const handleLogout = async () => {
  //   if (isLoggingOut) return;
  //   setIsLoggingOut(true);

  //   await dispath(logoutUser()).unwrap();
  //   navigate("/login");

  //   setIsLoggingOut(false);
  // };

  return (
    // <div className="w-[256px] h-full flex flex-col justify-between my-auto">
    <div>
      <SidebarTransition show={show} handleShow={handleShow}>
        <Dialog.Panel className=" bg-white shadow w-[270px] overflow-auto">
          <div className="flex justify-center items-end py-3 gap-2 bg-appGray-100">
            {/* {open && ( */}
            <button type="button" className="" onClick={handleShow}>
              <ToggleBarIcon />
            </button>
            {/* )} */}
            <Link to="/">
              <img src={PerceiveLogo} alt="PerceiveNow logo" />
            </Link>
          </div>
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.children && (
                <div>
                  <div
                    className="px-2 py-2 flex items-center cursor-pointer"
                    onClick={() => updateActiveGroup(item.key)}
                  >
                    <div className="mr-1">
                      {expandedGroups.includes(item.key) && <ChevronUp />}
                      {!expandedGroups.includes(item.key) && <ChevronDown />}
                    </div>
                    <span className="text-lg">{item.title}</span>
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
                                <span className="text-lg">{child.title}</span>
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
                                      value={subChild.key}
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
                              value={child.key}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {!item.children && (
                <NavLinkItem
                  key={`top-${index}`}
                  to={item.to}
                  icon={item.icon}
                  title={item.title}
                  isTopLevel={true}
                  value={item.key}
                />
              )}
            </div>
          ))}
        </Dialog.Panel>
      </SidebarTransition>
    </div>

    //   <div className="pb-3 text-gray-900">
    //     <div className="px-2 py-2 flex items-center cursor-pointer" onClick={() => handleLogout()}>
    //       <div className="mr-2">
    //         <LogoutIcon />
    //       </div>
    //       <span>Logout</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AppSidebar;

function NavLinkItem(props: INavLinkItemProps) {
  const { pathname } = useLocation();
  // const match = props.to ? pathname.includes(props.key) : false;
  const titles = pathname?.split("/").slice(1);
  const hasKey = titles.includes(props.value);

  return (
    <NavLink to={props.to ?? ""} end>
      {({ isActive }) => (
        <div
          className={classNames(
            "flex items-center py-2 text-gray-900 pr-2",
            props.isTopLevel ? "pl-2" : "pl-4",
            isActive || hasKey ? "bg-primary-900" : "hover:bg-primary-50",
          )}
        >
          {props.icon && (
            <div
              className={classNames(
                "mr-1 text-gray-600 fill-gray-600",

                {
                  // "text-gray-600": !props.isTopLevel,
                  "text-white": isActive || hasKey,
                },
              )}
            >
              {props.icon}
            </div>
          )}
          <span
            className={classNames(
              "flex items-center text-lg ",
              isActive || hasKey ? "text-white " : "text-gray-900",
            )}
          >
            {props.title}
          </span>
        </div>
      )}
    </NavLink>
  );
}

interface INavLinkItemProps extends ISidebarListItem {
  isTopLevel: boolean;
  value: string;
}
