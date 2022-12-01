import { SearchIcon } from "../../icons";

import { useAppDispatch } from "../../../hooks/redux";
import { setDashboardSearch } from "../../../stores/dashboard";

/*
 *
 **/
function RelatedKeyword({ keyword }: IRelatedKeyword) {
  const dispatch = useAppDispatch();

  const setActiveKeyword = () => {
    dispatch(setDashboardSearch([{ label: keyword, value: keyword }]));
  };

  return (
    <div
      className="bg-gray-200 px-2 py-[12px] mb-1 rounded-[48px] flex items-center text-primary-900 cursor-pointer capitalize"
      onClick={setActiveKeyword}
    >
      <div className="flex-shrink-0">
        <SearchIcon />
      </div>
      <span className="block ml-[12px]">{keyword}</span>
    </div>
  );
}

export default RelatedKeyword;

interface IRelatedKeyword {
  keyword: string;
}
