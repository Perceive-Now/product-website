import { SVGProps } from "react";

export default function QuestionMarkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} fill="none" {...props}>
      <path
        fill="#FFA300"
        d="M18 0C8.074 0 0 8.074 0 18s8.074 18 18 18 18-8.074 18-18S27.926 0 18 0Zm0 33.429C9.495 33.429 2.571 26.505 2.571 18 2.571 9.495 9.495 2.571 18 2.571c8.505 0 15.429 6.924 15.429 15.429 0 8.505-6.924 15.429-15.429 15.429Z"
      />
      <path
        fill="#FFA300"
        d="M18 7.265a6.873 6.873 0 0 0-6.866 6.866 1.29 1.29 0 0 0 1.286 1.285 1.29 1.29 0 0 0 1.286-1.285A4.302 4.302 0 0 1 18 9.836a4.302 4.302 0 0 1 4.294 4.295A4.302 4.302 0 0 1 18 18.425a1.29 1.29 0 0 0-1.286 1.286v3.78A1.29 1.29 0 0 0 18 24.776a1.29 1.29 0 0 0 1.286-1.285v-2.617c3.175-.604 5.58-3.4 5.58-6.743A6.873 6.873 0 0 0 18 7.265ZM18 26.036a1.29 1.29 0 0 0-1.286 1.285v.129A1.29 1.29 0 0 0 18 28.736a1.29 1.29 0 0 0 1.286-1.286v-.129A1.29 1.29 0 0 0 18 26.036Z"
      />
    </svg>
  );
}
