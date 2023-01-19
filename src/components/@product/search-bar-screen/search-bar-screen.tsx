// import Button from "../../reusable/button";
import Search from "../../reusable/search";

/**
 *
 */
export default function SearchBarScreen() {
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
