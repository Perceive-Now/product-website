// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";

// //
// import BarChart from "../../@product/bar-chart";
// import PieChart from "../../@product/pie-chart";
// import ScatterChart from "../../@product/scatter-chart";

// //
// import PageTitle from "../../reusable/page-title";
// import NoDataMessage from "../../reusable/no-data";
// import TimePeriod from "../../reusable/time-period";
// import DataSection from "../../reusable/data-section";
// import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

// //
// import { IPatent } from "../../../utils/api/charts";

// //
// import { getTimeperiod } from "../../../utils/helpers";

// /**
//  *
//  */
// export default function Patents(props: IPatentsProps) {
//   const [activeGraph, setActiveGraph] = useState<ChartType>("bar");

//   //
//   const [timeperiods, setTimeperiods] = useState<ITimePeriodItem[]>([]);
//   const [selectedTimeperiod, setSelectedTimeperiod] = useState<ITimePeriodItem | null>(null);

//   //
//   const [activeData, setActiveData] = useState<IPatent[]>([]);
//   const [hasActiveData, setHasActiveData] = useState(true);

//   // const { data, isLoading, isError, error } = useQuery(
//   //   ["patents-pie-chart", ...props.keywords],
//   //   async () => {
//   //     return await getPatentsPieChart(props.keywords);
//   //   },
//   //   { enabled: !!props.keywords.length },
//   // );

//   // Fetching time period
//   // useEffect(() => {
//   //   if (!data) return;

//   //   //
//   //   const sortedData = data.Computer.sort((a:any, b:any) => (a.year > b.year ? 1 : -1));
//   //   const endPatentYear = sortedData[0]?.year;

//   //   const timePeriods = getTimeperiod(endPatentYear);

//   //   //
//   //   setTimeperiods(timePeriods);
//   //   setSelectedTimeperiod(timePeriods[0]);
//   // }, [data]);

//   // Fetching data for selected time period
//   // useEffect(() => {
//   //   if (!data) return;
//   //   if (!selectedTimeperiod?.value) return;

//   //   //
//   //   const [startYear, endYear] = selectedTimeperiod.value.split("-");

//   //   //
//   //   const selectedData: IPatent[] = [];

//   //   //
//   //   for (let i = +startYear; i <= +endYear; i++) {
//   //     const item = data.Computer.find((item:any) => +item.year === i);

//   //     selectedData.push({
//   //       year: i.toString(),
//   //       count: (item?.count ?? 0).toString(),
//   //     });
//   //   }

//   //   //
//   //   const totalAmount = selectedData.reduce((prev, curr) => (prev += +curr.count), 0);

//   //   setHasActiveData(totalAmount > 0);

//   //   //
//   //   setActiveData(selectedData);
//   // }, [selectedTimeperiod, data]);

//   //
//   const barChartData = activeData ?? [];

//   //
//   const pieChartData = (activeData ?? []).map((item) => ({
//     id: item.year,
//     label: item.year,
//     value: item.count,
//   }));

//   //
//   const scatterChartData = [
//     {
//       id: "Patents",
//       data: (activeData ?? []).map((item) => ({
//         x: item.year,
//         y: item.count,
//       })),
//     },
//   ];

//   //
//   return (
//     <DataSection
//       keywords={props.keywords}
//       isLoading={isLoading}
//       isError={isError}
//       error={error}
//       title={
//         <PageTitle
//           title={props.title}
//           // info={`Stats in this graph are extracted from a total of "X" number of patents`}
//           titleClass="font-bold"
//         />
//       }
//     >
//       <div className="pt-1 flex items-center justify-end gap-x-3 h-5">
//         <div>
//           <TimePeriod
//             onChange={(item) => setSelectedTimeperiod(item)}
//             value={selectedTimeperiod}
//             timePeriods={timeperiods}
//           />
//         </div>

//         {/* <div className="flex items-center">
//           <ChartButtons activeChart={activeGraph} setActiveChart={setActiveGraph} />
//         </div> */}
//       </div>

//       {!hasActiveData && (
//         <div className="flex h-full justify-center items-center">
//           <NoDataMessage years={selectedTimeperiod?.value} />
//         </div>
//       )}
//       <PieChart data={pieChartData} />

//       {/* {hasActiveData && (
//         <>
//           {activeGraph === "bar" && (
//             <BarChart
//               data={barChartData ?? []}
//               keys={["count"]}
//               indexBy="year"
//               groupMode="stacked"
//               legendY="Number of Patents"
//             />
//           )}

//           {activeGraph === "donut" && <PieChart data={pieChartData} />}

//           {activeGraph === "scatter" && (
//             <ScatterChart data={scatterChartData} legendX="Years" legendY="Number of Patents" />
//           )}
//         </>
//       )} */}

//       {/* <div className="mt-4">
//         <Link to="/deep-search/patents">Read more</Link>
//       </div> */}
//     </DataSection>
//   );
// }

// interface IPatentsProps {
//   keywords: string[];
//   title: string;
// }

// const demoData = [
//   {
//     country: "AD",
//     "hot dog": 33,
//     "hot dogColor": "hsl(313, 70%, 50%)",
//     burger: 21,
//     burgerColor: "hsl(285, 70%, 50%)",
//     sandwich: 112,
//     sandwichColor: "hsl(80, 70%, 50%)",
//     kebab: 117,
//     kebabColor: "hsl(121, 70%, 50%)",
//     fries: 15,
//     friesColor: "hsl(13, 70%, 50%)",
//     donut: 146,
//     donutColor: "hsl(34, 70%, 50%)",
//   },
//   {
//     country: "AE",
//     "hot dog": 32,
//     "hot dogColor": "hsl(158, 70%, 50%)",
//     burger: 68,
//     burgerColor: "hsl(264, 70%, 50%)",
//     sandwich: 170,
//     sandwichColor: "hsl(12, 70%, 50%)",
//     kebab: 147,
//     kebabColor: "hsl(99, 70%, 50%)",
//     fries: 48,
//     friesColor: "hsl(325, 70%, 50%)",
//     donut: 154,
//     donutColor: "hsl(114, 70%, 50%)",
//   },
//   {
//     country: "AF",
//     "hot dog": 152,
//     "hot dogColor": "hsl(12, 70%, 50%)",
//     burger: 5,
//     burgerColor: "hsl(9, 70%, 50%)",
//     sandwich: 28,
//     sandwichColor: "hsl(2, 70%, 50%)",
//     kebab: 70,
//     kebabColor: "hsl(199, 70%, 50%)",
//     fries: 160,
//     friesColor: "hsl(129, 70%, 50%)",
//     donut: 93,
//     donutColor: "hsl(178, 70%, 50%)",
//   },
//   {
//     country: "AG",
//     "hot dog": 101,
//     "hot dogColor": "hsl(306, 70%, 50%)",
//     burger: 197,
//     burgerColor: "hsl(270, 70%, 50%)",
//     sandwich: 199,
//     sandwichColor: "hsl(200, 70%, 50%)",
//     kebab: 66,
//     kebabColor: "hsl(138, 70%, 50%)",
//     fries: 97,
//     friesColor: "hsl(215, 70%, 50%)",
//     donut: 120,
//     donutColor: "hsl(297, 70%, 50%)",
//   },
//   {
//     country: "AI",
//     "hot dog": 15,
//     "hot dogColor": "hsl(310, 70%, 50%)",
//     burger: 126,
//     burgerColor: "hsl(271, 70%, 50%)",
//     sandwich: 38,
//     sandwichColor: "hsl(271, 70%, 50%)",
//     kebab: 65,
//     kebabColor: "hsl(173, 70%, 50%)",
//     fries: 114,
//     friesColor: "hsl(135, 70%, 50%)",
//     donut: 66,
//     donutColor: "hsl(155, 70%, 50%)",
//   },
//   {
//     country: "AL",
//     "hot dog": 86,
//     "hot dogColor": "hsl(299, 70%, 50%)",
//     burger: 96,
//     burgerColor: "hsl(323, 70%, 50%)",
//     sandwich: 87,
//     sandwichColor: "hsl(151, 70%, 50%)",
//     kebab: 73,
//     kebabColor: "hsl(298, 70%, 50%)",
//     fries: 159,
//     friesColor: "hsl(62, 70%, 50%)",
//     donut: 102,
//     donutColor: "hsl(247, 70%, 50%)",
//   },
//   {
//     country: "AM",
//     "hot dog": 132,
//     "hot dogColor": "hsl(20, 70%, 50%)",
//     burger: 59,
//     burgerColor: "hsl(330, 70%, 50%)",
//     sandwich: 76,
//     sandwichColor: "hsl(285, 70%, 50%)",
//     kebab: 104,
//     kebabColor: "hsl(31, 70%, 50%)",
//     fries: 112,
//     friesColor: "hsl(126, 70%, 50%)",
//     donut: 11,
//     donutColor: "hsl(35, 70%, 50%)",
//   },
// ];

import React from "react";

const patents = () => {
  return <div>patents</div>;
};

export default patents;
