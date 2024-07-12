import { Link } from "react-router-dom";

import PerceiveLogo from "../../assets/images/logo.svg";

/**
 *
 */
export default function AppHeader() {
  return (
    <div className="bg-white-gradient sticky top-0 z-10">
      <div className="flex justify-between items-center py-1 px-1 container">
        <Link to="/">
          <img src={PerceiveLogo} alt="PerceiveNow logo" />
        </Link>
      </div>
    </div>
  );
}
