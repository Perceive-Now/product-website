import { SVGProps } from "react";

export default function UniversitiesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    // <svg
    //   width="24"
    //   height="24"
    //   viewBox="0 0 24 24"
    //   fill="currentColor"
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    // >
    //   <path d="M12 7V3H2V21H22V7H12ZM10 19H4V17H10V19ZM10 15H4V13H10V15ZM10 11H4V9H10V11ZM10 7H4V5H10V7ZM20 19H12V9H20V19ZM18 11H14V13H18V11ZM18 15H14V17H18V15Z" />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="currentColor"
      {...props}
    >
      <path d="M5 9H2V16H5V9Z" fill="currentColor" />
      <path d="M11.5 9H8.5V16H11.5V9Z" fill="currentColor" />
      <path d="M20 18H0V21H20V18Z" fill="currentColor" />
      <path d="M18 9H15V16H18V9Z" fill="currentColor" />
      <path d="M10 0L0 5V7H20V5L10 0Z" fill="currentColor" />
    </svg>
  );
}
