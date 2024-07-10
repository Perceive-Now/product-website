import { Outlet } from "react-router-dom";

//
import AuthFooter from "../../components/@auth/auth-layout";
import AuthHeader from "../../components/@auth/auth-layout/auth-header";

/**
 * The default layout for the app (Used in 99% of the pages).
 */
export default function AuthDefaultLayout() {
  return (
    <div className="h-[600px]">
      <AuthHeader />
      <Outlet />
      <div className="w-full">
        <AuthFooter />
      </div>
    </div>
  );
}
