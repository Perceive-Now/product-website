import { BookmarkIcon, MasterReportIcon, ReportIcon } from "../../icons";

export default function ReportButtons() {
  return (
    <div className="flex gap-x-3">
      <div className="flex gap-x-[4px] cursor-pointer">
        <ReportIcon />
        <span className="min-w-max">Create Report</span>
      </div>

      <div className="flex gap-x-[4px] cursor-pointer">
        <MasterReportIcon />
        <span className="min-w-max">Create Master Report</span>
      </div>

      <div className="flex gap-x-[4px] cursor-pointer">
        <BookmarkIcon />
        <span className="min-w-max">Save</span>
      </div>
    </div>
  );
}
