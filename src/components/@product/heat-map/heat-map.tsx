import { ResponsiveHeatMap } from "@nivo/heatmap";

export function HeatMap() {
  return (
    <div className="h-[400px]">
      <ResponsiveHeatMap
        data={data}
        margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
        valueFormat=">-.2s"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: "",
          legendOffset: 46,
        }}
        axisRight={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: -72,
        }}
        colors={{
          type: "diverging",
          scheme: "red_yellow_blue",
          divergeAt: 0.5,
          minValue: -100000,
          maxValue: 100000,
        }}
        emptyColor="#555555"
        legends={[
          {
            anchor: "bottom",
            translateX: 0,
            translateY: 30,
            length: 400,
            thickness: 8,
            direction: "row",
            tickPosition: "after",
            tickSize: 3,
            tickSpacing: 4,
            tickOverlap: false,
            tickFormat: ">-.2s",
            title: "Value →",
            titleAlign: "start",
            titleOffset: 4,
          },
        ]}
      />
    </div>
  );
}

const data = [
  {
    id: "Japan",
    data: [
      {
        x: "Train",
        y: 34786,
      },
      {
        x: "Subway",
        y: 61803,
      },
      {
        x: "Bus",
        y: -607,
      },
      {
        x: "Car",
        y: 17194,
      },
      {
        x: "Boat",
        y: -19897,
      },
      {
        x: "Moto",
        y: -28499,
      },
      {
        x: "Moped",
        y: 1836,
      },
      {
        x: "Bicycle",
        y: -73106,
      },
      {
        x: "Others",
        y: 95437,
      },
    ],
  },
  {
    id: "France",
    data: [
      {
        x: "Train",
        y: -54340,
      },
      {
        x: "Subway",
        y: 53958,
      },
      {
        x: "Bus",
        y: 47145,
      },
      {
        x: "Car",
        y: 26866,
      },
      {
        x: "Boat",
        y: -21821,
      },
      {
        x: "Moto",
        y: 72673,
      },
      {
        x: "Moped",
        y: -63805,
      },
      {
        x: "Bicycle",
        y: -95614,
      },
      {
        x: "Others",
        y: -2780,
      },
    ],
  },
  {
    id: "US",
    data: [
      {
        x: "Train",
        y: 90074,
      },
      {
        x: "Subway",
        y: 15851,
      },
      {
        x: "Bus",
        y: -10930,
      },
      {
        x: "Car",
        y: -71102,
      },
      {
        x: "Boat",
        y: 48503,
      },
      {
        x: "Moto",
        y: -83772,
      },
      {
        x: "Moped",
        y: -79220,
      },
      {
        x: "Bicycle",
        y: -1773,
      },
      {
        x: "Others",
        y: -14173,
      },
    ],
  },
  {
    id: "Germany",
    data: [
      {
        x: "Train",
        y: -32251,
      },
      {
        x: "Subway",
        y: 12130,
      },
      {
        x: "Bus",
        y: -77262,
      },
      {
        x: "Car",
        y: 5663,
      },
      {
        x: "Boat",
        y: -8994,
      },
      {
        x: "Moto",
        y: 28201,
      },
      {
        x: "Moped",
        y: 98693,
      },
      {
        x: "Bicycle",
        y: -3339,
      },
      {
        x: "Others",
        y: 94989,
      },
    ],
  },
  {
    id: "Norway",
    data: [
      {
        x: "Train",
        y: -44924,
      },
      {
        x: "Subway",
        y: -15603,
      },
      {
        x: "Bus",
        y: 58176,
      },
      {
        x: "Car",
        y: -22882,
      },
      {
        x: "Boat",
        y: -60956,
      },
      {
        x: "Moto",
        y: 18125,
      },
      {
        x: "Moped",
        y: 33242,
      },
      {
        x: "Bicycle",
        y: 38926,
      },
      {
        x: "Others",
        y: -4830,
      },
    ],
  },
  {
    id: "Iceland",
    data: [
      {
        x: "Train",
        y: -42587,
      },
      {
        x: "Subway",
        y: 64220,
      },
      {
        x: "Bus",
        y: 33029,
      },
      {
        x: "Car",
        y: -27809,
      },
      {
        x: "Boat",
        y: -29291,
      },
      {
        x: "Moto",
        y: -77527,
      },
      {
        x: "Moped",
        y: 98711,
      },
      {
        x: "Bicycle",
        y: -64649,
      },
      {
        x: "Others",
        y: -18216,
      },
    ],
  },
  {
    id: "UK",
    data: [
      {
        x: "Train",
        y: 22373,
      },
      {
        x: "Subway",
        y: 62661,
      },
      {
        x: "Bus",
        y: -21031,
      },
      {
        x: "Car",
        y: -21548,
      },
      {
        x: "Boat",
        y: 57822,
      },
      {
        x: "Moto",
        y: -63170,
      },
      {
        x: "Moped",
        y: -47556,
      },
      {
        x: "Bicycle",
        y: 76309,
      },
      {
        x: "Others",
        y: -69366,
      },
    ],
  },
  {
    id: "Vietnam",
    data: [
      {
        x: "Train",
        y: -29090,
      },
      {
        x: "Subway",
        y: 16376,
      },
      {
        x: "Bus",
        y: 99747,
      },
      {
        x: "Car",
        y: -92738,
      },
      {
        x: "Boat",
        y: -74231,
      },
      {
        x: "Moto",
        y: -22938,
      },
      {
        x: "Moped",
        y: -56996,
      },
      {
        x: "Bicycle",
        y: -19177,
      },
      {
        x: "Others",
        y: -10591,
      },
    ],
  },
];
