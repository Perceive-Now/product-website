import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";

//
import { COLORS } from "../../../utils/constants";
import { abbreviateString, formatNumber } from "../../../utils/helpers";

/*
 *
 **/
export default function ScatterChart(props: IScatterChartProps) {
  const [dataItems, setDataItems] = useState(props.data);

  useEffect(() => {
    setDataItems(props.data);
  }, [props.data]);

  return (
    <div className="h-[400px] w-[668px] mx-auto">
      <ResponsiveLine
        data={dataItems}
        margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        enableSlices="x"
        axisTop={null}
        axisBottom={{
          tickPadding: 20,
        }}
        axisRight={null}
        {...(props.legendX && {
          axisBottom: {
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: props.legendX,
            legendPosition: "middle",
            legendOffset: 36,
            format: (value) => {
              if (props.abbreviateLegendX) {
                return abbreviateString(value);
              } else {
                return value;
              }
            },
          },
        })}
        {...(props.legendY && {
          axisLeft: {
            // format: (value) => formatNumber(value),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: props.legendY,
            legendPosition: "middle",
            legendOffset: -50,
          },
        })}
        lineWidth={1}
        pointSize={6}
        // pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={"#7F4BD8"}
        pointLabelYOffset={-12}
        useMesh={true}
        enableArea={false}
        areaBaselineValue={0}
        enableGridX={false}
        // areaOpacity={1}
        // colors={{ scheme: "purples" }}
        colors={props.colors || COLORS}
        theme={{
          axis: {
            legend: {
              text: { fontSize: 16 },
            },
          },
        }}
        // legends={[
        //   {
        //     anchor: "top-left",
        //     direction: "row",
        //     justify: false,
        //     translateX: 0,
        //     translateY: -40,
        //     itemsSpacing: 30,
        //     itemDirection: "left-to-right",
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: "circle",
        //     symbolBorderColor: "rgba(0, 0, 0, .5)",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemBackground: "rgba(0, 0, 0, .03)",
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
      {/* <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        xFormat=" >-"
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 20,
          tickPadding: 10,
          tickRotation: 0,
          legend: props.legendX,
          legendOffset: 29,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: props.legendY,
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        // {...(props.legendX && {
        //   axisBottom: {
        //     tickSize: 10,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: props.legendX,
        //     legendPosition: "middle",
        //     legendOffset: 29,
        //     // format: (value) => {
        //     //   if (props.abbreviateLegendX) {
        //     //     return abbreviateString(value);
        //     //   } else {
        //     //     return value;
        //     //   }
        //     // },
        //   },
        // })}
        // {...(props.legendY && {
        //   axisLeft: {
        //     // format: (value) => formatNumber(value),
        //     tickSize: 5,
        //     tickPadding: 5,
        //     tickRotation: 0,
        //     legend: props.legendY,
        //     legendPosition: "middle",
        //     legendOffset: -50,
        //   },
        // })}
        lineWidth={0}
        pointSize={10}
        pointColor="black"
        pointBorderWidth={2}
        pointBorderColor={"#1BF599"}
        pointLabelYOffset={-24}
        enableArea={true}
        areaOpacity={1}
        useMesh={true}
        colors={props.colors || COLORS}
        // legends={[
        //   {
        //     anchor: 'bottom-right',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: 'left-to-right',
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: 'circle',
        //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemBackground: 'rgba(0, 0, 0, .03)',
        //           itemOpacity: 1
        //         }
        //       }
        //     ]
        //   }
        // ]}
      /> */}
    </div>
  );
}

interface IScatterChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  colors?: string[];
  legendY?: string;
  legendX?: string;
  abbreviateLegendX?: boolean | undefined;
}

// const data = [
//   {
//     id: "japan",
//     color: "hsl(243, 70%, 50%)",
//     data: [
//       {
//         x: "plane",
//         y: 109,
//       },
//       {
//         x: "helicopter",
//         y: 249,
//       },
//       {
//         x: "boat",
//         y: 14,
//       },
//       {
//         x: "train",
//         y: 31,
//       },
//       {
//         x: "subway",
//         y: 162,
//       },
//       {
//         x: "bus",
//         y: 13,
//       },
//       {
//         x: "car",
//         y: 242,
//       },
//       {
//         x: "moto",
//         y: 113,
//       },
//       {
//         x: "bicycle",
//         y: 27,
//       },
//       {
//         x: "horse",
//         y: 45,
//       },
//       {
//         x: "skateboard",
//         y: 278,
//       },
//       {
//         x: "others",
//         y: 257,
//       },
//     ],
//   },
// ];
