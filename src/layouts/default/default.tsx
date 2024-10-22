import { Outlet } from "react-router-dom";

//
import { useState } from "react";
import AppSidebar from "../sidebar";
import AppFooter from "../footer";
import classNames from "classnames";
import AppHeader from "../header";
// import AppHeader from "../header";

/**
 *
 */
export default function DefaultLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="bg-white-gradient h-screen flex flex-col">
      <AppHeader isSidebarOpen={isSidebarOpen}  />
      <AppSidebar onSidebarToggle={handleSidebarToggle} />
      <div className={`mb-auto ${ isSidebarOpen ? 'ml-[56px]' : 'ml-[256px]' }`}>      
        <div className="flex flex-auto h-full">
          <div className="h-full w-full duration-500 px-4 pt-2 flex-auto">
            {/* {location.pathname !== "/q&a" && <AppHeader />} */}
            <div className="relative py-1 h-full w-full pl-1 flex justify-center items-center">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
