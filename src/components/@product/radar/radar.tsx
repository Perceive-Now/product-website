import { ResponsiveRadar } from "@nivo/radar";
import { COLORS } from "../../../utils/constants";
import { FunctionComponent, useEffect, useState } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  keys: string[];
  index: string;
}

export const RadarChart: FunctionComponent<Props> = ({ data, keys, index }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [datas, setDatas] = useState<any>([]);

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [key, setKey] = useState<any>([])
  useEffect(() => {
    setDatas(data);
    // setKey(keys)
  }, [data]);
  // console.log(datas)
  // console.log(key)
  // console.log(data)
  // console.log(keys)

  return (
    <div className="h-[400px]">
      <ResponsiveRadar
        data={datas}
        // keys={[ 'chardonay', 'carmenere', 'syrah' ]}
        keys={keys}
        indexBy={index}
        margin={{ top: 70, right: 120, bottom: 40, left: 120 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={36}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={COLORS.slice(9)}
        blendMode="multiply"
        motionConfig="wobbly"
        legends={[
          {
            anchor: "top-left",
            direction: "column",
            translateX: -50,
            translateY: -40,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

// const datas = [
//   {
//     taste: "fruity",
//     chardonay: 0,
//     carmenere: 0,
//     syrah: 0,
//   },
//   {
//     taste: "bitter",
//     chardonay: 0,
//     carmenere: 93,
//     syrah: 0,
//   },
//   {
//     taste: "heavy",
//     chardonay: 0,
//     carmenere: 0,
//     syrah: 0,
//   },
//   {
//     taste: "strong",
//     chardonay: 90,
//     carmenere: 0,
//     syrah: 0,
//   },
//   {
//     taste: "sunny",
//     chardonay: 0,
//     carmenere: 0,
//     syrah: 0,
//   },
// ];
