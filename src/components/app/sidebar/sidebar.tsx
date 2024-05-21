import { useState, FunctionComponent, useEffect } from "react";
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

import { LogoutIcon } from "../../icons";
import ToggleBarIcon from "../../icons/sidenav/bars";
import UserIcon from "../../reusable/userIcon";
import { setSession } from "../../../stores/session";
// import { setSession } from "../../../stores/session";

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
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Settings",
    href: "/setting",
  },
];

/**
 *
 */

export const AppSidebar: FunctionComponent<Props> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [isChat, setIsChat] = useState(false);

  const { pathname } = useLocation();

  const userDetail = useAppSelector((state) => state.auth.user);
  const isHome = useAppSelector((state) => state.UI.home);

  useEffect(() => {
    if (pathname.includes("/know-now")) {
      setIsChat(true);
    }
    setIsChat(false);
  }, [pathname]);

  // const match = props.to ? pathname.includes(props.key) : false;
  // const titles = pathname?.split("/").slice(1);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // const [expandedGroups, setExpandedGroups] = useState<string[]>(
  //   sidebarItems.map((itm) => itm.key),
  // );

  // const [expandedSubGroups, setExpandedSubGrups] = useState<string[]>([]);

  //
  // const updateActiveGroup = (group: string) => {
  //   if (expandedGroups.includes(group)) {
  //     setExpandedGroups(expandedGroups.filter((g) => g !== group));
  //   } else {
  //     setExpandedGroups([...expandedGroups, group]);
  //   }
  // };

  //
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

  return (
    <div className={classNames("mt-1", open ? "mr-[260px]" : "mr-[100px]")}>
      <div
        className={classNames(
          isHome || pathname === "/"
            ? "secondary-transparent border border-primary-50"
            : "bg-appGray-100",
          open ? "w-[270px]" : "w-[56px] items-center duration-300 ",
          "shadow px-2.5 fixed flex flex-col justify-between  rounded h-[calc(100vh-60px)]",
        )}
      >
        <div>
          <div className="flex justify-center items-center py-3 gap-2">
            <button type="button" className="pt-1" onClick={() => setOpen(!open)}>
              <ToggleBarIcon />
            </button>
            {open && (
              <Link to="/">
                <img src={PerceiveLogo} alt="PerceiveNow logo" className="-mt-0.5" />
              </Link>
            )}
          </div>
          <div className="space-y-2.5">
            {open && (
              <Link to={"/know-now/ip-analysis"}>
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
              </Link>
            )}
            {open && (
              <Link
                to="/"
                type="button"
                className={classNames(
                  "bg-white text-secondary-800 border border-appGray-600 text-sm  px-2.5 py-1 rounded-md font-semibold w-full",
                )}
              >
                Create New Report
              </Link>
            )}
            {isChat ? (
              <>{open && <KnowNowHistory />}</>
            ) : (
              <>
                {sidebarItems.map((item, index) => (
                  <div key={index}>
                    {!item.children && (
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
        <div className="pb-3 text-gray-900 space-y-1">
          <div className="flex items-center justify-between w-full">
            {open && (
              <div className="flex items-center gap-2 w-full">
                <div className="shrink-0">
                  <UserIcon
                    first_name={userDetail?.first_name || ""}
                    last_name={userDetail?.last_name || ""}
                    profile_photo={userDetail?.profile_photo}
                  />
                </div>
                <p className="line-clamp-1 w-14">{userDetail?.full_name}</p>
              </div>
            )}
            <button type="button" onClick={handleLogout}>
              <LogoutIcon />
            </button>
          </div>
          {open && (
            <div className="flex flex-col">
              {SidebarBottom.map((s, idx) => (
                <Link
                  to={s.href}
                  key={idx * 29}
                  className={classNames(
                    "py-1  rounded px-2",
                    s.href === pathname ? "bg-primary-900 text-white" : "text-gray-900",
                  )}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function NavLinkItem(props: INavLinkItemProps) {
  // const { pathname } = useLocation();
  // const match = props.to ? pathname.includes(props.key) : false;
  // const titles = pathname?.split("/").slice(1);
  // const hasKey = titles.includes(props.value);

  return (
    <NavLink to={props.to ?? ""} end>
      {({ isActive }) => (
        <div
          className={classNames(
            "flex items-center py-1 text-white rounded ",
            // (isActive || hasKey) && props.open ? "" : "hover:bg-primary-",
            props.open && " px-2.5 bg-primary-900",
          )}
        >
          {!props.open ? (
            <>
              {props.icon && (
                <div
                  className={classNames(" bg-primary-900 border border-[#E8EAF2] rounded p-[12px]")}
                >
                  {props.icon}
                </div>
              )}
            </>
          ) : (
            <span
              className={classNames(
                "flex items-center text-sm font-semibold text-white",
                // isActive || hasKey ? "text-white " : "text-gray-900",
              )}
            >
              {props.title}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
}
