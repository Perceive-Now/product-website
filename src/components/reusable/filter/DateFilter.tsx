import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronRight } from "../../icons";
import RadioButtons from "../radio-buttons";

type classificationMode = "recent" | "specific" | "none";

const DateFilter = () => {
  const [classification, setClassification] = useState<classificationMode>("none");
  const changeClassificationMode = (mode: string) => {
    setClassification(mode as classificationMode);
  };

  return (
    <div className="w-full">
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <Menu.Button
            type="button"
            className="hover:hover:bg-primary-50 w-full text-start p-1 flex items-center justify-between"
          >
            <span>Date</span>
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
          <Menu.Items className="absolute -top-1 left-[100%] ml-1 origin-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none date-filter">
            <form className="px-2 py-2 w-full">
              <RadioButtons
                activeMode={classification}
                handleModeChange={changeClassificationMode}
                options={[
                  { label: "Most Recent (Past 2 years)", value: "recent" },
                  { label: "Specific Date Range", value: "specific" },
                ]}
              />

              <div className="flex justify-end gap-x-2">
                <button
                  type="reset"
                  className="px-2 py-0.5 border-2 rounded-lg border-primary-900 text-primary-900 text-xs font-semibold"
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="px-2 py-0.5 rounded-lg bg-primary-900 text-xs text-white font-semibold"
                >
                  Done
                </button>
              </div>
            </form>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DateFilter;
