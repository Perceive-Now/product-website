import * as React from "react";
import { SVGProps } from "react";

const LeftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="7"
    height="12"
    viewBox="0 0 7 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.71047 0.710469C6.32047 0.320469 5.69047 0.320469 5.30047 0.710469L0.710469 5.30047C0.320469 5.69047 0.320469 6.32047 0.710469 6.71047L5.30047 11.3005C5.69047 11.6905 6.32047 11.6905 6.71047 11.3005C7.10047 10.9105 7.10047 10.2805 6.71047 9.89047L2.83047 6.00047L6.71047 2.12047C7.10047 1.73047 7.09047 1.09047 6.71047 0.710469Z"
      fill="#636567"
    />
  </svg>
);

export default LeftIcon;
