import { Link } from "react-router-dom";

import PerceiveLogo from "../../assets/images/logo.svg";
import PerceiveIcon from "../../assets/images/logo-small.svg"

interface AppHeaderProps {
  isSidebarOpen: boolean;
}

/**
 *
 */
export default function AppHeader({ isSidebarOpen }: AppHeaderProps) {
  return (
    <div className="fixed left-0 top-0 z-10">
      <div className="flex justify-between items-center py-2 px-2 container">
        <Link to="/">
          <img src={isSidebarOpen ? PerceiveLogo  : PerceiveIcon} alt="PerceiveNow logo" className="h-[32px]" />
        </Link>
      </div>
    </div>
  );
}
