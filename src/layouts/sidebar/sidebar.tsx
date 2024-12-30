import { useState, useRef, FunctionComponent, useCallback, useEffect, Fragment } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import PerceiveLogo from "../../assets/images/logo.svg";
import PerceiveIcon from "../../assets/images/logo-small.svg"

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
import Joyride, { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from "react-joyride";
import { setCurrentStep } from "src/stores/vs-product";
import { setStartTour, setFinishTour } from "src/stores/dashboard";
import RoundedArrowIcon from "src/components/icons/side-bar/rounded-arrow";
interface Props {
  show?: boolean;
  handleShow?: () => void;
  onSidebarToggle: (isOpen: boolean) => void;
}
interface INavLinkItemProps extends ISidebarListItem {
  value: string;
  open: boolean;
}

// const SidebarBottom = [
//   {
//     title: "Settings",
//     href: "/setting",
//     icon: SettingsIcon,
//   },
// {
//   title: "Logout",
//   icon: LogoutIcon,
// },
// ];

const SidebarBottom = [
  {
    title: "Account Info",
    href: "/profile",
    icon: SettingsIcon,
  },
  // {
  //   title: "Preferences",
  //   href: "/preferences",
  //   icon: LogoutIcon,
  // },
  {
    title: "AI Agents Reports",
    href: "/reports",
    icon: LogoutIcon,
  },
  {
    title: "User management",
    href: "/my-users",
    icon: LogoutIcon,
  },
  // {
  //   title: "Billing",
  //   href: "/setting",
  //   icon: LogoutIcon,
  // },
  {
    title: "Logout",
    icon: LogoutIcon,
  },
];

const tourSteps = [
  {
    target: ".sidebar-knownow",
    content:
      "Here’s Know Now! It’s where you explore IP Insights and Market Research. Let’s take a quick look.",
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },
  {
    target: ".sidebar-industries",
    content:
      "Next is Industry Reports! You’ll find industry-specific insights like Venture Capital, Healthcare, and more. Let’s explore each one.",
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },

  {
    target: ".sidebar-ip",

    content: (
      <div className="py-1">
        With IP Insights, you can explore patents or search prior art. Want to dive in now or move
        on?{" "}
        <a
          href="/know-now/ip-analysis/"
          className="px-1 py-1 border border-appGray-200 rounded-lg 
  absolute top-[110%] right-[70px] leading-none bg-white text-secondary-800"
        >
          Explore IP Insights
        </a>
      </div>
    ),
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },
  {
    target: ".sidebar-mi",
    content: (
      <div>
        Here, in Market Research, you can track trends and competitors.Shall we explore, or move
        forward?{" "}
        <a
          href="/know-now/market-intelligence/"
          className="px-1 py-1 border border-appGray-200 rounded-lg 
    absolute top-[110%] right-[70px] leading-none bg-white text-secondary-800"
        >
          Explore Market Research
        </a>
      </div>
    ),
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },

  {
    target: ".sidebar-vc",
    content: (
      <div className="py-1">
        In Venture Capital, find startups and investment opportunities. Want to check it out?{" "}
        <a
          href="/vc-product"
          className="px-1 py-1 border border-appGray-200 rounded-lg 
  absolute top-[110%] right-[70px] leading-none bg-white text-secondary-800"
        >
          Show me Venture Capital.
        </a>
      </div>
    ),
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },
  {
    target: ".sidebar-firm",
    content: (
      <div className="py-1">
        Here, you get insights into markets and competitors. Ready to explore?{" "}
        <a
          href="/know-now/market-intelligence/"
          className="px-1 py-1 border border-appGray-200 rounded-lg 
  absolute top-[110%] right-[70px] leading-none bg-white text-secondary-800"
        >
          Explore Research Firms.
        </a>
      </div>
    ),
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },
  {
    target: ".sidebar-healthcare",
    content: (
      <div className="py-1">
        Lets checkout Healthcare trends and innovations! Ready?{" "}
        <a
          href="/vc-product"
          className="px-1 py-1 border border-appGray-200 rounded-lg 
  absolute top-[110%] right-[70px] leading-none bg-white text-secondary-800"
        >
          Show me Healthcare.
        </a>
      </div>
    ),
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },
  {
    target: ".sidebar-ma",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },
  {
    target: ".sidebar-web3",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },
  {
    target: ".sidebar-ipattorny",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },
  {
    target: ".sidebar-tto",
    content:
      "Here, in Market Research, you can track trends and competitors.Shall we explore, or move forward?",
    placement: "right" as "top" | "bottom" | "left" | "right" | "auto" | "center",
  },
];

export const AppSidebar: FunctionComponent<Props> = ({ onSidebarToggle }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState(tourSteps);

  const { pathname } = useLocation();

  const userDetail = useAppSelector((state) => state.auth.user);
  const runTour = useAppSelector((state) => state.dashboard.startTour);

  // const startTour = () => {
  //   setRunTour(true);
  // };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarOpen(isOpen);
  };

  const handleItemClick = (key: any) => {
    if (key === "industries") {
      setActiveItem(key);
      navigate("/vc-product");
      setOpen(false);
    } else {
      setActiveItem(key);
      setOpen(true);
    }
  };
  const handleSubItemClick = (key: any) => {
    setActiveSubItem(key);
  };

  useEffect(() => {
    onSidebarToggle(open);
  }, [open]);

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

  const handleJoyrideCallback = (data: any) => {
    const { index, status, lifecycle } = data;

    if (status === "finished" || status === "skipped") {
      dispatch(setStartTour(false));
      dispatch(setFinishTour(true));
      setOpen(false);
      return;
    }

    if (lifecycle === "complete") {
      setCurrentStepIndex(index + 1);

      switch (index) {
        case 1:
          setActiveItem("knownow");
          setOpen(true);
          break;
        case 3:
          setActiveItem("industries");
          setOpen(true);
          break;
        default:
          break;
      }
    }
  };

  const [collapseOpen, setIsCollapseOpen] = useState(false);


  return (
    <>
      {/* old one */}
      {/* <div className={`flex mr-[66px] sidebar fixed top-[64px] left-0 z-10`}>
      
      
      <div className="bg-appGray-100 w-[66px] items-center duration-300  flex flex-col justify-between h-[calc(100vh-112px)] z-10">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        scrollToFirstStep
        // showSkipButton
        hideBackButton
        hideCloseButton
        styles={{
          options: {
            zIndex: 2000000,
            primaryColor: '#FFA300',
            backgroundColor: '#FFA300',
            textColor: '#373D3F',
          },
          overlay: {
            backgroundColor: 'rgba(79, 46, 8, 0)',
          },
          spotlight: {
            backgroundColor: 'transparent',
            borderWidth: 3.5,
            borderColor: '#996200',
            borderRadius: 10,
          },
        }}        
        callback={handleJoyrideCallback}
        stepIndex={currentStepIndex}
        spotlightPadding={0}
      />
        <div className="w-full flex-auto">
          <div className="flex items-center gap-1 justify-start flex-col">
            <ToolTip title={open ? "Close Sidebar" : "Open Sidebar"} placement="right">
              <button
                type="button"
                className="hover:bg-white h-5 w-5 rounded-full flex justify-center items-center"
                onClick={() => setOpen(!open)}
              >
                <RoundedArrowIcon className={classNames(open ? "rotate-180" : "")} />
              </button>
            </ToolTip>
          </div>

          <div className="mt-1">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                className={classNames(`${item.classname} py-1 2xl:py-2 my-1 inline-flex justify-center w-full text-center relative`, {
                  "bg-white": activeItem === item.key,
                  "text-primary-900": activeItem !== item.key,
                  // "hover:bg-primary-900": activeItem !== item.key,
                  // "hover:text-white":activeItem !== item.key
                })}
                onClick={() => {
                  handleItemClick(item.key);
                }}
              >
                <item.icon />
              </button>
            ))}
          </div>
        </div>

        <Link to="/profile" className="inline-flex items-center w-full flex-0 mt-auto mb-2 justify-center">
          <div className="shrink-0 bg-white rounded-full">
            <UserIcon
              first_name={userDetail?.first_name || ""}
              last_name={userDetail?.last_name || ""}
              profile_photo={userDetail?.profile_photo}
            />
          </div>
          
        </Link>

        <div className="space-y-1">
            {SidebarBottom.map((s, idx) => (
              <div key={idx * 29}>
                {s.href ? (
                  <Link
                    to={s.href}
                    onClick={() => setOpen(false)}
                    className={classNames(
                      "py-1 rounded flex items-center gap-1 text-sm text-secondary-800",
                    )}
                  >
                    <ToolTip title={s.title} placement="right">
                      <div>
                        <s.icon className="text-primary-900 h-[20px] w-[20px]" />
                      </div>
                    </ToolTip>
                   
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={classNames(
                      "py-1 rounded flex items-center gap-1 text-sm text-secondary-800",
                    )}
                  >
                    <ToolTip title={s.title} placement="right">
                      <div>
                        <s.icon className="text-primary-900 h-[20px] w-[20px]" />
                      </div>
                    </ToolTip>
                    
                  </button>
                )}
              </div>
            ))}
          </div>
        
      </div>

      {open && activeItem && (
              // White Sidebar for Sublist

        <div className="z-10 bg-white absolute left-full h-full w-[200px] flex flex-col p-2">
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
                  `${subItem.classname} sidebar-1 flex cursor-pointer items-center font-semibold text-sm p-1 text-gray-700`,
                  {
                    "border-2 border-secondary-500 rounded-lg p-2": activeSubItem === subItem.key,
                  },
                )}
                onClick={() => {
                  navigate(subItem.to || "/");
                }}
              >
                <div className="w-[32px] flex-[0_0_32px]"><subItem.icon className="w-[32px]" /></div>
                <span className="ml-1">{subItem.title}</span>
              </div>
            ))}
            <div className="mt-3">
            {isChat && activeItem === "knownow" && <ChatSidebar />}
            </div>
        </div>
      )}
       
      
    </div> */}

      {/* new one */}
      <div className={`flex mr-[66px] sidebar fixed top-0 left-0 z-10`}>
        <div
          className={`bg-appGray-100 ${open ? "w-[250px]" : "w-[56px]"} items-start ${open ? "pl-3" : "pl-1 pb-[54px]"
            } duration-300  flex flex-col justify-between h-[100vh] z-10 pb-[20%]`}
        >

          <div className="z-10">
            <div className="py-1 px-1 container">
              <Link to="/">
                <img src={open ? PerceiveLogo : PerceiveIcon} alt="PerceiveNow logo" className="h-[32px]" />
              </Link>
            </div>
          </div>


          <Joyride
            steps={steps}
            run={runTour}
            continuous
            scrollToFirstStep
            // showSkipButton
            hideBackButton
            styles={{
              options: {
                zIndex: 2000000,
                primaryColor: "#FFA300",
                backgroundColor: "#FFA300",
                textColor: "#373D3F",
              },
              overlay: {
                backgroundColor: "rgba(79, 46, 8, 0)",
              },
            }}
            callback={handleJoyrideCallback}
            stepIndex={currentStepIndex}
          />

          <div className="space-y-1 mb-auto text-nowrap">
            <ToolTip title={open ? "Close Sidebar" : "Open Sidebar"} placement="right">
              <button
                type="button"
                className="hover:bg-white h-5 w-5 rounded-full flex justify-center items-center"
                onClick={() => setOpen(!open)}
              >
                <RoundedArrowIcon className={classNames(open ? "" : "rotate-180")} />
              </button>
            </ToolTip>

            {sidebarItems.map((item) => (
              <Link
                to={item.to || "/"}
                key={item.key}
                className={classNames(
                  "py-1 px-1 rounded flex items-center gap-1 text-sm text-secondary-800",
                )}
              >
                <item.icon />
                {open && <span className=" text-secondary-800 text-base">{item.title}</span>}
              </Link>
            ))}
          </div>

          <div className="space-y-0 text-nowrap">
            <div
              onClick={() => setOpen((prev) => !prev)}
              className={classNames(
                "py-1 rounded flex items-center gap-1 text-sm text-secondary-800 cursor-pointer",
              )}
            >
              <UserIcon
                first_name={userDetail?.first_name || ""}
                last_name={userDetail?.last_name || ""}
                profile_photo={userDetail?.profile_photo}
              />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapseOpen((prev) => !prev);
                }}
                className="flex items-center gap-x-[65px]">
                {open && <> <span className="text-base">Settings</span>

                  <svg

                    className={classNames(
                      "w-[12px] h-[12px] mt-[3px] transition-transform duration-500",
                      collapseOpen && "rotate-180"
                    )}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
                }
              </div>

            </div>

            <div
              className={`transition-all duration-500 ${collapseOpen && open ? "max-h-screen overflow-hidden" : "max-h-0 overflow-hidden"}`}
            >
              {collapseOpen && open &&
                SidebarBottom.map((s, idx) => (
                  <div
                    key={idx * 29}
                  >
                    {s.href ? (
                      <Link
                        to={s.href}
                        className={classNames(
                          "py-1 rounded flex items-center pl-5 gap-1 text-sm text-secondary-800",
                        )}
                      >
                        {/* <ToolTip title={s.title} placement="right"> */}
                        <div className="text-base">{s.title}</div>
                        {/* </ToolTip> */}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className={classNames(
                          "py-1 rounded flex items-center pl-5 gap-1 text-sm text-secondary-800",
                        )}
                      >
                        <ToolTip title={s.title} placement="right">
                          <div>
                            <s.icon className="text-primary-900 h-[20px] w-[20px]" />
                          </div>
                        </ToolTip>
                      </button>
                    )}
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        {/* White Sidebar for Sublist */}
        {/* {open && activeItem && (
          <div className="z-10 bg-white absolute left-full h-full w-[200px] flex flex-col p-2">
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
                    `${subItem.classname} sidebar-1 flex cursor-pointer items-center font-semibold text-sm p-1 text-gray-700`,
                    {
                      "border-2 border-secondary-500 rounded-lg p-2": activeSubItem === subItem.key,
                    },
                  )}
                  onClick={() => {
                    navigate(subItem.to || "/");
                  }}
                >
                  <div className="w-[32px] flex-[0_0_32px]">
                    <subItem.icon className="w-[32px]" />
                  </div>
                  <span className="ml-1">{subItem.title}</span>
                </div>
              ))}
            <div className="mt-3">{isChat && activeItem === "knownow" && <ChatSidebar />}</div>
          </div>
        )} */}
      </div>

      {/* history market */}
      {/** 
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

        {/* sidebar bottom 
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
      */}
    </>
  );
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
