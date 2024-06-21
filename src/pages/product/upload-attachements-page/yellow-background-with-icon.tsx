import React from "react";

type Props = {
  children: React.ReactElement;
};

export default function YellowBackgroundWithIcon({ children }: Props) {
  return (
    <div className="bg-foundationOrange-100 w-full items-center flex flex-row gap-x-1 p-[12px] rounded-lg">
      {children}
    </div>
  );
}
