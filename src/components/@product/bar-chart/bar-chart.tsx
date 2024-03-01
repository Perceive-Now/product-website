/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { ComputedDatum } from "@nivo/bar";

//
import { formatNumber } from "../../../utils/helpers";
import classNames from "classnames";

interface BarLabelColors {
  [key: string]: string;
}
// const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// const HEATMAP_SECTIONS = 10;

type GetColorFunction = (bar: ComputedDatum<any>) => string;

/**
 *
 */
export default function BarChart(props: IBarChartProps) {
  const [dataItems, setDataItems] = useState(props.data);

  useEffect(() => {
    setDataItems(props.data);
  }, [props.data]);

  const barPadding = props.layout === "horizontal" ? 0.5 : 0.5;

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
  };

  const COLOR_RANGE = [
    "#5C1FC4",
    "#CCBAED",
    "#926AD7",
    "#7F4BD8",
    "#B6A2D8",
    "#7D4DD0",
    "#5C20C4",
    "#5C1FC4",
    "#533F73",
    "#442873",
  ];

  // const getRangeForPatents = (data?: any) => {
  //   if (!data?.length) return [];

  //   const maxVal =
  //     (data ?? []).sort((a: any, b: any) => (b.patents ?? 0) - (a.patents ?? 0))[0].patents ?? 0;
  //   const maxValue = Math.ceil(maxVal / 100) * 100;

  //   const tempValue = maxValue / HEATMAP_SECTIONS;

  //   const midValues = [];
  //   for (let i = 1; i < HEATMAP_SECTIONS; i++) {
  //     midValues.push(Math.floor(tempValue * i));
  //   }

  //   const values = [...midValues, maxValue];

  //   return [0, ...values];
  // };

  // const getFillColor = (geo?: any) => {
  //   let currentStateValue = 0;
  //   const allValues = getRangeForPatents(props.data);
  //   //
  //   currentStateValue =
  //     props.data?.find((itm) => itm.country?.toLowerCase() === geo?.properties?.name?.toLowerCase())
  //       ?.patents ?? 0;

  //   if (currentStateValue === 0) return "#E1D5F2";
  //   //
  //   for (let i = 0; i <= COLOR_RANGE.length; i++) {
  //     if (currentStateValue < allValues[i]) {
  //       return COLOR_RANGE[i];
  //     }
  //   }
  //   return;
  // };

  //
  // const barPadding = props.groupMode === "stacked" ? 0.8 : 0.4;

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

  const getColor: GetColorFunction = (bar) => {
    if (props.legends === "legend") {
      return colorByLabel[bar.data.label] || "";
    } else if (props.legends === "range") {
      const value = bar.data.count;
      if (value < 10) return COLOR_RANGE[0];
      else if (value < 20) return COLOR_RANGE[1];
      else if (value < 40) return COLOR_RANGE[2];
      else if (value < 60) return COLOR_RANGE[3];
      else if (value < 80) return COLOR_RANGE[4];
      else if (value < 100) return COLOR_RANGE[5];
      else if (value < 120) return COLOR_RANGE[6];
      else if (value < 140) return COLOR_RANGE[7];
      else if (value < 160) return COLOR_RANGE[8];
      else if (value < 180) return COLOR_RANGE[9];
      else return COLOR_RANGE[9];
    } else {
      return "";
    }
  };

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
    <div className="relative">
      <div
        className={classNames(
          props.layout === "horizontal"
            ? `${props.height !== undefined ? props.height : "h-[400px]"}`
            : "h-[400px] ",
          "3xl:w-[1000px] w-[600px] 2xl:max-w-[800px] mx-auto whitespace-nowrap overflow-x-auto pn_scroller",
        )}
      >
        <ResponsiveBar
          // height={400}
          // width={dataItems.length > 10 ? 2000 : 800}
          data={dataItems}
          keys={props.keys}
          indexBy={props.indexBy}
          margin={{
            top: 20,
            right: 100,
            left: props.layout === "horizontal" ? 180 : 100,
            // bottom: props.legendX ? 50 : 30,
            bottom: props.layout === "horizontal" ? 20 : 30,
          }}
          enableGridY={false}
          padding={barPadding}
          innerPadding={props.innerPadding !== undefined ? props.innerPadding : 4}
          groupMode={props.groupMode || "grouped"}
          borderRadius={props.borderRadius !== undefined ? props.borderRadius : 4}
          valueScale={{ type: "linear", clamp: true }}
          indexScale={{ type: "band", round: true }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 0,
          }}
          layout={props.layout !== undefined ? props.layout : "vertical"}
          {...(props.legendX && {
            axisBottom: {
              tickSize: 0,
              // tickPadding: 0,
              // tickRotation: 0,
              legend: props.legendX,
              legendPosition: "middle",
              legendOffset: 20,
              truncateTickAt: 0,
              tickValues: [],
            },
          })}
          {...(props.legendY && {
            axisLeft: {
              // format: (value) => formatNumber(value),
              tickSize: 0,
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
          tooltip={(item: { value: number; label: string }) => (
            <div className="bg-white border border-gray-400 rounded-lg text-sm px-2 py-1">
              {formatNumber(item.value)}
            </div>
          )}
          theme={{
            axis: {
              legend: {
                text: {
                  fontSize: 12,
                  color: "#373D3F",
                  fontWeight: 400,
                },
              },
              ticks: {
                text: {
                  fontSize: 10,
                  fontStyle: "italic",
                  color: "#373D3F",
                  fontWeight: 400,
                },
              },
            },
          }}
        />
      </div>

      {props.legends === "range" && (
        <div className="flex flex-col justify-center items-end mt-1 absolute top-0 right-5 xl:right-10 h-full gap-[0.5px]">
          {COLOR_GROUPS.map((grp) => (
            <div key={grp} className="flex items-center gap-2">
              <span className="text-[8px] font-medium italic">{HEATMAP_COLORS[grp].range}</span>
              <div className={classNames("h-4 w-1 shadow shrink-0", HEATMAP_COLORS[grp].color)} />
            </div>
          ))}
        </div>
      )}
      {props.legends === "legend" && (
        <div className="flex flex-col w-[140px] justify-center items-end mt-1 absolute top-0 right-5 h-full ">
          <div className="flex items-start flex-col gap-1">
            {dataItems.slice(0, 20).map((grp) => (
              <div key={grp} className="flex items-center gap-1">
                <div
                  className={classNames(
                    "h-2 w-2 rounded-sm shadow shrink-0 bg-black",
                    `bg-[${colorByLabel[grp.label]}]`,
                  )}
                />
                <span className="text-[8px] font-medium italic text-black line-clamp-1 w-full">
                  {grp.label || "label"}
                </span>
              </div>
            ))}
          </div>
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
