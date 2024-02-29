import { Bar } from "@nivo/bar";

interface Props {
  data: any;
}

export default function ScrollableBarChart({ data }: Props) {
  const props = {
    data,
    keys: ["value"],
    indexBy: "label",
    height: 400,
    margin: ["bottom", "left", "right", "top"].reduce((acc, key) => ({ ...acc, [key]: 40 }), {}),
    // colors: { scheme: 'spectral' },
    width: 1200,
    axisTop: null, // Correct syntax for disabling the top axis
    axisRight: null, // Correct syntax for disabling the right axis
    axisBottom: {
      tickSize: 0,
      tickPadding: 0,
      tickValues: [],
    },
  };
  return (
    <div className="App">
      <div className="3xl:w-[1000px] w-[700px] 2xl:max-w-[800px] mx-auto whitespace-nowrap overflow-auto pn-scroller">
        <Bar {...props} />
      </div>
    </div>
  );
}
