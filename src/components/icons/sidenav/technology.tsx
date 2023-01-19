import { SVGProps } from "react";

export default function TechnologiesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask id="mask0_4211_20431" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_4211_20431)">
        <path d="M3 21V19L5 17V21H3ZM7 21V15L9 13V21H7ZM11 21V13L13 15.025V21H11ZM15 21V15.025L17 13.025V21H15ZM19 21V11L21 9V21H19ZM3 15.825V13L10 6L14 10L21 3V5.825L14 12.825L10 8.825L3 15.825Z" />
      </g>
    </svg>
  );
}
