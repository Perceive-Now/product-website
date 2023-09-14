import { useNavigate } from "react-router-dom";

//
// import UserIcon from "../../components/app/userIcon";
import Search, { IKeywordOption } from "../../components/reusable/search";

//
import { useAppDispatch } from "../../hooks/redux";
import { setDashboardSearch } from "../../stores/dashboard";

//
// import PerceiveLogo from "../../assets/images/logo.svg";
import {
  CompaniesIcon,
  FundingIcon,
  PatentsIcon,
  PublicationsIcon,
  UniversitiesIcon,
} from "../../components/icons";
import classNames from "classnames";
import { useCallback, useState } from "react";
import InventorIcon from "../../components/icons/sidenav/inventors";

/**
 *
 */
export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectSearch, setSelectSearch] = useState<string>("patents");

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));

    navigate("/dashboard", {
      state: { search: value },
    });
  };

  const selectSearchType = useCallback((key: string) => {
    setSelectSearch(key);
  }, []);

  //
  return (
    <div className="min-h-[calc(100vh-250px)] flex flex-col">
      {/* <div className="flex w-full justify-between pr-4 py-3">
        <div className="w-[256px] flex justify-center">
          <img src={PerceiveLogo} alt="PerceiveNow logo" />
        </div>

        <UserIcon />
      </div> */}

      <div className="grow flex justify-center items-center px-4 py-7">
        <div className="my-auto justify-center text-center">
          <h6 className="text-primary-900 text-3xl">Search any Keyword</h6>
          <div className="min-w-[612px]">
            <div className="mt-3">
              <Search required size="large" className="w-full " onSubmit={handleSearch} />
            </div>
            {/* <div className="text-right text-sm text-gray-600 mt-2">
              <Link to="#" className="mr-1">
                History
              </Link>
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6  mt-4 gap-4">
              {SearchType.map((type, index) => (
                <div
                  key={index}
                  className="hover:cursor-pointer flex flex-col justify-center items-center"
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
                        "w-[36px] h-[36px] ",
                        selectSearch === type.key ? "text-white" : "text-primary-900",
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

      {/* <div className="text-center px-4 py-7">
        <h6>10 new articles were published by your top competitor</h6>
        <p className="text-gray-600 mt-1">
          20% decrease in overall funding grants
        </p>
      </div> */}
    </div>
  );
}

const SearchType = [
  {
    name: "Patents",
    icon: PatentsIcon,
    key: "patents",
  },
  {
    name: "Publications",
    icon: PublicationsIcon,
    key: "publictions",
  },
  {
    name: "Companies",
    icon: CompaniesIcon,
    key: "companies",
  },
  {
    name: "Universities",
    icon: UniversitiesIcon,
    key: "universties",
  },
  {
    name: "Inventors",
    icon: InventorIcon,
    key: "inventors",
  },
  {
    name: "Funding",
    icon: FundingIcon,
    key: "funding",
  },
];
