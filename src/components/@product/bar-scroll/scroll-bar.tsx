import { Bar, ComputedDatum } from "@nivo/bar";
import { formatNumber } from "../../../utils/helpers";
import classNames from "classnames";

interface Props {
  data: any;
  legendY?: string;
  legendX?: string;
}

// interface BarLabelColors {
//   [key: string]: string;
// }
// const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// const HEATMAP_SECTIONS = 10;

const formatAxisLabel = (value: any) => {
  const firstWord = value.split(" ")[0];
  return firstWord;
};

type GetColorFunction = (bar: ComputedDatum<any>) => string;

export default function ScrollableBarChart({ data, legendY, legendX }: Props) {
  // const width = data.length > 10 ? 3000 : 400;

  const barWidth = () => {
    if (data.length > 50) {
      return 3000;
    } else if (data.length > 10 && data.length < 50) {
      return 2000;
    } else {
      return 3000;
    }
  };

  const props = {
    data,
    keys: ["value"],
    indexBy: "label",
    height: 400,
    margin: ["bottom", "left", "right", "top"].reduce((acc, key) => ({ ...acc, [key]: 40 }), {}),
    // colors: { scheme: 'spectral' },
    width: barWidth(),
    enableTotals: true,
    axisTop: null, // Correct syntax for disabling the top axis
    axisRight: null, // Correct syntax for disabling the right axis
    // axisBottom: {
    //   // format: (value) => '', // Use custom legend component for axis bottom
    //   legend: <CustomAxisBottom />,
    // }
    axisBottom: {
      legend: legendX,
      legendOffset: 10,
      truncateTickAt: 0,
      format: (value: any) => formatAxisLabel(value), // Custom format function for tick values
      // legendTextStyle: {
      //   fill: 'blue', // Fill color of the label text
      //   fontSize: 14, // Font size of the label text
      //   fontWeight: 'bold', // Font weight of the label text
      // },
    },
  };

  const COLOR_RANGE = [
    "#5C1FC4",
    "#CCBAED",
    "#926AD7",
    "#7F4BD8",
    "#B6A2D8",
    "#7D4DD0",
    "#5C20C4",
    "#5C1FC4",
    "#533F73",
    "#442873",
  ];

  const getColor: GetColorFunction = (bar) => {
    const value = bar.data.value;
    if (value > 0 && value <= 100) return COLOR_RANGE[0];
    else if (value > 100 && value <= 200) return COLOR_RANGE[1];
    else if (value > 200 && value <= 300) return COLOR_RANGE[2];
    else if (value > 300 && value <= 400) return COLOR_RANGE[3];
    else if (value > 400 && value <= 500) return COLOR_RANGE[4];
    else if (value > 500 && value <= 600) return COLOR_RANGE[5];
    else if (value > 600 && value <= 700) return COLOR_RANGE[6];
    else if (value > 700 && value <= 800) return COLOR_RANGE[7];
    else if (value > 800 && value <= 900) return COLOR_RANGE[8];
    else if (value > 900 && value <= 1000) return COLOR_RANGE[9];
    else return COLOR_RANGE[9];
  };

  const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const HEATMAP_COLORS = [
    { range: "901-1000", color: "bg-[#442873]" },
    { range: "801-900", color: "bg-[#533F73]" },
    { range: "701-800", color: "bg-[#41178B]" },
    { range: "601-700", color: "bg-[#541DB2]" },
    { range: "501-600", color: "bg-[#5C20C4]" },
    { range: "401-500", color: "bg-[#7D4DD0]" },
    { range: "301-400", color: "bg-[#926AD7]" },
    { range: "201-300", color: "bg-[#B498E4]" },
    { range: "101-200", color: "bg-[#CCBAED]" },
    { range: "0-100", color: "bg-[#EFE9F9]" },
  ];

  return (
    <div className=" flex ">
      <div className="3xl:w-[1000px] w-[700px] 2xl:max-w-[800px] mx-auto whitespace-nowrap overflow-auto graph_scroller">
        <Bar
          {...props}
          tooltip={(item: { value: number; label: string }) => (
            <div className="bg-white border border-gray-400 rounded-lg text-sm px-2 py-1">
              {formatNumber(item.value)}
            </div>
          )}
          colors={getColor}
          enableGridY={false}
          padding={0.25}
          innerPadding={4}
          borderRadius={4}
          enableLabel={false}
          theme={{
            axis: {
              legend: {
                text: {
                  fontSize: 12,
                  color: "#373D3F",
                  fontWeight: 400,
                },
              },
              ticks: {
                text: {
                  fontSize: 8,
                  fontStyle: "italic",
                  color: "#373D3F",
                  fontWeight: 400,
                },
              },
            },
          }}
        />
      </div>
      {/*  */}
      <div className="flex flex-col justify-center items-start mt-1  h-full gap-[0.5px] shrink-0 absolut right-6 top-0">
        {COLOR_GROUPS.map((grp) => (
          <div key={grp} className="flex items-center gap-1">
            <div
              className={classNames(
                "h-1 w-1 shadow shrink-0 rounded-sm",
                HEATMAP_COLORS[grp].color,
              )}
            />
            <span className="text-[8px] text-appGray-500 font-bold italic">
              {HEATMAP_COLORS[grp].range}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
