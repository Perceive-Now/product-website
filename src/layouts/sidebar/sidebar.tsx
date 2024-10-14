import { useState, FunctionComponent, useCallback, useEffect, Fragment } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

//
import LogoSm from "../../assets/images/logo-small.svg";
import Logo from "../../assets/images/logo.svg";

import classNames from "classnames";

//
import { sidebarItems, ISidebarListItem } from "./_data";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { logoutUser } from "../../stores/auth";
//

import { ChevronDown, ChevronUp, LogoutIcon, SettingsIcon } from "../../components/icons";
import UserIcon from "../../components/reusable/userIcon";
import SideBarToggleIcon from "../../components/icons/side-bar/toggle";

import { setSession } from "../../stores/session";
import ToolTip from "src/components/reusable/tool-tip";
import ChatSidebar from "./chat/chat-sidebar";
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';

interface Props {
  show?: boolean;
  handleShow?: () => void;
}
interface INavLinkItemProps extends ISidebarListItem {
  value: string;
  open: boolean;
}

const SidebarBottom = [
  {
    title: "Settings",
    href: "/setting",
    icon: SettingsIcon,
  },
  {
    title: "Logout",
    icon: LogoutIcon,
  },
];

const tourSteps = [
  {
    target: ".sidebar-knownow",
    placement: 'right' as const,
    content:
      "Here’s Know Now! It’s where you explore IP Insights and Market Research. Let’s take a quick look.",
  },
  
  {
    target: ".sidebar-ip",
    content:
      "With IP Insights, you can explore patents or search prior art. Want to dive in now or move on?",
  },
  {
    target: ".sidebar-mi",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
  },
  
  {
    target: ".sidebar-industries",
    content:
      "Next is Industry Reports! You’ll find industry-specific insights like Venture Capital, Healthcare, and more. Let’s explore each one.",
  },

  {
    target: ".sidebar-vc",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
  },
  {
    target: ".sidebar-firm",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
  },
  {
    target: ".sidebar-healthcare",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
  },
  {
    target: ".sidebar-ma",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
  },
  {
    target: ".sidebar-web3",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
  },
  {
    target: ".sidebar-ipattorny",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
  },
  {
    target: ".sidebar-tto",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
  },
];

export const AppSidebar: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(true);
  const [isChat, setIsChat] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [secondStepCount, setSecondStepCount] = useState(0);
  const [runTour, setRunTour] = useState(false);
  const [steps, setSteps] = useState(tourSteps);

  const { pathname } = useLocation();

  const userDetail = useAppSelector((state) => state.auth.user);

  const startTour = () => {
    setRunTour(true);
  };

  const handleItemClick = (key: any) => {
    setActiveItem(key);
  };
  const handleSubItemClick = (key: any) => {
    setActiveSubItem(key);
  };

  useEffect(() => {
    if (pathname.includes("/know-now")) {
      setIsChat(true);
    } else {
      setIsChat(false);
    }
  }, [pathname]);

  // const match = props.to ? pathname.includes(props.key) : false;
  // const titles = pathname?.split("/").slice(1);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    sidebarItems.map((itm) => itm.key),
  );

  const updateActiveGroup = (group: string) => {
    if (expandedGroups.includes(group)) {
      setExpandedGroups(expandedGroups.filter((g) => g !== group));
    } else {
      setExpandedGroups([...expandedGroups, group]);
    }
  };

  // const updateActiveSubGroup = (group: string) => {
  //   if (expandedSubGroups.includes(group)) {
  //     setExpandedSubGrups(expandedSubGroups.filter((g) => g !== group));
  //   } else {
  //     setExpandedSubGrups([...expandedSubGroups, group]);
  //   }
  // };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    dispatch(setSession({ session_data: {} }));

    await dispatch(logoutUser());
    navigate("/login");
    setIsLoggingOut(false);
  };

  // const handleJoyrideCallback = (data: CallBackProps): void => {
  //   const { action, index, origin, status, type } = data;
  //   console.log("action",action);
  //   console.log("index",index)
  //   console.log("origin",origin)
  //   console.log("type",type)
  //   if (type === 'step:after' && index === 1 ) {
  //     console.log("ajajja");
  //     setActiveItem("knownow");
  //     setOpen(true);
  //     setTimeout(() => {
  //       // Your logic here after the delay
  //       console.log("Processing after delay");
  //       setCurrentStepIndex(2)
  //     }, 2000);
  //   }

  //   // if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
  //   //   // Handle keyboard close action if needed
  //   // }

  //   // if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
  //   //   // Update state to advance the tour
  //   //   setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
  //   // } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
  //   //   // Stop the tour
  //   //   setRun(false);
  //   // }

  //   // console.groupCollapsed(type);
  //   // console.log(data); //eslint-disable-line no-console
  //   // console.groupEnd();
  // };

  const handleJoyrideCallback = (data: any) => {
    const { status, index } = data;
    console.log("indexxss",index,status)
    if (status === "finished" || status === "skipped") {
      setRunTour(false);
    }
    if (index === 0)  {
      console.log("Second step clicked!");
      setActiveItem("knownow");
      setOpen(true);

    }
    if (index === 3)  {
      console.log("Second step clicked!");
      setActiveItem("industries");
      setOpen(true);

    }
    
  };

  return (
    <>
    <div className="flex mt-1 mr-[40px] relative">
      {/* Violet Sidebar */}
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        scrollToFirstStep
        showSkipButton
        styles={{
          options: {
            zIndex: 2000000,
          },
          overlay: {
            backgroundColor: 'rgba(79, 46, 8, 0.5)',
          },
        }}
        // callback={(data) => {
        //   const { status } = data;
        //   if (status === 'finished' || status === 'skipped') {
        //     setRunTour(false);
        //   }
        // }}
        // stepIndex={currentStepIndex} 
        callback={handleJoyrideCallback}
      />
      <div className="bg-appGray-100 pt-1 w-[66px] items-center duration-300 shadow fixed flex flex-col justify-between rounded h-[calc(100vh-80px)]">
        <div>
          <div className="flex items-center gap-1 justify-start flex-col">
            <ToolTip title={open ? "Close Sidebar" : "Open Sidebar"} placement="right">
              <button
                type="button"
                className="hover:bg-white h-5 w-5 rounded-full flex justify-center items-center"
                onClick={() => setOpen(!open)}
              >
                <SideBarToggleIcon className={classNames(open ? "rotate-180" : "")} />
              </button>
            </ToolTip>
          </div>
          <button onClick={startTour} className='ml-3'>Start</button>

          <div className="mt-2">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                className={classNames(`${item.classname} py-2 px-4 w-full text-center relative`, {
                  "bg-white": activeItem === item.key,
                  "text-primary-900": activeItem !== item.key,
                  // "hover:bg-primary-900": activeItem !== item.key,
                  // "hover:text-white":activeItem !== item.key
                })}
                onClick={() => {
                  handleItemClick(item.key);
                }}
              >
                <item.icon className="mr-2" />
              </button>
            ))}
          </div>
        </div>
        
      </div>

      {/* White Sidebar for Sublist */}
      {open && activeItem && (
        <div className="z-10 bg-appGray-100 relative left-[66px]  h-full w-64 flex flex-col p-2">
          <h2 className="text-xl font-bold mb-2 ml-1">
            {sidebarItems.find((item) => item.key === activeItem)?.title}
          </h2>
          {sidebarItems
            .find((item) => item.key === activeItem)
            ?.subList?.map((subItem) => (
              <div
                key={subItem.key}
                // href={subItem.to}
                className={classNames(
                  `${subItem.classname} sidebar-1 flex cursor-pointer items-center font-bold p-1 text-gray-700`,
                  {
                    "border-2 border-secondary-500 rounded-lg p-2": activeSubItem === subItem.key,
                  },
                )}
                onClick={() => {
                  navigate(subItem.to || "/");
                }}
              >
                <subItem.icon />
                <span className="ml-2">{subItem.title}</span>
              </div>
            ))}
        </div>
      )}
       
      
    </div>
      {isChat && (
      <div className={classNames("mt-1 ", open ? "mr-[210px] " : "mr-[40px] duration-300")}>
      <div
        className={classNames(
          "bg-appGray-100 pt-1",
          open ? "w-[220px]" : "w-[56px] items-center duration-300 ",
          "shadow fixed flex flex-col justify-between  rounded h-[calc(100vh-80px)]",
        )}
      >
        <div>
          <div
            className={classNames(
              "flex items-center gap-1",
              open ? "flex-row justify-between" : "justify-start flex-col",
            )}
          >
            <Link to={"/"}>
              <img
                src={open ? Logo : LogoSm}
                alt="logo"
                className={classNames("h-[40px] w-[40x] p-1", open ? "ml-3" : "")}
              />
            </Link>
            <ToolTip title={open ? "Close Sidebar" : "Open Sidebar"} placement="right">
              <button
                type="button"
                className="hover:bg-white h-5 w-5 rounded-full flex justify-center items-center"
                onClick={() => setOpen(!open)}
              >
                <SideBarToggleIcon className={classNames(open ? "rotate-180" : "")} />
              </button>
            </ToolTip>
          </div>
          <div className="space-y-1 mt-1">
            {isChat ? (
              <>{open && <ChatSidebar />}</>
            ) : (
              <>
                {sidebarItems.map((item, index) => (
                  <div key={index}>
                    {item.children && (
                      <Fragment>
                        <div
                          className={`flex items-center justify-between my-1 rounded-lg cursor-pointer px-2.5 text-sm`}
                          onClick={() => updateActiveGroup(item.key)}
                        >
                          <div className="flex items-center">
                            <div className="hover:bg-white h-5 w-5 rounded-full flex justify-center items-center">
                              {item.icon && <item.icon className="text-primary-900" />}
                            </div>
                            <span className=" text-sm">{item.title}</span>
                          </div>
                          <div className="">
                            {expandedGroups.includes(item.key) && <ChevronUp className="w-2 h-2" />}
                            {!expandedGroups.includes(item.key) && (
                              <ChevronDown className="w-2 h-2" />
                            )}
                          </div>
                        </div>

                        {expandedGroups.includes(item.key) && (
                          <div className="space-y-1">
                            {item.children?.map((child, jndex) => (
                              <div key={jndex} className="pl-4">
                                {!child.children && (
                                  <NavLinkItem
                                    open={open}
                                    key={`main-content-${jndex}`}
                                    value={child.key}
                                    // icon={child.icon}
                                    title={child.title}
                                    to={""}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </Fragment>
                    )}
                    {item.subList && (
                      <>
                        <NavLinkItem
                          key={`top-${index}`}
                          to={item.to}
                          icon={item.icon}
                          title={item.title}
                          open={open}
                          value={item.key}
                        />
                        {open && (
                          <ul
                            className={classNames(
                              "space-y-1 pl-7 list-disc",
                              "max-h-[180px] w-11/12 overflow-y-auto overflow-x-hidden",
                              "pn_scroller",
                            )}
                          >
                            {item.subList?.map((child, jndex) => (
                              <li key={jndex}>
                                {!child.children && (
                                  <NavLinkItem
                                    open={open}
                                    key={`main-content-${jndex}`}
                                    value={child.key}
                                    title={child.title}
                                    to={child.to}
                                  />
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    )}
                    {!item.children && !item.subList && (
                      <NavLinkItem
                        key={`top-${index}`}
                        to={item.to}
                        icon={item.icon}
                        title={item.title}
                        open={open}
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
        <div className="pb-3 text-gray-900 space-y-2 ">
          <div className="space-y-1 px-2.5">
            {SidebarBottom.map((s, idx) => (
              <div key={idx * 29}>
                {s.href ? (
                  <Link
                    to={s.href}
                    className={classNames(
                      "py-1 rounded pl-1 flex items-center gap-1 text-sm text-secondary-800",
                    )}
                  >
                    <ToolTip title={s.title} placement="right">
                      <div>
                        <s.icon className="text-primary-900 h-[20px] w-[20px]" />
                      </div>
                    </ToolTip>
                    {open && <>{s.title}</>}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={classNames(
                      "py-1 rounded pl-1 flex items-center gap-1 text-sm text-secondary-800",
                    )}
                  >
                    <ToolTip title={s.title} placement="right">
                      <div>
                        <s.icon className="text-primary-900 h-[20px] w-[20px]" />
                      </div>
                    </ToolTip>
                    {open && <>{s.title}</>}
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="bg-appGray-200 h-[1px] w-full" />
          <div className="flex items-center justify-between w-full px-2.5">
            <Link to="/profile" className="flex items-center gap-1 w-full">
              <div className="shrink-0">
                <UserIcon
                  first_name={userDetail?.first_name || ""}
                  last_name={userDetail?.last_name || ""}
                  profile_photo={userDetail?.profile_photo}
                />
              </div>
              {open && (
                <p className="line-clamp-1 w-14 text-secondary-800">{userDetail?.full_name}</p>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
      )}

    </>
  )
};

function NavLinkItem(props: INavLinkItemProps) {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    if (props.value === "new-report") {
      // dispatch(getNewSession());
      dispatch(
        setSession({
          session_data: {},
        }),
      );
    }
  }, [dispatch, props.value]);

  return (
    <NavLink to={props.to ?? ""} end onClick={handleClick}>
      {/* {({ isActive }) => ( */}
      <div className={classNames("flex items-center gap-0.5", props.open && " px-2.5 ")}>
        {props.icon && (
          <ToolTip title={props.title} placement="right">
            <div
              className={classNames(
                "hover:bg-white h-5 w-5 rounded-full flex justify-center items-center",
              )}
            >
              <props.icon className="text-primary-900" />
            </div>
          </ToolTip>
        )}
        {props.open && (
          <span
            className={classNames("flex items-center text-sm font-semibold text-secondary-800")}
          >
            {props.title}
          </span>
        )}
      </div>
      {/* )} */}
    </NavLink>
  );
}
