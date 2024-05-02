import { Link } from "react-router-dom";

import PerceiveLogo from "../../../assets/images/logo.svg";

//
// const SPECIAL_PATHS = ["/feedback", "/help", "/faq"];

/**
 *
 */
export default function AuthHeader() {
  return (
    <>
      <div className="my-auto h-8 py-1 px-2 bg-appGray-100 sticky top-0">
        <Link to="/">
          <img src={PerceiveLogo} alt="PerceiveNow logo" />
        </Link>
      </div>
    </>
  );
}
