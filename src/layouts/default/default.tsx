import { Outlet, useLocation } from "react-router-dom";

//

import AppSidebar from "../sidebar";
import AppFooter from "../footer";
import classNames from "classnames";
import AppHeader from "../header";

/**
 *
 */
export default function DefaultLayout() {
  const location = useLocation();
  return (
    <div className="bg-white-gradient">
      <div className={classNames("w-full min-h-[calc(100vh-40px)] mt-0.5")}>
        <div className="flex h-full">
          <AppSidebar />
          <div className="h-full w-full duration-500 px-4">
            {location.pathname !== "/q&a" && <AppHeader />}
            <div className="relative py-2 h-full w-full pl-1 container ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
