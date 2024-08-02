import { SVGProps } from "react";

const MinusIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
    >
      <g clipPath="url(#clip0_11840_5567)">
        <path
          d="M12.2685 8.37395H4.69279C4.34556 8.37395 4.06147 8.08986 4.06147 7.74264C4.06147 7.39542 4.34556 7.11133 4.69279 7.11133H12.2685C12.6158 7.11133 12.8999 7.39542 12.8999 7.74264C12.8999 8.08986 12.6158 8.37395 12.2685 8.37395Z"
          fill="#442873"
        />
      </g>
      <defs>
        <clipPath id="clip0_11840_5567">
          <rect
            width="15.1515"
            height="15.1515"
            fill="white"
            transform="translate(0.904751 0.167969)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MinusIcon;
