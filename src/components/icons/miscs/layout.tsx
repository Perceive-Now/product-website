import { SVGProps } from "react";

export default function LayoutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-4"
    >
      <rect x="1" y="3" width="16" height="6" fill="none" stroke="currentColor" />
      <line x1="12" y1="3" x2="12" y2="9" />
    </svg>
  );
}
