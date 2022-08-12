import { SVGProps } from "react";

export default function UniversitiesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 4V0H0V18H20V4H10ZM8 16H2V14H8V16ZM8 12H2V10H8V12ZM8 8H2V6H8V8ZM8 4H2V2H8V4ZM18 16H10V6H18V16ZM16 8H12V10H16V8ZM16 12H12V14H16V12Z"
        fill="#323334"
      />
    </svg>
  );
}
