import { Fragment, FunctionComponent } from "react";
import { ChevronDown, ChevronRight } from "../../icons";
import { Menu, Transition } from "@headlessui/react";
import DateFilter from "./DateFilter";

// const FilterData =[
//   {title:""}
// ]

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
                <DateFilter />
                {/* {({ active }) => (
                  
                )} */}
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={(event) => {
                    // Prevent the default behavior (closing the menu)
                    event.preventDefault();
                    // Add your custom click handling logic here
                    // For example, you can trigger actions or update state
                  }}
                  className="hover:hover:bg-primary-50 w-full text-start p-1 flex items-center justify-between"
                >
                  <span>Country</span>
                  <ChevronRight />
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={(event) => {
                    // Prevent the default behavior (closing the menu)
                    event.preventDefault();
                    // Add your custom click handling logic here
                    // For example, you can trigger actions or update state
                  }}
                  className="hover:hover:bg-primary-50 w-full text-start p-1 flex items-center justify-between"
                >
                  <span>Legal Status</span>
                  <ChevronRight />
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  onClick={(event) => {
                    // Prevent the default behavior (closing the menu)
                    event.preventDefault();
                    // Add your custom click handling logic here
                    // For example, you can trigger actions or update state
                  }}
                  className="hover:hover:bg-primary-50 w-full text-start p-1 flex items-center justify-between"
                >
                  <span>Type</span>
                  <ChevronRight />
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Filter;
