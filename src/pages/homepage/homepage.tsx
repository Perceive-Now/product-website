import { Link, useNavigate } from "react-router-dom";

//
import UserIcon from "../../components/app/userIcon";

//
import PerceiveLogo from "../../assets/images/logo.svg";
import Search, { IKeywordOption } from "../../components/reusable/search";
import { handleSetGlobalSearchSlice } from "../../stores/global-search";
import { useAppDispatch } from "../../hooks/redux";

/**
 *
 */
export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(handleSetGlobalSearchSlice(value));
    
    navigate("/dashboard", {
      state: { search: value },
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex w-full justify-between pr-4 py-3">
        <div className="w-[256px] flex justify-center">
          <img src={PerceiveLogo} alt="PerceiveNow logo" />
        </div>

        <UserIcon />
      </div>

      <div className="grow flex justify-center items-center px-4 py-7">
        <div className="my-auto justify-center text-center">
          <h6 className="text-primary-900">Track and Follow Topics</h6>

          <div className="min-w-[612px]">
            <div className="mt-3">
              <Search
                required
                size="large"
                className="w-full"
                onSubmit={handleSearch}
              />
            </div>

            <div className="text-right text-sm text-gray-600 mt-2">
              <Link to="#" className="mr-1">
                History
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center px-4 py-7">
        <h6>10 new articles were published by your top competitor</h6>
        <p className="text-gray-600 mt-1">
          20% decrease in overall funding grants
        </p>
      </div>
    </div>
  );
}
