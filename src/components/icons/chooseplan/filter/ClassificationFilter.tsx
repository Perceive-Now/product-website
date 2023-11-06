import { Menu, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent } from "react";
import { ChevronRight } from "../..";

interface Props {
  filters: IFIlters[];
  filterName: string;
}
type IFIlters = string;
const FilterList: FunctionComponent<Props> = ({ filters, filterName }) => {
  return (
    <Menu as="div" className=" inline-block text-left w-full relative z-20">
      <div>
        <Menu.Button
          type="button"
          className="hover:hover:bg-primary-50 w-full text-start flex items-center justify-between p-1"
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
        <Menu.Items className="absolute -top-1 left-[100%] origin-right divide-y divide-gray-100 rounded-md bg-white shadow-lg w-full">
          {filters.map((filter, idx) => (
            <Menu.Item key={idx}>
              <button
                type="button"
                // onClick={(event) => {
                //   event.preventDefault();
                // }}
                className="hover:bg-primary-50 w-full text-start p-1 "
              >
                {filter}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default FilterList;
