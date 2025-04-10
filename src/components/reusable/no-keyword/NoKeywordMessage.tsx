import { WarningIcon } from "../../icons";

/**
 *
 */
export default function NoKeywordMessage() {
  return (
    <div className="w-full text-center h-[200px] flex flex-col justify-center items-center">
      <div className="mb-2 text-secondary-700">
        <WarningIcon width={48} height={48} />
      </div>

      <span className="description">Please enter your keywords and search</span>
    </div>
  );
}
