import { Link } from "react-router-dom";

//
const footerLinks: IFooterLink[] = [
  {
    title: "Privacy Statement",
    url: "/privacy-policy",
  },
  {
    title: "Software License Agreement",
    url: "/sla",
  },
  {
    title: "Terms of use",
    url: "/terms-of-use",
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
    <div className="pt-8 pb-4 px-4 flex justify-between items-center">
      <div className="flex gap-x-4 font-normal text-sm">
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

      <div className="flex gap-x-3">
        <p>&copy; {currentYear}</p>

        {footerLinks.map((item, index) => (
          <a
            key={index}
            href={`${websiteUrl}${item.url}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary-900 hover:underline"
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
