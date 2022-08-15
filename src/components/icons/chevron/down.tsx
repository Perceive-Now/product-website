import { SVGProps } from "react";

export default function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9.87998 1.29006L5.99998 5.17006L2.11998 1.29006C1.72998 0.900059 1.09998 0.900059 0.70998 1.29006C0.31998 1.68006 0.31998 2.31006 0.70998 2.70006L5.29998 7.29006C5.68998 7.68006 6.31998 7.68006 6.70998 7.29006L11.3 2.70006C11.69 2.31006 11.69 1.68006 11.3 1.29006C10.91 0.910059 10.27 0.900059 9.87998 1.29006Z" />
    </svg>
  );
}
