import { useState, FunctionComponent, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import classNames from "classnames";

//
import { sidebarItems, ISidebarListItem } from "./_data";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { logoutUser } from "../../../stores/auth";
//

import { LogoutIcon, SettingsIcon } from "../../icons";
import UserIcon from "../../reusable/userIcon";
import SideBarToggleIcon from "../../icons/side-bar/toggle";

import { setSession } from "../../../stores/session";

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
              "flex items-center gap-2",
              open ? "justify-end" : "justify-start",
            )}
          >
            <button
              type="button"
              className="hover:bg-white h-5 w-5 rounded-full flex justify-center items-center"
              onClick={() => setOpen(!open)}
            >
              <SideBarToggleIcon />
            </button>
          </div>
          <div className="space-y-1 mt-1">
            {/* {isChat && (
              <>{open && <KnowNowHistory />}</>
            )} */}
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
                    <s.icon className="text-primary-900 h-[20px] w-[20px]" />
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
                    <s.icon className="text-primary-900 h-[20px] w-[20px]" />
                    {open && <>{s.title}</>}
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="bg-appGray-200 h-[1px] w-full" />
          <div className="flex items-center justify-between w-full px-2.5">
            {open && (
              <div className="flex items-center gap-1 w-full">
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
          </div>
        </div>
      </div>
    </div>
  );
};

function NavLinkItem(props: INavLinkItemProps) {
  return (
    <NavLink to={props.to ?? ""} end>
      {({ isActive }) => (
        <div className={classNames("flex items-center gap-0.5", props.open && " px-2.5 ")}>
          {props.icon && (
            <div
              className={classNames(
                "hover:bg-white h-5 w-5 rounded-full flex justify-center items-center",
              )}
            >
              <props.icon className="text-primary-900" />
            </div>
          )}
          {props.open && (
            <span
              className={classNames("flex items-center text-sm font-semibold text-secondary-800")}
            >
              {props.title}
            </span>
          )}
        </div>
      )}
    </NavLink>
  );
}
