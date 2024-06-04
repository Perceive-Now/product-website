import { Outlet } from "react-router-dom";

//

import AppSidebar from "../../components/app/sidebar";
import AppFooter from "../../components/app/footer";
import classNames from "classnames";
import AppHeader from "../../components/app/header";

/**
 *
 */
export default function DefaultLayout() {
  return (
    <div className="bg-white">
      <div className={classNames("w-full min-h-[calc(100vh-40px)] mt-0.5")}>
        <div className="flex h-full">
          <AppSidebar />
          <div className="h-full w-full duration-500 px-4 ">
            <AppHeader />
            <div className="relative py-3 h-full w-full pl-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
