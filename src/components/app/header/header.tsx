import { useLocation, useNavigate } from "react-router-dom";

//
import Search, { IKeywordOption } from "../../reusable/search";

//
import { setDashboardSearch } from "../../../stores/dashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

//
import UserIcon from "../userIcon";

//
const SPECIAL_PATHS = ["/feedback", "/help", "/faq"];

/**
 *
 */
export default function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const isMultiLevel =
    location.pathname.split("/").filter((itm) => itm).length > 1;

  const isDashboardPage = location.pathname === "/dashboard";
  const isSpecialPages = SPECIAL_PATHS.includes(location.pathname);

  const handleBack = () => {
    if (isMultiLevel || isSpecialPages) {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  return (
    <div className="flex justify-between items-center my-auto h-10 py-1">
      <>
        {isDashboardPage ? (
          <div className="flex-grow max-w-xl">
            <Search
              required
              size="large"
              className="w-full"
              onSubmit={handleSearch}
              initialValue={searchedKeywords}
            />
          </div>
        ) : (
          <div
            onClick={handleBack}
            className="cursor-pointer flex items-center"
          >
            <ArrowBackIcon />

            <p className="ml-[12px]">
              {isMultiLevel || isSpecialPages ? "Go back" : "Dashboard"}
            </p>
          </div>
        )}
      </>

      <UserIcon />
    </div>
  );
}

function ArrowBackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 6.99997H3.82998L8.70998 2.11997C9.09998 1.72997 9.09998 1.08997 8.70998 0.699971C8.31998 0.309971 7.68998 0.309971 7.29998 0.699971L0.70998 7.28997C0.31998 7.67997 0.31998 8.30997 0.70998 8.69997L7.29998 15.29C7.68998 15.68 8.31998 15.68 8.70998 15.29C9.09998 14.9 9.09998 14.27 8.70998 13.88L3.82998 8.99997H15C15.55 8.99997 16 8.54997 16 7.99997C16 7.44997 15.55 6.99997 15 6.99997Z"
        fill="#373D3F"
      />
    </svg>
  );
}
