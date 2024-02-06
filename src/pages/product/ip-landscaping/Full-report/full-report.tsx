import { useLocation, useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { useReactToPrint } from "react-to-print";

import classNames from "classnames";
//
import { ChevronRight, SearchIcon } from "../../../../components/icons";
//
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import Button from "../../../../components/reusable/button";
//
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
//
import { setFilter } from "../../../../stores/country";
import { setDashboardSearch } from "../../../../stores/dashboard";
//

//
import PatentYear from "../../../../components/@dashboard/IP-landscaping/patent-year";
import PatentLegalStatus from "../../../../components/@dashboard/IP-landscaping/patent-status";
import InventorAnalysis from "../../../../components/@dashboard/IP-landscaping/inventor-analysis";
import GeographicalDistributionFiling from "../../../../components/@dashboard/IP-landscaping/geographical-filing";
import WipoAnalysis from "../../../../components/@dashboard/IP-landscaping/wipo-analysis";
import { useRef, useState } from "react";
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
import SemanticSearch from "../../../../components/reusable/semantic-search";
import AdvancedSearchIcon from "../../../../components/icons/miscs/AdvancedSearch";
import RadioButtons from "../../../../components/reusable/radio-buttons";
import DistributionWorkload from "../../../../components/@dashboard/IP-landscaping/distribution-workload";

//

type ISearchType = "or" | "and" | "custom";

/**
 *
 */
export const IPFullReport = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSemantic, setISearchSemantic] = useState(false);
  const [searchType, SetSearchType] = useState<ISearchType>("or");

  const printRef = useRef<HTMLDivElement>(null);
  //
  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const filteredKeywords = useAppSelector((state) => state.date?.filter) ?? [];
  const selectedValue = useAppSelector((state) => state.ipData.use_case.label) ?? [];

  //
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const filterKeywords = filteredKeywords.map((flt) => flt).join(" - ");

  //
  const joinedkeywords = keywords.join(", ");

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const filterClear = () => {
    dispatch(setFilter([]));
  };

  //
  const handleKeyword = (keyword: IKeywordOption[]) => {
    dispatch(setDashboardSearch(keyword));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleSearchType = (value: string) => {
    SetSearchType(value as ISearchType);
  };

  return (
    <>
      <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md ">
        <div className="flex items-start justify-center gap-0.5 py-1">
          <p className="text-lg text-primary-900 font-semibold">
            IP Analysis
            {/* <span className="font-bold text-secondary-800 text-sm">
              (407, 046 Patents & 431,402 Companies)
            </span> */}
          </p>
        </div>
      </div>
      {/* <div className="grid grid-cols-8 mb-2 gap-x-3 mt-2"> */}
      <div className="flex flex-col md:flex-row mb-2 gap-x-3 mt-2 h-full w-full">
        <div className="mt-0.5 w-full">
          {isSemantic ? (
            <>
              <SemanticSearch initialValue={searchedKeywords} />
            </>
          ) : (
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
          )}
          <div className="flex justify-end mt-2">
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
          </div>
          {isSemantic && (
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
                // classNames="text-sm"
              />
            </div>
          )}
          {/* summary report */}
          <div className="flex flex-col md:flex-row gap-x-4 mt-6 w-full">
            <div className="flex-shrink-0 w-auto">
              <div className="flex flex-col border rounded-t-lg shadow">
                <div className="bg-gray-200 text-sm font-semibold text-secondary-800 py-1 px-2 rounded-t-lg">
                  Back
                </div>
                <div>
                  {List.map((name) => (
                    <button
                      key={name.title}
                      type="button"
                      className={classNames(
                        "hover:bg-primary-50 text-sm font-semibold  w-full text-start py-1 px-2 flex items-center justify-between border-b",
                        name.key === location.pathname
                          ? "bg-primary-900 text-white"
                          : "text-secondary-800",
                      )}
                    >
                      <span>{name.title}</span>
                      <ChevronRight />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4 lg:w-[920px] xl:w-full ">
              {/* report details */}
              <div className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2">
                <h2 className="text-lg font-bold text-primary-900">Report On {joinedkeywords}</h2>
                <div>
                  <span className="text-gray-500">Use Case :&nbsp;</span>
                  <span>{selectedValue}</span>
                </div>
                {/* <div className="flex flex-wrap item-center gap-2">
                  {relatedKeywords.map((keyword) => (
                    <button
                      onClick={() => handleKeyword([{ label: keyword, value: keyword }])}
                      key={keyword}
                      className="rounded-full bg-appGray-100 py-1 px-2 text-primary-900 font-semibold text-sm"
                    >
                      {keyword}
                    </button>
                  ))}
                </div> */}
              </div>
              <div ref={printRef} className="space-y-5 w-full">
                {/*Patents by year  */}
                <div id="patent_families" className="page-break">
                  <PatentYear keywords={keywords} />
                </div>
                {/* Top 10 Patents by patent references */}
                {/* <div id="patent_references" className="page-break">
                  <PatentReference keywords={keywords} />
                </div> */}
                {/* legal status */}
                <div id="patent_legal_status" className="page-break">
                  <PatentLegalStatus keywords={keywords} />
                </div>
                {/* inventor */}
                <div id="inventors_asignees" className="page-break">
                  <InventorAnalysis keywords={keywords} />
                </div>
                {/* geographical distribution */}
                <div id="geographical_distribution" className="page-break">
                  <GeographicalDistributionFiling keywords={keywords} />
                </div>
                <div id="wipo_field_analysis" className="page-break">
                  <WipoAnalysis keywords={keywords} />
                </div>
                {/*  */}
                <div id="patent_classification" className="page-break">
                  <GeographicalDistributionApplicant keywords={keywords} />
                </div>
                {/*  */}
                <div>
                  <DistributionWorkload keywords={keywords} />
                </div>
                <TrendExaminationYear keywords={keywords} />
                <PatentAssignment keywords={keywords} />
                {/* <EmergingTechnologyTrend keywords={keywords}/> */}
                <GeographicalDistributionAssignment keywords={keywords} />
                <GeographicalDistributionInventors keywords={keywords} />
                <InventorTrendOverTime keywords={keywords} />
                <ClassificationCPC keywords={keywords} />
                <PatentIPC keywords={keywords} />
                <PatentWipo keywords={keywords} />
                <PCTApplication keywords={keywords} />
                {/* <div id="patent_classification" className="page-break">
                  <PatentClassificationAnalysis keywords={keywords} />
                </div> */}
                {/*  */}
                {/* <div id="technology_lifecycle" className="page-break">
                  <TechnologyLifeCycleAnalysis keywords={keywords} />
                </div> */}
                {/*  */}
                {/* <div id="emerging_technology" className="page-break">
                  <EmergingTechnologyTrend keywords={keywords} />
                </div> */}
                {/*  */}
                {/* <div id="patent_competitior_depth" className="page-break">
                  <PatentPortfolioCompetitor keywords={keywords} />
                </div> */}
                {/*  */}
                {/* <div id="patent_portfolio_depth" className="page-break">
                  <PatentPortfolioDepth keywords={keywords} />
                </div> */}
                {/*  */}
                {/* <div id="competitior_patenting_activity" className="page-break">
                  <PatentCompetitorActivity keywords={keywords} />
                </div> */}
                {/*  */}
                {/* <div id="competitior_patenting_activity_class" className="page-break">
                  <PatentCompetitorClass keywords={keywords} />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[200px] flex-shrink-0 sticky top-[100px]">
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
            <Button
              htmlType={"button"}
              type={"secondary"}
              rounded={"medium"}
              size={"small"}
              disabled
              classname={"text-sm font-semibold"}
              handleClick={() => navigate("/ip-landscaping")}
            >
              Change report details
            </Button>
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
    </>
  );
};

const topics = [
  // { name: "Related technology", id: "related_technology" },
  { name: "1. Total Patents Filed Over Time", id: "patent_families" },
  { name: "2. Distribution of Patent Types", id: "patent_references" },
  { name: "3. Size of Patent Families Over Time", id: "patent_legal_status" },
  { name: "4. Geographical Distribution of Patent Families", id: "inventors_asignees" },
  { name: "5. Number of Applications by Applicant Type", id: "geographical_distribution" },
  { name: "6. Geographic Distribution of Applicants", id: "patent_classification" },
  { name: "7. Distribution of Examiner Workload", id: "wipo_field_analysis" },
  { name: "8. Trends in Examination Times Over Years", id: "technology_lifecycle" },
  { name: "9. Top Organizations by Number of Patent Assignments", id: "emerging_technology" },
  { name: "10. Geographical Distribution of Assignments", id: "patent_portfolio_depth" },
  { name: "11. Geographical Distribution of Inventors", id: "patent_competitior_depth" },
  { name: "12. Trends in Inventor Collaborations Over Time", id: "competitior_patenting_activity" },
  {
    name: "13. Distribution of Patents by CPC Classifications",
    id: "competitior_patenting_activity_class",
  },
  { name: "14. Top IPC Classes in Patent Applications", id: "" },
  { name: "15. Distribution of Patents Across WIPO Sectors", id: "" },
  { name: "16. Trends in PCT Applications Over Time", id: "" },
];

const List = [
  {
    title: "IP Analysis",
    key: "/ip-analysis/full-report",
  },
  {
    title: "Market Research & IP",
    key: "market-intelligence",
  },
  {
    title: "Financial Investments",
    key: "financial-investments",
  },
];
