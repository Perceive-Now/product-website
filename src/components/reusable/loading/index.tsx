import React, { useEffect } from "react";
import { LoadingIcon } from "../../icons";

interface Props {
  height?: string;
  width?: string;
  isLoading?: boolean;
}
const Loading = ({ width, height, isLoading }: Props) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      {!isLoading && (
        <div className="fixed inset-0 z-50  flex justify-center items-center w-full">
          <LoadingIcon fontSize={52} className="animate-spin text-primary-900" />
        </div>
      )}
    </>
  );
};

export default Loading;
