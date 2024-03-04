import { useNavigate } from "react-router-dom";
// import classNames from "classnames";
//
import { SearchIcon } from "../../../../components/icons";
//
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import Button from "../../../../components/reusable/button";
//
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
//
// import { setFilter } from "../../../../stores/country";
import { setDashboardSearch } from "../../../../stores/dashboard";
//

import BarChart from "../../../../components/@product/bar-chart";
// import RadarChart from "../../../../components/@product/radar";
import { useQuery } from "@tanstack/react-query";
import { getPatentsYearly } from "../../../../utils/api/charts";
import { useEffect, useState } from "react";
import DataSection from "../../../../components/reusable/data-section";
import PageTitle from "../../../../components/reusable/page-title";
import SemanticSearch from "../../../../components/reusable/semantic-search";
import AdvancedSearchIcon from "../../../../components/icons/miscs/AdvancedSearch";
import RadioButtons from "../../../../components/reusable/radio-buttons";
import MoreNavOption from "../../../../components/reusable/nav-options";
import ScatterChart from "../../../../components/@product/scatter-chart";
import TreeMap from "../../../../components/@product/tree-map";

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
  // const filteredKeywords = useAppSelector((state) => state.date?.filter) ?? [];

  //
  const keywords = searchedKeywords.map((kwd) => kwd.value);
  // const filterKeywords = filteredKeywords.map((flt) => flt).join(" - ");

  //
  // const joinedkeywords = keywords.join(", ");

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
  // const filterClear = () => {
  //   dispatch(setFilter([]));
  // };

  const handleSearchType = (value: string) => {
    SetSearchType(value as ISearchType);
  };

  return (
    <>
      {/* <div>
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
      </div> */}
      <div className="flex flex-col md:flex-row mb-2 gap-x-3 mt-2">
        <div className="mt-0.5">
          {/* Search bar */}
          {isSemantic ? (
            <>{/* <SemanticSearch initialValue={searchedKeywords} /> */}</>
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
                // classNames="text-sm"
              />
            </div>
          )} */}

          {/* summary report */}
          <div className="flex flex-col md:flex-row gap-x-4 mt-6 ">
            {/* <MoreNavOption /> */}
            <div className="space-y-4 lg:w-[920px] xl:w-full">
              {/* report details */}
              {/* <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
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
                  </span>
                </div>
                <div className="font-bold text-sm">
                  Objectives:
                  <ul className="font-normal list-disc ml-4">
                    {ipDetails.objective_detail.objective}
                  </ul>
                </div>
                <div className="font-bold text-sm">
                  Geographical Scope: <span className="font-normal">US all states</span>
                </div>
                <div className="font-bold text-sm">
                  Relevant Time Period for Analysis:{" "}
                  <span className="font-normal">
                    {ipDetails.objective_detail.start_date} to {ipDetails.objective_detail.end_date}
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
                  </ul>
                </div>
              </div> */}
              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h2 className="text-lg font-bold text-primary-900">Executive Summary</h2>
                <DataSection keywords={keywords} isLoading={isLoading} isError={isError}>
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
                <div>
                  <p className="text-sm font-medium">
                    This analysis delves into the Intellectual Property (IP) landscape within the
                    realm of sensor technologies. By examining historical trends and current
                    trajectories, this report aims to provide stakeholders with crucial insights
                    regarding potential licensors, past IP allocations among key players, quarterly
                    trends in major licensees over the past five years, and notable inventors
                    engaged in IP agreements. A total of 1862 distinct entities have been
                    identified, spanning the IP landscape from 2019 to 2024 in the sensor technology
                    sector.
                  </p>
                </div>
                <div className="font-bold text-sm">
                  1. National IP licensing trends (2013 to 2023):
                  <p className="font-medium">
                    Between 2013 and 2023, IP licensing in sensor technologies showed dynamic
                    trends. Counts varied yearly, starting at 102 in 2015 and peaking at 196 in
                    2018. A slight downturn occurred in 2020 with 178 instances. Notably, 2018,
                    2019, and 2021 had the highest counts, indicating periods of increased activity
                    and collaboration in the sensor technology IP landscape.
                  </p>
                </div>
                <div className="font-bold text-sm">
                  2.Top 10 Key Buyer Trends:
                  <p className="font-medium">
                    2019-2023: In the sensor technologies market, Texas Instruments consistently
                    dominates, followed closely by STMicroelectronics, while other major players
                    such as Bosch Sensortec, Analog Devices, and Infineon Technologies also hold
                    significant market shares across examined periods.
                  </p>
                  <p className="font-medium">
                    2015-2018: Texas Instruments maintained its market leadership with 32 units,
                    followed by STMicroelectronics at 22 units, while other key players such as
                    Bosch Sensortec and Analog Devices had counts around 14 to 16 units, Infineon
                    Technologies and Sensirion AG ranged from 10 to 12 units, and NXP Semiconductors
                    recorded approximately 8 units, showcasing varied market volumes across
                    companies.
                  </p>
                </div>
                <div className="font-bold text-sm">
                  3. Top Inventors/Assignors/Sellers:
                  <p className="font-medium">
                    2019-2023: The data highlights the top inventors, assignors, or sellers in
                    sensor technologies, with prominent figures like SMITH, JAMES leading with 17 IP
                    assignments, followed closely by WANG, LISA with 14. CHEN, DAVID and GARCIA,
                    MARIA each contributed 11 assignments, while multiple inventors such as LEE,
                    JUN, and KIM, YOUNG SOO had 8 to 9 assignments, indicating a diverse range of
                    contributors in the sensor technology IP market.
                  </p>
                  <p className="font-medium">
                    2014-2018: Between 2014 and 2018, key inventors, assignors, or sellers in sensor
                    technologies had varying patent assignments, with notable figures like JONES,
                    MICHAEL and LEE, HANNAH leading with 15 patents each, constituting 14.2% of the
                    market share. GOMEZ, CARLOS followed closely with 12 patents or 11.3%. Entities
                    such as SENSORCO, INC. and NGUYEN, THI held around 5.3% with 6 patents each.
                  </p>
                </div>
                <div className="font-bold text-sm">
                  4. Distribution of Sellers and Buyers (2014-2023):
                  <p className="font-normal">
                    In the sensor technologies domain, between 2025 and 2021, SMITH, JAMES led with
                    17 patents, followed closely by WANG, LISA with 14 patents, while in the period
                    of 2018 to 2014, JONES, MICHAEL and LEE, HANNAH emerged as top inventors, each
                    securing around 14.2% market share with 15 patents, showcasing a diverse
                    distribution of sellers and buyers across examined periods.
                  </p>
                </div>
                <div className="font-bold text-sm">
                  5. Market share for Key Buyers:
                  <p className="font-medium">
                    Between 2013 and 2023, Texas Instruments emerged as the most active entity in IP
                    licensing within the sensor technology sector, with a total of 398 activities,
                    reaching a peak of 72 in a single year. STMicroelectronics maintained consistent
                    licensing efforts, accumulating 89 activities over the decade, with a yearly
                    high of 20. On the other hand, Bosch Sensortec and Analog Devices exhibited a
                    more steady presence, with total activities of 56 and 42 respectively. Infineon
                    Technologies entered the scene later, recording a total of 31 licensing
                    activities, ranging from 2 to 8 annually.
                  </p>
                  <p className="font-medium">
                    In terms of market share based on these activities, Texas Instruments dominated
                    with 43.2%, followed by STMicroelectronics at 14.5%. Bosch Sensortec secured
                    9.8%, while Analog Devices and Infineon Technologies held smaller shares at 7.4%
                    and 5.3%, respectively. Other entities not listed accounted for the remaining
                    19.8% of the market share.
                  </p>
                </div>
              </div>
              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <p className="text-xl font-bold text-primary-900">A. Introduction</p>
                <p className="text-sm font-bold text-primary-900">
                  Sensor Technologies: An Overview
                </p>
                <div className="font-bold text-sm">
                  1. National IP licensing trends (2013 to 2023):
                  <p className="font-medium">
                    Sensor technologies utilize advanced technology to ensure precise and continuous
                    monitoring without disrupting individuals' routines. Their standout feature lies
                    in the provision of uninterrupted data collection, crucial for various
                    applications across industries. Projections suggest that this market is poised
                    to grow at a Compound Annual Growth Rate (CAGR) of 8.5% over the next five
                    years, potentially reaching a valuation exceeding $2.25 billion. These
                    technologies leverage various sensors including optical sensors, piezoelectric
                    sensors, and advanced data analytics algorithms to deliver reliable data,
                    essential for a wide range of applications.
                  </p>
                </div>
                <div className="font-bold text-sm text-primary-900">
                  The Role of IP in Promoting Innovation and Distinctive Market Standing:
                  <p className="font-medium text-[#373D3F]">
                    Intellectual Property (IP) is indispensable in promoting inventive solutions,
                    protecting market participants' investments, and delivering a competitive
                    advantage within the realm of sensor technologies. A robust patent portfolio can
                    safeguard a company's innovative sensor technologies from replication,
                    establishing a unique position in the market.
                  </p>
                </div>

                <div className="">
                  <p className="text-sm font-bold ">Methodology:</p>
                  <p className="text-sm font-bold ">Sources of Patent Information:</p>
                  <p className="text-sm font-medium">
                    In-depth patent evaluation for sensor technologies was conducted using
                    authoritative databases such as the United States Patent and Trademark Office
                    (USPTO) and the World Intellectual Property Organization (WIPO). These sources
                    provide comprehensive coverage of globally filed patents, establishing a robust
                    foundation for our study.
                  </p>
                </div>

                <div className="">
                  <p className="font-bold text-primary-900">
                    Data Retrieval through Patent Search Phrases and Classification Codes:
                  </p>
                  <p className="text-sm font-medium">
                    Carefully constructed search phrases and the application of relevant
                    classification codes ensured comprehensive and precise extraction of patent
                    information related to sensor technologies. For instance, phrases such as
                    "sensor technologies" and "data analytics AND sensors" were utilized to capture
                    relevant patents. Classification codes like G01C21/36 (using sensors) were
                    employed to focus on the most pertinent patents in this sector.
                  </p>
                  <p className="text-sm font-medium">
                    This approach led to the discovery of predominant market players, upcoming
                    technologies, and potential licensing ventures. Over 500 distinctive patent
                    families linked to sensor technologies were found, underscoring the vast IP
                    activities related to sensor technologies. Through a methodical analysis of the
                    market and patents, we gained a lucid understanding of the innovative
                    environment and market positioning in the sensor technology sector.
                    Additionally, grasping the dynamics of IP assignments can profoundly guide
                    stakeholders in making decisions about R&D allocations, collaborations, and
                    market tactics.
                  </p>
                </div>

                <div className="">
                  <p className="font-bold text-primary-900">Market analysis</p>
                  <ul className="list-disc ml-2 text-sm fomt-medium">
                    <li>Current market size: USD 320.00 Billion.</li>
                    <li>
                      <div>
                        Key market players:
                        <ul className="list-disc ml-4">
                          <li>Microchip Technology</li>
                          <li>Grayhill</li>
                          <li>Texas Instruments Incorporated</li>
                          <li>Honeywell International Inc.</li>
                          <li>Omega Engineering Inc.</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <p className="text-xl font-bold text-primary-900">B. IP licensing analysis</p>
                <div className="font-bold text-sm">
                  1. National IP licensing trends (2013 to 2023):
                  <ScatterChart data={[]} />
                  <ul className="text-sm font-medium list-disc ml-3">
                    <li>Total IP assignments identified between 1981 and 2023: 5020.</li>
                    <li>
                      IP assignment market share among top 3 players: From 2019 to 2023, Texas
                      Instruments (97), Honeywell (41) and Microchip Technology (32) held the top 3
                      positions in the market.
                    </li>
                    <li>
                      IP assignments for past 10 years: Between 2013 and 2023, counts fluctuated
                      starting at 93 in 2013, peaking at 178 in 2022, and dropping to 88 in 2023.
                      Years 2016, 2017, and 2022 experienced counts above 120, suggesting heightened
                      activity.
                    </li>
                  </ul>
                  <p className="text-sm font-medium">
                    From 2013 to 2023, there has been a fluctuating trend in counts. Starting from
                    93 in 2013, there was an increase to 134 in 2014. Post this, there were slight
                    dips and rises but a notable spike to 178 in 2022. However, 2023 observed a
                    decrease, recording a count of 88. Years 2016, 2017, and 2022 had the highest
                    counts, exceeding 120, indicating periods of higher activity or interest. The
                    YoY growths are as follows:
                  </p>
                </div>
                <ul className="text-sm font-medium list-disc ml-3">
                  <li>2013 to 2014: 44.1% increase (134 from 93). </li>
                  <li>2014 to 2015: -30.6% decrease (93 from 134). </li>
                  <li>2015 to 2016: 41.9% increase (132 from 93).</li>
                  <li>2016 to 2017: -6.1% decrease (124 from 132). </li>
                  <li>2017 to 2018: -15.3% decrease (105 from 124).</li>
                  <li>2018 to 2019: -17.1% decrease (87 from 105).</li>
                  <li>2019 to 2020: 12.6% increase (98 from 87).</li>
                  <li>2020 to 2021: 58.2% increase (155 from 98).</li>
                  <li>2021 to 2022: 14.8% increase (178 from 155).</li>
                  <li>2022 to 2023: -50.6% decrease (88 from 178).</li>
                </ul>
                <p className="text-sm font-medium">
                  To summarize: From 2013 to 2022, there were periods of growth and decline, with a
                  peak at 178in 2022. However, 2023 witnessed a significant 50.6% decrease from the
                  previous year. Since 2023 isn't complete, this data remains subject to change.
                </p>
              </div>
              {/*  */}
              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">2.Buyers trend</h4>
                <h4 className="text-xl font-bold text-primary-900">
                  2.1 Top 10 Key Buyer Trends:{" "}
                </h4>
                <ScatterChart data={[]} />
                <p className="text-sm font-medium">
                  {" "}
                  Texas Instruments Incorporated
                  <br />
                  leads with 97 units, followed by Emerson Electric Co. with 41, and
                  STMicroelectronics NV at 32. The companies with the lowest market volumes among
                  these top entities are Siemens AG, ABB Group, and Robert Bosch GmbH, with 18, 17,
                  and 19 units, respectively. The overall range of market volumes among these
                  companies spans from 17 to 97.
                </p>

                <ul className="text-sm font-medium list-disc ml-3">
                  <li>Here's the market share for each key player based on the volume: </li>
                  <li>Texas Instruments Incorporated : 29.2%</li>
                  <li>2015 to 2016: 41.9% increase (132 from 93).</li>
                  <li>Emerson Electric Co. : 12.3%</li>
                  <li>STMicroelectronics NV : 9.6%</li>
                  <li>TE Connectivity Ltd : 9.3%</li>
                  <li>Texas Instruments Incorporated, INC.: 8.7%</li>
                  <li>NANOSTIM, INC.: 7.2%</li>
                  <li>SOTERA WIRELESS, INC.: 7.2%</li>
                  <li>Robert Bosch GmbH : 5.7%</li>
                </ul>
                <p className="text-sm font-medium">
                  {" "}
                  To summarize: Texas Instruments Incorporated leads the market share with 29.2% of
                  the total volume, followed by Emerson Electric Co. at 12.3% and STMicroelectronics
                  NV at 9.6%. The companies with the lowest share among these top entities are TE
                  Connectivity Ltd, ABB Group, and Robert Bosch GmbH, each holding roughly 5- 6% of
                  the total market volume.
                </p>
              </div>

              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">
                  2.2.2 Distribution of Sellers and Buyers (2014-2023)
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="cols-span-1">
                    <h4 className="text-xl font-bold text-primary-900">Sellers</h4>
                    <TreeMap data={[]} identity={""} value={""} />
                  </div>
                  <div className="cols-span-1">
                    <h4 className="text-xl font-bold text-primary-900">Buyers</h4>
                    {/* <TreeMap data={[]} identity={""} value={""} /> */}
                  </div>
                </div>
                <ul className="text-sm font-medium list-disc ml-3">
                  <li>
                    NISHIDA, TOMOYUKI and STAHMANN, JEFFREY E. both stood out as top inventors in
                    their respective periods (2019-2023 and 2014-2018), each holding 13 patents with
                    a 12.1% and 12.3% market share respectively.
                  </li>
                  <li>
                    LEE, DONG HWA (2019-2023) secured 9 patents, translating to an 8.4% share, while
                  </li>
                  <li>
                    MIKA, YUVAL (2014-2018) also held a significant 12.3% share with 13 patents.
                  </li>
                </ul>
              </div>

              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">
                  2.3 Deeper zoom on key buyers
                </h4>
                <p className="font-bold text-primary-900">Key market players</p>
                <BarChart data={[]} keys={[]} indexBy={""} />
                <p className="font-bold text-primary-900">Summary</p>
                <ul className="text-sm font-medium list-disc ml-2">
                  <li>
                    From 2019 to 2023, the IP assignment trends for key medical entities, with their
                    respective market shares, are as follows:
                  </li>
                  <li>
                    Texas Instruments Incorporated, INC. dominated the period with a significant 86
                    patent assignments, holding a 54.4% market share.
                  </li>
                  <li>
                    ABB Group CARDIAC DIAGNOSTICS, INC. was the next leading entity, securing 31
                    patents and capturing 19.6% of the market.
                  </li>
                  <li>
                    Meanwhile, BIOTRONIK SE & CO. KG and Infineon Technologies had relatively fewer
                    patents, with market shares of 6.3% and 5.1% respectively.
                  </li>
                </ul>
                <div className="w-full h-[1px] bg-[#BABABA] my-4" />
                <p className="font-bold text-primary-900">Buyer market share distribution</p>
                <p className="font-bold text-primary-900">Key takeaways</p>
                <ul className="text-sm font-medium list-disc ml-2">
                  <li>Texas Instruments Incorporated, Inc.: 54.2%</li>
                  <li>ABB Group Cardiac Diagnostics, Inc.: 11.5%</li>
                  <li>Honeywell International Inc. Corporation: 7.6%</li>
                  <li>Biotronik SE & Co. KG: 3.5%</li>
                </ul>
                <div>
                  <p className="font-bold text-primary-900">Key Insights</p>
                  <div>
                    <p>Texas Instruments Incorporated, Inc.:</p>
                    <ul className="text-sm font-medium list-disc ml-2">
                      <li>Texas Instruments Incorporated, Inc.: 54.2%</li>
                      <li>ABB Group Cardiac Diagnostics, Inc.: 11.5%</li>
                      <li>Honeywell International Inc. Corporation: 7.6%</li>
                      <li>Biotronik SE & Co. KG: 3.5%</li>
                    </ul>
                  </div>
                  <div>
                    <p>ABB Group Cardiac Diagnostics, Inc.:</p>
                    <ul className="text-sm font-medium list-disc ml-2">
                      <li>Texas Instruments Incorporated, Inc.: 54.2%</li>
                      <li>ABB Group Cardiac Diagnostics, Inc.: 11.5%</li>
                      <li>Honeywell International Inc. Corporation: 7.6%</li>
                      <li>Biotronik SE & Co. KG: 3.5%</li>
                    </ul>
                  </div>
                  <div>
                    <p>Honeywell International Inc. Corporation:</p>
                    <ul className="text-sm font-medium list-disc ml-2">
                      <li>Texas Instruments Incorporated, Inc.: 54.2%</li>
                      <li>ABB Group Cardiac Diagnostics, Inc.: 11.5%</li>
                      <li>Honeywell International Inc. Corporation: 7.6%</li>
                      <li>Biotronik SE & Co. KG: 3.5%</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">
                  2.3 3.1 Top Inventors/Assignors/Sellers
                </h4>
                <p className="font-medium text-sm ">
                  The data for 2019 to 2023 indicates the number of patents assigned to various
                  entities. Texas Instruments Incorporated. leads with 27 patents, followed by
                  STMicroelectronics NV, Siemens AG., and Microchip Technology. all with 21 patents.
                  The entities with the fewest patents among the top entities are DOUGLAS, JOHN,
                  BRESSLERGROUP, INC., MACULOGIX, INC., KAMAKURA, KAZUYA, MORIMOTO, KOICHI, and
                  YANAGISAWA, TOSHIHITO, each having between 9 to 10 patents. The overall range of
                  patents among these entities spans from 9 to 27.
                </p>
                <div>
                  <p>Here's the market share for each key player:</p>
                  <ul className="text-sm font-medium list-disc ml-2">
                    <li>Texas Instruments Incorporated.: 7.9%</li>
                    <li>STMicroelectronics NV: 6.2% • </li>
                    <li>Microchip Technology.: 6.2%</li>
                    <li>TE Connectivity Ltd: 5.9%</li>
                  </ul>
                </div>
                <p className="font-medium text-sm ">
                  To summarize: Texas Instruments Incorporated. leads the patent assignments with
                  7.9%, closely followed by STMicroelectronics NV, Siemens AG., and Microchip
                  Technology., all at 6.2%. Entities like ABB Group, and Omega Engineering Inc., on
                  the lower end, hold roughly 2.9-3% of the total patents.
                </p>
              </div>

              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">2.3 3.2 Quarterly trends</h4>
                <div className="grid grid-cols-2 font-medium text-sm">
                  <div>
                    <div>
                      <p>1. Robert Bosch GmbH:</p>
                      <ul className="text-sm font-medium list-disc ml-2">
                        <li>Total activity over the period: 7</li>
                        <li>ABB Group Cardiac Diagnostics, Inc.: 11.5%</li>
                        <li>Honeywell International Inc. Corporation: 7.6%</li>
                        <li>Biotronik SE & Co. KG: 3.5%</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p>2. Robert Bosch GmbH:</p>
                      <ul className="text-sm font-medium list-disc ml-2">
                        <li>Total activity over the period: 7</li>
                        <li>ABB Group Cardiac Diagnostics, Inc.: 11.5%</li>
                        <li>Honeywell International Inc. Corporation: 7.6%</li>
                        <li>Biotronik SE & Co. KG: 3.5%</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium">
                  Note: The above market share percentages were calculated based on the total
                  activity over the specified period. These percentages provide an approximation of
                  each company's market presence within the dataset, but it's essential to keep in
                  mind that this is a rough estimation without contextual details and other market
                  influences.
                </p>
              </div>

              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">
                  2.3 4. Yearly licensing momentum{" "}
                </h4>
                <ul className="text-sm font-medium list-disc ml-2">
                  <li>
                    Formula: (Number of licenses granted in a quarter / Number of licenses granted
                    in the previous quarter) * 100
                  </li>
                  <li>ABB Group Cardiac Diagnostics, Inc.: 11.5%</li>
                  <li>
                    Insight: An average percentage of 100% or more indicates higher opportunity of
                    success in future licensing opportunities.
                  </li>
                </ul>
              </div>

              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">
                  2.3 4. Deeper zoom on key buyers{" "}
                </h4>
                <p className="font-bold text-primary-900">Buyer market share distribution</p>
                <ul className="text-sm font-medium list-disc ml-2">
                  <li>
                    Honeywell International Inc dominates the IP market with a significant share of
                    16.
                  </li>
                  <li>TE Connectivity Ltd holds a notable position with a share of 13.</li>
                  <li>
                    Omega Engineering captures a market share of 12, closely followed by
                    STMicroelectronics NV at 8.
                  </li>
                </ul>
              </div>

              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">
                  2.3 Strategic KPIs for key prospective buyers{" "}
                </h4>
                <p className="font-bold text-primary-900">Buyer market share distribution</p>
                <ul className="text-sm font-medium list-disc ml-2">
                  <li>
                    Formula: (Number of licensing events / Total patents in the portfolio) * 100
                  </li>
                  <li>
                    Insight: Elevated BES reflects a higher interest level among potential buyers in
                    acquiring licenses.
                  </li>
                </ul>
              </div>

              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">
                  2.3 C. Timeline of earliest assignments to publishing
                </h4>
                <BarChart data={[]} keys={[]} indexBy={""} />
                <p className="font-bold text-primary-900">Summary</p>
                <ul className="text-sm font-medium list-disc ml-2">
                  <li>
                    Formula: (Number of licensing events / Total patents in the portfolio) * 100
                  </li>
                  <li>
                    Insight: Elevated BES reflects a higher interest level among potential buyers in
                    acquiring licenses.
                  </li>
                </ul>
                <p className="font-medium text-sm">
                  Infineon Technologies has six IP assignment publications that began processing on
                  5/13/2019. Two of these publications took 218 days each to be published. One
                  publication took 176 days to be published. Another publication was published in
                  126 days. The remaining two publications each took 204 days to be published. On
                  average, it took approximately 191 days for Infineon Technologies to have their IP
                  assignments published starting from 5/13/2019. This indicates that Infineon
                  Technologies had multiple IP assignments starting on the same date but varied in
                  their publication times.
                </p>
              </div>

              <div className="border-gray-200 shadow-custom border px-2 py-1 w-full space-y-2">
                <h4 className="text-xl font-bold text-primary-900">
                  D. Recommendations for actionable steps
                </h4>
                <div>
                  <p className="font-bold text-sm">1. In-depth Patent Analysis:</p>
                  <ul className="text-sm font-medium list-disc ml-2">
                    <li>
                      Patent Strength Assessment: Evaluate patents based on technological
                      significance, coverage breadth, and enforceability.
                      <ul className="text-sm font-medium list-disc ml-2">
                        <li>
                          Impact: By positioning stronger patents at premium rates, anticipate a
                          revenue boost of 15-20%. This growth provides a solid base for future
                          fundraising endeavors.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Patent Strength Assessment: Evaluate patents based on technological
                      significance, coverage breadth, and enforceability.
                      <ul className="text-sm font-medium list-disc ml-2">
                        <li>
                          Impact: By positioning stronger patents at premium rates, anticipate a
                          revenue boost of 15-20%. This growth provides a solid base for future
                          fundraising endeavors.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-sm ">2. Targeted Licensing Strategy:</p>
                  <ul className="text-sm font-medium list-disc ml-2">
                    <li>
                      Patent Strength Assessment: Evaluate patents based on technological
                      significance, coverage breadth, and enforceability.
                      <ul className="text-sm font-medium list-disc ml-2">
                        <li>
                          Impact: By positioning stronger patents at premium rates, anticipate a
                          revenue boost of 15-20%. This growth provides a solid base for future
                          fundraising endeavors.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Patent Strength Assessment: Evaluate patents based on technological
                      significance, coverage breadth, and enforceability.
                      <ul className="text-sm font-medium list-disc ml-2">
                        <li>
                          Impact: By positioning stronger patents at premium rates, anticipate a
                          revenue boost of 15-20%. This growth provides a solid base for future
                          fundraising endeavors.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-sm ">3. Adapt to Market Dynamics:</p>
                  <ul className="text-sm font-medium list-disc ml-2">
                    <li>
                      Patent Strength Assessment: Evaluate patents based on technological
                      significance, coverage breadth, and enforceability.
                      <ul className="text-sm font-medium list-disc ml-2">
                        <li>
                          Impact: By positioning stronger patents at premium rates, anticipate a
                          revenue boost of 15-20%. This growth provides a solid base for future
                          fundraising endeavors.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Patent Strength Assessment: Evaluate patents based on technological
                      significance, coverage breadth, and enforceability.
                      <ul className="text-sm font-medium list-disc ml-2">
                        <li>
                          Impact: By positioning stronger patents at premium rates, anticipate a
                          revenue boost of 15-20%. This growth provides a solid base for future
                          fundraising endeavors.
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="text-sm font-medium italic">
                  Disclaimer: These figures are speculative, rooted in the provided percentages.
                  Real-world outcomes may differ due to a plethora of external factors, including
                  market dynamics, regulatory changes, and competitive pressures. This product has
                  been supplied by Perceive now, Inc solely for use by its authorized licenses
                  strictly in accordance with their license agreements with Perceive now, Inc.
                  Perceive now, Inc makes no representation to any other person with regard to the
                  completeness or accuracy of the data or information contained herein, and it
                  accepts no responsibility and disclaims all liability (save for liability which
                  cannot be lawfully disclaimed) for loss or damage whatsoever suffered or incurred
                  by any other person resulting from the use of, or reliance upon, the data or
                  information contained herein. Copyright in this publication is owned by Perceive
                  now, Inc. The publication is sold on the basis that the purchaser agrees not to
                  copy the material contained within it for other than the purchaser's own purposes.
                  In the event that the purchaser uses or quotes from the material in this
                  publication – in papers, reports, or opinions prepared for any other person – it
                  is agreed that it will be sourced to: Perceive now, Inc.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[200px] flex-shrink-0">
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
