import { SVGProps } from "react";

const ArrowUp = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="11"
      height="7"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 7L7 1L13 7" strokeWidth="2" stroke="black" />
    </svg>
  );
};

export default ArrowUp;
