// import { Link } from "react-router-dom";

import classNames from "classnames";
import CopyRightIcon from "../../components/icons/common/copyright";
import { Link } from "react-router-dom";

//
const footerLinks: IFooterLink[] = [
  {
    title: "Privacy Statement",
    url: "privacy-policy",
  },
  // {
  //   title: "Software License Agreement",
  //   url: "/",
  // },
  {
    title: "Terms of use",
    url: "terms",
  },
];

/**
 *
 */
export default function AppFooter() {
  const websiteUrl = process.env.REACT_APP_WEBSITE_URL ?? "";

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  //
  return (
    <div
      className={classNames(
        "px-4 flex flex-col sm:flex-row justify-between items-center w-full relative z-10 mt-auto py-1",
      )}
    >
      <div className="flex flex-col md:flex-row gap-x-4 font-normal text-sm">
        <Link to="/help" className="text-primary-900">
          Help
        </Link>
        <Link to="/feedback" className="text-primary-900">
          Feedback
        </Link>
        <Link to="#" className="text-primary-900">
          FAQs
        </Link>
      </div>

      <div className="flex flex-col justify-center md:flex-row gap-x-3">
        <p
          className={classNames(
            "flex items-center gap-[2px] text-primary-900",
            // pathname === "/" ? "text-white" : "text-primary-900",
          )}
        >
          <CopyRightIcon /> {currentYear}
        </p>

        {footerLinks.map((item, index) => (
          <a
            key={index}
            href={`${websiteUrl}/${item.url}`}
            target="_blank"
            rel="noreferrer"
            className={classNames(
              " hover:underline text-primary-900",
              // pathname === "/" ? "text-white" : "text-primary-900",
            )}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
}

//
interface IFooterLink {
  title: string;
  url: string;
}
