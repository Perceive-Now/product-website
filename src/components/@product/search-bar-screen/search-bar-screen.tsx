// import Button from "../../reusable/button";
import Search, { IKeywordOption } from "../../reusable/search";

/**
 *
 */
export default function SearchBarScreen({
  searchKeywords,
  handleKeywordChange,
  handleSearch,
}: ISearchBarScreenProps) {
  // Commented because the design is not fixed
  // const isDisabled = searchKeywords?.length < 1;

  // return (
  //   <div className="flex flex-col justify-center items-center h-full">
  //     <div className="w-1/2 mb-4">
  //       <Search onSubmit={() => {}} onKeywordsChange={handleKeywordChange} />
  //     </div>

  //     <div>
  //       <Button disabled={isDisabled} handleClick={handleSearch}>
  //         Search
  //       </Button>
  //     </div>
  //   </div>
  // );

  return (
    <div>
      <div className="w-1/2">
        <Search onSubmit={() => null} />
      </div>
    </div>
  );
}

interface ISearchBarScreenProps {
  searchKeywords: IKeywordOption[];
  handleKeywordChange: (value: IKeywordOption[]) => void;
  handleSearch: () => void;
}
