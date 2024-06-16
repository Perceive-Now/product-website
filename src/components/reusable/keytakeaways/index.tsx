import React from "react";

interface Props {
  title: string;
  description?: string;
}

const Keytakeaway = ({ title, description }: Props) => {
  return (
    <div className="">
      <p className="font-bold text-sm text-[#373D3F]">{title}</p>
      <span className="text-sm text-[#373D3F] font-medium">{description}</span>
    </div>
  );
};

export default Keytakeaway;
