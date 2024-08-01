import { SVGProps } from "react";

export default function CopyRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <rect width="32" height="32" rx="16" fill="#533F73" />
      <g clipPath="url(#clip0_14212_89113)">
        <path
          d="M11.9999 20.6667C11.9999 21.4 12.5999 22 13.3333 22H18.6666C19.3999 22 19.9999 21.4 19.9999 20.6667V12.6667H11.9999V20.6667ZM20.6666 10.6667H18.3333L17.6666 10H14.3333L13.6666 10.6667H11.3333V12H20.6666V10.6667Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_14212_89113">
          <rect width="16" height="16" fill="white" transform="translate(8 8)" />
        </clipPath>
      </defs>
    </svg>
  );
}
