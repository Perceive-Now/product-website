import { SVGProps } from "react";

export default function CitaionIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.17 10C3.68 10 4.15 9.71 4.37 9.26L5.79 6.42C5.93 6.14 6 5.84 6 5.53V1C6 0.45 5.55 0 5 0H1C0.45 0 0 0.45 0 1V5C0 5.55 0.45 6 1 6H3L1.97 8.06C1.52 8.95 2.17 10 3.17 10ZM13.17 10C13.68 10 14.15 9.71 14.37 9.26L15.79 6.42C15.93 6.14 16 5.84 16 5.53V1C16 0.45 15.55 0 15 0H11C10.45 0 10 0.45 10 1V5C10 5.55 10.45 6 11 6H13L11.97 8.06C11.52 8.95 12.17 10 13.17 10Z"
        fill="#442873"
      />
    </svg>
  );
}
