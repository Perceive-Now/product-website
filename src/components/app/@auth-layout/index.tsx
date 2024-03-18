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
export default function AuthFooter() {
  //
  return (
    <div className="w-full px-4 flex justify-center items-center gap-2.5">
      {footerLinks.map((item, index) => (
        <a
          key={index}
          href={`${item.url}`}
          target="_blank"
          rel="noreferrer"
          className="text-primary-900 hover:underline"
        >
          {item.title}
        </a>
      ))}
    </div>
  );
}

//
interface IFooterLink {
  title: string;
  url: string;
}
