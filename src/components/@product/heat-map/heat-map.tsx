import { HeatMapCanvas } from "@nivo/heatmap";
import { FunctionComponent } from "react";

// import { COLORS } from "../../../utils/constants";
import classNames from "classnames";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend?: any;
  legendY?: string;
  cell?: "circle" | "rect";
  legentType?: "legend" | "range";
}

export const HeatMap: FunctionComponent<Props> = ({
  data,
  legend,
  legendY,
  // legentType = "range",
  cell = "rect",
}) => {
  // const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // const HEATMAP_COLORS = [
  //   { range: "180+", color: "bg-[#442873]" },
  //   { range: "160", color: "bg-[#533F73]" },
  //   { range: "140", color: "bg-[#41178B]" },
  //   { range: "120", color: "bg-[#541DB2]" },
  //   { range: "100", color: "bg-[#5C20C4]" },
  //   { range: "80", color: "bg-[#7D4DD0]" },
  //   { range: "60", color: "bg-[#926AD7]" },
  //   { range: "40", color: "bg-[#B498E4]" },
  //   { range: "20", color: "bg-[#CCBAED]" },
  //   { range: "0", color: "bg-[#EFE9F9]" },
  // ];

  return (
    <div className="flex items-center">
      <div
        className={classNames(
          cell === "rect" ? "h-[600px]" : "h-[300px] ",
          "w-[600px] 2xl:w-[800px] mx-auto  overflow-y-auto graph_scroller",
        )}
      >
        <HeatMapCanvas
          data={data}
          margin={{
            top: 60,
            right: 120,
            bottom: 60,
            left: cell === "rect" ? 20 : 60,
          }}
          borderWidth={2}
          borderColor="#ffffff"
          inactiveOpacity={0.15}
          isInteractive={false}
          // cellComponent={cell}
          forceSquare={cell === "circle" && true}
          // yInnerPadding={-0.1}
          axisBottom={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${legendY !== undefined && legendY}`,
            legendOffset: -46,
            legendPosition: "middle",
          }}
          axisTop={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: `${legendY !== undefined && legendY}`,
            legendOffset: -46,
            legendPosition: "middle",
          }}
          axisLeft={null}
          axisRight={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: "middle",
            legendOffset: -72,
          }}
          colors={(cell) => {
            const value = cell.value as number;
            if (value === 0) {
              return "#EFE9F9";
            } else if (value <= 20) {
              return "#CCBAED";
            } else if (value <= 40) {
              return "#B498E4";
            } else if (value <= 50) {
              return "#5C20C4";
            } else if (value <= 100) {
              return "#533F73";
            } else {
              return "#442873";
            }
          }}
          emptyColor="#7F4BD8"
          // hoverTarget="row"
          legends={legend}
          labelTextColor={(cell) => {
            const value = cell.value as number;
            if (value <= 40) {
              return "#000";
            } else {
              return "#fff";
            }
          }}
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
                  fontSize: 10,
                  fontStyle: "italic",
                  color: "#373D3F",
                  fontWeight: 400,
                },
              },
            },
          }}
          height={1600}
          width={800}
        />
      </div>
      {/* <div
        className={classNames(
          legentType === "range" ? "items-end right-2" : "items-start right-0 gap-1",
          "flex flex-col justify-center  mt-1 absolute top-0 h-full ",
        )}
      >
        {COLOR_GROUPS.map((grp) => (
          <div key={grp} className="flex items-center gap-2">
            {legentType === "range" && (
              <span className="text-[8px] font-medium italic">{HEATMAP_COLORS[grp].range}</span>
            )}
            <div
              className={classNames(
                " shrink-0",
                legentType === "range" ? "h-[35px] w-1 rounded-none" : "h-2  w-2 ",
                cell === "circle" ? "rounded-full" : "rounded-[2px]",
                HEATMAP_COLORS[grp].color,
              )}
            />
            {legentType === "legend" && (
              <span className="text-[8px] font-medium italic">{HEATMAP_COLORS[grp].range}</span>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};
