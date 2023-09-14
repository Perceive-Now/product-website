import { SVGProps } from "react";

export default function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 14H9.286C6.919 14 5 15.679 5 17.75V19M19 7V12C19 12.5304 18.7893 13.0391 18.4142 13.4142C18.0391 13.7893 17.5304 14 17 14H15V19M14 8C14 8.39397 13.9224 8.78407 13.7716 9.14805C13.6209 9.51203 13.3999 9.84274 13.1213 10.1213C12.8427 10.3999 12.512 10.6209 12.1481 10.7716C11.7841 10.9224 11.394 11 11 11C10.606 11 10.2159 10.9224 9.85195 10.7716C9.48797 10.6209 9.15726 10.3999 8.87868 10.1213C8.6001 9.84274 8.37913 9.51203 8.22836 9.14805C8.0776 8.78407 8 8.39397 8 8C8 7.20435 8.31607 6.44129 8.87868 5.87868C9.44129 5.31607 10.2044 5 11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8V8Z"
        stroke="#636567"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
