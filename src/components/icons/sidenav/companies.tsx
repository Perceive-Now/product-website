import { SVGProps } from "react";

export default function CompaniesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_4211_20452)">
        <path d="M20 4H4V6H20V4ZM21 14V12L20 7H4L3 12V14H4V20H14V14H18V20H20V14H21ZM12 18H6V14H12V18Z" />
      </g>
      <defs>
        <clipPath id="clip0_4211_20452">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
