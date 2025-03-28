import { Outlet } from "react-router-dom";

//
import { useState } from "react";
import AppSidebar from "../sidebar";
import AppFooter from "../footer";
import classNames from "classnames";
import { ListingProvider } from "../sidebar/DraftProvider";
// import AppHeader from "../header";
// import AppHeader from "../header";

/**
 *
 */
export default function DefaultLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <ListingProvider>
      <div className="h-screen flex flex-col">
        <AppSidebar onSidebarToggle={handleSidebarToggle} />
        <div className={`mb-auto flex-1  flex-col flex ${isSidebarOpen ? "ml-[256px]" : "ml-[56px]"}`}>
          <div className="flex flex-auto h-full">
            <div className="h-full w-full duration-500 px-4 flex-auto">
              {/* {location.pathname !== "/q&a" && <AppHeader />} */}
              <div className="relative h-full w-full pl-1 flex justify-center">
                <Outlet />
              </div>
            </div>
          </div>
          <AppFooter />
        </div>
        
      </div>
    </ListingProvider>
  );
}
