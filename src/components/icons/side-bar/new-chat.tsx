import { SVGProps } from "react";

export default function NewChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2.3154C0 1.03799 0.89543 0.00244141 2 0.00244141H18C19.1046 0.00244141 20 1.03799 20 2.3154V13.8802C20 15.1576 19.1046 16.1932 18 16.1932H16V19.4231C16 19.9382 15.4614 20.1962 15.1464 19.8319L12 16.1932H2C0.89543 16.1932 0 15.1576 0 13.8802V2.3154ZM9 4.62836V6.94132H7C6.44772 6.94132 6 7.4591 6 8.0978C6 8.73652 6.44772 9.25428 7 9.25428H9V11.5672C9 12.206 9.4477 12.7237 10 12.7237C10.5523 12.7237 11 12.206 11 11.5672V9.25428H13C13.5523 9.25428 14 8.73652 14 8.0978C14 7.4591 13.5523 6.94132 13 6.94132H11V4.62836C11 3.98966 10.5523 3.47188 10 3.47188C9.4477 3.47188 9 3.98966 9 4.62836Z"
        fill="currentColor"
      />
    </svg>
  );
}
