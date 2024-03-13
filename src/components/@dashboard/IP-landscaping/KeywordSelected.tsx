import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import EditIcon from "../../icons/miscs/Edit";
import { useEffect, useState } from "react";
import { IKeywordOption } from "../../reusable/search";
import { useDispatch } from "react-redux";
import { setDashboardSearch } from "../../../stores/dashboard";

const KeywordSelected = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [searchedKeywords, setSearchedKeywords] = useState<IKeywordOption[]>([]);

  const keywords = useAppSelector((state) => state.dashboard.search);
  const searchKeywords = location.state.search;

  useEffect(() => {
    if (keywords && keywords.length > 0) {
      setSearchedKeywords(keywords);
    } else if (searchKeywords > 0) {
      dispatch(setDashboardSearch(searchKeywords));
      setSearchedKeywords(searchKeywords);
    } else {
      setSearchedKeywords([]);
    }
  }, [location, keywords, dispatch, searchKeywords]);

  return (
    <div className="flex flex-col justify-center items-start p-1 bg-gray-100">
      <div className="flex items-center gap-1">
        <span className="text-gray-500 text-sm">Keyword selected</span>
        <button type="button" onClick={() => navigate("/")}>
          <EditIcon />
        </button>
      </div>
      <div className="flex items-center gap-1 pt-0.5">
        {searchedKeywords?.map((keyword, idx, arr) => (
          <span key={idx} className="text-secondary-800 text-sm">
            "{keyword.value}
            {idx !== arr.length - 1 && <span>,&nbsp;</span>}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KeywordSelected;
