import { Disclosure, Transition } from "@headlessui/react";
import { useState } from "react";

//
import PillButton from "../../reusable/pill-button";
import ExpandBtn from "../../../components/reusable/expand-btn";
import DisclosureHead from "../../reusable/Disclosure/disclosure-head";
import PatentTable from "../../reusable/patent-table";
import { PatentType } from "../../reusable/patent-table/patent-table";

/**
 *
 */
export default function CompaniesDisclosure({
  id,
  title,
  description,
}: ICompaniesDisclosure) {
  const options = [
    { id: 1, label: "Patent Portfolio" },
    { id: 2, label: "Publication Portfolio" },
    { id: 3, label: "Funding" },
    { id: 4, label: "Expert Portfolio" },
  ];

  const [tableData, setTableData] = useState<PatentType[]>([]);

  const [activeLabel, setActiveLabel] = useState("Patent Portfolio");

  //
  const handleFetchCompaniesData = async () => {
    // fetch api by id to get the data
    setTableData([
      {
        inventor: "Contrary",
        industry: "Medical",
        title: "Personal protective equipment and method",
        abstract: "123",
        date: "YYYY-MM-DD",
      },
      {
        inventor: "Contrary",
        industry: "Medical",
        title: "Personal protective equipment and method",
        abstract: "123",
        date: "YYYY-MM-DD",
      },
      {
        inventor: "Contrary",
        industry: "Medical",
        title: "Personal protective equipment and method",
        abstract: "123",
        date: "YYYY-MM-DD",
      },
      {
        inventor: "Contrary",
        industry: "Medical",
        title: "Personal protective equipment and method",
        abstract: "123",
        date: "YYYY-MM-DD",
      },
    ]);
  };

  return (
    <div className="shadow pt-2 pb-3 px-3 w-full rounded-2xl mb-3">
      <Disclosure>
        {({ open, close }) => (
          <div>
            <Disclosure.Button onClick={handleFetchCompaniesData}>
              <DisclosureHead
                open={open}
                title={title}
                description={description}
              />
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
              <Disclosure.Panel className="text-appGray-900 px-3">
                <div className="px-3 py-4">
                  <div className="mb-2 font-bold flex">
                    {options.map((option) => (
                      <PillButton
                        isActive={option.label === activeLabel}
                        key={id}
                        label={option.label}
                        handleOnClick={() => setActiveLabel(option.label)}
                        className="mr-3"
                      />
                    ))}
                  </div>

                  <div className="mb-2">
                    <PatentTable data={tableData} />
                  </div>
                </div>

                <div>
                  <ExpandBtn
                    isExpanded={true}
                    handleExpandToggle={() => close()}
                  />
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
}

interface ICompaniesDisclosure {
  title: string;
  description: string;
  id: string;
}
