import { useNavigate } from "react-router-dom";
import classNames from "classnames";
//
import { ChevronRight, CrossIcon, SearchIcon } from "../../../../components/icons";
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
import RadarChart from "../../../../components/@product/radar";
import { useQuery } from "@tanstack/react-query";
import { getPatentsYearly } from "../../../../utils/api/charts";
import { useEffect, useState } from "react";
import DataSection from "../../../../components/reusable/data-section";
import PageTitle from "../../../../components/reusable/page-title";
import SemanticSearch from "../../../../components/reusable/semantic-search";
import AdvancedSearchIcon from "../../../../components/icons/miscs/AdvancedSearch";
import RadioButtons from "../../../../components/reusable/radio-buttons";

type ISearchType = "or" | "and" | "custom";
/**
 *
 */
export const IPSummaryReport = () => {
  const [searchType, SetSearchType] = useState<ISearchType>("or");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  //
  const [isSemantic, setISearchSemantic] = useState(false);
  const ipDetails = useAppSelector((state) => state.ipData) ?? {};

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const filteredKeywords = useAppSelector((state) => state.date?.filter) ?? [];

  //
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const filterKeywords = filteredKeywords.map((flt) => flt).join(" - ");

  //
  const joinedkeywords = keywords.join(", ");

  // console.log(filterKeywords)

  const { data, isLoading, isError, error } = useQuery(
    ["patents-year", ...keywords],
    async () => {
      return await getPatentsYearly(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  //
  // const joinedKeywords = searchedKeywords.map((kwd) => `"${kwd.value}"`).join(", ");
  // const keywordValue = searchedKeywords.map((kwd) => kwd.value);

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);
  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  //
  const filterClear = () => {
    dispatch(setFilter([]));
  };

  const handleSearchType = (value: string) => {
    SetSearchType(value as ISearchType);
  };

  return (
    <>
      <div>
        <div className="bg-appGray-200 flekeywordx justify-between items-center mb-1 pl-2 rounded-md">
          <div className="flex items-start justify- gap-0.5 py-1">
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
          {isSemantic ? (
            <>
              <SemanticSearch initialValue={searchedKeywords} />
            </>
          ) : (
            <div>
              <Search
                required
                size="small"
                className="w-full bg-white"
                onSubmit={handleSearch}
                initialValue={searchedKeywords}
                searchButton={true}
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
          <div className="flex gap-x-4 mt-6 ">
            <div className="flex-shrink-0 w-auto ">
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
            <div className="space-y-4 w-[920px] xl:w-full">
              {/* report details */}
              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h2 className="text-lg font-bold text-primary-900">Report Details</h2>
                <h3 className="font-bold text-sm">
                  Project title:
                  <span className="font-normal"> {ipDetails.report_details.title}</span>
                </h3>
                <div className="font-bold text-sm">
                  Report created on:{" "}
                  <span className="font-normal">{ipDetails.report_details.date}</span>
                </div>
                <div className="font-bold text-sm">
                  Technology / Sector Description:{" "}
                  <span className="font-normal">
                    {ipDetails.report_details.description}
                    {/* Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                    veritatis et quasi architecto beatae vitae dicta sunt explicabo. */}
                  </span>
                </div>
                <div className="font-bold text-sm">
                  Objectives:
                  <ul className="font-normal list-disc ml-4">
                    {ipDetails.objective_detail.objective}
                    {/* <li>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, consequatur.
                    </li>
                    <li>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, consequatur.
                    </li>
                    <li>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, consequatur.
                    </li> */}
                  </ul>
                </div>
                <div className="font-bold text-sm">
                  Geographical Scope: <span className="font-normal">US all states</span>
                </div>
                <div className="font-bold text-sm">
                  Relevant Time Period for Analysis:{" "}
                  <span className="font-normal">
                    {ipDetails.objective_detail.start_date} to {ipDetails.objective_detail.end_date}
                    {/* Oct 24th, 2011 to Oct 27th, 2023 */}
                  </span>
                </div>
                <div className="font-bold text-sm">
                  Patent Classifications:
                  <ul className="font-normal list-disc ml-4">
                    <li className="font-bold">
                      IPC:{" "}
                      <span className="font-normal">
                        A01B 1/00, B23K 26/00, C07D 211/60, E04B 1/34, F16H 3/16, G06F 3/06, H02J
                        9/00, A21B 1/52, B62D 6/00, F02C 6/14
                      </span>
                    </li>
                    <li className="font-bold">
                      CPC:{" "}
                      <span className="font-normal">
                        {" "}
                        B60K15/035, H04W4/12, C07D211/60, F16K31/06, G06F17/50, H02J9/00, A61K31/00,
                        B64C27/00, F02C6/14, G01N33/50
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="font-bold text-sm">
                  Organizations: <span className="font-normal">Industry and University</span>
                </div>
                <div className="font-bold text-sm">
                  Competitor's name:
                  <ul className="font-normal list-disc ml-4">
                    {ipDetails.organization_competitor.competitor.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                    {/* <li>Omron Healthcare</li>
                    <li>Withings</li>
                    <li>iHealth</li> */}
                  </ul>
                </div>
              </div>
              {/*key highlights  */}
              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h2 className="text-lg font-bold text-primary-900">Key Highlights</h2>
                <DataSection
                  keywords={keywords}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
                  title={
                    <PageTitle
                      // info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
                      titleClass="font-semibold"
                      title="1. Patent Families by year"
                    />
                  }
                >
                  <div>
                    {data && (
                      <BarChart
                        data={data}
                        keys={["count"]}
                        indexBy="year"
                        groupMode="stacked"
                        legendY="Number of Patents"
                        innerPadding={0}
                        borderRadius={0}
                        legends={[
                          {
                            dataFrom: "keys",
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 100,
                            translateY: -20,
                            itemsSpacing: 0,
                            itemWidth: 83,
                            itemHeight: 45,
                            itemDirection: "left-to-right",
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                              {
                                on: "hover",
                                style: {
                                  itemOpacity: 1,
                                },
                              },
                            ],
                            legendClassName: "custom-legend",
                          },
                        ]}
                      />
                    )}
                  </div>
                </DataSection>
                {/* <div>
                  <h5 className="font-semibold text-primary-900">
                    Patent families of past 5 years
                  </h5>
                  {data && (
                    <BarChart
                      data={data}
                      keys={[
                        "count",
                        // 'burger',
                        // 'sandwich',
                        // 'kebab',
                        // 'fries',
                        // 'donut'
                      ]}
                      indexBy="year"
                      groupMode="stacked"
                      legendY="Number of Patents"
                      innerPadding={0}
                      borderRadius={0}
                      legends={[
                        {
                          dataFrom: "keys",
                          anchor: "bottom-right",
                          direction: "column",
                          justify: false,
                          translateX: 100,
                          translateY: -20,
                          itemsSpacing: 0,
                          itemWidth: 83,
                          itemHeight: 45,
                          itemDirection: "left-to-right",
                          itemOpacity: 0.85,
                          symbolSize: 20,
                          effects: [
                            {
                              on: "hover",
                              style: {
                                itemOpacity: 1,
                              },
                            },
                          ],
                          legendClassName: "custom-legend",
                        },
                      ]}
                    />
                  )}
                </div> */}
                <div className="font-bold text-sm">
                  Patent Families:
                  <p className="font-normal">
                    Dive into a thorough analysis of over 50,000 patents in the realm of wearable
                    sensors, spanning across 20 diverse sectors, unveiling pioneering trends and
                    untapped market potentials.
                  </p>
                  <p className="text-primary-900 font-normal">
                    Family A: (100 patents), (50 patents); Family B: (80 patents), (70 patents)
                  </p>
                </div>
                <div className="font-bold text-sm">
                  Display the count of references for each patent :
                  <p className="font-normal">
                    Dive into a thorough analysis of over 50,000 patents in the realm of wearable
                    sensors, spanning across 20 diverse sectors, unveiling pioneering trends and
                    untapped market potentials.
                  </p>
                  <p className="text-primary-900 font-normal">
                    Family A: (100 patents), (50 patents); Family B: (80 patents), (70 patents)
                  </p>
                </div>
                <div className="font-bold text-sm">
                  Distribution of patents by their legal status :
                  <p className="font-normal">
                    Dive into a thorough analysis of over 50,000 patents in the realm of wearable
                    sensors, spanning across 20 diverse sectors, unveiling pioneering trends and
                    untapped market potentials.
                  </p>
                  <p className="text-primary-900 font-normal">
                    Family A: (100 patents), (50 patents); Family B: (80 patents), (70 patents)
                  </p>
                </div>
                <div className="font-bold text-sm">
                  Identify areas with the highest growth in patent filings :
                  <p className="font-normal">
                    Stay abreast of the evolving legal frameworks governing IP in the wearable
                    sensors arena, providing a solid foundation for informed strategy formulation.
                  </p>
                  <p className="text-primary-900 font-normal">
                    Field A: +20% growth, Field B: +15% growth, Field C: +25% growth
                  </p>
                </div>
                {/* radar-chart */}
                <RadarChart />
                {/*  */}
                <div>
                  <h5 className="font-bold text-primary-900 text-lg">
                    Key Performance Indicators (KPIs) and Metrics:
                  </h5>
                  <div className="space-y-2 mt-1">
                    <div className="font-bold text-sm">
                      Patent Growth Rate:{" "}
                      <span className="font-normal">
                        Delve into a detailed analysis showcasing a robust annual patent growth rate
                        of 12.7% in the wearable sensors sector, offering a strategic vantage point
                        for R&D investment decisions
                      </span>
                    </div>
                    <div className="font-bold text-sm">
                      Market Share Analysis:{" "}
                      <span className="font-normal">
                        Explore the market share dynamics among the top IP holders, where the
                        leading player holds a market share of 18.3%, painting a vivid picture of
                        the competitive scenario.
                      </span>
                    </div>
                    <div className="font-bold text-sm">
                      Technology Adoption Curves:{" "}
                      <span className="font-normal">
                        Examine the technology adoption curves across industries, illustrating a
                        swift adoption rate of 9.7% annually, steering a well-informed IP strategy.
                      </span>
                    </div>
                  </div>
                </div>
                {/* summary */}
                <h5 className="font-bold text-primary-900 text-lg">Summary</h5>
                <p className="text-sm">
                  The 2023 Wearable Sensors IP Landscape Analysis serves as your navigational aid in
                  the convoluted domain of IP within the burgeoning field of wearable sensors. This
                  report encapsulates a broad spectrum view of the IP ecosystem, gleaning insights
                  from an expansive patent database, legal frameworks, and market dynamics. Be it
                  pinpointing the next technological breakthrough, comprehending the competitive
                  landscape, or evaluating market readiness, this report is a quintessential asset
                  for avant-garde organizations aspiring to secure a substantial advantage in their
                  domain. The meticulous elucidation of key metrics and KPIs further furnishes
                  decision-makers with the tools to forge a robust, data-driven IP strategy. With
                  our report, traverse through the nuances of IP, and strategically situate your
                  organization at the forefront of innovation within the wearable sensors arena
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 ">
          <div className=" flex flex-col gap-y-1">
            <Button
              disabled={keywords.length === 0}
              htmlType={"button"}
              type={"primary"}
              rounded={"medium"}
              size={"small"}
              handleClick={() => navigate("/ip-landscaping/full-report")}
              classname={
                "disabled:cursor-not-allowed text-sm font-semibold border-2 border-primary-900"
              }
            >
              Generate full report
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
              classname={"text-sm font-semibold"}
              handleClick={() => navigate("/ip-landscaping")}
            >
              Change report details
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const List = [
  "IP Landscaping",
  "Freedom to operate",
  "M&A licensing",
  "Technology landscaping",
  "Competitive intelligence",
  "Infringement analysis",
  "Database Search",
];
