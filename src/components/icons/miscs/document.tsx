import { SVGProps } from "react";

export default function DOcumentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    // <svg
    //   width="24"
    //   height="24"
    //   viewBox="0 0 24 24"
    //   fill="currentColor"
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...props}
    // >
    //   <path d="M19 11H7.82998L12.71 6.11997C13.1 5.72997 13.1 5.08997 12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z" />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      // fill="none"
    >
      <g clipPath="url(#clip0_1206_13491)" {...props}>
        <path d="M20.4334 3.2002H5.50003C4.3267 3.2002 3.3667 4.1602 3.3667 5.33353V20.2669C3.3667 21.4402 4.3267 22.4002 5.50003 22.4002H20.4334C21.6067 22.4002 22.5667 21.4402 22.5667 20.2669V5.33353C22.5667 4.1602 21.6067 3.2002 20.4334 3.2002ZM15.1 18.1335H7.63337V16.0002H15.1V18.1335ZM18.3 13.8669H7.63337V11.7335H18.3V13.8669ZM18.3 9.6002H7.63337V7.46686H18.3V9.6002Z" />
      </g>
      <defs>
        <clipPath id="clip0_1206_13491">
          <rect width="25.6" height="25.6" transform="translate(0.166687)" />
        </clipPath>
      </defs>
    </svg>
  );
}
