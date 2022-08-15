import { SVGProps } from "react";

export default function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6.71047 0.70998C6.32047 0.31998 5.69047 0.31998 5.30047 0.70998L0.710469 5.29998C0.320469 5.68998 0.320469 6.31998 0.710469 6.70998L5.30047 11.3C5.69047 11.69 6.32047 11.69 6.71047 11.3C7.10047 10.91 7.10047 10.28 6.71047 9.88998L2.83047 5.99998L6.71047 2.11998C7.10047 1.72998 7.09047 1.08998 6.71047 0.70998Z" />
    </svg>
  );
}
