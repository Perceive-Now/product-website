import classNames from "classnames";
import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "../../reusable/popover";
import { InfoIcon } from "../../icons";

const Subheader: FunctionComponent<Props> = ({ title, analytics, table }) => {
  const { pathname } = useLocation();
  return (
    <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md">
      <div className="flex items-start justify-center gap-1 py-">
        <p className="text-lg text-primary-900 fw-600">{title}</p>
        <Tooltip
          trigger={
            <p className="text-primary-500 cursor-pointer">
              <span>
                <InfoIcon className="w-2 h-2" />
              </span>
            </p>
          }
        >
          Minima pariatur est incidunt omnis, doloremque aliquid exercitationem explicabo quis, iure
          tenetur ad consequuntur officia distinctio in minus, velit cupiditate aperiam neque
          sapiente blanditiis ea quas tempora? Quibusdam, ullam blanditiis aut nemo unde labore enim
          dolore magnam inventore voluptates suscipit cupiditate facilis sequi. Alias, nisi. Earum
          tempore recusandae vel assumenda et.
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
