import React from "react";

const StackFolders = ({
  width = 20,
  height = 20,
  fill = "#000000",
}: {
  width?: number;
  height?: number;
  fill?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path d="M9 1H4V11H16V3H11L9 1Z" fill={fill} />
      <path d="M0 5V15H12V13H2V5H0Z" fill={fill} />
    </svg>
  );
};

export default StackFolders;
