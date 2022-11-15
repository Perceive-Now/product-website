import { SearchIcon } from "../../icons";

/*
 *
 **/
function RelatedKeyword({ keyword }: IRelatedKeyword) {
  return (
    <div
      className="bg-gray-200 px-2 py-[12px] mb-1 rounded-[48px] flex items-center text-primary-900 cursor-pointer capitalize"
      onClick={() => {
        // handleclick
      }}
    >
      <SearchIcon />
      <span className="block ml-[12px]">{keyword}</span>
    </div>
  );
}

export default RelatedKeyword;

interface IRelatedKeyword {
  keyword: string;
}
