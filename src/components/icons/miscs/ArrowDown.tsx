import { SVGProps } from "react";

export default function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="11"
      height="7"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 0.999999L7 7L13 1" strokeWidth="2" stroke="black" />
    </svg>
  );
}
