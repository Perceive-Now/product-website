import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import FilterIcon from "../generated-reports/filter-icon";
import MagnifierGlassIcon from "../generated-reports/magnifier-glass-icon";
import ArrowIcon from "../generated-reports/arrow-icon";
import { DateFilter, UseCaseFilter, TagFilter } from "./Filters";
import { setSearchTerm, setDateRange } from "src/stores/draft";
import { RootState } from "src/store";

const SearchFilter: React.FC = () => {
  const [parentVisible, setParentVisible] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [useCaseVisible, setUseCaseVisible] = useState(false);
  const [tagVisible, setTagVisible] = useState(false);

  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.draft.filters.searchTerm);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const handleDateRangeChange = (range: { from: Date | null; to: Date | null }) => {
    dispatch(setDateRange(range));
  };

  const filterContent = (
    <div className="text-black space-y-1">
      <Tippy
        content={<DateFilter onDateRangeChange={handleDateRangeChange} />}
        interactive={true}
        visible={dateVisible}
        onClickOutside={() => setDateVisible(false)}
        onHide={() => setParentVisible(true)}
        placement="right-start"
        theme="light"
      >
        <div
          className="flex flex-row  justify-between w-full cursor-pointer"
          onClick={() => {
            setDateVisible(true);
            setParentVisible(true);
          }}
        >
          <p className="font-semibold ">Date</p>
          <ArrowIcon />
        </div>
      </Tippy>
      <Tippy
        content={<UseCaseFilter />}
        interactive={true}
        visible={useCaseVisible}
        onClickOutside={() => setUseCaseVisible(false)}
        onHide={() => setParentVisible(true)}
        placement="right-start"
      >
        <div
          className="flex flex-row gap-x-14 justify-between w-full cursor-pointer"
          onClick={() => {
            setUseCaseVisible(true);
            setParentVisible(true);
          }}
        >
          <p className="font-semibold">Use cases</p>
          <ArrowIcon />
        </div>
      </Tippy>
      <Tippy
        content={<TagFilter />}
        interactive={true}
        visible={tagVisible}
        onClickOutside={() => setTagVisible(false)}
        onHide={() => setParentVisible(true)}
        placement="right-start"
      >
        <div
          className="flex flex-row gap-x-14 justify-between w-full cursor-pointer"
          onClick={() => {
            setTagVisible(true);
            setParentVisible(true);
          }}
        >
          <p className="font-semibold">Tags</p>
          <ArrowIcon />
        </div>
      </Tippy>
    </div>
  );

  return (
    <div className="flex items-center mb-4">
      <Tippy
        content={filterContent}
        interactive={true}
        visible={parentVisible}
        onClickOutside={() => setParentVisible(false)}
        theme="light"
        appendTo={document.body}
        arrow={false}
        allowHTML={true}
        hideOnClick={false}
        placement="right-start"
      >
        <div
          className="mr-2 flex items-center cursor-pointer"
          onClick={() => setParentVisible(true)}
        >
          <span className="mr-1 text-[#442873]">Filter</span>
          <FilterIcon />
        </div>
      </Tippy>
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
