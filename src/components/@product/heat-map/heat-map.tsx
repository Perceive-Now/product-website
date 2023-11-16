import { ResponsiveHeatMap } from "@nivo/heatmap";
import { FunctionComponent } from "react";

// import { COLORS } from "../../../utils/constants";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend?: any;
}

export const HeatMap: FunctionComponent<Props> = ({ data, legend }) => {
  return (
    <div className="h-[600px]">
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 200, bottom: 60, left: 200 }}
        borderWidth={2}
        borderColor="#ffffff"
        inactiveOpacity={1}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: "",
          legendOffset: 46,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: "middle",
          legendOffset: -72,
        }}
        colors={{
          type: "sequential",
          scheme: "purples",
          // minValue: 100000,
          // maxValue: 0
        }}
        emptyColor="#7F4BD8"
        hoverTarget="row"
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
