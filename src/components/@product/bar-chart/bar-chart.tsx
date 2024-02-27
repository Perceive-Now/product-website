/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

//
import { formatNumber } from "../../../utils/helpers";
import classNames from "classnames";

interface BarLabelColors {
  [key: string]: string;
}
/**
 *
 */
export default function BarChart(props: IBarChartProps) {
  const [dataItems, setDataItems] = useState(props.data);

  useEffect(() => {
    setDataItems(props.data);
  }, [props.data]);

  //
  // const barPadding = props.groupMode === "stacked" ? 0.8 : 0.4;
  const barPadding = props.layout === "horizontal" ? 0.7 : 0.7;

  const colorByLabel: BarLabelColors = {
    "2023": "#442873",
    "2022": "#533F73",
    "2021": "#41178B",
    "2020": "#541DB2",
    "2019": "#5C20C4",
    "2018": "#7D4DD0",
    "2017": "#926AD7",
    "2016": "#B498E4",
    "2015": "#CCBAED",
    "2014": "#EFE9F9",
    // "2015": "#EFE9F9",
  };

  // const customLegend =[
  //   {
  //     label
  //   }
  //   "2023":
  //    "#442873",
  //   "2022": "#533F73",
  //   "2021": "#41178B",
  //   "2020": "#541DB2",
  //   "2019": "#5C20C4",
  //   "2018": "#7D4DD0",
  //   "2017": "#926AD7",
  //   "2016": "#B498E4",
  //   "2015": "#CCBAED",
  //   "2014": "#EFE9F9",
  // ]

  const getColor = (bar: any) => colorByLabel[bar.data.label];

  const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const HEATMAP_COLORS = [
    { range: "180+", color: "bg-[#442873]" },
    { range: "160", color: "bg-[#533F73]" },
    { range: "140", color: "bg-[#41178B]" },
    { range: "120", color: "bg-[#541DB2]" },
    { range: "100", color: "bg-[#5C20C4]" },
    { range: "80", color: "bg-[#7D4DD0]" },
    { range: "60", color: "bg-[#926AD7]" },
    { range: "40", color: "bg-[#B498E4]" },
    { range: "20", color: "bg-[#CCBAED]" },
    { range: "0", color: "bg-[#EFE9F9]" },
  ];

  //
  return (
    <div
      className={classNames(
        props.layout === "horizontal"
          ? `${props.height !== undefined ? props.height : "h-[400px]"}`
          : "h-[400px] ",
        "3xl:w-[1000px] max-w-[] mx-auto whitespace-nowrap relative",
      )}
      // style={{ width: "100%", overflowX: "auto" }}
    >
      <ResponsiveBar
        data={dataItems}
        keys={props.keys}
        indexBy={props.indexBy}
        margin={{
          top: 20,
          right: 100,
          left: props.layout === "horizontal" ? 250 : 100,
          // bottom: props.legendX ? 50 : 30,
          bottom: props.layout === "horizontal" ? 100 : 30,
        }}
        padding={barPadding}
        innerPadding={props.innerPadding !== undefined ? props.innerPadding : 4}
        groupMode={props.groupMode || "grouped"}
        borderRadius={props.borderRadius !== undefined ? props.borderRadius : 4}
        valueScale={{ type: "linear", clamp: true }}
        indexScale={{ type: "band", round: true }}
        axisTop={null}
        axisRight={null}
        layout={props.layout !== undefined ? props.layout : "vertical"}
        {...(props.legendX && {
          axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // legend: props.legendX,
            legendPosition: "middle",
            legendOffset: 40,
            truncateTickAt: 10,
            // truncateTickAt: (tick) => {
            //   // Split the label at the first space
            //   const spaceIndex = tick.indexOf(' ');
            //   if (spaceIndex !== -1) {
            //     return tick.slice(0, spaceIndex);
            //   }
            //   return tick;
            // },
            // format: (v) => {
            //   const label = v.substring(0, 10) + "...";
            //   return (
            //     <g transform={`translate(${v.x},${v.y})`}>
            //       <text
            //         textAnchor="middle"
            //         fontSize={12}
            //         fontWeight="bold"
            //         fill="green"
            //         fontFamily="Arial, sans-serif"
            //       >
            //         {label}
            //       </text>
            //     </g>
            //   );
            // },
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
            legendOffset: props.layout === "horizontal" ? -200 : -70,
          },
        })}
        // legends={props.legends}
        enableLabel={props.label !== undefined ? props.label : false}
        labelTextColor={{
          from: "color",
          modifiers: [["brighter", 5]],
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={false}
        role="application"
        colors={getColor}
        // colors={props.color || COLORS.slice(9 - props.keys.length)}
        // colors={(bar) => {
        //   const value = bar.data.;
        //   if (value < 10) return colorRange[0];
        //   else if (value < 20) return colorRange[1];
        //   else if (value < 30) return colorRange[2];
        //   else if (value < 40) return colorRange[3];
        //   else return colorRange[4];
        // }}
        // colors={COLORS.slice(9 - 2)}
        tooltip={(item: { value: number; label: string }) => (
          <div className="bg-white border border-gray-400 rounded-lg text-sm px-2 py-1">
            {formatNumber(item.value)}
          </div>
        )}
        theme={{
          axis: {
            legend: {
              text: { fontSize: 16 },
            },
          },
        }}
      />
      {props.legends === "range" && (
        <div className="flex flex-col justify-center items-end mt-1 absolute top-0 right-0 z- bg-blac w-full h-full gap-[0.5px]">
          {COLOR_GROUPS.map((grp) => (
            <div key={grp} className="flex items-center gap-2">
              <span className="text-[8px] font-medium italic">{HEATMAP_COLORS[grp].range}</span>
              <div className={classNames("h-4 w-1 shadow shrink-0", HEATMAP_COLORS[grp].color)} />
            </div>
          ))}
        </div>
      )}
      {props.legends === "legend" && (
        <div className="flex flex-col justify-center items-end mt-1 absolute top-0 right-0 bg-blac w-full h-full gap-1">
          {dataItems.map((grp) => (
            <div key={grp} className="flex items-center gap-1">
              <div
                className={classNames("h-2 w-2 shadow shrink-0", `bg-[${colorByLabel[grp.label]}]`)}
              />
              <span className="text-[8px] font-medium italic">{grp.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface IBarChartProps {
  data: any[];
  keys: string[];
  innerPadding?: number;
  borderRadius?: number;
  marginRight?: number;
  marginLeft?: number;
  indexBy: string;
  legendY?: string;
  legendX?: string;
  legends?: "range" | "legend" | any;
  layout?: "horizontal" | "vertical";
  groupMode?: "grouped" | "stacked" | undefined;
  onClick?: (item: any) => void;
  label?: boolean;
  height?: string;
  color?: any;
}
