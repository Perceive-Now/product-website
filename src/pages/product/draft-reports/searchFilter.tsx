import React from "react";
import FilterIcon from "../generated-reports/filter-icon";
import MagnifierGlassIcon from "../generated-reports/magnifier-glass-icon";

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onFilterClick: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  onFilterClick,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex items-center mb-4">
      <button className="mr-2 flex items-center" onClick={onFilterClick}>
        <span className="mr-1 text-[#442873]">Filter</span>
        <FilterIcon />
      </button>
      <div className="relative w-[800px]">
        <input
          type="text"
          placeholder="You can search your report here"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-black rounded-xl pl-8 pr-4 py-2 w-full"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <MagnifierGlassIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
