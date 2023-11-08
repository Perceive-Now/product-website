import { useNavigate } from "react-router-dom";
import classNames from "classnames";
//
import { ChevronRight, CrossIcon } from "../../../../components/icons";
//
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import Button from "../../../../components/reusable/button";
//
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
//
import { setFilter } from "../../../../stores/country";
import { setDashboardSearch } from "../../../../stores/dashboard";
//

import BarChart from "../../../../components/@product/bar-chart";

//
import PatentReference from "../../../../components/@dashboard/IP-landscaping/patents-reference";
import PatentYear from "../../../../components/@dashboard/IP-landscaping/patent-year";
import PatentLegalStatus from "../../../../components/@dashboard/IP-landscaping/patent-status";
import InventorAnalysis from "../../../../components/@dashboard/IP-landscaping/inventor-analysis";
import GeographicalDistributionFiling from "../../../../components/@dashboard/IP-landscaping/geographical-filing";
import PatentClassificationAnalysis from "../../../../components/@dashboard/IP-landscaping/patent-classification";
import WipoAnalysis from "../../../../components/@dashboard/IP-landscaping/wipo-analysis";
import EmergingTechnologyTrend from "../../../../components/@dashboard/IP-landscaping/emerging-technology";
import PatentPortfolioCompetitor from "../../../../components/@dashboard/IP-landscaping/patent-portfolio";
import TechnologyLifeCycleAnalysis from "../../../../components/@dashboard/IP-landscaping/technology-analysis";
import { useState } from "react";
import PatentCompetitorActivity from "../../../../components/@dashboard/IP-landscaping/patent-competitior-activity";
import PatentCompetitorClass from "../../../../components/@dashboard/IP-landscaping/patent-competitor-class";
import PatentPortfolioDepth from "../../../../components/@dashboard/IP-landscaping/patent-portfolio-depth";

//

/**
 *
 */
export const IPFullReport = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //
  const [scroll, setScrollId] = useState("related_technology");
  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const filteredKeywords = useAppSelector((state) => state.date?.filter) ?? [];

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

  const handleButtonClick = (id: string) => {
    // if () {
    //   formRef.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
    // }
    setScrollId(id);
  };

  //
  const handleKeyword = (keyword: IKeywordOption[]) => {
    dispatch(setDashboardSearch(keyword));
  };

  return (
    <>
      <div>
        <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md">
          <div className="flex items-start justify-center gap-0.5 py-1">
            <p className="text-lg text-primary-900 font-semibold">
              IP Landscaping{" "}
              <span className="font-bold text-secondary-800 text-sm">
                (407, 046 Patents & 431,402 Companies)
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-8 mb-2 gap-x-3 mt-2">
        <div className="col-span-7 mt-0.5">
          {/* Search bar */}
          <div>
            <Search
              required
              size="small"
              className="w-full bg-white"
              onSubmit={handleSearch}
              initialValue={searchedKeywords}
              searchButton={true}
            />
            {keywords.length > 0 ? (
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
            )}
          </div>
          {/* summary report */}
          <div className="flex gap-x-4 mt-6 ">
            <div className="flex-shrink-0 w-[260px]">
              <div className="flex flex-col border rounded-t-lg shadow">
                <div className="bg-gray-200 text-sm font-semibold text-secondary-800 py-1 px-2 rounded-t-lg">
                  More
                </div>
                <div>
                  {List.map((name) => (
                    <button
                      key={name}
                      type="button"
                      className={classNames(
                        "hover:bg-primary-50 text-sm font-semibold text-secondary-800 w-full text-start py-1 px-2 flex items-center justify-between border-b",
                      )}
                    >
                      <span>{name}</span>
                      <ChevronRight />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {/* report details */}
              <div className="border-gray-200 shadow-custom border px-2 pt-1 pb-3 w-full space-y-2">
                <h2 className="text-lg font-bold text-primary-900">Related Technologies</h2>
                <div className="flex item-center gap-2">
                  {relatedKeywords.map((keyword) => (
                    <button
                      onClick={() => handleKeyword([{ label: keyword, value: keyword }])}
                      key={keyword}
                      className="rounded-full bg-appGray-100 py-1 px-2 text-primary-900 font-semibold text-sm"
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </div>
              {/* Exexutive Summary */}
              <div className="border-gray-200 shadow-custom border px-2 pt-1 pb-4 w-full space-y-2">
                <h2 className="text-lg font-bold text-primary-900">Executive Summary</h2>
                <BarChart
                  data={demoData}
                  keys={["hot dog"]}
                  indexBy="country"
                  groupMode="stacked"
                  legendY="Number of Patents"
                />
                {/*  */}
                <div className="text-secondary-800 font-medium space-y-3">
                  <div>
                    <h6>Market Growth:</h6>
                    <ul className="list-disc ml-4">
                      <li>
                        The wearable blood pressure sensor market is on a growth trajectory with a
                        projected Compound Annual Growth Rate (CAGR) of 8.5% over the next five
                        years. This could potentially elevate the market valuation from an estimated
                        $1.5 billion to over $2.25 billion by the end of the forecast period.
                      </li>
                      <li>
                        The driving factors behind this growth could be an increasing awareness of
                        health and fitness, aging population, and the advancement in wearable
                        technology.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6>Patent Landscape:</h6>
                    <ul className="list-disc ml-4">
                      <li>
                        The wearable blood pressure sensor market is on a growth trajectory with a
                        projected Compound Annual Growth Rate (CAGR) of 8.5% over the next five
                        years. This could potentially elevate the market valuation from an estimated
                        $1.5 billion to over $2.25 billion by the end of the forecast period.
                      </li>
                      <li>
                        The driving factors behind this growth could be an increasing awareness of
                        health and fitness, aging population, and the advancement in wearable
                        technology.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h6>Key Market Players:</h6>
                    <ul className="list-disc ml-4">
                      <li>
                        The wearable blood pressure sensor market is on a growth trajectory with a
                        projected Compound Annual Growth Rate (CAGR) of 8.5% over the next five
                        years. This could potentially elevate the market valuation from an estimated
                        $1.5 billion to over $2.25 billion by the end of the forecast period.
                      </li>
                      <li>
                        The driving factors behind this growth could be an increasing awareness of
                        health and fitness, aging population, and the advancement in wearable
                        technology.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*Patents by year  */}
              <PatentYear keywords={keywords} />
              {/* Top 10 Patents by patent references */}
              <PatentReference keywords={keywords} />
              {/* legal status */}
              <PatentLegalStatus keywords={keywords} />
              {/* inventor */}
              <InventorAnalysis keywords={keywords} />
              {/* geographical distribution */}
              <GeographicalDistributionFiling keywords={keywords} />
              {/*  */}
              <PatentClassificationAnalysis keywords={keywords} />
              {/*  */}
              <WipoAnalysis keywords={keywords} />
              {/*  */}
              <TechnologyLifeCycleAnalysis keywords={keywords} />
              {/*  */}
              <EmergingTechnologyTrend keywords={keywords} />
              {/*  */}
              <PatentPortfolioDepth keywords={keywords} />
              {/*  */}
              <PatentPortfolioCompetitor keywords={keywords} />
              {/*  */}
              <PatentCompetitorActivity keywords={keywords} />
              {/*  */}
              <PatentCompetitorClass keywords={keywords} />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-y-1">
            <Button
              htmlType={"button"}
              type={"primary"}
              rounded={"medium"}
              size={"small"}
              classname={"text-sm font-semibold border-2 border-primary-900"}
            >
              Print report
            </Button>
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
              <button
                onClick={() => handleButtonClick(topic.id)}
                key={topic.name}
                className={classNames(
                  topic.id === scroll ? "border-l-4 border-primary-600 pl-0.5" : "pl-1",
                  "text-start text-primary-900 font-sm truncate",
                )}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const topics = [
  { name: "Related technology", id: "related_technology" },
  { name: "1. Patent Families", id: "patent_families" },
  { name: "2. Patent References", id: "patent_references" },
  { name: "3. Legal Staus of Patent", id: "patent_legal_status" },
  { name: "4. Inventors and Asignees", id: "inventors_asignees" },
  { name: "5. Geographical Distribution", id: "geographical_distribution" },
  { name: "6. Patent Classification", id: "patent_classification" },
  { name: "7. WIPO FIeld Analysis", id: "wipo_field_analysis" },
  { name: "8. Technology Lifecycle", id: "technology_lifecycle" },
  { name: "9. Emerging Technology", id: "emerging_technology" },
  { name: "10. Patent Portfolio Depth", id: "patent_postfolio_depth" },
  { name: "11. Competitor Patenting Activity", id: "competitior_patenting_activity" },
];

const List = [
  "IP Landscaping",
  "Freedom to operate",
  "M&A licensing",
  "Technology landscaping",
  "Competitive intelligence",
  "Infringement analysis",
  "Database Search",
];
const relatedKeywords = [
  "Machine learning",
  "Neural networks",
  "Robotics",
  "Deep learning",
  "Computer vision",
  "Data mining",
];
const demoData = [
  {
    country: "AD",
    "hot dog": 33,
    "hot dogColor": "hsl(313, 70%, 50%)",
    burger: 21,
    burgerColor: "hsl(285, 70%, 50%)",
    sandwich: 112,
    sandwichColor: "hsl(80, 70%, 50%)",
    kebab: 117,
    kebabColor: "hsl(121, 70%, 50%)",
    fries: 15,
    friesColor: "hsl(13, 70%, 50%)",
    donut: 146,
    donutColor: "hsl(34, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 32,
    "hot dogColor": "hsl(158, 70%, 50%)",
    burger: 68,
    burgerColor: "hsl(264, 70%, 50%)",
    sandwich: 170,
    sandwichColor: "hsl(12, 70%, 50%)",
    kebab: 147,
    kebabColor: "hsl(99, 70%, 50%)",
    fries: 48,
    friesColor: "hsl(325, 70%, 50%)",
    donut: 154,
    donutColor: "hsl(114, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 152,
    "hot dogColor": "hsl(12, 70%, 50%)",
    burger: 5,
    burgerColor: "hsl(9, 70%, 50%)",
    sandwich: 28,
    sandwichColor: "hsl(2, 70%, 50%)",
    kebab: 70,
    kebabColor: "hsl(199, 70%, 50%)",
    fries: 160,
    friesColor: "hsl(129, 70%, 50%)",
    donut: 93,
    donutColor: "hsl(178, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 101,
    "hot dogColor": "hsl(306, 70%, 50%)",
    burger: 197,
    burgerColor: "hsl(270, 70%, 50%)",
    sandwich: 199,
    sandwichColor: "hsl(200, 70%, 50%)",
    kebab: 66,
    kebabColor: "hsl(138, 70%, 50%)",
    fries: 97,
    friesColor: "hsl(215, 70%, 50%)",
    donut: 120,
    donutColor: "hsl(297, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 15,
    "hot dogColor": "hsl(310, 70%, 50%)",
    burger: 126,
    burgerColor: "hsl(271, 70%, 50%)",
    sandwich: 38,
    sandwichColor: "hsl(271, 70%, 50%)",
    kebab: 65,
    kebabColor: "hsl(173, 70%, 50%)",
    fries: 114,
    friesColor: "hsl(135, 70%, 50%)",
    donut: 66,
    donutColor: "hsl(155, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 86,
    "hot dogColor": "hsl(299, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(323, 70%, 50%)",
    sandwich: 87,
    sandwichColor: "hsl(151, 70%, 50%)",
    kebab: 73,
    kebabColor: "hsl(298, 70%, 50%)",
    fries: 159,
    friesColor: "hsl(62, 70%, 50%)",
    donut: 102,
    donutColor: "hsl(247, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 132,
    burger: 59,
    sandwich: 76,
    kebab: 104,
    fries: 112,
    donut: 11,
  },
];

[
  {
    patent_id: "",
    value: "",
  },
  {
    patent_id: "",
    value: "",
  },
  {
    patent_id: "",
    value: "",
  },
];
