import { Link } from "react-router-dom";
//
import { FacebookIcon, InstagramIcon, TwitterIcon } from "../../icons";

/**
 *
 */
export default function AppFooter() {
  return (
    <div className="py-8 px-4 flex justify-between items-center">
      <div className="flex gap-x-4 font-normal text-sm text-primary-900">
        <Link to="#">Help</Link>
        <Link to="#">Feedback</Link>
        <Link to="#">FAQs</Link>
      </div>

      <div className="flex gap-x-3 text-primary-900">
        <a
          href="https://www.facebook.com/perceivenow/"
          target="_blank"
          rel="noreferrer"
        >
          <FacebookIcon />
        </a>

        <a
          href="https://www.instagram.com/perceivenow/?hl=en"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />
        </a>

        <a
          href="https://twitter.com/perceivenow"
          target="_blank"
          rel="noreferrer"
        >
          <TwitterIcon />
        </a>
      </div>
    </div>
  );
}
