import React from "react";

const SvgDocumentIcon = ({
  width = 20,
  height = 20,
  stroke = "#020202",
}: {
  width?: number;
  height?: number;
  stroke?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <rect
        x="6.27"
        y="1.5"
        width="15.27"
        height="17.18"
        stroke={stroke}
        strokeWidth="1.91"
        strokeMiterlimit="10"
      />
      <polyline
        points="17.73 18.68 17.73 22.5 2.46 22.5 2.46 5.32 6.27 5.32"
        stroke={stroke}
        strokeWidth="1.91"
        strokeMiterlimit="10"
        fill="none"
      />
      <line
        x1="9.14"
        y1="6.27"
        x2="18.68"
        y2="6.27"
        stroke={stroke}
        strokeWidth="1.91"
        strokeMiterlimit="10"
      />
      <line
        x1="9.14"
        y1="10.09"
        x2="18.68"
        y2="10.09"
        stroke={stroke}
        strokeWidth="1.91"
        strokeMiterlimit="10"
      />
      <line
        x1="9.14"
        y1="13.91"
        x2="14.86"
        y2="13.91"
        stroke={stroke}
        strokeWidth="1.91"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default SvgDocumentIcon;
