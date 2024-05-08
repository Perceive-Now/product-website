import { Outlet, useLocation } from "react-router-dom";

//

import AppSidebar from "../../components/app/sidebar";
import AppFooter from "../../components/app/footer";
import classNames from "classnames";
import { useAppSelector } from "../../hooks/redux";

/**
 *
 */
export default function DefaultLayout() {
  // const [open, setOpen] = useState(true)
  const { pathname } = useLocation();
  const isHome = useAppSelector((state) => state.UI.home);
  return (
    <>
      <div
        className={classNames(
          "w-full min-h-screen ",
          pathname === "/" || isHome ? "bg-secondary-gradient" : "bg-white",
        )}
      >
        <div className="flex h-[calc(100vh-40px)]">
          <AppSidebar />
          <div className="relative py-3 px-4 z-0 h-full w-full duration-500">
            <Outlet />
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}
