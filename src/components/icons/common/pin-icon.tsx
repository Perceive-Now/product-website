import { SVGProps } from "react";

export default function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="13"
      viewBox="0 0 8 13"
      fill="none"
      {...props}
    >
      <path
        d="M6.5 6.5V1.7H7.1V0.5H1.1V1.7H1.7V6.5L0.5 7.7V8.9H3.62V12.5H4.58V8.9H7.7V7.7L6.5 6.5ZM2.18 7.7L2.9 6.98V1.7H5.3V6.98L6.02 7.7H2.18Z"
        fill="#87888C"
      />
    </svg>
  );
}
