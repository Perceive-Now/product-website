import React, { useEffect, useRef, useState } from "react";
import AgentIcon from "../../../assets/images/Agent Icon.svg";
import Org from "../../../assets/images/organization-settings.svg";
import { useAppDispatch, useAppSelector } from "src/hooks/redux";
import UserIcon from "src/components/reusable/userIcon";
import { LogoutIcon } from "src/components/icons";
import { teamManagementSVG } from "src/pages/authentication/signup/_assets";
import { useNavigate } from "react-router-dom";
import { setSession } from "src/stores/session";
import { logoutUser } from "src/stores/auth";

interface Props {
  agentName: string;
}

const AgentHead = (props: Props) => {
  const { agentName } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userDetail = useAppSelector((state) => state.auth.user);

  const [open, setOpen] = useState(false);
  const menuRef = useRef<any>(null);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    dispatch(setSession({ session_data: {} }));

    await dispatch(logoutUser());
    navigate("/login");
    setIsLoggingOut(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (menuRef.current && !menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between mt-2 mb-2 rounded-lg">
      {/* Left Section: Icon and Name */}
      <div className="flex items-center gap-1">
        <div className=" text-white flex items-center justify-center rounded-full">
          <img src={AgentIcon} alt="" />
        </div>
        <h1 className="text-base text-gray-800"> {agentName === "Startup Diligence Agent" ? "Company Diligence Agent" : agentName}</h1>
      </div>

      {/* Right Section: Profile Image */}
      <div className="relative" onClick={() => setOpen((prev) => !prev)} ref={menuRef}>
        <UserIcon
          first_name={userDetail?.first_name || ""}
          last_name={userDetail?.last_name || ""}
          profile_photo={userDetail?.profile_photo}
        />
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-[1]">
            <ul className="">
              <li
                className="flex items-center  p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {/* <FiUser className="text-gray-600" /> */}
                <span>My profile</span>
              </li>
              <li
                className="flex items-center  p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => navigate("/users")}
              >
                {/* <BsBuilding className="text-gray-600" /> */}
                <img />
                <span>Organization</span>
              </li>
              <li
                className="flex items-center  p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => navigate("/users")}
              >
                {/* <FiUsers className="text-gray-600" /> */}
                <span>Team</span>
              </li>
              <hr />
              <li
                className="flex items-center gap-1  p-2 hover:bg-gray-100 rounded cursor-pointer text-red-500"
                onClick={handleLogout}
              >
                {/* <FiLogOut /> */}
                <LogoutIcon />
                <span>Log out</span>
              </li>
            </ul>
          </div>
        )}
        {/* <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        /> */}
      </div>
    </div>
  );
};

export default AgentHead;
