import React from "react";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";

export default function GoBack() {
  return (
    <Link
      to="/product"
      className="flex flex-row gap-x-1 font-bold text-secondary-800 w-fit bg-red-400"
    >
      <ArrowLeftIcon /> Back
    </Link>
  );
}
