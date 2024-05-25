import { Link } from "react-router-dom";
import ArrowLeftIcon from "../../../components/icons/common/arrow-left";
import Title from "../../../components/reusable/title";
import UploadAttachements from "./upload-attachments";

export default function UploadAttachementsMethod() {
  return (
    <div>
      <Link
        to="/product"
        className="flex flex-row gap-x-1 font-bold text-secondary-800 w-fit bg-red-400"
      >
        <ArrowLeftIcon /> Back
      </Link>
      <div>
        <Title text="Upload Attachments" />
        {"bar"}
        <UploadAttachements />
      </div>
    </div>
  );
}
