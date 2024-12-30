import React from "react";
import { SearchIcon } from "../../icons";

const TableSearch = ({ searchQuery, setSearchQuery }:any) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center pl-2.5 pointer-events-none">
        <SearchIcon className="text-appGray-600" />
      </div>
      <input
        type="search"
        value={searchQuery}  // Bind value to searchQuery state
        onChange={(e) => setSearchQuery(e.target.value)}  // Update searchQuery state
        className="block w-full pl-6 py-[10px] text-sm text-gray-900 border-[2px] border-appGray-300 bg-transparent placeholder-black rounded-lg bg-white focus:outline-none focus:ring-0 focus:border-primary-900"
        placeholder="Search"
        required
      />
    </div>
  );
};

export default TableSearch;
