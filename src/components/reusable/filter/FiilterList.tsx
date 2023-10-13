import { Menu, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useState } from "react";
import { ChevronRight } from "../../icons";
import DateFilter from "./DateFilter";

interface Props {
  filters: IFIlters[];
  filterName: string;
}
type IFIlters = string;
const FilterList: FunctionComponent<Props> = ({ filters, filterName }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="w-full">
      {/* {isOverlayVisible && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"
          onClick={() => setOverlayVisible(false)}
        ></div>
      )} */}
      <Menu as="div" className=" inline-block text-left w-full relative z-20">
        <div>
          <Menu.Button
            type="button"
            className="hover:hover:bg-primary-50 w-full text-start p-1 flex items-center justify-between"
            onClick={() => setOverlayVisible(true)}
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
                <div
                  onClick={(event) => {
                    event.preventDefault();
                    setOverlayVisible(true);
                  }}
                  className="hover:hover:bg-primary-50 w-full text-start p-1 "
                >
                  {filterName === "Date" ? (
                    <DateFilter filter={filter} />
                  ) : (
                    <div className="flex items-center gap-x-2 px-1">
                      <input
                        id={filter}
                        type="checkbox"
                        checked={isChecked}
                        onChange={(event) => setIsChecked(event.target.checked)}
                        className="w-2 h-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                      />
                      <label htmlFor={filter}>{filter}</label>
                      {/* <ChevronRight /> */}
                    </div>
                  )}
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default FilterList;
