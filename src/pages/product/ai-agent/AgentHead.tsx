import React, { useEffect, useRef, useState } from "react";
import FundraisingStrategy from "../../../assets/images/icons/P-Icons/FundRaising.svg";
import CompanyDiligence from "../../../assets/images/icons/P-Icons/CompanyDilligence.svg";
import ReportonAnything from "../../../assets/images/icons/P-Icons/ReportAnything.svg";
import MarketingStrategy from "../../../assets/images/icons/P-Icons/MarketStrategy.svg";
import CorporateVentureCapital from "../../../assets/images/icons/P-Icons/CorporateVentur.svg";
import Portfolio from "../../../assets/images/icons/P-Icons/PortfolioSupport.svg";
import TechnologyRD from "../../../assets/images/icons/P-Icons/Technology.svg";
import ProductEngineering from "../../../assets/images/icons/P-Icons/ProductEngineering.svg";
import MarketingSales from "../../../assets/images/icons/P-Icons/Marketing&Sales.svg";
import FinanceStrategy from "../../../assets/images/icons/P-Icons/FinanceStrategy.svg";
import Legal from "../../../assets/images/icons/P-Icons/Legal.svg";
import ProfileLogo from "../../../assets/images/profileperson.svg";
import OrganizationLogo from "../../../assets/images/organization.svg";
import TeamLogo from "../../../assets/images/team.svg";
import LogoutLogo from "../../../assets/images/logout.svg";

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

const agentIcons: Record<string, string> = {
  "Company Diligence Agent": CompanyDiligence,
  "Fundraising Strategy Agent": FundraisingStrategy,
  "Report on Anything Agent": ReportonAnything,
  "Market Strategy Agent": MarketingStrategy,
  "Corporate Venture Capital Agent": CorporateVentureCapital,
  "Portfolio Support Agent": Portfolio,
  "Technology & R&D Agent": TechnologyRD,
  "Product & Engineering Agent": ProductEngineering,
  "Finance & Strategy Agent": FinanceStrategy,
  "Marketing & Sales Agent": MarketingSales,
  "Legal & Compliance Agent": Legal,
};

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

  const iconSrc = agentIcons[agentName] || "/icons/default-agent.png";
  console.log(agentIcons[agentName]);
  console.log();

  const displayName =
    agentName === "Startup Diligence Agent" ? "Company Diligence Agent" : agentName;

  return (
    <div className="flex items-center justify-between mt-2 mb-2 rounded-lg">
      {/* Left Section: Icon and Name */}
      <div className="flex items-center gap-1">
        <div className="text-white flex items-center justify-center rounded-full w-4 h-4">
          {agentName && (
            <div
              className="rounded-full w-full h-full flex items-center justify-center"
              style={{
                background: "rgb(68, 40, 115)",
              }}
            >
              <img
                src={iconSrc}
                alt={displayName}
                className="w-3 h-3 p-[2px]"
                // style={{
                //   filter:
                //     "brightness(0) saturate(100%) invert(22%) sepia(16%) saturate(3004%) hue-rotate(225deg) brightness(92%) contrast(104%)",
                // }}
              />
            </div>
          )}
        </div>
        <h1 className="text-base text-gray-800">{displayName}</h1>
      </div>

      {/* Right Section: Profile Image */}
      <div className="relative" onClick={() => setOpen((prev) => !prev)} ref={menuRef}>
        <UserIcon
          first_name={userDetail?.first_name || ""}
          last_name={userDetail?.last_name || ""}
          profile_photo={userDetail?.profile_photo}
        />
        {open && (
          <div className="absolute right-0 mt-2 w-[210px] bg-white rounded-lg shadow-lg border z-[1]">
            <ul className="">
              <li
                className="flex items-center  p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {/* <FiUser className="text-gray-600" /> */}
                <img src={ProfileLogo} />
                <span>My profile</span>
              </li>
              <li
                className="flex items-center  p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => navigate("/users")}
              >
                {/* <BsBuilding className="text-gray-600" /> */}
                <img src={OrganizationLogo} />
                <span>Organization</span>
              </li>
              <li
                className="flex items-center  p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => navigate("/users")}
              >
                {/* <FiUsers className="text-gray-600" /> */}
                <img src={TeamLogo} />
                <span>Team</span>
              </li>
              <hr />
              <li
                className="flex items-center gap-1  p-2 hover:bg-gray-100 rounded cursor-pointer text-black ml-[2px]"
                onClick={handleLogout}
              >
                {/* <FiLogOut /> */}
                {/* <LogoutIcon /> */}
                <img src={LogoutLogo} />
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
