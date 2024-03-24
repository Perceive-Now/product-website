/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Props {
  section?: string;
  subtitle?: string;
  children?: any;
  details?: {
    title: string;
    content: string;
  }[];
}

export function KeyDetail({ section, subtitle, children, details }: Props) {
  return (
    <div className="border-gray-200 shadow-custom border w-full space-y-1 px-2 p-2.5">
      <div>
        <div className="font-bold text-primary-900">Section: {section}</div>
        <div className="font-bold text-primary-900 text-sm">{subtitle}</div>
      </div>
      {}
      <div className="space-y-1">
        {children}
        {details?.map((detail, index) => (
          <div key={index} className="">
            <p className="font-bold text-sm text-[#373D3F]">{detail.title}</p>
            <span className="text-sm text-[#373D3F] font-medium">{detail.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
