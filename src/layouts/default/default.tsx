import { Outlet } from "react-router-dom";

//
import AppHeader from "../../components/app/header";
import AppFooter from "../../components/app/footer";
// import AppSidebar from "../../components/app/sidebar";
// import { useState } from "react";

/**
 * The default layout for the app (Used in 99% of the pages).
 */
export default function DefaultLayout() {
  // const [open, setOpen] = useState(false)
  return (
    <div className="">
      {/* <div className="min-w-min h-screen overflow-y-auto shadow">
        <AppSidebar />
      </div> */}

      <div className="w-full min-h-scree flex flex-col">
        <div className="sticky top-0 w-full bg-white z-20">
          <div className="px-4 shadow">
            <AppHeader />
          </div>
        </div>
        <div className="flex">
          {/* <div className="fixe h-screen overflow-y-auto shadow">
            <AppSidebar/>
          </div> */}
          <div className="relative flex-grow py-3 px-4 z-0">
            <Outlet />
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
