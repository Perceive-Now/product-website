import { Outlet } from "react-router-dom";
// import MoreNavOption from "../../components/reusable/nav-options";
// import AppSidebar from "../../components/app/sidebar";
// import MoreNavOption from "../../components/reusable/nav-options";
// import AppHeader from "../../components/app/header";
import AuthHeader from "../../components/app/@auth-layout/auth-header";
import AppFooter from "../../components/app/footer";

export default function ProductLayout() {
  return (
    <div className="w-full">
      <div className="sticky top-0 w-full z- bg-appGray-100 z-10">
        <div className="px-4 container">
          <AuthHeader />
        </div>
      </div>
      <div className="h-[calc(100vh-120px)] container flex flex-cols justify-center items-center">
        <Outlet />
      </div>
      <AppFooter />
    </div>
  );
}
