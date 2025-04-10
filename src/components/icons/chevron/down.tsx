import { SVGProps } from "react";

export default function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_1519_23740)">
        <path d="M15.8805 9.28957L12.0005 13.1696L8.12047 9.28957C7.73047 8.89957 7.10047 8.89957 6.71047 9.28957C6.32047 9.67957 6.32047 10.3096 6.71047 10.6996L11.3005 15.2896C11.6905 15.6796 12.3205 15.6796 12.7105 15.2896L17.3005 10.6996C17.6905 10.3096 17.6905 9.67957 17.3005 9.28957C16.9105 8.90957 16.2705 8.89957 15.8805 9.28957Z" />
      </g>
      <defs>
        <clipPath id="clip0_1519_23740">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </svg>
  );
}
