import { SVGProps } from "react";

export default function TechnologiesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M17 4a1 1 0 1 1 0-2h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V5.414l-5.793 5.793a1 1 0 0 1-1.414 0L10 8.414l-5.293 5.293a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0L13.5 9.086L18.586 4H17ZM5 18v3a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0Zm5-4a1 1 0 1 0-2 0v7a1 1 0 1 0 2 0v-7Zm4 1a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1Zm6-4a1 1 0 1 0-2 0v10a1 1 0 1 0 2 0V11Z" />
    </svg>
  );
}
