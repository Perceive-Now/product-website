import classNames from "classnames";
import { ChevronRight } from "../../icons";
import { Link, useLocation } from "react-router-dom";
import KeywordSelected from "../../@dashboard/IP-landscaping/KeywordSelected";

export const MoreNavOption = () => {
  const location = useLocation();
  const locationArr = location.pathname.split("/");

  const isLocationMatched = (key: string, locationArr: string[]) => {
    return locationArr.some((part) => part.startsWith(key));
  };

  return (
    <div className="flex-shrink-0 w-[228px] ">
      <div className="flex flex-col rounded-t-sm gap-[2px]">
        <Link
          to="/"
          className="bg-gray-200 text-sm font-semibold text-secondary-800 py-1 px-2 rounded-t-lg"
        >
          Home
        </Link>
        <div>
          {List.map((name) => (
            <div key={name.key}>
              <Link
                to={name.to}
                type="button"
                className={classNames(
                  " text-sm font-semibold  w-full text-start py-1 px-2 flex items-center justify-between",
                  isLocationMatched(name.key, locationArr)
                    ? "bg-primary-900 text-white"
                    : "text-secondary-800 hover:bg-primary-50",
                )}
              >
                <span className="">{name.title}</span>
                <ChevronRight />
              </Link>
              {isLocationMatched(name.key, locationArr) && <KeywordSelected />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const List = [
  {
    title: "IP Analysis",
    key: "ip-analysis",
    to: "/ip-analysis",
  },
  {
    title: "Market Research & IP",
    key: "market-research",
    to: "/market-research",
  },
  // {
  //   title: "Financial Investments",
  //   key: "financial-investments",
  // },
];
