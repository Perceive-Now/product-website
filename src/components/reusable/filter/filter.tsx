import { Fragment, FunctionComponent } from "react";
import { ChevronDown } from "../../icons";
import { Menu, Transition } from "@headlessui/react";
import FilterList from "./FiilterList";

// const FilterData =[
//   {title:""}
// ]
const DateFiltersLists = [
  "Published Date",
  "Filing Date",
  "Earliest Priority Date",
  "Granted Date",
];
const countryLists = ["Nepal", "China", "India"];

const Filter: FunctionComponent = () => {
  return (
    <div className="w-full">
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <Menu.Button
            type="button"
            className="rounded-none rounded-l-lg w-full flex justify-between items-center bg-primary-900 py-[12px] px-[16px] text-white"
          >
            <span>Filter</span>
            <span>
              <ChevronDown />
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-0.5 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Date"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={countryLists} filterName={"Country"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Legal Status"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Type"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Art group"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Classification"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Jurisdiction"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Inventor"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Applicant"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Patent Owner"} />
              </Menu.Item>
              <Menu.Item>
                <FilterList filters={DateFiltersLists} filterName={"Agents/ Attorney"} />
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Filter;
