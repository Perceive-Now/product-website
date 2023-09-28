import classNames from "classnames";
import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "../../reusable/popover";
import { InfoIcon } from "../../icons";

const Subheader: FunctionComponent<Props> = ({ title, analytics, table }) => {
  const { pathname } = useLocation();
  return (
    <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md">
      <div className="flex items-center justify-center gap-1 py-">
        <p className="text-lg text-primary-900 fw-600">{title}</p>
        <Tooltip
          trigger={
            <p className="text-primary-500 cursor-pointer">
              <span>
                <InfoIcon />
              </span>
            </p>
          }
        >
          Tooltip text
        </Tooltip>
      </div>
      <div className="flex items-center">
        <Link
          to={analytics}
          className={classNames(
            "py-1 w-[227px] text-center font-medium",
            pathname === analytics ? "bg-primary-900 text-white" : "bg-gray-300",
          )}
        >
          Analytics
        </Link>
        <Link
          to={table}
          className={classNames(
            "py-1 w-[227px] flex-shrink-0 text-center rounded-r-md font-medium",
            pathname === table ? "bg-primary-900 text-white" : "bg-gray-300",
          )}
        >
          Table
        </Link>
      </div>
    </div>
  );
};

export default Subheader;

interface Props {
  title: string;
  analytics: string;
  table: string;
}
