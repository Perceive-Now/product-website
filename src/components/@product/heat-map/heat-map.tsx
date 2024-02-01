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
        margin={{ top: 60, right: 100, bottom: 60, left: 100 }}
        borderWidth={2}
        borderColor="#ffffff"
        inactiveOpacity={0.15}
        isInteractive={false}
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
        colors={(cell) => {
          const value = cell.value as number;
          if (value <= 20) {
            return "#CCBAED";
          } else if (value <= 40) {
            return "#B498E4";
          } else if (value <= 50) {
            return "#5C20C4";
          } else if (value <= 100) {
            return "#533F73";
          } else {
            return "#442873";
          }
        }}
        // colors={['#ff0000', '#00ff00', '#0000ff']}
        // colors={{
        //   type: "sequential",
        //   scheme: "blues",
        //   // minValue: -100000,
        //   // maxValue: 100000
        // }}
        emptyColor="#7F4BD8"
        // hoverTarget="row"
        legends={legend}
        labelTextColor={(cell) => {
          const value = cell.value as number;
          if (value <= 100) {
            return "#000";
          } else {
            return "#fff";
          }
        }}
      />
    </div>
  );
};
