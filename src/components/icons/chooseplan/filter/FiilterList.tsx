import { Menu, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useState } from "react";
import { ChevronRight } from "../..";
import DateFilter from "./DateFilter";
import ClassificationFilter from "./ClassificationFilter";
import classNames from "classnames";

interface Props {
  filters: IFIlters[];
  filterName: string;
}
type IFIlters = string;
const FilterList: FunctionComponent<Props> = ({ filters, filterName }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  return (
    <div className="w-full">
      {/* {isOverlayVisible && (
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-50 z-20"
          onClick={() => setOverlayVisible(false)}
        ></div>
      )} */}
      <Menu as="div" className=" inline-block text-left w-full relative">
        {({ open }) => (
          <>
            <Menu.Button
              type="button"
              className={classNames(
                "hover:bg-primary-50 w-full text-start p-1 flex items-center justify-between",
                open && "bg-primary-50 ",
              )}
              onClick={() => setOverlayVisible(true)}
            >
              <span>{filterName}</span>
              <ChevronRight />
            </Menu.Button>
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
                {filterName !== "Date" && filterName !== "Classification" ? (
                  <>
                    {filters.map((filter, idx) => (
                      <div key={idx}>
                        <label
                          htmlFor={filter}
                          className="flex items-center gap-x-2 hover:bg-primary-50 w-full text-start p-1"
                        >
                          <input
                            id={filter}
                            type="checkbox"
                            checked={selectedOptions.includes(filter)}
                            onChange={() => toggleOption(filter)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-2 h-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                          />
                          <span className="">{filter}</span>
                        </label>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {filters.map((filter, idx) => (
                      <Menu.Item key={idx}>
                        <div
                          onClick={(event) => {
                            event.preventDefault();
                            setOverlayVisible(true);
                          }}
                          className={classNames("hover:bg-primary-50 w-full text-start")}
                        >
                          {filterName === "Classification" && (
                            <>
                              <ClassificationFilter filters={WIPO} filterName={filter} />
                            </>
                          )}
                          {filterName === "Date" && <DateFilter filter={filter} />}
                        </div>
                      </Menu.Item>
                    ))}
                  </>
                )}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default FilterList;

const WIPO = ["WIPO Kind", "WIPO field", "WIPO field ID", "WIPO field title", "WIPO sequence"];
