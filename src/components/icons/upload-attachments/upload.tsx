import { SVGProps } from "react";

export default function UploadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={49} height={48} fill="none" {...props}>
      <path
        fill="#442873"
        fillRule="evenodd"
        d="M22.748.76A2.389 2.389 0 0 1 24.5 0c.615 0 1.229.234 1.7.704l11.996 11.997a2.4 2.4 0 1 1-3.393 3.395l-7.904-7.904v23.003a2.4 2.4 0 1 1-4.8 0V8.197l-7.9 7.9a2.4 2.4 0 0 1-3.392-3.396L22.747.761ZM2.903 28.803c1.326 0 2.401 1.075 2.401 2.4V40.8A2.397 2.397 0 0 0 7.703 43.2h33.593a2.4 2.4 0 0 0 2.4-2.398v-9.599a2.4 2.4 0 1 1 4.8 0V40.8a7.2 7.2 0 0 1-7.2 7.2H7.703c-1.91 0-3.74-.758-5.09-2.108A7.196 7.196 0 0 1 .503 40.8v-9.598c0-1.325 1.075-2.4 2.4-2.4Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
