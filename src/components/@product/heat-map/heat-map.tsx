import { ResponsiveHeatMap } from "@nivo/heatmap";
import { FunctionComponent } from "react";

import { COLORS } from "../../../utils/constants";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend?: any;
  legendY?: string;
}

export const HeatMap: FunctionComponent<Props> = ({ data, legend, legendY }) => {
  // const colors = data.map((item) => optionKeys.map((key) => item[`${key}Color`]))
  //   .flat()
  // console.log(colors)

  // function scale() { }

  // scale.domain = () => {
  //   const _colors = colors.slice(0)

  //   return () => {
  //     return _colors.shift()
  //   }
  // }

  return (
    <div className="h-[1600px] 3xl:w-[1000px] mx-auto">
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 200, bottom: 60, left: 200 }}
        borderWidth={2}
        borderColor="#ffffff"
        inactiveOpacity={0.15}
        axisTop={{
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: `${legendY !== undefined && legendY}`,
          legendOffset: -46,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -72,
        }}
        // colors={COLORS}
        colors={{
          type: "sequential",
          scheme: "blues",
          // minValue: -100000,
          // maxValue: 100000
        }}
        emptyColor="#7F4BD8"
        // hoverTarget="row"
        legends={legend}
      />
    </div>
  );
};
// const CenteredMetric = () => {
//   // Your custom layer implementation goes here

//   return (
//     <div className="centered-metric text-black text-xl">
//       {/* Content of your custom layer */}
//       Centered
//     </div>
//   );
// };
