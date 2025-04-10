import { SVGProps } from "react";

export default function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2360_40051)">
        <path
          d="M14.7105 6.70998C14.3205 6.31998 13.6905 6.31998 13.3005 6.70998L8.71047 11.3C8.32047 11.69 8.32047 12.32 8.71047 12.71L13.3005 17.3C13.6905 17.69 14.3205 17.69 14.7105 17.3C15.1005 16.91 15.1005 16.28 14.7105 15.89L10.8305 12L14.7105 8.11998C15.1005 7.72998 15.0905 7.08998 14.7105 6.70998Z"
          fill="#636567"
        />
      </g>
      <defs>
        <clipPath id="clip0_2360_40051">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
