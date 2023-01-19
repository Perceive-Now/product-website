import { SVGProps } from "react";

export default function BarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect className="bar-box" x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="#323334" />
      <rect className="bar" x="3" y="7" width="3" height="13" rx="1" fill="#323334" />
      <rect className="bar" x="13" y="7" width="3" height="13" rx="1" fill="#323334" />
      <rect className="bar" x="18" y="13" width="3" height="7" rx="1" fill="#323334" />
      <rect className="bar" x="8" y="4" width="3" height="16" rx="1" fill="#323334" />
    </svg>
  );
}
