import { Link } from "react-router-dom";
//
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../../icons";

/**
 *
 */
export default function AppFooter() {
  return (
    <div className="py-8 px-4 flex justify-between items-center">
      <div className="flex gap-x-4 font-normal text-sm">
        <Link to="#" className="text-primary-900">
          Help
        </Link>
        <Link to="#" className="text-primary-900">
          Feedback
        </Link>
        <Link to="#" className="text-primary-900">
          FAQs
        </Link>
      </div>

      <div className="flex gap-x-3">
        <a
          href="https://www.facebook.com/perceivenow/"
          target="_blank"
          rel="noreferrer"
          className="text-primary-900"
        >
          <FacebookIcon />
        </a>

        <a
          href="https://www.instagram.com/perceivenow/?hl=en"
          target="_blank"
          rel="noreferrer"
          className="text-primary-900"
        >
          <InstagramIcon />
        </a>

        <a
          href="https://twitter.com/perceivenow"
          target="_blank"
          rel="noreferrer"
          className="text-primary-900"
        >
          <TwitterIcon />
        </a>
      </div>
    </div>
  );
}
