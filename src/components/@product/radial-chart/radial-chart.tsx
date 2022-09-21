import { ResponsiveRadialBar } from "@nivo/radial-bar";

//
import { COLORS } from "../../../utils/constants";

/**
 *
 */
export default function RadialChart(props: IRadialChartProps) {
  return (
    <div className="h-[300px]">
      <ResponsiveRadialBar
        data={props.data}
        endAngle={360}
        innerRadius={0}
        margin={{ top: 10, right: 120, bottom: 10, left: 0 }}
        radialAxisStart={null}
        circularAxisOuter={null}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 80,
            translateY: 0,
            itemsSpacing: 6,
            itemDirection: "left-to-right",
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "black",
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
        borderWidth={0.5}
        enableTracks={false}
        padding={0.25}
        padAngle={1}
        cornerRadius={4}
        enableRadialGrid={false}
        enableCircularGrid={false}
        tooltip={(data) => (
          <div className="px-2 py-1 bg-white border border-gray-300 shadow rounded-lg">
            <p className="font-semibold">{data.bar.groupId}</p>
            <p className="text-sm">
              {(data.bar.data as any).value ?? data.bar.data.y}
            </p>
          </div>
        )}
        colors={props.colors || COLORS}
      />
    </div>
  );
}

interface IRadialChartProps {
  data: any[];
  colors?: string[];
}
