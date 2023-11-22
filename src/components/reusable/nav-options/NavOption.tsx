import classNames from "classnames";
import { ChevronRight } from "../../icons";

export const MoreNavOption = () => {
  return (
    <div className="flex-shrink-0 w-auto ">
      <div className="flex flex-col border rounded-t-lg shadow">
        <div className="bg-gray-200 text-sm font-semibold text-secondary-800 py-1 px-2 rounded-t-lg">
          More
        </div>
        <div>
          {List.map((name) => (
            <button
              key={name}
              type="button"
              className={classNames(
                "hover:bg-primary-50 text-sm font-semibold text-secondary-800 w-full text-start py-1 px-2 flex items-center justify-between border-b",
              )}
            >
              <span>{name}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const List = [
  "IP Landscaping",
  "Freedom to operate",
  "M&A licensing",
  "Technology landscaping",
  "Competitive intelligence",
  "Infringement analysis",
  "Database Search",
];
