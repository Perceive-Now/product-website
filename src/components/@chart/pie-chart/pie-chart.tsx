/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponsivePie } from "@nivo/pie";
import { useEffect, useState } from "react";

//
import { COLORS } from "../../../utils/constants";

//
import { formatNumber } from "../../../utils/helpers";

/**
 *
 */
export default function PieChart(props: IPieChartProps) {
  const [dataItems, setDataItems] = useState(props.data);

  //
  useEffect(() => {
    setDataItems(props.data);
  }, [props.data]);

  //
  return (
    <div className="h-[300px] 3xl:w-[1000px] mx-auto flex justify-center items-center">
      <ResponsivePie
        data={dataItems}
        margin={{ top: 40, right: 0, bottom: 80, left: 0 }}
        innerRadius={0.5}
        padAngle={1.5}
        cornerRadius={0}
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
        enableArcLinkLabels={true}
        // arcLinkLabel="id"
        arcLinkLabel={(e) => e.id + " (" + e.value + ")"}
        arcLinkLabelsSkipAngle={5}
        arcLinkLabelsTextColor="#5C1FC4"
        arcLinkLabelsDiagonalLength={36}
        // arcLinkLabelsStraightLength={}
        arcLinkLabelsThickness={1.5}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={40}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        // legends={[
        //   {
        //     anchor: "right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 130,
        //     translateY: 0,
        //     itemsSpacing: 16,
        //     itemWidth: 100,
        //     itemHeight: 16,
        //     itemDirection: "left-to-right",
        //     itemOpacity: 1,
        //     symbolSize: 16,
        //     symbolShape: "circle",
        //   },
        // ]}
        colors={props.colors || COLORS.slice(5 - props.data.length)}
        onClick={(data) => props.onClick?.(data)}
        tooltip={(tProps) => (
          <div className="bg-white border border-gray-400 rounded-lg text-sm px-2 py-1">
            <span className="capitalize">{tProps.datum.label}</span>{" "}
            {formatNumber(tProps.datum.value)}
          </div>
        )}
        theme={{
          legends: {
            text: { fontSize: 12 },
          },
        }}
      />
    </div>
  );
}

interface IPieChartProps {
  data: any[];
  colors?: string[] | ((bar: any) => string);
  onClick?: (data: any) => void;
}
