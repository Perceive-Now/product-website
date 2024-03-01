import { useNavigate } from "react-router-dom";
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
import WipoAnalysis from "../../../../components/@dashboard/IP-landscaping/wipo-analysis";
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
import MoreNavOption from "../../../../components/reusable/nav-options";
import KeyDetail from "../../../../components/@dashboard/IP-landscaping/key-detail";

//

// type ISearchType = "or" | "and" | "custom";

/**
 *
 */
export const IPFullReport = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md ">
        <div className="flex items-start justify-center gap-0.5 py-1">
          <p className="text-lg text-primary-900 font-semibold">IP Analysis</p>
        </div>
      </div>
      {/* <div className="grid grid-cols-8 mb-2 gap-x-3 mt-2"> */}
      <div className="flex flex-col md:flex-row mb-2 gap-x-3 mt-2 h-full w-full">
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
            <div className="shrink-0">
              <MoreNavOption />
            </div>
            <div className="space-y-4 w-full grow-0">
              {/* report details */}
              <div className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2">
                {/* <h2 className="text-lg font-bold text-primary-900">Report On {joinedkeywords}</h2> */}
                <h2 className="text-lg font-bold text-primary-900">Related technologies</h2>
                {/* <div>
                  <span className="text-gray-500">Use Case :&nbsp;</span>
                  <span>{selectedValue}</span>
                </div> */}
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
                <div id="p1" className="page-break">
                  <PatentYear keywords={keywords} />
                </div>
                {/* Top 10 Patents by patent references */}
                {/* <div id="patent_references" className="page-break">
                  <PatentReference keywords={keywords} />
                </div> */}
                {/* legal status */}
                <div id="2" className="page-break">
                  <PatentLegalStatus keywords={keywords} />
                </div>
                {/* inventor */}
                <div id="3" className="page-break">
                  <InventorAnalysis keywords={keywords} />
                </div>
                {/* geographical distribution */}
                <div id="4" className="page-break">
                  <GeographicalDistributionFiling keywords={keywords} />
                </div>
                <div id="5" className="page-break">
                  <WipoAnalysis keywords={keywords} />
                </div>
                {/*  */}
                <div id="6" className="page-break">
                  <GeographicalDistributionApplicant keywords={keywords} />
                </div>
                {/*  */}
                <div id="7" className="page-break">
                  <DistributionWorkload keywords={keywords} />
                </div>
                <div id="8" className="page-break">
                  <TrendExaminationYear keywords={keywords} />
                </div>
                <div id="9" className="page-break">
                  <PatentAssignment keywords={keywords} />
                </div>
                <div id="10" className="page-break">
                  <GeographicalDistributionAssignment keywords={keywords} />
                </div>
                <div id="11" className="page-break">
                  <GeographicalDistributionInventors keywords={keywords} />
                </div>
                <div id="12" className="page-break">
                  <InventorTrendOverTime keywords={keywords} />
                </div>
                <div id="13" className="page-break">
                  <ClassificationCPC keywords={keywords} />
                </div>
                <div id="14" className="page-break">
                  <PatentIPC keywords={keywords} />
                </div>
                <div id="15" className="page-break">
                  <PatentWipo keywords={keywords} />
                </div>
                <div id="16" className="page-break">
                  <PCTApplication keywords={keywords} />
                </div>
                <KeyDetail section="Patents" subtitle="Key Takeaway">
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Annual Growth Rate in Patent Filings
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The annual growth rate of patent filings from year A to year B was C%,
                      indicating an D trend in innovation activities.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Market Share of Patent Filings by Sector
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      In year A, the B sector accounted for C% of total patent filings, highlighting
                      its dominant role in technological innovation.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Comparison of Patent Filings Across Decades
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The comparison of patent filings across decades shows a C% increase in the
                      2010s compared to the 2000s, evidencing a significant shift in innovation
                      intensity.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Sector Leading in Patent Filings for the Latest Year
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      In the most recent year (A), the B sector led in patent filings with C
                      patents, marking it as the forefront of innovation.
                    </span>
                  </div>
                </KeyDetail>
                {/*  */}
                <KeyDetail section=" Patent Families" subtitle="Size of Patent Families Over Time">
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Average Size of Patent Families Each Year
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The average size of patent families has increased from A in year B to C in
                      year D, indicating broader protection strategies and more extensive innovation
                      coverage.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Trend in Large Patent Families
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Year A saw a B% increase in the proportion of large patent families (more than
                      10 documents), highlighting a shift towards more comprehensive innovation
                      protection efforts.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Year with Largest Average Patent Family Size
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Year A recorded the largest average patent family size at B documents per
                      family, suggesting an emphasis on extensive protection and strategic
                      innovation filing.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Sector-Specific Trends in Patent Family Sizes
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      In sector A, the average patent family size increased by B% from year C to D,
                      indicating targeted efforts towards securing extensive global protection in
                      this innovation area..
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Growth Rate of Patent Family Size
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The growth rate in the size of patent families from year A to B was C%,
                      indicating an evolving approach to patent filings and protection strategies.
                    </span>
                  </div>
                  <div className="font-bold text-primary-900 text-sm">
                    Size of Patent Families Over Time
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Regional Market Share of Patent Families
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Region A accounts for B% of global patent families, underscoring its role as a
                      major hub for innovation and patent filing activities.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Comparison of Urban vs. Rural Patent Family Distributions
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Urban areas account for A% of patent families compared to B% in rural areas,
                      highlighting a concentration of innovation activities in urban centers.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      International Collaboration in Patent Families
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      X% of patent families have members in more than one country, indicating high
                      levels of international collaboration in innovation.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Impact of Regulatory Changes on Geographical Distribution
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Following regulatory change X, region C saw a Y% increase/decrease in patent
                      family concentration, reflecting the impact of policy on innovation
                      distribution.
                    </span>
                  </div>
                </KeyDetail>
                {/*  */}
                <KeyDetail
                  section="Section: Applicants"
                  subtitle="Number of Applications by Applicant Type"
                >
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Market Share of Applications by Applicant Type
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Corporations filed for A% of all patents, highlighting the commercial drive
                      behind innovation, whereas individual inventors accounted for B%, reflecting
                      the substantial contribution of independent inventors to technological
                      advancement.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Trend in Applicant Type Over Time
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Over the last A years, applications by corporations have increased by B%,
                      indicating a growing dominance of corporate-driven innovations in the patent
                      landscape.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Sector-Specific Applicant Type Dominance
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      In the renewable energy sector, universities accounted for A% of applications,
                      highlighting academia's significant role in driving innovation in sustainable
                      technologies.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Geographical Variations in Applicant Types
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Region A has a notably high proportion of corporate applicants at B%,
                      contrasting with Region C's more diverse applicant profile, demonstrating
                      regional differences in innovation drivers.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Yearly Changes in Applicant Type Distribution
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The distribution of patent applications by applicant type in year A saw
                      significant shifts, with corporate applicants increasing by B% and individual
                      filings decreasing by C%, reflecting changing dynamics in innovation sources.
                    </span>
                  </div>
                  <div className="font-bold text-primary-900 text-sm">
                    Geographic Distribution of Applicants
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Top Countries by Number of Patent Applicants
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The top countries for patent applicants are A, B, and C, demonstrating their
                      leading roles in global innovation and patent filing activities.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Rapid Growth in Applicant Numbers by Region
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Regions A and B have experienced the most rapid growth in patent applicant
                      numbers over the last year, with increases of C% and D%, highlighting emerging
                      innovation hubs.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      City with Highest Concentration of Applicants
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      City A is home to the highest concentration of patent applicants, accounting
                      for B% of the total, underlining its status as a central innovation locale.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Shift in Geographical Focus of Applicants
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Over the past decade, there has been a notable shift towards Region A for
                      patent applicants, with a growth rate of B%, indicating changing innovation
                      landscapes and the emergence of new technology hubs.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      International Diversity of Patent Applicants
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Patent applications exhibit a high degree of international diversity, with
                      applicants from over A different countries, emphasizing the global nature of
                      technological innovation.
                    </span>
                  </div>
                </KeyDetail>
                {/*  */}
                <KeyDetail section=" Examiners" subtitle="Distribution of Examiner Workload">
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Examiner Workload Distribution
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Examiner A handled B patents last year, making up C% of the total
                      examinations, indicating a high concentration of workload among a few
                      examiners.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Examiner with Fastest Growing Workload
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Examiner A's workload increased by B% from year C to D, the fastest growth
                      among all examiners, highlighting the dynamic shifts in examination
                      responsibilities.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Workload Disparity Among Examiners
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The top A% of examiners, including Examiner B, handle C% of the total patent
                      examination workload, demonstrating significant workload disparities.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Efficiency Indicator by Examiner
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Examiner A processes patents in an average of B days, marking them as the most
                      efficient, with a significant impact on reducing examination backlog.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Annual Workload Trends Among Examiners
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      In year A, the examination workload trends shifted significantly, with
                      Examiner B handling the most patents, indicating changing priorities or
                      capacity enhancements.
                    </span>
                  </div>
                  <div className="font-bold text-primary-900 text-sm">
                    Trends in Examination Times Over Years
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Reduction in Average Examination Time
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The average time to examine a patent has decreased by A days over the last B
                      years, improving the efficiency of the patent examination process.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Year with Shortest Examination Time
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Year A recorded the shortest average examination time at B days, indicating an
                      exceptionally efficient operational period.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Trend of Decreasing Examination Times
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Examination times have shown a trend of decreasing by an average of A days per
                      year over the last decade, demonstrating ongoing improvements in examination
                      processes.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Impact of Technological Advances on Examination Times
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Following the introduction of new examination technologies in year A, the
                      average examination time decreased by B%, showcasing the impact of technology
                      on process efficiency.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Comparison of Examination Times Across Decades
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The 2010s saw a reduction in average examination times by A% compared to the
                      2000s, highlighting significant process improvements and efficiency gains.
                    </span>
                  </div>
                </KeyDetail>
                {/*  */}
                <KeyDetail
                  section="Assignees"
                  subtitle="Top Organizations by Number of Patent Assignments"
                >
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Leading Organization in Patent Assignments
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Organization A leads with B patent assignments, indicating its dominant
                      position in innovation and patent acquisition.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Market Share of Patent Assignments Among Top Organizations
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The top 5 organizations, including A and B, hold a combined market share of C%
                      of all patent assignments, highlighting the concentration of patent ownership
                      in major entities.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Organization with Largest Year-on-Year Increase in Assignments
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Organization A experienced the largest year-on-year increase in patent
                      assignments, with a growth rate of B%, highlighting its rapid expansion in
                      innovation activities.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Organization with Largest Year-on-Year Increase in Assignments
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Organization A experienced the largest year-on-year increase in patent
                      assignments, with a growth rate of B%, highlighting its rapid expansion in
                      innovation activities.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Sector Dominance by Organization in Patent Assignments
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      In the renewable energy sector, Organization A accounts for B% of patent
                      assignments, underlining its leadership and focus on innovation in sustainable
                      technologies.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Comparison of Assignment Concentration Among Organizations
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The concentration of patent assignments among the top organizations has
                      increased by A% over the last B years, indicating a trend towards more
                      centralized ownership of innovations.
                    </span>
                  </div>
                  <div className="font-bold text-primary-900 text-sm">
                    Geographical Distribution of Assignments
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Country Leading in Patent Assignments
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Country A holds the highest number of patent assignments, accounting for B% of
                      the global total, marking it as a key player in technology transfer and
                      innovation commercialization.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Regional Growth in Patent Assignments
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Region A saw a B% increase in patent assignments over the last C years,
                      indicating a surge in its technological development and innovation ecosystem.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      City-Level Concentration of Patent Assignments
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      City A is the leading city for patent assignments, with B assignments,
                      highlighting its strategic importance in innovation and technology
                      commercialization.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Shifts in Geographical Patterns of Assignments
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Over the recent decade, the geographical pattern of patent assignments has
                      shifted towards Country A, with an increase of B%, reflecting changes in
                      global innovation dynamics.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      International Collaboration in Patent Assignments
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      X% of all patent assignments involve international collaboration,
                      demonstrating the global interconnectedness of technology development and
                      transfer.
                    </span>
                  </div>
                </KeyDetail>
                {/*  */}
                <KeyDetail section=" Inventors" subtitle="Geographical Distribution of Inventors">
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Top Country for Inventor Activity
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Country A leads in inventor activity, contributing to B% of all patent
                      filings, showcasing its pivotal role in global innovation.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Rapid Increase in Inventor Numbers by Region
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Region A's inventor count has surged by B% in the last C years, emerging as a
                      significant innovation hub.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      City with Highest Number of Inventors
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      City A has the highest concentration of inventors, with B inventors,
                      underlining its status as a central innovation locality.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Shift in Inventor Geographical Distribution
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Over the past decade, there has been a notable shift towards Region A for
                      inventor activity, with a growth rate of B%, indicating evolving innovation
                      ecosystems.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      International Diversity Among Inventors
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      The diversity of patent inventors is vast, with contributions from over A
                      different countries, highlighting the global collaboration in innovation.
                    </span>
                  </div>
                  <div className="font-bold text-primary-900 text-sm">
                    Trends in Inventor Collaborations Over Time
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Growth in Inventor Collaborations
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Collaborations among inventors have increased by A% over the last B years,
                      reflecting a trend towards more cooperative innovation efforts.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Year with Highest Collaboration Count
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Year A saw the highest number of inventor collaborations, with B collaborative
                      projects, indicating a peak in joint innovation activities.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Decadal Increase in Collaborations
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Comparing the last two decades, inventor collaborations in the 2010s were A%
                      higher than in the 2000s, showing a growing preference for teamwork in
                      innovation.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Sector-Specific Collaboration Trends
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      In the technology sector, collaborations among inventors have increased by A%
                      in the last B years, highlighting sectoral shifts towards collective
                      innovation.
                    </span>
                  </div>
                  <div className="">
                    <p className="font-bold text-sm text-[#373D3F]">
                      Regional Variations in Collaboration Patterns
                    </p>
                    <span className="text-sm text-[#373D3F] font-medium">
                      Region A exhibits the highest rate of increase in inventor collaborations,
                      with a surge of B% over the past C years, pointing to evolving regional
                      innovation strategies.
                    </span>
                  </div>
                </KeyDetail>
                {/*  */}
                <KeyDetail
                  section="CPC - Distribution of Patents by CPC Classifications"
                  details={CPCSection}
                />
                <KeyDetail
                  section=" IPC - Top IPC Classes in Patent Applications"
                  details={IPCSection}
                />
                <KeyDetail
                  section="WIPO - Distribution of Patents Across WIPO Sectors"
                  details={WIPOSection}
                />
                {/* <EmergingTechnologyTrend keywords={keywords}/> */}
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
    </div>
  );
};

const topics = [
  // { name: "Related technology", id: "related_technology" },
  { name: "1. Total Patents Filed Over Time", id: "1" },
  { name: "2. Distribution of Patent Types", id: "2" },
  { name: "3. Size of Patent Families Over Time", id: "3" },
  { name: "4. Geographical Distribution of Patent Families", id: "4" },
  { name: "5. Number of Applications by Applicant Type", id: "5" },
  { name: "6. Geographic Distribution of Applicants", id: "6" },
  { name: "7. Distribution of Examiner Workload", id: "7" },
  { name: "8. Trends in Examination Times Over Years", id: "8" },
  { name: "9. Top Organizations by Number of Patent Assignments", id: "9" },
  { name: "10. Geographical Distribution of Assignments", id: "10" },
  { name: "11. Geographical Distribution of Inventors", id: "11" },
  { name: "12. Trends in Inventor Collaborations Over Time", id: "12" },
  {
    name: "13. Distribution of Patents by CPC Classifications",
    id: "13",
  },
  { name: "14. Top IPC Classes in Patent Applications", id: "14" },
  { name: "15. Distribution of Patents Across WIPO Sectors", id: "15" },
  { name: "16. Trends in PCT Applications Over Time", id: "16" },
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

const WIPOSection = [
  {
    title: "Dominant WIPO Sector",
    content:
      "WIPO Sector A accounts for B% of all patents, underscoring its importance in global innovation efforts.",
  },
  {
    title: "Annual Growth in WIPO Sector Patent Filings",
    content:
      "Patent filings in WIPO Sector A have seen an annual increase of B%, indicating a growing interest in this area.",
  },
  {
    title: "Shift in WIPO Sector Focus Over Years",
    content:
      "Over the last Y years, the focus has shifted towards WIPO Sector A, with its patent filings increasing by B%, reflecting changing global innovation trends.",
  },
  {
    title: "Comparison of WIPO Sector Filings",
    content:
      "WIPO Sector A saw a B% increase in patent filings compared to Sector C over the past D years, highlighting evolving technological landscapes.",
  },
  {
    title: "Most Rapidly Growing WIPO Sector",
    content:
      "WIPO Sector A experienced the most rapid growth, with an increase of B% in patent filings over the last C years, marking it as an emerging area of innovation.",
  },
];

const IPCSection = [
  {
    title: "Leading IPC Class",
    content:
      "IPC Class A leads with B patent applications, marking it as the most focused area of innovation.",
  },
  {
    title: "Growth Trend in IPC Class Applications",
    content:
      "Applications in IPC Class A have grown by B% in the last C years, indicating a rising trend in this technological field.",
  },
  {
    title: "Comparison of IPC Class Dominance",
    content:
      "IPC Class A's share of patent applications has increased from B% to C% over the past D years, demonstrating shifting innovation priorities.",
  },
  {
    title: "Sector Analysis for IPC Classes",
    content:
      "The electronics sector predominantly applies for patents in IPC Class A, accounting for B% of the sector's applications.",
  },
  {
    title: "Year with Most Diverse IPC Class Filings",
    content:
      "Year A recorded the most diverse range of IPC Class filings, with significant applications in over B different classes, reflecting a broad innovation landscape.",
  },
];

const CPCSection = [
  {
    title: "Dominant CPC Classification",
    content:
      "CPC Classification A dominates with B patents, indicating a strong focus on specific technological areas.",
  },
  {
    title: "Yearly Trends in CPC Classifications",
    content:
      "The proportion of patents in CPC Classification A has grown by B% annually, reflecting shifting innovation focuses.",
  },
  {
    title: "Comparison of CPC Classifications Over Time",
    content:
      "Over the last decade, patents in CPC Classification A have increased by B%, showcasing evolving technological trends.",
  },
  {
    title: "Sector-Specific Dominance in CPC Classifications",
    content:
      "In the healthcare sector, CPC Classification A dominates, with B% of the sector's patents, indicating targeted innovation efforts.",
  },
  {
    title: "Rapid Growth CPC Classifications",
    content:
      "CPC Classification A saw the fastest growth in patents, with an increase of B% over the last C years, highlighting emerging areas of technological advancement.",
  },
];
