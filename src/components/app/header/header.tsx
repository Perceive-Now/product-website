import { Link, useLocation } from "react-router-dom";

// //
// import Search, { IKeywordOption } from "../../reusable/search";

// //
// import { setDashboardSearch } from "../../../stores/dashboard";
// import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

//
import UserIcon from "../userIcon";
import PerceiveLogo from "../../../assets/images/logo.svg";
// import BarIcon from "../../icons/sidenav/bars";
import ToggleBarIcon from "../../icons/sidenav/bars";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
// import AppSidebar from "../sidebar";

//
// const SPECIAL_PATHS = ["/feedback", "/help", "/faq"];

/**
 *
 */
export default function AppHeader() {
  // const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const userDetail = useAppSelector((state) => state.auth?.user);

  // const isMultiLevel = location.pathname.split("/").filter((itm) => itm).length > 1;

  // const isDashboardPage = location.pathname === "/dashboard";
  // const isSpecialPages = SPECIAL_PATHS.includes(location.pathname);

  // const handleBack = () => {
  //   if (isMultiLevel || isSpecialPages) {
  //     navigate(-1);
  //   } else {
  //     navigate("/dashboard");
  //   }
  // };

  //
  // const handleSearch = (value: IKeywordOption[]) => {
  //   dispatch(setDashboardSearch(value));
  // };
  useEffect(() => {
    setOpen(false);
  }, [location]);

  const toggleSideBar = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="flex justify-between items-center my-auto h-10 py-1 ">
        <div className="flex justify-center items-end py-3 gap-2">
          {location.pathname !== "/" && location.pathname !== "/ip-landscaping" && (
            <>
              {!open && (
                <button type="button" className="" onClick={toggleSideBar}>
                  <ToggleBarIcon />
                </button>
              )}
              {open && (
                <button type="button" className="" onClick={() => setOpen(false)}>
                  <ToggleBarIcon />
                </button>
              )}
            </>
          )}
          <Link to="/">
            <img src={PerceiveLogo} alt="PerceiveNow logo" />
          </Link>
        </div>
        <UserIcon
          first_name={userDetail?.first_name || ""}
          last_name={userDetail?.last_name || ""}
          profile_photo={userDetail?.profile_photo || ""}
        />
      </div>
      {/* <AppSidebar show={open} handleShow={toggleSideBar} /> */}
    </>
  );
}
