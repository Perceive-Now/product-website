import { Outlet } from "react-router-dom";
// import MoreNavOption from "../../components/reusable/nav-options";
import AppHeader from "../../components/app/header";

export default function ProductLayout() {
  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="sticky top-0 w-full z- bg-appGray-100 z-10">
          <div className="px-4">
            <AppHeader />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4.5 py-3 px-4 ">
        {/* <MoreNavOption /> */}
        <div className="w-[228px]" />
        <Outlet />
      </div>
    </div>
  );
}
