import { Link } from "react-router-dom";

import PerceiveLogo from "../../../assets/images/logo.svg";
import CircularCounter from "./circular-counter";

/**
 *
 */
export default function AppHeader() {
  return (
    <div className="bg-white-gradient sticky top-0 z-10">
      <div className="flex justify-between items-center  min-h-[80px] pb-2 px-1 container">
        <Link to="/">
          <img src={PerceiveLogo} alt="PerceiveNow logo" />
        </Link>
        <CircularCounter />
      </div>
    </div>
  );
}
