import { Outlet, useLocation } from "react-router-dom";

//
import AuthFooter from "../../components/@auth/auth-layout";
import AuthHeader from "../../components/@auth/auth-layout/auth-header";

/**
 * The default layout for the app (Used in 99% of the pages).
 */
export default function AuthDefaultLayout() {
  const pathname = useLocation().pathname;
  console.log(pathname);

  const signUpPaths = [
    "/signup/organization-setting",
    "/signup/profile",
    "/signup/plan",
    "/signup/payment",
    "/signup/team",
    "/signup/review",
    "/signup/finish",
  ];

  return (
    <div className="h-[600px]">
      {!signUpPaths.includes(pathname) && <AuthHeader />}
      <Outlet />
      <div className="w-full">
        <AuthFooter />
      </div>
    </div>
  );
}
