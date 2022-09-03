import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";

//
import { formatNumber } from "../../../utils/helpers";

/**
 *
 */
export default function PieChart(props: IPieChartProps) {
  const pieColors = ["#D7D7D7", "#E1D5F2", "#B6A2D8", "#7F4BD8", "#442873"];

  //
  const [dataItems, setDataItems] = useState(props.data);

  //
  useEffect(() => {
    setDataItems(props.data);
  }, [props.data]);

  //
  return (
    <div className="h-[300px]">
      <ResponsivePie
        data={dataItems}
        margin={{ top: 40, right: 250, bottom: 40, left: 0 }}
        innerRadius={0.25}
        padAngle={2}
        cornerRadius={5}
        // If the value below is changed, we will be zoomed effect on hovering
        activeOuterRadiusOffset={0}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        animate={false}
        sortByValue={true}
        enableArcLabels={false}
        enableArcLinkLabels={false}
        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 130,
            translateY: 0,
            itemsSpacing: 16,
            itemWidth: 100,
            itemHeight: 16,
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 16,
            symbolShape: "circle",
          },
        ]}
        colors={pieColors.slice(5 - props.data.length)}
        onClick={(data) => props.onClick?.(data)}
        tooltip={(tProps) => (
          <div className="bg-white border border-gray-400 rounded-lg text-sm px-2 py-1">
            {formatNumber(tProps.datum.value)}
          </div>
        )}
      />
    </div>
  );
}

interface IPieChartProps {
  data: any[];
  onClick?: (data: any) => void;
}
