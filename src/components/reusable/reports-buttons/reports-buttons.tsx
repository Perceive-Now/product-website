import { BookmarkIcon, MasterReportIcon, ReportIcon } from "../../icons";

export default function ReportButtons() {
  return (
    <div className="flex">
      <div className="mr-2 flex cursor-pointer">
        <ReportIcon className="mr-1" />

        <span className="min-w-max">Create Report</span>
      </div>

      <div className="mr-2 flex cursor-pointer">
        <MasterReportIcon className="mr-1" />

        <span className="min-w-max">Create Master Report</span>
      </div>

      <div className="mr-2 flex cursor-pointer">
        <BookmarkIcon className="mr-1" />

        <span className="min-w-max">Save</span>
      </div>
    </div>
  );
}
