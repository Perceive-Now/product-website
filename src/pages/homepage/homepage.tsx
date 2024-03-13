import { useNavigate } from "react-router-dom";

//
// import UserIcon from "../../components/app/userIcon";
import Search, { IKeywordOption } from "../../components/reusable/search";

//
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setDashboardSearch } from "../../stores/dashboard";

//
// import PerceiveLogo from "../../assets/images/logo.svg";
import classNames from "classnames";
import { useCallback, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import BulbIcon from "../../components/icons/miscs/Bulb";
import PortfolioIcon from "../../components/icons/sidenav/portfolio";
import DollarIcon from "../../components/icons/miscs/Dollar";

/**
 *
 */
export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];

  const [selectSearch, setSelectSearch] = useState<string>("ip-landscaping");

  //
  const handleSearch = (searchValue: IKeywordOption[]) => {
    dispatch(setDashboardSearch(searchValue));

    switch (selectSearch) {
      case "ip-landscaping":
        navigate(`/ip-analysis?keywords=${searchValue.map((s) => s.label)}`, {
          state: { search: searchValue },
        });
        break;
      case "companies":
        navigate("/companies", {
          state: { search: searchValue },
        });
        break;
      case "m&a-licensing":
        navigate("/m&a-licensing", {
          state: { search: searchValue },
        });
        break;
      case "inventors":
        navigate("/inventors", {
          state: { search: searchValue },
        });
        break;
      case "funding":
        navigate("/funding", {
          state: { search: searchValue },
        });
        break;
      default:
        navigate("/patents", {
          state: { search: searchValue },
        });
        break;
    }
  };

  const selectSearchType = useCallback((key: string) => {
    setSelectSearch(key);
  }, []);

  //
  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col">
      <div className="grow flex justify-center items-center md:px-4 py-7">
        <div className="w-full flex flex-col items-center">
          <h6 className="text-primary-900 text-xl md:text-3xl font-semibold">Search any keyword</h6>
          <div className="md:max-w-[1024px] mx- w-full">
            <div className="mt-3">
              <Search
                required
                size="large"
                className="w-full home-search"
                onSubmit={handleSearch}
                initialValue={searchedKeywords}
              />
            </div>
            <div className="flex mt-4 gap-4 items-center justify-center ">
              {SearchType.map((type, index) => (
                <div
                  key={index}
                  className="hover:cursor-pointer flex flex-col justify-start items-center"
                  onClick={() => selectSearchType(type.key)}
                >
                  <div
                    className={classNames(
                      "p-2 rounded-full",
                      selectSearch === type.key
                        ? "bg-primary-900"
                        : "bg-gray-100 hover:bg-primary-50",
                    )}
                  >
                    <type.icon
                      className={classNames(
                        "w-[32px] h-[32px] ",
                        selectSearch === type.key
                          ? "text-white fill-white"
                          : "text-primary-900 fill-primary-900",
                      )}
                    />
                  </div>
                  <span className="mt-1">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center px-4 pt-7">
        <Disclosure as="div" className="mt-2">
          {/* {({ open }) => ( */}
          <>
            <Disclosure.Button className="">
              <h6 className="flex justify-center items-center">
                <span className="text-gray-500 uppercase">Our Datapoints</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.74374 7.25808C7.89986 7.0996 8.11157 7.01057 8.33232 7.01057C8.55307 7.01057 8.76478 7.0996 8.92089 7.25808L12.4948 10.8872L16.0687 7.25808C16.1455 7.17734 16.2374 7.11294 16.3389 7.06863C16.4405 7.02433 16.5497 7.00101 16.6603 7.00003C16.7708 6.99906 16.8804 7.02045 16.9827 7.06295C17.0851 7.10546 17.178 7.16823 17.2562 7.2476C17.3343 7.32698 17.3961 7.42136 17.438 7.52526C17.4799 7.62915 17.5009 7.74047 17.5 7.85271C17.499 7.96496 17.476 8.07589 17.4324 8.17903C17.3888 8.28217 17.3254 8.37545 17.2458 8.45343L13.0834 12.6803C12.9273 12.8388 12.7155 12.9278 12.4948 12.9278C12.274 12.9278 12.0623 12.8388 11.9062 12.6803L7.74374 8.45343C7.58767 8.2949 7.5 8.07992 7.5 7.85576C7.5 7.6316 7.58767 7.41661 7.74374 7.25808ZM7.74374 12.3303C7.89986 12.1718 8.11157 12.0828 8.33232 12.0828C8.55307 12.0828 8.76478 12.1718 8.92089 12.3303L12.4948 15.9595L16.0687 12.3303C16.2257 12.1763 16.436 12.0911 16.6543 12.093C16.8726 12.0949 17.0814 12.1839 17.2357 12.3406C17.3901 12.4973 17.4776 12.7094 17.4795 12.931C17.4814 13.1527 17.3975 13.3662 17.2458 13.5256L13.0834 17.7525C12.9273 17.911 12.7155 18 12.4948 18C12.274 18 12.0623 17.911 11.9062 17.7525L7.74374 13.5256C7.58767 13.3671 7.5 13.1521 7.5 12.928C7.5 12.7038 7.58767 12.4888 7.74374 12.3303Z"
                      fill="#747779"
                    />
                  </svg>
                </span>
              </h6>
            </Disclosure.Button>
            <Transition
              enter="transition duration-500 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              {/* <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500"> */}
              <Disclosure.Panel className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-2 mt-2">
                {DataSets.map((item, idx) => (
                  <div key={idx + 1} className="">
                    <p className="text-gray-500 uppercase">{item.type}</p>
                    <span className="fw-semibold">{item.value}</span>
                  </div>
                ))}
              </Disclosure.Panel>
            </Transition>
            {/* </Disclosure.Panel> */}
          </>
          {/* )} */}
        </Disclosure>
      </div>
    </div>
  );
}

const SearchType = [
  {
    name: "IP Analysis",
    icon: PortfolioIcon,
    key: "ip-landscaping",
  },
  // {
  //   name: "Freedom to operate",
  //   icon: HookIcon,
  //   key: "freedom-to-operate",
  // },
  // {
  //   name: "M&A licensing",
  //   icon: DocumentIcon,
  //   key: "m&a-licensing",
  // },
  // {
  //   name: "Technology landscaping",
  //   icon: TechnologyIcon,
  //   key: "technology-landscaping",
  // },
  {
    name: "Market intelligence",
    icon: BulbIcon,
    key: "competitive-intelligence",
  },
  {
    name: "Financial  Investments",
    icon: DollarIcon,
    key: "infringement-analysis",
  },
  // {
  //   name: "Database Search",
  //   icon: ClaimIcon,
  //   key: "database-search",
  // },
];

const DataSets = [
  {
    type: "Patents",
    value: "5 MM+",
  },
  {
    type: "Publications",
    value: "231 MM+",
  },
  {
    type: "Patents",
    value: "231+",
  },
  {
    type: "Patents",
    value: "220+",
  },
  {
    type: "Patents",
    value: "11 MM+",
  },
  {
    type: "Patents",
    value: "231 MM+",
  },
];
