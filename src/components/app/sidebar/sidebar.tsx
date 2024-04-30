import { useState, Fragment, FunctionComponent, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import classNames from "classnames";

//
import PerceiveLogo from "../../../assets/images/logo.svg";

//
import { sidebarItems, ISidebarListItem } from "./_data";

// Redux
// import { Dialog } from "@headlessui/react";
// import SidebarTransition from "./sidebarTransition";
import KnowNowHistory from "./chat-history";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logoutUser } from "../../../stores/auth";
//

import { ChevronDown, ChevronUp, LogoutIcon } from "../../icons";
import ToggleBarIcon from "../../icons/sidenav/bars";
import UserIcon from "../../reusable/userIcon";

/**
 *
 */
interface Props {
  show?: boolean;
  handleShow?: () => void;
}
export const AppSidebar: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(true);
  const [isChat, setIsChat] = useState(false);

  const { pathname } = useLocation();

  const userDetail = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (pathname.includes("/know-now")) {
      setIsChat(true);
    }
  }, [pathname]);

  // const match = props.to ? pathname.includes(props.key) : false;
  // const titles = pathname?.split("/").slice(1);

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

    await dispatch(logoutUser()).unwrap();
    navigate("/login");

    setIsLoggingOut(false);
  };

  return (
    // <div className="w-[256px] h-full flex flex-col justify-between my-auto">
    <div>
      {/* <SidebarTransition show={show} handleShow={handleShow}> */}
      <div
        className={classNames(
          open ? "w-[270px]" : "w-[270px]",
          " bg-appGray-100 shadow  overflow-auto px-2.5 min-h-screen fixed flex flex-col justify-between",
        )}
      >
        <div>
          <div className="flex justify-center items-center py-3 gap-2 bg-appGray-100">
            {/* {open && ( */}
            <button type="button" className="pt-1" onClick={() => setOpen(!open)}>
              <ToggleBarIcon />
            </button>
            {/* )} */}
            <Link to="/">
              <img src={PerceiveLogo} alt="PerceiveNow logo" className="-mt-0.5" />
            </Link>
          </div>
          <div className="space-y-2.5">
            {/* <Link to={"/know-now/ip-analysis"}>
            <div
              className={classNames(
                pathname.includes("/know-now")
                  ? "bg-primary-900 text-white"
                  : "bg-white text-secondary-800",
                "border border-appGray-600 text-sm  px-2.5 py-1 rounded-md font-semibold ",
              )}
            >
              Start new conversation
            </div>
          </Link> */}
            {isChat ? (
              <KnowNowHistory />
            ) : (
              <>
                {sidebarItems.map((item, index) => (
                  <div key={index}>
                    {item.children && (
                      <div>
                        <div
                          className="px-2.5 py-2 flex items-center cursor-pointer"
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
                                            // icon={subChild.icon}
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
                                    // icon={child.icon}
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
                        // icon={item.icon}
                        title={item.title}
                        isTopLevel={true}
                        value={item.key}
                      />
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* sidebar bottom */}
        <div className="pb-3 text-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserIcon
                first_name={userDetail?.first_name || ""}
                last_name={userDetail?.last_name || ""}
                profile_photo={userDetail?.profile_photo}
              />
              <span>{userDetail?.full_name}</span>
            </div>
            <button type="button" onClick={handleLogout}>
              <LogoutIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
            "flex items-center py-1 text-gray-900 px-2.5 rounded",
            // props.isTopLevel ? "pl-2" : "pl-4",
            isActive || hasKey ? "bg-primary-900" : "hover:bg-primary-",
          )}
        >
          {/* {props.icon && (
            <div
              className={classNames(
                "mr-1 text-gray-600 fill-gray-600",

                {
                  "text-white": isActive || hasKey,
                },
              )}
            >
              {props.icon}
            </div>
          )} */}
          <span
            className={classNames(
              "flex items-center text-sm font-semibold",
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
