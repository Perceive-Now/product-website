/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import { ComputedDatum } from "@nivo/bar";

//
import { formatNumber } from "../../../utils/helpers";
import classNames from "classnames";

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

  const getColor: GetColorFunction = (bar) => {
    const value = bar.data.value;
    if (value > 0 && value <= 100) return COLOR_RANGE[0];
    else if (value > 100 && value <= 200) return COLOR_RANGE[1];
    else if (value > 200 && value <= 300) return COLOR_RANGE[2];
    else if (value > 300 && value <= 400) return COLOR_RANGE[3];
    else if (value > 400 && value <= 500) return COLOR_RANGE[4];
    else if (value > 500 && value <= 600) return COLOR_RANGE[5];
    else if (value > 600 && value <= 700) return COLOR_RANGE[6];
    else if (value > 700 && value <= 800) return COLOR_RANGE[7];
    else if (value > 800 && value <= 900) return COLOR_RANGE[8];
    else if (value > 900 && value <= 1000) return COLOR_RANGE[9];
    else return COLOR_RANGE[9];
  };

  const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const HEATMAP_COLORS = [
    { range: "901-1000", color: "bg-[#442873]" },
    { range: "801-900", color: "bg-[#533F73]" },
    { range: "701-800", color: "bg-[#41178B]" },
    { range: "601-700", color: "bg-[#541DB2]" },
    { range: "501-600", color: "bg-[#5C20C4]" },
    { range: "401-500", color: "bg-[#7D4DD0]" },
    { range: "301-400", color: "bg-[#926AD7]" },
    { range: "201-300", color: "bg-[#B498E4]" },
    { range: "101-200", color: "bg-[#CCBAED]" },
    { range: "0-100", color: "bg-[#EFE9F9]" },
  ];
  //
  return (
    <div className="relative">
      <div
        className={classNames(
          props.layout === "horizontal"
            ? `${props.height !== undefined ? props.height : "h-[400px]"}`
            : "h-[400px] ",
          "w-[700px] 2xl:max-w-[800px] 3xl:w-[1000px] mx-auto whitespace-nowrap overflow-x-auto pn_scroller",
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

      <div className="flex flex-col justify-center items-start mt-1  h-full gap-[0.5px] shrink-0 absolute top-0 right-5 xl:right-10">
        {COLOR_GROUPS.map((grp) => (
          <div key={grp} className="flex items-center gap-1">
            <div
              className={classNames(
                "h-1 w-1 shadow shrink-0 rounded-sm",
                HEATMAP_COLORS[grp].color,
              )}
            />
            <span className="text-[8px] text-appGray-500 font-bold italic">
              {HEATMAP_COLORS[grp].range}
            </span>
          </div>
        ))}
      </div>

      {/* {props.legends === "range" && (
        <div className="flex flex-col justify-center items-end mt-1 absolute top-0 right-5 xl:right-10 h-full gap-[0.5px]">
          {COLOR_GROUPS.map((grp) => (
            <div key={grp} className="flex items-center gap-2">
              <span className="text-[8px] font-medium italic">{HEATMAP_COLORS[grp].range}</span>
              <div className={classNames("h-4 w-1 shadow shrink-0", HEATMAP_COLORS[grp].color)} />
            </div>
          ))}
        </div>
      )} */}

      {/* {props.legends === "legend" && (
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
      )} */}
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
