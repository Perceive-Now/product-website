import classNames from "classnames";
import { ChevronRight } from "../../icons";

export const MoreNavOption = () => {
  return (
    <div className="flex-shrink-0 w-[228px] ">
      <div className="flex flex-col border rounded-t-sm shadow">
        <div className="bg-gray-200 text-sm font-semibold text-secondary-800 py-1 px-2 rounded-t-l">
          Home
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

const List = ["IP Analysis", "Market Research & IP", "Financial Investments"];
