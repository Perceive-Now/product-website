import { Outlet } from "react-router-dom";

//
// import AppHeader from "../../components/app/header";
// import AppFooter from "../../components/app/footer";
import AppSidebar from "../../components/app/sidebar";
// import AppSidebar from "../../components/app/sidebar";
// import { useState } from "react";

/**
 * The default layout for the app (Used in 99% of the pages).
 */
export default function DefaultLayout() {
  // const [open, setOpen] = useState(true)
  return (
    <>
      {/* <div className="min-w-min h-screen overflow-y-auto shadow">
        <AppSidebar />
      </div> */}

      <div className="w-full h-full flex flex-col">
        <div className="sticky top-0 w-full z- bg-appGray-100 z-10">
          <div className="px-4">{/* <AppHeader /> */}</div>
        </div>
        <div className="flex h-full">
          {/* <div className="fixed h-screen shadow"> */}
          <AppSidebar />
          {/* </div> */}
          <div className="relative ml-[260px] py-3 px-4 z-0 h-full w-full">
            <div className="h-full">
              <Outlet />
            </div>
            {/* <AppFooter /> */}
          </div>
        </div>
      </div>
    </>
  );
}
