import { SVGProps } from "react";

export default function ChevronUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5.29022 0.70998L0.700215 5.29998C0.310215 5.68998 0.310215 6.31998 0.700215 6.70998C1.09021 7.09998 1.72021 7.09998 2.11021 6.70998L6.00022 2.82998L9.88021 6.70998C10.2702 7.09998 10.9002 7.09998 11.2902 6.70998C11.6802 6.31998 11.6802 5.68998 11.2902 5.29998L6.70021 0.70998C6.32021 0.31998 5.68021 0.31998 5.29022 0.70998Z" />
    </svg>
  );
}
