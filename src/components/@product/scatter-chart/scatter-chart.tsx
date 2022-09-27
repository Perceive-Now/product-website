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
    <div className="h-[300px]">
      <ResponsiveLine
        data={dataItems}
        margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        {...(props.legendX && {
          axisBottom: {
            tickSize: 5,
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
            format: (value) => formatNumber(value),
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: props.legendY,
            legendPosition: "middle",
            legendOffset: -50,
          },
        })}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        // colors={{ scheme: "purples" }}
        colors={COLORS}
        theme={{
          axis: {
            legend: {
              text: { fontSize: 16 },
            },
          },
        }}
        legends={[
          {
            anchor: "top-left",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -40,
            itemsSpacing: 30,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}

interface IScatterChartProps {
  data: any[];
  legendY?: string;
  legendX?: string;
  abbreviateLegendX?: boolean | undefined;
}
