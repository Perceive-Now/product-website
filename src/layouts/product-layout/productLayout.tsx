import { Outlet } from "react-router-dom";
import MoreNavOption from "../../components/reusable/nav-options";

export default function ProductLayout() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4.5">
        <MoreNavOption />
        <Outlet />
      </div>
    </div>
  );
}
