import { SVGProps } from "react";

export default function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2360_40054)">
        <path d="M9.29055 6.71002C8.90055 7.10002 8.90055 7.73002 9.29055 8.12002L13.1705 12L9.29055 15.88C8.90055 16.27 8.90055 16.9 9.29055 17.29C9.68055 17.68 10.3105 17.68 10.7005 17.29L15.2905 12.7C15.6805 12.31 15.6805 11.68 15.2905 11.29L10.7005 6.70002C10.3205 6.32002 9.68055 6.32002 9.29055 6.71002Z" />
      </g>
      <defs>
        <clipPath id="clip0_2360_40054">
          <rect width="24" height="24" />
        </clipPath>
      </defs>
    </svg>
  );
}
