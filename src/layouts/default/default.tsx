import { Outlet } from "react-router-dom";

//
import AppHeader from "../../components/app/header";
import AppSidebar from "../../components/app/sidebar";

/**
 * The default layout for the app (Used in 99% of the pages).
 */
export default function DefaultLayout() {
  return (
    <div className="flex">
      <div className="min-w-min h-screen overflow-y-auto shadow">
        <AppSidebar />
      </div>

      <div className="w-full h-screen overflow-y-auto">
        <div className="sticky top-0 w-full  bg-white z-10">
          <div className="py-3 px-4 shadow">
            <AppHeader />
          </div>
        </div>

        <div className="relative py-3 px-4 h-[9999px] z-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
