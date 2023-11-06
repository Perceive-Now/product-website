import { ResponsiveRadar } from "@nivo/radar";
import { COLORS } from "../../../utils/constants";

export const RadarChart = () => {
  return (
    <div className="h-[400px]">
      <ResponsiveRadar
        data={data}
        keys={["chardonay", "carmenere", "syrah", "aaa", "bbb", "ccc", "ddd", "eee", "fff"]}
        indexBy="taste"
        valueFormat=">-.2f"
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

const data = [
  {
    taste: "fruity",
    chardonay: 81,
    carmenere: 120,
    syrah: 118,
    aaa: 118,
    bbb: 118,
    ccc: 118,
    ddd: 200,
    eee: 500,
    fff: 600,
  },
  {
    taste: "bitter",
    chardonay: 98,
    carmenere: 93,
    syrah: 29,
    aaa: 118,
    bbb: 118,
    ccc: 118,
    ddd: 200,
    eee: 500,
    fff: 600,
  },
  {
    taste: "heavy",
    chardonay: 102,
    carmenere: 62,
    syrah: 100,
    aaa: 118,
    bbb: 118,
    ccc: 118,
    ddd: 200,
    eee: 500,
    fff: 600,
  },
  {
    taste: "strong",
    chardonay: 90,
    carmenere: 62,
    syrah: 50,
    aaa: 118,
    bbb: 118,
    ccc: 118,
    ddd: 200,
    eee: 500,
    fff: 600,
  },
  {
    taste: "sunny",
    chardonay: 33,
    carmenere: 105,
    syrah: 70,
    aaa: 118,
    bbb: 118,
    ccc: 118,
    ddd: 200,
    eee: 500,
    fff: 600,
  },
  {
    taste: "a",
    chardonay: 33,
    carmenere: 105,
    syrah: 70,
    aaa: 118,
    bbb: 118,
    ccc: 118,
    ddd: 200,
    eee: 500,
    fff: 600,
  },
  {
    taste: "b",
    chardonay: 33,
    carmenere: 105,
    syrah: 70,
    aaa: 118,
    bbb: 118,
    ccc: 118,
    ddd: 200,
    eee: 500,
    fff: 600,
  },
  {
    taste: "sunny",
    chardonay: 33,
    carmenere: 105,
    syrah: 70,
    aaa: 118,
    bbb: 118,
    ccc: 118,
    ddd: 200,
    eee: 500,
    fff: 600,
  },
];

// response:[
//   {
//     "uspc_subclass_title": "A",
//     "01 Communique Laboratory Inc.":100,

//   }
// ]
