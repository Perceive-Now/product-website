import { SVGProps } from "react";

export default function ScatterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="0.5" y="0.5" width="23.003" height="23" rx="3.5" stroke="#323334" />
      <path
        d="M5.93555 5.53833L10.4777 7.50001L13.5253 13.5L18.8586 14.5"
        stroke="#323334"
        className="line"
      />
      <ellipse cx="10.534" cy="7.50001" rx="1.2" ry="1.50001" fill="#323334" className="point" />
      <ellipse cx="13.5818" cy="13.5001" rx="1.2" ry="1.50001" fill="#323334" className="point" />
      <ellipse cx="18.8016" cy="14.5" rx="1.2" ry="1.50001" fill="#323334" className="point" />
      <ellipse cx="5.9627" cy="5.50001" rx="1.2" ry="1.50001" fill="#323334" className="point" />
      <path
        d="M5.17285 9.53834L9.20069 13.5L15.0483 7.5L16.5721 18.5"
        stroke="#323334"
        className="line"
      />
      <ellipse cx="9.2" cy="13.5" rx="1.2" ry="1.50001" fill="#323334" className="point" />
      <ellipse cx="15.1053" cy="7.50001" rx="1.2" ry="1.50001" fill="#323334" className="point" />
      <ellipse cx="16.6287" cy="18.5" rx="1.2" ry="1.50001" fill="#323334" className="point" />
      <ellipse cx="5.2" cy="9.50013" rx="1.2" ry="1.50001" fill="#323334" className="point" />
    </svg>
  );
}
