import { SVGProps } from "react";

export default function ReportIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M17 19.22H5V7H12V5H5C3.9 5 3 5.9 3 7V19C3 20.1 3.9 21 5 21H17C18.1 21 19 20.1 19 19V12H17V19.22Z"
        fill="#5C1FC4"
      />
      <path
        d="M19 2H17V5H14C14.01 5.01 14 7 14 7H17V9.99C17.01 10 19 9.99 19 9.99V7H22V5H19V2Z"
        fill="#5C1FC4"
      />
      <path d="M15 9H7V11H15V9Z" fill="#5C1FC4" />
      <path d="M7 12V14H15V12H12H7Z" fill="#5C1FC4" />
      <path d="M15 15H7V17H15V15Z" fill="#5C1FC4" />
    </svg>
  );
}
