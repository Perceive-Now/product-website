import { SVGProps } from "react";

export default function ChevronRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M1.28957 0.710022C0.89957 1.10002 0.89957 1.73002 1.28957 2.12002L5.16957 6.00002L1.28957 9.88002C0.89957 10.27 0.89957 10.9 1.28957 11.29C1.67957 11.68 2.30957 11.68 2.69957 11.29L7.28957 6.70002C7.67957 6.31002 7.67957 5.68002 7.28957 5.29002L2.69957 0.700022C2.31957 0.320022 1.67957 0.320022 1.28957 0.710022Z" />
    </svg>
  );
}
