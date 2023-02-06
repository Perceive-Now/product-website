import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { accountNavbarData } from "./_data";

export default function AccountNavbar() {
  return (
    <div>
      {accountNavbarData.map((navData) => (
        <div key={navData.path}>
          <NavLink to={navData.path}>
            {({ isActive }) => (
              <div
                className={classNames(
                  isActive ? "border-b-2 border-b-primary-900" : "",
                  "uppercase w-fit text-primary-900 mb-3",
                )}
              >
                {navData.label}
              </div>
            )}
          </NavLink>
        </div>
      ))}
    </div>
  );
}
