import { Link } from "react-router-dom";

import PerceiveLogo from "../../../assets/images/logo.svg";

/**
 *
 */
export default function AppHeader() {
  return (
    <div className="flex justify-between items-center sticky top-0 z-10 bg-white pb-2 px-1">
      <Link to="/">
        <img src={PerceiveLogo} alt="PerceiveNow logo" />
      </Link>
      {/* <div className="rounded-full ">1</div> */}
    </div>
  );
}
