import React, { useEffect, useState } from "react";
import { ResponsiveBar, BarTooltipProps, ComputedDatum } from "@nivo/bar";
import classNames from "classnames";
import { formatNumber } from "../../../utils/helpers";

type GetColorFunction = (bar: ComputedDatum<any>) => string;

export default function BarChart(props: IBarChartProps) {
  const [dataItems, setDataItems] = useState(props.data);

  useEffect(() => {
    setDataItems(props.data);
  }, [props.data]);

  const barPadding = props.layout === "horizontal" ? 0.55 : 0.55;

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

  const defaultColor = COLOR_RANGE[0];
  const stackedColor = "#442873"; // Color for stacked mode

  const formatAxisLabel = (value: any) => {
    const words = value.split(" ");
    return words.join("\n");
  };

  const getColor: GetColorFunction = (bar) => {
    if (props.groupMode === "stacked") {
      return stackedColor;
    } else if (props.groupMode === "grouped") {
      const index = bar.indexValue as string;
      const keyIndex = props.keys.indexOf(bar.id as string);
      return COLOR_RANGE[(index.charCodeAt(0) + keyIndex) % COLOR_RANGE.length];
    } else {
      return defaultColor;
    }
  };

  const customTooltip = ({ id, value }: BarTooltipProps<any>) => (
    <div
      style={{
        padding: 12,
        color: "#000000",
        background: "#FFFFFF",
      }}
    >
      <strong>
        {id}: {formatNumber(value ?? 0)}
      </strong>
    </div>
  );

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
          data={dataItems}
          keys={props.keys}
          indexBy={props.indexBy}
          margin={{
            top: 20,
            right: 100,
            left: props.layout === "horizontal" ? 180 : 100,
            bottom: props.layout === "horizontal" ? 50 : 70,
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
          axisBottom={props.axisBottom}
          layout={props.layout !== undefined ? props.layout : "vertical"}
          {...(props.legendX && {
            axisBottom: {
              tickSize: 0,
              legend: props.legendX,
              legendPosition: "middle",
              legendOffset: 20,
              truncateTickAt: 0,
              tickValues: [],
              format: (value: any) => formatAxisLabel(value),
            },
          })}
          {...(props.legendY && {
            axisLeft: {
              tickSize: 0,
              tickPadding: 5,
              tickRotation: 0,
              legend: props.legendY,
              legendPosition: "middle",
              legendOffset: -40,
              format: (value: number) =>
                value.toLocaleString("ru-RU", {
                  minimumFractionDigits: 2,
                }),
            },
          })}
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
          tooltip={props.groupMode === "grouped" ? customTooltip : undefined}
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
    </div>
  );
}

interface IBarChartProps {
  data: any[];
  padding?: number;
  keys: string[];
  innerPadding?: number;
  borderRadius?: number;
  marginRight?: number;
  marginLeft?: number;
  marginBottom?: number;
  indexBy: string;
  legendY?: string;
  legendX?: string;
  layout?: "horizontal" | "vertical";
  groupMode?: "grouped" | "stacked" | undefined;
  onClick?: (item: any) => void;
  label?: boolean;
  height?: string;
  color?: any;
  axisBottom?: any; // Add this line to include the axisBottom property
  axisLeft?: any;
}
