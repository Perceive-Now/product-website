import { Link } from "react-router-dom";

import PerceiveLogo from "../../../assets/images/logo.svg";

/**
 *
 */
export default function AppHeader() {
  return (
    <div className="flex justify-between items-center">
      <Link to="/">
        <img src={PerceiveLogo} alt="PerceiveNow logo" />
      </Link>
      <div className="rounded-full ">1</div>
    </div>
  );
}
