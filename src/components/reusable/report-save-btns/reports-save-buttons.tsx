import { BookmarkIcon, ReportIcon } from "../../icons";

/**
 *
 */
export default function ReportSaveButtons() {
  return (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-[4px] cursor-pointer">
        <ReportIcon />
        <span className="min-w-max text-base">Create Report</span>
      </div>

      <div className="flex items-center gap-x-[4px] cursor-pointer">
        <BookmarkIcon />
        <span className="min-w-max text-base">Save</span>
      </div>
    </div>
  );
}
