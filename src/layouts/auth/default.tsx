import { Outlet } from "react-router-dom";

//
import AuthFooter from "../../components/app/@auth-layout";
import AuthHeader from "../../components/app/@auth-layout/auth-header";

/**
 * The default layout for the app (Used in 99% of the pages).
 */
export default function AuthDefaultLayout() {
  // const [open, setOpen] = useState(true)
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
