// import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useReactToPrint } from "react-to-print";

import classNames from "classnames";
//
// import { ChevronRight, SearchIcon } from "../../../../components/icons";
//
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import Button from "../../../../components/reusable/button";
//
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
//
// import { setFilter } from "../../../../stores/country";
import { setDashboardSearch } from "../../../../stores/dashboard";
//

import { useRef } from "react";

//
import PatentYear from "../../../../components/@dashboard/IP-landscaping/patent-year";
import PatentLegalStatus from "../../../../components/@dashboard/IP-landscaping/patent-status";
import InventorAnalysis from "../../../../components/@dashboard/IP-landscaping/inventor-analysis";
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
// import SemanticSearch from "../../../../components/reusable/semantic-search";
// import AdvancedSearchIcon from "../../../../components/icons/miscs/AdvancedSearch";
// import RadioButtons from "../../../../components/reusable/radio-buttons";
import DistributionWorkload from "../../../../components/@dashboard/IP-landscaping/distribution-workload";
// import MoreNavOption from "../../../../components/reusable/nav-options";
import { NumberApplicationsByApplicant } from "../../../../components/@dashboard/IP-landscaping/Applicants/number-applicants";
import PatentsKeyTakeaways from "../keytakeaways/patents";
import SizeOfPatentFamilyKeyTakeaway from "../keytakeaways/patent-families";
import PatentApplicantKeyTakeaways from "../keytakeaways/patent-applicants";

//

// type ISearchType = "or" | "and" | "custom";

/**
 *
 */
export const IPFullReport = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();

  // const [isSemantic, setISearchSemantic] = useState(false);
  // const [searchType, SetSearchType] = useState<ISearchType>("or");

  const printRef = useRef<HTMLDivElement>(null);
  //
  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  // const filteredKeywords = useAppSelector((state) => state.date?.filter) ?? [];
  // const selectedValue = useAppSelector((state) => state.ipData.use_case.label) ?? [];

  //
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  // const filterKeywords = filteredKeywords.map((flt) => flt).join(" - ");

  //
  // const joinedkeywords = keywords.join(", ");

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  // const filterClear = () => {
  //   dispatch(setFilter([]));
  // };

  //
  // const handleKeyword = (keyword: IKeywordOption[]) => {
  //   dispatch(setDashboardSearch(keyword));
  // };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // const handleSearchType = (value: string) => {
  //   SetSearchType(value as ISearchType);
  // };

  return (
    <div className="">
      {/* <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md ">
        <div className="flex items-start justify-center gap-0.5 py-1">
          <p className="text-lg text-primary-900 font-semibold">IP Analysis</p>
        </div>
      </div> */}
      {/* <div className="grid grid-cols-8 mb-2 gap-x-3 mt-2"> */}
      <div className="flex flex-col md:flex-row mb-2 gap-x-3 h-full w-full">
        <div className="mt-0.5 w-full">
          {/* {isSemantic ? (
            <>
              <SemanticSearch initialValue={searchedKeywords} />
            </>
          ) : ( */}
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
            {/* {keywords.length > 0 ? (
                <div className="mt-2">
                  <span>Showing patents for: </span>
                  <span className="">"{joinedkeywords}"</span>&nbsp;
                  {filteredKeywords.length > 0 && (
                    <>
                      <span className="font-bold">in &nbsp;</span>
                      <div className="inline-flex items-center p-1 rounded-xl border border-gray-500 gap-1">
                        <span>{filterKeywords}</span>
                        <button type="button" onClick={filterClear}>
                          <CrossIcon />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="mt-[4px] text-appGray-900">
                  Search keywords e.g. “COVID-19” to see related patents.
                </p>
              )} */}
          </div>
          {/* )} */}
          {/* <div className="flex justify-end mt-2">
            <button
              type="button"
              className="flex items-center gap-x-1"
              onClick={() => setISearchSemantic(!isSemantic)}
            >
              {isSemantic ? (
                <>
                  <SearchIcon />
                  <span>Regular Search</span>
                </>
              ) : (
                <>
                  <AdvancedSearchIcon />
                  <span>Semantic Search</span>
                </>
              )}
            </button>
          </div> */}
          {/* {isSemantic && (
            <div className="flex items-center gap-x-1">
              <span className="text-primary-900">Search logic:</span>
              <RadioButtons
                options={[
                  { label: "OR", value: "or" },
                  { label: "AND", value: "and" },
                  { label: "Custom", value: "custom" },
                ]}
                activeMode={searchType}
                handleModeChange={handleSearchType}
              />
            </div>
          )} */}
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
                      // onClick={() => handleKeyword([{ label: keyword, value: keyword }])}
                      key={keyword}
                      className="rounde bg-appGray-100 py-1 px-2 text-primary-900 font-semibold text-sm"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
              <div ref={printRef} className="space-y-5 w-full">
                {/*Patents by year  */}
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

                <div
                  id="2"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <InventorAnalysis keywords={keywords} />
                  </div>
                  <div className="page-break">
                    <GeographicalDistributionFiling keywords={keywords} />
                  </div>
                </div>

                <div
                  id="3"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <NumberApplicationsByApplicant keywords={keywords} />
                  </div>
                  <div className="page-break">
                    <GeographicalDistributionApplicant keywords={keywords} />
                  </div>
                </div>

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

                <div
                  id="7"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <ClassificationCPC keywords={keywords} />
                  </div>
                </div>

                <div
                  id="8"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <PatentIPC keywords={keywords} />
                  </div>
                </div>

                <div
                  id="9"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <PatentWipo keywords={keywords} />
                  </div>
                </div>

                <div
                  id="10"
                  className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2"
                >
                  <div className="page-break">
                    <PCTApplication keywords={keywords} />
                  </div>
                </div>

                <PatentsKeyTakeaways />
                <SizeOfPatentFamilyKeyTakeaway />
                <PatentApplicantKeyTakeaways />
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

// const List = [
//   {
//     title: "IP Analysis",
//     key: "/ip-analysis/full-report",
//   },
//   {
//     title: "Market Research & IP",
//     key: "market-intelligence",
//   },
//   {
//     title: "Financial Investments",
//     key: "financial-investments",
//   },
// ];

const relatedKeywords = [
  "Sensor technology",
  "Data analytics",
  "Gyroscopes",
  "Energy harvesting",
  "Healthcare sensors",
];

// const WIPOSection = [
//   {
//     title: "Dominant WIPO Sector",
//     content:
//       "WIPO Sector A accounts for B% of all patents, underscoring its importance in global innovation efforts.",
//   },
//   {
//     title: "Annual Growth in WIPO Sector Patent Filings",
//     content:
//       "Patent filings in WIPO Sector A have seen an annual increase of B%, indicating a growing interest in this area.",
//   },
//   {
//     title: "Shift in WIPO Sector Focus Over Years",
//     content:
//       "Over the last Y years, the focus has shifted towards WIPO Sector A, with its patent filings increasing by B%, reflecting changing global innovation trends.",
//   },
//   {
//     title: "Comparison of WIPO Sector Filings",
//     content:
//       "WIPO Sector A saw a B% increase in patent filings compared to Sector C over the past D years, highlighting evolving technological landscapes.",
//   },
//   {
//     title: "Most Rapidly Growing WIPO Sector",
//     content:
//       "WIPO Sector A experienced the most rapid growth, with an increase of B% in patent filings over the last C years, marking it as an emerging area of innovation.",
//   },
// ];

// const IPCSection = [
//   {
//     title: "Leading IPC Class",
//     content:
//       "IPC Class A leads with B patent applications, marking it as the most focused area of innovation.",
//   },
//   {
//     title: "Growth Trend in IPC Class Applications",
//     content:
//       "Applications in IPC Class A have grown by B% in the last C years, indicating a rising trend in this technological field.",
//   },
//   {
//     title: "Comparison of IPC Class Dominance",
//     content:
//       "IPC Class A's share of patent applications has increased from B% to C% over the past D years, demonstrating shifting innovation priorities.",
//   },
//   {
//     title: "Sector Analysis for IPC Classes",
//     content:
//       "The electronics sector predominantly applies for patents in IPC Class A, accounting for B% of the sector's applications.",
//   },
//   {
//     title: "Year with Most Diverse IPC Class Filings",
//     content:
//       "Year A recorded the most diverse range of IPC Class filings, with significant applications in over B different classes, reflecting a broad innovation landscape.",
//   },
// ];

// const CPCSection = [
//   {
//     title: "Dominant CPC Classification",
//     content:
//       "CPC Classification A dominates with B patents, indicating a strong focus on specific technological areas.",
//   },
//   {
//     title: "Yearly Trends in CPC Classifications",
//     content:
//       "The proportion of patents in CPC Classification A has grown by B% annually, reflecting shifting innovation focuses.",
//   },
//   {
//     title: "Comparison of CPC Classifications Over Time",
//     content:
//       "Over the last decade, patents in CPC Classification A have increased by B%, showcasing evolving technological trends.",
//   },
//   {
//     title: "Sector-Specific Dominance in CPC Classifications",
//     content:
//       "In the healthcare sector, CPC Classification A dominates, with B% of the sector's patents, indicating targeted innovation efforts.",
//   },
//   {
//     title: "Rapid Growth CPC Classifications",
//     content:
//       "CPC Classification A saw the fastest growth in patents, with an increase of B% over the last C years, highlighting emerging areas of technological advancement.",
//   },
// ];
