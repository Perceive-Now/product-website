import * as React from "react";
import { SVGProps } from "react";

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.29055 6.70978C8.90055 7.09978 8.90055 7.72978 9.29055 8.11978L13.1705 11.9998L9.29055 15.8798C8.90055 16.2698 8.90055 16.8998 9.29055 17.2898C9.68055 17.6798 10.3105 17.6798 10.7005 17.2898L15.2905 12.6998C15.6805 12.3098 15.6805 11.6798 15.2905 11.2898L10.7005 6.69978C10.3205 6.31978 9.68055 6.31978 9.29055 6.70978Z"
      fill="#636567"
    />
  </svg>
);

export default ArrowIcon;
