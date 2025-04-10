import { SVGProps } from "react";

export default function MasterReportIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 19H5V5H14V3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10H19V19Z"
        fill="#5C1FC4"
      />
      <path d="M17 13H15V17H17V13Z" fill="#5C1FC4" />
      <path d="M9 10H7V17H9V10Z" fill="#5C1FC4" />
      <path d="M13 7H11V17H13V7Z" fill="#5C1FC4" />
      <path d="M19 5V3H17V5H15V7H17V9H19V7H21V5H19Z" fill="#5C1FC4" />
    </svg>
  );
}
