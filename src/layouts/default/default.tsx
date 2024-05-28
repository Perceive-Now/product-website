import { Outlet, useLocation } from "react-router-dom";

//

import AppSidebar from "../../components/app/sidebar";
import AppFooter from "../../components/app/footer";
import classNames from "classnames";
// import { useAppSelector } from "../../hooks/redux";

/**
 *
 */
export default function DefaultLayout() {
  // const [open, setOpen] = useState(true)
  // const { pathname } = useLocation();
  // const isHome = useAppSelector((state) => state.sessionDetail.session?.session_data?.is_home);

  return (
    <div
      className="bg-white"
      //  {classNames((pathname === "/" && isHome) ? "bg-secondary-gradient" : "bg-white",)}
    >
      <div className={classNames("w-full min-h-[calc(100vh-24px)] ")}>
        <div className="flex h-full">
          <AppSidebar />
          <div className="relative py-3 px-4 z-0 h-full w-full duration-500">
            <Outlet />
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
