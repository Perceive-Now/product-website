import { SVGProps } from "react";

export default function DragIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-2 mr-1 cursor-grab"
    >
      <circle cx="5" cy="4" r="3" fill="#E8EAF2" />
      <circle cx="5" cy="12" r="3" fill="#E8EAF2" />
      <circle cx="5" cy="20" r="3" fill="#E8EAF2" />
      <circle cx="12" cy="4" r="3" fill="#E8EAF2" />
      <circle cx="12" cy="12" r="3" fill="#E8EAF2" />
      <circle cx="12" cy="20" r="3" fill="#E8EAF2" />
    </svg>
  );
}
