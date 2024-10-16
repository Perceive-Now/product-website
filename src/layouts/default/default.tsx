import { Outlet } from "react-router-dom";

//

import AppSidebar from "../sidebar";
import AppFooter from "../footer";
import classNames from "classnames";
// import AppHeader from "../header";

/**
 *
 */
export default function DefaultLayout() {
  return (
    <div className="bg-white-gradient">
      <div className={classNames("w-full min-h-[calc(100vh-30px)] mt-0.5 flex")}>
        <div className="flex flex-auto">
          <AppSidebar />
          <div className="h-full w-full duration-500 px-4 pt-2 flex-auto">
            {/* {location.pathname !== "/q&a" && <AppHeader />} */}
            <div className="relative py-1 h-full w-full pl-1 container ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
