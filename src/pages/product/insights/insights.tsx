import { useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";

//
import SearchBarScreen from "../../../components/@product/search-bar-screen";

//
import Search, { IKeywordOption } from "../../../components/reusable/search";
import { getMAInsights } from "../../../utils/api/ma-insights";
import { ChevronDown } from "../../../components/icons";
import classNames from "classnames";

/**
 *
 *
 */
export default function InsightsPage() {
  const [searchkeywords, setSearchKeywords] = useState<IKeywordOption[]>([]);

  const { data, isLoading } = useQuery(
    ["m&a-insight", searchkeywords],
    async () => {
      return await getMAInsights();
    }
  );

  console.log(data, "data");

  const handleKeywordChange = (value: IKeywordOption[]) => {
    setSearchKeywords(value);
  };

  const handleSearch = () => {
    console.log(searchkeywords);
  };

  return (
    <div>
      {!searchkeywords && (
        <SearchBarScreen
          searchKeywords={searchkeywords}
          handleKeywordChange={handleKeywordChange}
          handleSearch={handleSearch}
        />
      )}

      {searchkeywords && (
        <div>
          <div className="w-1/2">
            <Search onSubmit={() => null} initialValue={searchkeywords} />
          </div>

          <div className="mt-5">
            <div className="mb-11">
              <div className="text-primary-900 font-medium text-xl mb-2">
                Top 5 patents for IP portfolio expansion
              </div>

              <div className="text-lg text-gray-900 mb-4">
                {data?.patentsTop5?.respText}
              </div>

              <div>
                {data?.patentsTop5?.rankedList.map((listItem) => (
                  <div
                    key={listItem.uuid}
                    className="shadow pt-2 pb-3 px-3 w-full rounded-2xl mb-3"
                  >
                    <Disclosure>
                      {({ open }) => (
                        <div>
                          <Disclosure.Button className="flex text-start">
                            <div className="mr-3">
                              <ChevronDown
                                className={classNames(
                                  "text-primary-900",
                                  open ? "rotate-180 transform" : ""
                                )}
                              />
                            </div>{" "}
                            <div>
                              <div className="text-primary-900 font-medium text-xl mb-1">
                                {listItem.name}
                              </div>
                              <div>{listItem.description}</div>
                            </div>
                          </Disclosure.Button>
                          <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Disclosure.Panel className="text-gray-500 px-3">
                              <div>hello</div>
                            </Disclosure.Panel>
                          </Transition>
                        </div>
                      )}
                    </Disclosure>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
