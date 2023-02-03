import { Outlet } from "react-router-dom";

//
import AppHeader from "../../components/app/header";
import AppFooter from "../../components/app/footer";
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

      <div className="w-full h-screen overflow-y-auto flex flex-col">
        <div className="sticky top-0 w-full bg-white z-10">
          <div className="px-4 shadow">
            <AppHeader />
          </div>
        </div>

        <div className="relative flex-grow py-3 px-4 z-0">
          <Outlet />
        </div>

        <AppFooter />
      </div>
    </div>
  );
}
