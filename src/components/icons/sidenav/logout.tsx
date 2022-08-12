import { SVGProps } from "react";

export default function LogoutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 2H8C8.55 2 9 1.55 9 1C9 0.45 8.55 0 8 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H8C8.55 18 9 17.55 9 17C9 16.45 8.55 16 8 16H2V2Z"
        fill="#A14040"
      />
      <path
        d="M17.65 8.65003L14.86 5.86003C14.54 5.54003 14 5.76003 14 6.21003V8.00003H7C6.45 8.00003 6 8.45003 6 9.00003C6 9.55003 6.45 10 7 10H14V11.79C14 12.24 14.54 12.46 14.85 12.14L17.64 9.35003C17.84 9.16003 17.84 8.84003 17.65 8.65003Z"
        fill="#A14040"
      />
    </svg>
  );
}
