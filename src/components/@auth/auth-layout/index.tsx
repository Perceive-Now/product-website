import { AppConfig } from "src/config/app.config";

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
export default function AuthFooter() {
  const WEBSITEURL = AppConfig.WEBSITE_URL;
  //
  return (
    <div className="w-full px-4 flex justify-center items-center gap-2.5">
      {footerLinks.map((item, index) => (
        <a
          key={index}
          href={`${WEBSITEURL}/${item.url}`}
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
