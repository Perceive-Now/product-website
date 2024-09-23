import { SVGProps } from "react";

export default function Chat4(props: SVGProps<SVGSVGElement>) {
  const isDark = props?.type === "dark";
  return (
    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="0.669922"
        y="0.332031"
        width="32"
        height="32"
        rx="16"
        fill={isDark ? "white" : "#5C1FC4"}
      />
      <mask id="mask0_11800_4658" maskUnits="userSpaceOnUse" x="8" y="8" width="17" height="17">
        <rect x="8.66992" y="8.33203" width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_11800_4658)">
        <path
          d="M10.6699 22.332V20.9987L12.0033 19.6654V22.332H10.6699ZM13.3366 22.332V18.332L14.6699 16.9987V22.332H13.3366ZM16.0033 22.332V16.9987L17.3366 18.3487V22.332H16.0033ZM18.6699 22.332V18.3487L20.0033 17.0154V22.332H18.6699ZM21.3366 22.332V15.6654L22.6699 14.332V22.332H21.3366ZM10.6699 18.882V16.9987L15.3366 12.332L18.0033 14.9987L22.6699 10.332V12.2154L18.0033 16.882L15.3366 14.2154L10.6699 18.882Z"
          fill={isDark ? "#5C1FC4" : "white"}
        />
      </g>
    </svg>
  );
}
