import React from "react";
import { SearchIcon } from "../../icons";

const TableSearch = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center pl-2.5 pointer-events-none">
        <SearchIcon className="text-appGray-600" />
      </div>
      <input
        type="search"
        className="block w-full pl-6 py-1 text-sm text-gray-900 border border-primary-900 rounded-lg bg-white focus:outline-none focus:ring-0 focus:border-primary-900"
        placeholder="You can search your report here"
        required
      />
    </div>
  );
};

export default TableSearch;
