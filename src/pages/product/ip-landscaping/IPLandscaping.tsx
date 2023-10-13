// import { useSearchParams } from 'react-router-dom';
// import SubHeader from "../../../components/app/sub-header";
import Search, { IKeywordOption } from "../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setDashboardSearch } from "../../../stores/dashboard";
import Patents from "../../../components/@dashboard/patents";
// import CommonList from "../../../components/@dashboard/common-list";
import { DummyData } from "../../../components/@dashboard/common-list/dummy_data";
import FootprintHeatmap from "../../../components/@dashboard/footprint-heatmap";
// import { Menu } from "@headlessui/react";
import FilterList from "../../../components/reusable/filter/FiilterList";
import { BookmarkIcon } from "../../../components/icons";
import PDFIcon from "../../../components/icons/miscs/Pdf";
import Sunburst from "../../../components/@dashboard/sunburst";
import BarChart from "../../../components/@product/bar-chart";
import TreeMap from "../../../components/@product/tree-map";
// import AreaBump from "../../../components/@product/area-bump";
import Sankey from "../../../components/@product/sankey";
import ScatterChart from "../../../components/@product/scatter-chart";
import HeatMap from "../../../components/@product/heat-map";
// import { useState } from "react";
// import Button from "../../../components/reusable/button";

const IPLandscaping = () => {
  const dispatch = useAppDispatch();
  // const [searchParams] = useSearchParams();
  // const paramsClassification: string | null = searchParams.get("mode");

  //
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search) ?? [];
  const filteredKeywords = useAppSelector((state) => state.date?.filter) ?? [];

  const keywords = searchedKeywords.map((kwd) => kwd.value);
  const filterKeywords = filteredKeywords.map((flt) => flt).join(" - ");

  const joinedkeywords = keywords.join(", ");

  // console.log(filterKeywords)

  //
  const joinedKeywords = searchedKeywords.map((kwd) => `"${kwd.value}"`).join(", ");

  const keywordValue = searchedKeywords.map((kwd) => kwd.value);

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };
  // const [isOverlayVisible, setOverlayVisible] = useState(false);

  return (
    <div>
      <div>
        <div className="bg-appGray-200 flex justify-between items-center mb-1 pl-2 rounded-md">
          <div className="flex items-center justify-center gap-1 py-1">
            <p className="text-lg text-primary-900 fw-600">IP Landscaping</p>
          </div>
        </div>
      </div>
      {/* Search bar */}
      <div className="grid grid-cols-8 mb-2">
        <div className="col-span-7">
          <Search
            required
            size="small"
            className="w-full z-30"
            onSubmit={handleSearch}
            initialValue={searchedKeywords}
          />

          {keywords.length > 0 ? (
            <p className="mt-[4px]">
              <span>Showing patents for: </span>
              <span className="font-semibold">"{joinedkeywords}"</span>&nbsp;
              {filteredKeywords.length > 0 && <span>{filterKeywords}</span>}
            </p>
          ) : (
            <p className="mt-[4px] text-appGray-900">
              Search keywords e.g. “COVID-19” to see related patents.
            </p>
          )}
        </div>
      </div>
      <div className="flex  gap-2">
        <div className="flex-shrink-0 w-[260px]">
          <div className="px-1 py-1 bg-white shadow rounded-lg relative">
            <div className="rounded-none rounded-t-lg w-full flex justify-between items-center bg-primary-900 py-[12px] px-[16px] text-white">
              <span>Filter</span>
            </div>
            <div className="">
              <FilterList filters={DateFiltersLists} filterName={"Date"} />
              <FilterList filters={countryLists} filterName={"Country"} />
              <FilterList filters={DateFiltersLists} filterName={"Legal Status"} />
              <FilterList filters={DateFiltersLists} filterName={"Type"} />
              <FilterList filters={DateFiltersLists} filterName={"Art group"} />
              <FilterList filters={DateFiltersLists} filterName={"Classification"} />
              <FilterList filters={DateFiltersLists} filterName={"Jurisdiction"} />
              <FilterList filters={DateFiltersLists} filterName={"Inventor"} />
              <FilterList filters={DateFiltersLists} filterName={"Applicant"} />
              <FilterList filters={DateFiltersLists} filterName={"Patent Owner"} />
              <FilterList filters={DateFiltersLists} filterName={"Agents/ Attorney"} />
            </div>
          </div>
          <div className="bg-white shadow rounded-lg mt-3">
            <div className="rounded-none rounded-t-lg w-full flex justify-between items-center bg-primary-900 py-[12px] px-[16px] text-white">
              <span>Related Keywords</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              {relatedKeywords.map((k, idx) => (
                <span
                  key={idx}
                  className="mt-1 text-primary-900 font-semibold bg-appGray-100 px-2 py-1 rounded-full"
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className=" shadow-lg p-2 w-full">
            <div>
              <h4 className="text-xl font-semibold text-primary-900">Patent landscaping</h4>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <Patents
                    key={joinedKeywords}
                    keywords={keywordValue}
                    title={"Patent distribution of associated keywords by year"}
                  />
                </div>
                <div>
                  <h6 className="text-xl font-semibold text-primary-900">Key takeaways</h6>
                  {/* <CommonList dataList={DummyData} /> */}
                  <ul className="list-disc	">
                    {DummyData.map((d, idx) => (
                      <li key={idx} className="mt-0.5">
                        {d.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <Patents
                    key={joinedKeywords}
                    keywords={keywordValue}
                    title={"Patent filing trend"}
                  />
                </div>
                <div>
                  <h6 className="text-xl font-semibold text-primary-900">Key takeaways</h6>
                  {/* <CommonList dataList={DummyData} /> */}
                  <ul className="list-disc	">
                    {DummyData.map((d, idx) => (
                      <li key={idx} className="mt-0.5">
                        {d.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="">
                <FootprintHeatmap keywords={keywordValue} />
                <div>
                  <h6 className="text-xl font-semibold text-primary-900">Key takeaways</h6>
                  {/* <CommonList dataList={DummyData} /> */}
                  <ul className="list-disc	ml-3">
                    {DummyData.map((d, idx) => (
                      <li key={idx} className="mt-0.5">
                        {d.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                {/* <Patents key={joinedKeywords} keywords={keywordValue} title={"Top 5 states based on patent filings"} />
                 */}
                <h6 className="text-xl font-semibold text-primary-900">
                  Top 5 states based on patent filings
                </h6>

                <BarChart
                  data={demoData}
                  // data={barChartData ?? []}
                  // keys={["count"]}
                  keys={[
                    "hot dog",
                    // 'burger',
                    // 'sandwich',
                    // 'kebab',
                    // 'fries',
                    // 'donut'
                  ]}
                  // indexBy="year"
                  indexBy="country"
                  groupMode="stacked"
                  legendY="Number of Patents"
                />
                <ul className="list-disc	ml-3 mt-6">
                  {DummyData.map((d, idx) => (
                    <li key={idx} className="mt-0.5">
                      {d.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="">
                <div className="">
                  <h6 className="text-xl font-semibold text-primary-900">
                    Patent landscape overview
                  </h6>
                  <Sunburst />
                </div>
                <div>
                  <h6 className="text-xl font-semibold text-primary-900">Summary</h6>
                  {/* <CommonList dataList={DummyData} /> */}
                  <ul className="list-disc	ml-3">
                    {DummyData.map((d, idx) => (
                      <li key={idx} className="mt-0.5">
                        {d.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <TreeMap />
                {/* <Patents key={joinedKeywords} keywords={keywordValue} title={"Top 5 states based on patent filings"} /> */}

                <ul className="list-disc	ml-3 mt-6">
                  {DummyData.map((d, idx) => (
                    <li key={idx} className="mt-0.5">
                      {d.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="shadow-custom p-2 w-full mt-4">
            <h6 className="text-xl font-semibold text-primary-900">Company landscape</h6>
            <Sankey />
          </div>
          <div className="shadow-custom p-2 w-full mt-4">
            <h6 className="text-xl font-semibold text-primary-900">Keyword analysis</h6>
            <BarChart
              data={demoData}
              // data={barChartData ?? []}
              // keys={["count"]}
              keys={[
                "sandwich",
                // 'burger',
                // 'sandwich',
                // 'kebab',
                // 'fries',
                // 'donut'
              ]}
              // indexBy="year"
              indexBy="country"
              groupMode="stacked"
              legendY="Number of Patents"
            />
            <div className="grid grid-cols-2 mt-1">
              <div>
                <h6 className="text-xl font-semibold text-primary-900">Summary</h6>
                <ul className="list-disc	ml-3 mt-1">
                  {DummyData.map((d, idx) => (
                    <li key={idx} className="mt-0.5">
                      {d.description}
                    </li>
                  ))}
                </ul>
              </div>
              <div></div>
            </div>
          </div>
          <div className="shadow-custom p-2 w-full mt-4">
            <h6 className="text-xl font-semibold text-primary-900">
              Portfolio strength and growth
            </h6>
            <ScatterChart data={lineData} legendY="Number of patent claims" />
            <div className="grid grid-cols-2 mt-1">
              <div>
                <h6 className="text-xl font-semibold text-primary-900">Summary</h6>
                <ul className="list-disc	ml-3 mt-1">
                  {DummyData.map((d, idx) => (
                    <li key={idx} className="mt-0.5">
                      {d.description}
                    </li>
                  ))}
                </ul>
              </div>
              <div></div>
            </div>
          </div>
          {/* heatmap */}
          <div className="shadow-custom p-2 w-full mt-4">
            <h6 className="text-xl font-semibold text-primary-900">Technology trends</h6>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <h6 className="text-xl font-semibold text-primary-900">
                  Patent filing over time against technology advancement
                </h6>
                <HeatMap />
              </div>
              <div>
                <h6 className="text-xl font-semibold text-primary-900">Key takeaway</h6>
                <ul className="list-disc	ml-3 mt-3">
                  {DummyData.map((d, idx) => (
                    <li key={idx} className="mt-0.5">
                      {d.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="shadow-custom p-2 w-full mt-4">
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <h6 className="text-xl font-semibold text-primary-900">
                  Upcoming expiring patents
                </h6>
                <ScatterChart data={lineData} legendY="Number of patent claims" />
              </div>
              <div>
                <h6 className="text-xl font-semibold text-primary-900">Summary</h6>
                <ul className="list-disc	ml-3 mt-3">
                  {DummyData.map((d, idx) => (
                    <li key={idx} className="mt-0.5">
                      {d.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-[200px]">
          <div className="shadow-lg p-1 space-y-2">
            <button className="flex justify-between w-full">
              <span>Create Report</span>
              <span>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_909_23689)">
                    <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM11.5 9.5C11.5 10.33 10.83 11 10 11H9V13H7.5V7H10C10.83 7 11.5 7.67 11.5 8.5V9.5ZM16.5 11.5C16.5 12.33 15.83 13 15 13H12.5V7H15C15.83 7 16.5 7.67 16.5 8.5V11.5ZM20.5 8.5H19V9.5H20.5V11H19V13H17.5V7H20.5V8.5ZM9 9.5H10V8.5H9V9.5ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM14 11.5H15V8.5H14V11.5Z" fill="#636567" />
                  </g>
                  <defs>
                    <clipPath id="clip0_909_23689">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg> */}
                <PDFIcon className="text-gray-600" />
              </span>
            </button>
            <button className="flex justify-between w-full">
              <span>Save</span>
              <span>
                <BookmarkIcon />
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_909_23689)">
                    <path d="M20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM11.5 9.5C11.5 10.33 10.83 11 10 11H9V13H7.5V7H10C10.83 7 11.5 7.67 11.5 8.5V9.5ZM16.5 11.5C16.5 12.33 15.83 13 15 13H12.5V7H15C15.83 7 16.5 7.67 16.5 8.5V11.5ZM20.5 8.5H19V9.5H20.5V11H19V13H17.5V7H20.5V8.5ZM9 9.5H10V8.5H9V9.5ZM4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM14 11.5H15V8.5H14V11.5Z" fill="#636567" />
                  </g>
                  <defs>
                    <clipPath id="clip0_909_23689">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg> */}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPLandscaping;

const DateFiltersLists = [
  "Published Date",
  "Filing Date",
  "Earliest Priority Date",
  "Granted Date",
];
const countryLists = ["Nepal", "China", "India"];

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
    "hot dogColor": "hsl(20, 70%, 50%)",
    burger: 59,
    burgerColor: "hsl(330, 70%, 50%)",
    sandwich: 76,
    sandwichColor: "hsl(285, 70%, 50%)",
    kebab: 104,
    kebabColor: "hsl(31, 70%, 50%)",
    fries: 112,
    friesColor: "hsl(126, 70%, 50%)",
    donut: 11,
    donutColor: "hsl(35, 70%, 50%)",
  },
];

const lineData = [
  {
    id: "japan",
    color: "hsl(51, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 64,
      },
      {
        x: "helicopter",
        y: 6,
      },
      {
        x: "boat",
        y: 38,
      },
      {
        x: "train",
        y: 125,
      },
      {
        x: "subway",
        y: 216,
      },
      {
        x: "bus",
        y: 235,
      },
      {
        x: "car",
        y: 129,
      },
      {
        x: "moto",
        y: 200,
      },
      {
        x: "bicycle",
        y: 246,
      },
      {
        x: "horse",
        y: 255,
      },
      {
        x: "skateboard",
        y: 205,
      },
      {
        x: "others",
        y: 254,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(193, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 141,
      },
      {
        x: "helicopter",
        y: 75,
      },
      {
        x: "boat",
        y: 283,
      },
      {
        x: "train",
        y: 2,
      },
      {
        x: "subway",
        y: 225,
      },
      {
        x: "bus",
        y: 159,
      },
      {
        x: "car",
        y: 36,
      },
      {
        x: "moto",
        y: 241,
      },
      {
        x: "bicycle",
        y: 260,
      },
      {
        x: "horse",
        y: 293,
      },
      {
        x: "skateboard",
        y: 224,
      },
      {
        x: "others",
        y: 134,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(7, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 119,
      },
      {
        x: "helicopter",
        y: 206,
      },
      {
        x: "boat",
        y: 108,
      },
      {
        x: "train",
        y: 132,
      },
      {
        x: "subway",
        y: 160,
      },
      {
        x: "bus",
        y: 266,
      },
      {
        x: "car",
        y: 112,
      },
      {
        x: "moto",
        y: 204,
      },
      {
        x: "bicycle",
        y: 231,
      },
      {
        x: "horse",
        y: 240,
      },
      {
        x: "skateboard",
        y: 23,
      },
      {
        x: "others",
        y: 27,
      },
    ],
  },
];
