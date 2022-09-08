import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";

//
import { COLORS } from "../../../utils/constants";

//
import { formatNumber } from "../../../utils/helpers";

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
  const barPadding = props.groupMode === "stacked" ? 0.85 : 0.4;

  //
  return (
    <div className="h-[300px]">
      <ResponsiveBar
        data={dataItems}
        keys={props.keys}
        indexBy={props.indexBy}
        margin={{
          top: 50,
          right: 0,
          left: 60,
          bottom: props.legendX ? 50 : 20,
        }}
        padding={barPadding}
        innerPadding={4}
        groupMode={props.groupMode || "grouped"}
        borderRadius={5}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        axisTop={null}
        axisRight={null}
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
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={false}
        role="application"
        colors={COLORS.slice(3 - props.keys.length)}
        tooltip={(item) => (
          <div className="bg-white border border-gray-400 rounded-lg text-sm px-2 py-1">
            {formatNumber(item.value)}
          </div>
        )}
      />
    </div>
  );
}

interface IBarChartProps {
  data: any[];
  keys: string[];
  indexBy: string;
  legendY?: string;
  legendX?: string;
  groupMode?: "grouped" | "stacked" | undefined;
  onClick?: (item: any) => void;
}
