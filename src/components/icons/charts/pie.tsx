import { SVGProps } from "react";

export default function PieIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="0.5"
        width="23"
        height="23"
        rx="3.5"
        stroke="#323334"
        className="donut-box"
      />
      <path
        className="donut"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.1191 19.9529V12.9698L5.49375 7.34416C4.55351 8.65578 4 10.2635 4 12.0004C4 16.1212 7.11532 19.5144 11.1191 19.9529ZM20 12.0004C20 16.3792 16.4825 19.9363 12.1191 20V13.0194L18.9921 8.10992C19.6341 9.26156 20 10.5883 20 12.0004ZM11.6728 12.1093L6.1293 6.56548C7.59055 4.98766 9.67994 4 12 4C14.6475 4 16.9946 5.28611 18.4507 7.26767L11.6728 12.1093Z"
        fill="#323334"
      />
    </svg>
  );
}
