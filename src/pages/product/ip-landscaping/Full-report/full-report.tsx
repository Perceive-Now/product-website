import { HashLink as Link } from "react-router-hash-link";
import { useReactToPrint } from "react-to-print";
import classNames from "classnames";
import { useRef } from "react";

// import MoreNavOption from "../../../../components/reusable/nav-options";

import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setDashboardSearch } from "../../../../stores/dashboard";

import Button from "../../../../components/reusable/button";
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import PatentYear from "../../../../components/@dashboard/IP-landscaping/patent-year";
import PatentLegalStatus from "../../../../components/@dashboard/IP-landscaping/patent-status";
import GeographicalDistributionFiling from "../../../../components/@dashboard/IP-landscaping/geographical-filing";
import TrendExaminationYear from "../../../../components/@dashboard/IP-landscaping/trends-examination-years";
import ClassificationCPC from "../../../../components/@dashboard/IP-landscaping/cpc-classification";
import PatentAssignment from "../../../../components/@dashboard/IP-landscaping/patent-assignment";
import InventorTrendOverTime from "../../../../components/@dashboard/IP-landscaping/inventor-trend";
import PatentIPC from "../../../../components/@dashboard/IP-landscaping/patent-ipc-class";
import PatentWipo from "../../../../components/@dashboard/IP-landscaping/patent-wipo";
import PCTApplication from "../../../../components/@dashboard/IP-landscaping/pct-application";
import GeographicalDistributionAssignment from "../../../../components/@dashboard/IP-landscaping/geographic-assignment";
import GeographicalDistributionInventors from "../../../../components/@dashboard/IP-landscaping/geographical-inventors";
import GeographicalDistributionApplicant from "../../../../components/@dashboard/IP-landscaping/geographic-applicant";
import DistributionWorkload from "../../../../components/@dashboard/IP-landscaping/distribution-workload";
import { NumberApplicationsByApplicant } from "../../../../components/@dashboard/IP-landscaping/Applicants/number-applicants";
import PatentFamilySizeOverTime from "../../../../components/@dashboard/IP-landscaping/patent-family-size";

//

const topics = [
  { name: "Related technology", id: "related_technology" },
  { name: "1. Patents", id: "1" },
  { name: "2. Patent Families", id: "2" },
  { name: "3. Applicants", id: "3" },
  { name: "4. Geographical Distribution of Patent Families", id: "4" },
  { name: "5. Assignees", id: "5" },
  { name: "6. Inventors", id: "6" },
  { name: "7. CPC", id: "7" },
  { name: "8. IPC", id: "8" },
  { name: "9. WIPO", id: "9" },
  { name: "10. PCT", id: "10" },
];

const relatedKeywords = [
  "Sensor technology",
  "Data analytics",
  "Gyroscopes",
  "Energy harvesting",
  "Healthcare sensors",
];

/**
 *
 */
export const IPFullReport = () => {
  const dispatch = useAppDispatch();

  const printRef = useRef<HTMLDivElement>(null);
  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];

  //
  const keywords = searchedKeywords.map((kwd) => kwd.value);

  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  const handleKeyword = (keyword: IKeywordOption[]) => {
    dispatch(setDashboardSearch(keyword));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div className="">
      <div className="flex flex-col md:flex-row mb-2 gap-x-3 h-full w-full">
        <div className="mt-0.5 w-full">
          <div>
            {/* Search bar */}
            <Search
              required
              size="small"
              className="w-full bg-white"
              onSubmit={handleSearch}
              initialValue={searchedKeywords}
              searchButton={true}
              // isDisabled={true}
            />
          </div>
          {/* summary report */}
          <div className="flex flex-col md:flex-row gap-x-4 mt-6 w-full">
            {/* <div className="shrink-0">
              <MoreNavOption />
            </div> */}
            <div className="space-y-4 w-full grow-0">
              {/* report details */}
              <div className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2">
                <h2 className="text-lg font-bold text-primary-900">Related technologies</h2>
                <div className="flex flex-wrap item-center gap-2">
                  {relatedKeywords.map((keyword) => (
                    <button
                      onClick={() => handleKeyword([{ label: keyword, value: keyword }])}
                      key={keyword}
                      className="rounde bg-appGray-100 py-1 px-2 text-primary-900 font-semibold text-sm"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
              <div ref={printRef} className="space-y-5 w-full">
                {/*Patents  */}
                <div
                  id="1"
                  className="border-gray-200 shadow-custom border px-2 pt-2 pb-4 w-full space-y-2"
                >
                  <div className="page-break">
                    <PatentYear keywords={keywords} />
                  </div>
                  <hr />
                  <div className="page-break">
                    <PatentLegalStatus keywords={keywords} />
                  </div>
                </div>
                {/* Patent families */}
                <div
                  id="2"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <PatentFamilySizeOverTime keywords={keywords} />
                  </div>
                  <hr />
                  <div className="page-break">
                    <GeographicalDistributionFiling keywords={keywords} />
                  </div>
                </div>
                {/* applicants */}
                <div
                  id="3"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <NumberApplicationsByApplicant keywords={keywords} />
                  </div>
                  <hr />
                  <div className="page-break">
                    <GeographicalDistributionApplicant keywords={keywords} />
                  </div>
                </div>
                {/* examiners */}
                <div
                  id="4"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <DistributionWorkload keywords={keywords} />
                  </div>
                  <div className="page-break">
                    <TrendExaminationYear keywords={keywords} />
                  </div>
                </div>
                {/* asignees */}
                <div
                  id="5"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <PatentAssignment keywords={keywords} />
                  </div>
                  <div className="page-break">
                    <GeographicalDistributionAssignment keywords={keywords} />
                  </div>
                </div>
                {/* Inventors */}
                <div
                  id="6"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <GeographicalDistributionInventors keywords={keywords} />
                  </div>
                  <div className="page-break">
                    <InventorTrendOverTime keywords={keywords} />
                  </div>
                </div>
                {/* CPC */}
                <div
                  id="7"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <ClassificationCPC keywords={keywords} />
                  </div>
                </div>
                {/* IPC */}
                <div
                  id="8"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <PatentIPC keywords={keywords} />
                  </div>
                </div>
                {/* WIPO */}
                <div
                  id="9"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <PatentWipo keywords={keywords} />
                  </div>
                </div>
                {/* PCT */}
                <div
                  id="10"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <PCTApplication keywords={keywords} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[200px] shrink-0 sticky top-[100px]">
          <div className="flex flex-col gap-y-1">
            {/* <ReactToPrint
              bodyClass="print-agreement"
              content={() => printRef.current}
              trigger={() => ( */}
            <Button
              htmlType={"button"}
              type={"primary"}
              rounded={"medium"}
              size={"small"}
              handleClick={() => handlePrint()}
              classname={"text-sm font-semibold border-2 border-primary-900"}
            >
              Print report
            </Button>
            {/* )}
            /> */}
            <Button
              htmlType={"button"}
              type={"secondary"}
              rounded={"medium"}
              size={"small"}
              classname={"text-sm font-semibold"}
            >
              Save
            </Button>
            {/* <Button
              htmlType={"button"}
              type={"secondary"}
              rounded={"medium"}
              size={"small"}
              disabled
              classname={"text-sm font-semibold"}
              handleClick={() => navigate("/ip-landscaping")}
            >
              Change report details
            </Button> */}
          </div>
          <div className="rounded-lg shadow-custom flex flex-col mt-4 p-2 gap-1">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                smooth
                // onClick={() => handleButtonClick(topic.id)}
                to={`#${topic.id}`}
                className={classNames(
                  topic.id === "related_technology"
                    ? "border-l-4 border-primary-600 pl-0.5"
                    : "pl-1",
                  "text-start text-primary-900 text-sm truncate font-medium",
                )}
              >
                {topic.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
