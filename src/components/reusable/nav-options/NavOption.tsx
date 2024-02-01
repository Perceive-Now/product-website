import classNames from "classnames";
import { ChevronRight } from "../../icons";
import { Link } from "react-router-dom";

export const MoreNavOption = () => {
  return (
    <div className="flex-shrink-0 w-[228px] ">
      <div className="flex flex-col border rounded-t-sm shadow gap-[2px]">
        <Link
          to="/"
          className="bg-gray-200 text-sm font-semibold text-secondary-800 py-1 px-2 rounded-t-l"
        >
          Home
        </Link>
        <div>
          {List.map((name) => (
            <button
              key={name.key}
              type="button"
              className={classNames(
                " text-sm font-semibold  w-full text-start py-1 px-2 flex items-center justify-between border-b",
                name.key === location.pathname
                  ? "bg-primary-900 text-white"
                  : "text-secondary-800 hover:bg-primary-50",
              )}
            >
              <span>{name.title}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const List = [
  {
    title: "IP Analysis",
    key: "/ip-analysis",
  },
  {
    title: "Market Research & IP",
    key: "market-intelligence",
  },
  {
    title: "Financial Investments",
    key: "financial-investments",
  },
];
