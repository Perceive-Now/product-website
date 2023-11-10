import { ResponsiveHeatMap } from "@nivo/heatmap";
import { FunctionComponent } from "react";

import { COLORS } from "../../../utils/constants";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export const HeatMap: FunctionComponent<Props> = ({ data }) => {
  return (
    <div className="h-[600px]">
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 200, bottom: 60, left: 200 }}
        valueFormat=">-.2s"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: "",
          legendOffset: 46,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: "country",
          legendPosition: "middle",
          legendOffset: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          // legend: "country",
          legendPosition: "middle",
          legendOffset: -72,
        }}
        colors={{
          type: "sequential",
          scheme: "purple_blue",
          // scheme:"#442873",
          // divergeAt: 0.15,
          minValue: -100000,
          maxValue: 100000,
        }}
        emptyColor="#442873"
        //   labelTextColor={{
        //     from: 'color',
        //     modifiers: [
        //         [
        //             'brighter',
        //             2
        //         ]
        //     ]
        // }}
        // legends={[
        //   {
        //     anchor: "bottom",
        //     translateX: 0,
        //     translateY: 30,
        //     length: 400,
        //     thickness: 8,
        //     direction: "row",
        //     tickPosition: "after",
        //     tickSize: 3,
        //     tickSpacing: 4,
        //     tickOverlap: false,
        //     tickFormat: ">-.2s",
        //     title: "Value →",
        //     titleAlign: "start",
        //     titleOffset: 4,
        //   },
        // ]}
      />
    </div>
  );
};

// const datas = [
//   {
//     id: "Japan",
//     data: [
//       {
//         x: "Train",
//         y: 0,
//       },
//       {
//         x: "Subway",
//         y: 61803,
//       },
//       {
//         x: "Bus",
//         y: -607,
//       },
//       {
//         x: "Car",
//         y: 17194,
//       },
//       {
//         x: "Boat",
//         y: -19897,
//       },
//       {
//         x: "Moto",
//         y: -28499,
//       },
//       {
//         x: "Moped",
//         y: 1836,
//       },
//       {
//         x: "Bicycle",
//         y: -73106,
//       },
//       {
//         x: "Others",
//         y: 95437,
//       },
//     ],
//   },
//   {
//     id: "France",
//     data: [
//       {
//         x: "Train",
//         y: -54340,
//       },
//       {
//         x: "Subway",
//         y: 53958,
//       },
//       {
//         x: "Bus",
//         y: 47145,
//       },
//       {
//         x: "Car",
//         y: 26866,
//       },
//       {
//         x: "Boat",
//         y: -21821,
//       },
//       {
//         x: "Moto",
//         y: 72673,
//       },
//       {
//         x: "Moped",
//         y: -63805,
//       },
//       {
//         x: "Bicycle",
//         y: -95614,
//       },
//       {
//         x: "Others",
//         y: -2780,
//       },
//     ],
//   },
//   {
//     id: "US",
//     data: [
//       {
//         x: "Train",
//         y: 90074,
//       },
//       {
//         x: "Subway",
//         y: 15851,
//       },
//       {
//         x: "Bus",
//         y: -10930,
//       },
//       {
//         x: "Car",
//         y: -71102,
//       },
//       {
//         x: "Boat",
//         y: 48503,
//       },
//       {
//         x: "Moto",
//         y: -83772,
//       },
//       {
//         x: "Moped",
//         y: -79220,
//       },
//       {
//         x: "Bicycle",
//         y: -1773,
//       },
//       {
//         x: "Others",
//         y: -14173,
//       },
//     ],
//   },
//   {
//     id: "Germany",
//     data: [
//       {
//         x: "Train",
//         y: -32251,
//       },
//       {
//         x: "Subway",
//         y: 12130,
//       },
//       {
//         x: "Bus",
//         y: -77262,
//       },
//       {
//         x: "Car",
//         y: 5663,
//       },
//       {
//         x: "Boat",
//         y: -8994,
//       },
//       {
//         x: "Moto",
//         y: 28201,
//       },
//       {
//         x: "Moped",
//         y: 98693,
//       },
//       {
//         x: "Bicycle",
//         y: -3339,
//       },
//       {
//         x: "Others",
//         y: 94989,
//       },
//     ],
//   },
//   {
//     id: "Norway",
//     data: [
//       {
//         x: "Train",
//         y: -44924,
//       },
//       {
//         x: "Subway",
//         y: -15603,
//       },
//       {
//         x: "Bus",
//         y: 58176,
//       },
//       {
//         x: "Car",
//         y: -22882,
//       },
//       {
//         x: "Boat",
//         y: -60956,
//       },
//       {
//         x: "Moto",
//         y: 18125,
//       },
//       {
//         x: "Moped",
//         y: 33242,
//       },
//       {
//         x: "Bicycle",
//         y: 38926,
//       },
//       {
//         x: "Others",
//         y: -4830,
//       },
//     ],
//   },
// ];
// [
//   {
//     "year": 1976.0,
//     "org": "a",
//     "count": 4
//   },
//   {
//     "year": 1976.0,
//     "org": "bb",
//     "count": 4
//   },
//   {
//     "year": 1977.0,
//     "org": "c",
//     "count": 4
//   },
//   {
//     "year": 1977.0,
//     "org": "d",
//     "count": 4
//   },
//   {
//     "year": 1978.0,
//     "org": "e",
//     "count": 4
//   },
//   {
//     "year": 1978.0,
//     "org": "f",
//     "count": 4
//   },
// ]
// [
//   {
//     year: 1976,
//     a: 4,
//     bb: 5

//   },
//   {
//     year: 1977,
//     c: 4,
//     d: 4

//   },
//   {
//     year:1978,
//     e:4,
//   }
// ]
