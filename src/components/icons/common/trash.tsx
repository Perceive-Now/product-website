import { SVGProps } from "react";

export default function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
    >
      <g clipPath="url(#clip0_9640_9997)">
        <path
          d="M4.00016 12.6667C4.00016 13.4 4.60016 14 5.3335 14H10.6668C11.4002 14 12.0002 13.4 12.0002 12.6667V4.66667H4.00016V12.6667ZM12.6668 2.66667H10.3335L9.66683 2H6.3335L5.66683 2.66667H3.3335V4H12.6668V2.66667Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_9640_9997">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
