import { Menu, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useState } from "react";
import { ChevronRight, CrossIcon } from "../../icons";
import RadioButtons from "../radio-buttons";
import DateRangePick from "../date-range";
import { useAppDispatch } from "../../../hooks/redux";
// import { setDashboardSearch } from "../../../stores/dashboard";
import { setFilter } from "../../../stores/date";
import classNames from "classnames";
// import { IKeywordOption } from "../search";

interface Props {
  filter: string;
}

type classificationMode = "recent" | "specific" | "none";

const DateFilter: FunctionComponent<Props> = ({ filter }) => {
  const dispatch = useAppDispatch();

  const [isToggle, setIsToggle] = useState(false);
  const [classification, setClassification] = useState<classificationMode>("none");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [values, setValues] = useState<any>([]);

  //
  const changeClassificationMode = (mode: string) => {
    setClassification(mode as classificationMode);
  };

  function handleClear() {
    setClassification("none");
    dispatch(setFilter([]));
  }

  const handleFilter = () => {
    setIsToggle(false);
    dispatch(setFilter(values));
  };

  return (
    <Menu as="div" className=" inline-block text-left w-full">
      {({ open }) => (
        <>
          <Menu.Button
            type="button"
            onClick={() => setIsToggle(true)}
            className={classNames(
              "hover:bg-primary-50 w-full text-start p-1 flex items-center justify-between",
              open && "bg-primary-50 ",
            )}
          >
            <span>{filter}</span>
            <ChevronRight />
          </Menu.Button>
          {/* {
            open &&
            <div className="fixed inset-0 w-full h-full bg-black opacity-50 z-50" />
          } */}
          {isToggle && (
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute top-0 left-[100%] origin-right divide-y rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none date-filter">
                <form className="px-2 py-2 w-full">
                  <div className="flex items-start justify-between pt-1">
                    <RadioButtons
                      activeMode={classification}
                      handleModeChange={changeClassificationMode}
                      options={[
                        { label: "Most Recent (Past 2 years)", value: "recent" },
                        { label: "Specific Date Range", value: "specific" },
                      ]}
                    />
                    <button type="button" onClick={() => setIsToggle(false)} className="-mt-1">
                      <CrossIcon />
                    </button>
                  </div>
                  <DateRangePick classification={classification} getValues={setValues} />
                  <div className="flex justify-end gap-x-2 mb-8 mt-2">
                    <button
                      type="button"
                      onClick={handleClear}
                      disabled={classification === "none"}
                      className="disabled:cursor-not-allowed disabled:opacity-10 px-2 py-0.5 border-2 rounded-lg border-primary-900 text-primary-900 text-xs font-semibold"
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      disabled={classification === "none" || values.length === 0}
                      onClick={handleFilter}
                      className="disabled:cursor-not-allowed disabled:opacity-10 px-2 py-0.5 rounded-lg bg-primary-900 text-xs text-white font-semibold"
                    >
                      Done
                    </button>
                  </div>
                </form>
              </Menu.Items>
            </Transition>
          )}
        </>
      )}
    </Menu>
  );
};

export default DateFilter;
