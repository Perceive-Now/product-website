/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

//
import { COLORS } from "../../../utils/constants";

//
import { formatNumber } from "../../../utils/helpers";
import classNames from "classnames";

/**
 *
 */
export default function BarChart(props: IBarChartProps) {
  const [dataItems, setDataItems] = useState(props.data);

  //
  useEffect(() => {
    setDataItems(props.data);
  }, [props.data]);

  //
  // const barPadding = props.groupMode === "stacked" ? 0.8 : 0.4;
  const barPadding = props.layout === "horizontal" ? 0.3 : 0.8;

  //
  return (
    <div className={classNames(props.layout === "horizontal" ? "h-[900px]" : "h-[400px]")}>
      <ResponsiveBar
        data={dataItems}
        keys={props.keys}
        indexBy={props.indexBy}
        margin={{
          top: 50,
          right: 200,
          left: 200,
          bottom: props.legendX ? 50 : 30,
        }}
        padding={barPadding}
        innerPadding={props.innerPadding !== undefined ? props.innerPadding : 4}
        groupMode={props.groupMode || "grouped"}
        borderRadius={props.borderRadius !== undefined ? props.borderRadius : 4}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        axisTop={null}
        axisRight={null}
        layout={props.layout !== undefined ? props.layout : "vertical"}
        {...(props.legendX && {
          axisBottom: {
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: props.legendX,
            legendPosition: "middle",
            legendOffset: 40,
          },
        })}
        {...(props.legendY && {
          axisLeft: {
            format: (value) => formatNumber(value),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: props.legendY,
            legendPosition: "middle",
            legendOffset: -50,
          },
        })}
        legends={props.legends}
        enableLabel={props.label !== undefined ? props.label : false}
        labelTextColor={{
          from: "color",
          modifiers: [["brighter", 5]],
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={false}
        role="application"
        colors={COLORS.slice(9 - props.keys.length)}
        tooltip={(item) => (
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
  legends?: any;
  layout?: "horizontal" | "vertical";
  groupMode?: "grouped" | "stacked" | undefined;
  onClick?: (item: any) => void;
  label?: boolean;
}
