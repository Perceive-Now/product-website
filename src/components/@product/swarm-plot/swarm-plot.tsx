import { ResponsiveSwarmPlot } from "@nivo/swarmplot";

export function SwarmPlot() {
  return (
    <div className="h-[400px]">
      <ResponsiveSwarmPlot
        data={data}
        groups={["group A"]}
        value="price"
        valueFormat="$.2f"
        valueScale={{ type: "linear", min: 0, max: 500, reverse: false }}
        spacing={14}
        layout="horizontal"
        size={{
          key: "volume",
          values: [4, 20],
          sizes: [6, 20],
        }}
        forceStrength={4}
        simulationIterations={100}
        borderColor={{
          from: "color",
          modifiers: [
            ["darker", 0.6],
            ["opacity", 0.5],
          ],
        }}
        margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
        axisTop={{
          // orient: 'top',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "group if vertical, price if horizontal",
          legendPosition: "middle",
          legendOffset: -46,
        }}
        axisRight={{
          // orient: 'right',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "price if vertical, group if horizontal",
          legendPosition: "middle",
          legendOffset: 76,
        }}
        axisBottom={{
          // orient: 'bottom',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "group if vertical, price if horizontal",
          legendPosition: "middle",
          legendOffset: 46,
        }}
        axisLeft={{
          // orient: 'left',
          tickSize: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: "price if vertical, group if horizontal",
          legendPosition: "middle",
          legendOffset: -76,
        }}
      />
    </div>
  );
}

const data = [
  {
    id: "0.0",
    group: "group A",
    price: 209,
    volume: 13,
  },
  {
    id: "0.1",
    group: "group A",
    price: 338,
    volume: 19,
  },
  {
    id: "0.2",
    group: "group A",
    price: 326,
    volume: 16,
  },
  {
    id: "0.3",
    group: "group A",
    price: 10,
    volume: 10,
  },
  {
    id: "0.4",
    group: "group A",
    price: 401,
    volume: 19,
  },
  {
    id: "0.5",
    group: "group A",
    price: 391,
    volume: 9,
  },
  {
    id: "0.6",
    group: "group A",
    price: 125,
    volume: 7,
  },
  {
    id: "0.7",
    group: "group A",
    price: 160,
    volume: 16,
  },
  {
    id: "0.8",
    group: "group A",
    price: 53,
    volume: 19,
  },
  {
    id: "0.9",
    group: "group A",
    price: 1,
    volume: 7,
  },
  {
    id: "0.10",
    group: "group A",
    price: 417,
    volume: 12,
  },
  {
    id: "0.11",
    group: "group A",
    price: 311,
    volume: 11,
  },
  {
    id: "0.12",
    group: "group A",
    price: 334,
    volume: 10,
  },
  {
    id: "0.13",
    group: "group A",
    price: 447,
    volume: 18,
  },
  {
    id: "0.14",
    group: "group A",
    price: 407,
    volume: 13,
  },
  {
    id: "0.15",
    group: "group A",
    price: 209,
    volume: 19,
  },
  {
    id: "0.16",
    group: "group A",
    price: 116,
    volume: 19,
  },
  {
    id: "0.17",
    group: "group A",
    price: 170,
    volume: 12,
  },
  {
    id: "0.18",
    group: "group A",
    price: 372,
    volume: 4,
  },
  {
    id: "0.19",
    group: "group A",
    price: 75,
    volume: 9,
  },
  {
    id: "0.20",
    group: "group A",
    price: 74,
    volume: 4,
  },
  {
    id: "0.21",
    group: "group A",
    price: 344,
    volume: 7,
  },
  {
    id: "0.22",
    group: "group A",
    price: 88,
    volume: 17,
  },
  {
    id: "0.23",
    group: "group A",
    price: 125,
    volume: 4,
  },
  {
    id: "0.24",
    group: "group A",
    price: 231,
    volume: 15,
  },
  {
    id: "0.25",
    group: "group A",
    price: 284,
    volume: 14,
  },
];
