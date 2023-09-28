import { Menu, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent } from "react";
import { ChevronRight } from "../../icons";
import DateFilter from "./DateFilter";

interface Props {
  filters: IFIlters[];
  filterName: string;
}
type IFIlters = string;
const FilterList: FunctionComponent<Props> = ({ filters, filterName }) => {
  return (
    <div className="w-full">
      <Menu as="div" className=" inline-block text-left w-full">
        <div>
          <Menu.Button
            type="button"
            className="hover:hover:bg-primary-50 w-full text-start p-1 flex items-center justify-between"
          >
            <span>{filterName}</span>
            <ChevronRight />
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
          <Menu.Items className="absolute -top-0 left-[100%] origin-right divide-y divide-gray-100 rounded-md bg-white shadow-lg w-full">
            {filters.map((filter, idx) => (
              <Menu.Item key={idx}>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                  className="hover:hover:bg-primary-50 w-full text-start p-1 "
                >
                  {filterName === "Date" ? (
                    <DateFilter filter={filter} />
                  ) : (
                    <div className="flex items-center justify-between px-1">
                      <span>{filter}</span>
                      <ChevronRight />
                    </div>
                  )}
                </button>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default FilterList;
