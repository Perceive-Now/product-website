import { SVGProps } from "react";

export default function DustbinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_5059_8373)">
        <path
          d="M7.19999 18.1008C7.19999 18.9808 7.91999 19.7008 8.79999 19.7008H15.2C16.08 19.7008 16.8 18.9808 16.8 18.1008V8.50078H7.19999V18.1008ZM17.6 6.10078H14.8L14 5.30078H9.99999L9.19999 6.10078H6.39999V7.70078H17.6V6.10078Z"
          fill="#757575"
          fillOpacity="0.8"
        />
      </g>
      <defs>
        <clipPath id="clip0_5059_8373">
          <rect width="19.2" height="19.2" fill="white" transform="translate(2.39999 2.90039)" />
        </clipPath>
      </defs>
    </svg>

    // <svg xmlns="http://www.w3.org/2000/svg" width={14} height={18} fill="none" {...props}>
    //   <path
    //     fill="#442873"
    //     d="M1 16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4H1v12ZM14 1h-3.5l-1-1h-5l-1 1H0v2h14V1Z"
    //   />
    // </svg>
  );
}
