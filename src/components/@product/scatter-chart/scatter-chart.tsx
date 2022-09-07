import { ResponsiveLine } from "@nivo/line";
import { useState } from "react";

//
import { abbreviateString, formatNumber } from "../../../utils/helpers";

//
import { COLORS } from "../../../utils/constants";

//
const DATA = [
  {
    id: "london-college",
    data: [
      {
        x: "2019",
        y: 320,
      },
      {
        x: "2020",
        y: 0,
      },
      {
        x: "2021",
        y: 432,
      },
      {
        x: "2022",
        y: 312,
      },
    ],
  },
  {
    id: "harvard-medical",
    data: [
      {
        x: "2019",
        y: 263,
      },
      {
        x: "2020",
        y: 232,
      },
      {
        x: "2021",
        y: 124,
      },
      {
        x: "2022",
        y: 423,
      },
    ],
  },
  {
    id: "south-california",
    data: [
      {
        x: "2019",
        y: 213,
      },
      {
        x: "2020",
        y: 453,
      },
      {
        x: "2021",
        y: 234,
      },
      {
        x: "2022",
        y: 123,
      },
    ],
  },
  {
    id: "meth-zurich",
    data: [
      {
        x: "2019",
        y: 210,
      },
      {
        x: "2020",
        y: 334,
      },
      {
        x: "2021",
        y: 321,
      },
      {
        x: "2022",
        y: 421,
      },
    ],
  },
  {
    id: "imperial-college",
    data: [
      {
        x: "2019",
        y: 280,
      },
      {
        x: "2020",
        y: 555,
      },
      {
        x: "2021",
        y: 321,
      },
      {
        x: "2022",
        y: 325,
      },
    ],
  },
];

/*
 *
 **/
export default function ScatterChart(props: IScatterChartProps) {
  const [dataItems, setDataItems] = useState(props.data);

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
