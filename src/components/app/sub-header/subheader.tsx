import classNames from "classnames";
import { FunctionComponent } from "react";
import { Link, useLocation } from "react-router-dom";

const Subheader: FunctionComponent<Props> = ({ title, analytics, table }) => {
  const { pathname } = useLocation();
  return (
    <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md">
      <div className="flex items-center justify-center gap-1 py-">
        <p className="text-lg text-primary-900 fw-600">{title}</p>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_359_11727)">
              <path
                d="M7.35 11.35H8.55V7.25H7.35V11.35ZM7.9 6.15C8.1 6.15 8.26389 6.08611 8.39167 5.95833C8.51944 5.83056 8.58333 5.67222 8.58333 5.48333C8.58333 5.27222 8.51944 5.10278 8.39167 4.975C8.26389 4.84722 8.1 4.78333 7.9 4.78333C7.7 4.78333 7.53611 4.84722 7.40833 4.975C7.28056 5.10278 7.21667 5.27222 7.21667 5.48333C7.21667 5.67222 7.28056 5.83056 7.40833 5.95833C7.53611 6.08611 7.7 6.15 7.9 6.15ZM7.9 14.8167C6.94444 14.8167 6.05 14.6361 5.21667 14.275C4.38333 13.9139 3.65278 13.4194 3.025 12.7917C2.39722 12.1639 1.90278 11.4333 1.54167 10.6C1.18056 9.76667 1 8.87222 1 7.91667C1 6.95 1.18056 6.05 1.54167 5.21667C1.90278 4.38333 2.39444 3.65556 3.01667 3.03333C3.63889 2.41111 4.36944 1.91667 5.20833 1.55C6.04722 1.18333 6.94444 1 7.9 1C8.86667 1 9.76944 1.18333 10.6083 1.55C11.4472 1.91667 12.175 2.40833 12.7917 3.025C13.4083 3.64167 13.9 4.36944 14.2667 5.20833C14.6333 6.04722 14.8167 6.95 14.8167 7.91667C14.8167 8.87222 14.6333 9.76944 14.2667 10.6083C13.9 11.4472 13.4056 12.1778 12.7833 12.8C12.1611 13.4222 11.4333 13.9139 10.6 14.275C9.76667 14.6361 8.86667 14.8167 7.9 14.8167ZM7.91667 13.5C9.46111 13.5 10.775 12.9556 11.8583 11.8667C12.9417 10.7778 13.4833 9.45555 13.4833 7.9C13.4833 6.35556 12.9417 5.04167 11.8583 3.95833C10.775 2.875 9.45555 2.33333 7.9 2.33333C6.35556 2.33333 5.03889 2.875 3.95 3.95833C2.86111 5.04167 2.31667 6.36111 2.31667 7.91667C2.31667 9.46111 2.86111 10.7778 3.95 11.8667C5.03889 12.9556 6.36111 13.5 7.91667 13.5Z"
                fill="#442873"
              />
            </g>
            <defs>
              <clipPath id="clip0_359_11727">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
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
