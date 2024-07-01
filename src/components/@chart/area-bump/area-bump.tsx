import { ResponsiveAreaBump } from "@nivo/bump";
import { FunctionComponent } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export const AreaBump: FunctionComponent<Props> = ({ data }) => {
  return (
    <div className="h-[400px]">
      <ResponsiveAreaBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={8}
        colors={{ scheme: "nivo" }}
        blendMode="multiply"
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        // fill={[
        //   {
        //     match: {
        //       id: "CoffeeScript",
        //     },
        //     id: "dots",
        //   },
        //   {
        //     match: {
        //       id: "TypeScript",
        //     },
        //     id: "lines",
        //   },
        // ]}
        // startLabel="id"
        // endLabel="id"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -36,
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
      />
    </div>
  );
};

// const data1 = [
//   {
//     id: "JavaScript",
//     data: [
//       {
//         x: 2000,
//         y: 28,
//       },
//       {
//         x: 2001,
//         y: 23,
//       },
//       {
//         x: 2002,
//         y: 24,
//       },
//       {
//         x: 2003,
//         y: 12,
//       },
//       {
//         x: 2004,
//         y: 21,
//       },
//       {
//         x: 2005,
//         y: 21,
//       },
//     ],
//   },
//   {
//     id: "ReasonML",
//     data: [
//       {
//         x: 2000,
//         y: 18,
//       },
//       {
//         x: 2001,
//         y: 14,
//       },
//       {
//         x: 2002,
//         y: 13,
//       },
//       {
//         x: 2003,
//         y: 29,
//       },
//       {
//         x: 2004,
//         y: 26,
//       },
//       {
//         x: 2005,
//         y: 23,
//       },
//     ],
//   },
//   {
//     id: "TypeScript",
//     data: [
//       {
//         x: 2000,
//         y: 26,
//       },
//       {
//         x: 2001,
//         y: 14,
//       },
//       {
//         x: 2002,
//         y: 10,
//       },
//       {
//         x: 2003,
//         y: 25,
//       },
//       {
//         x: 2004,
//         y: 28,
//       },
//       {
//         x: 2005,
//         y: 30,
//       },
//     ],
//   },
//   {
//     id: "Elm",
//     data: [
//       {
//         x: 2000,
//         y: 27,
//       },
//       {
//         x: 2001,
//         y: 21,
//       },
//       {
//         x: 2002,
//         y: 16,
//       },
//       {
//         x: 2003,
//         y: 14,
//       },
//       {
//         x: 2004,
//         y: 28,
//       },
//       {
//         x: 2005,
//         y: 21,
//       },
//     ],
//   },
//   {
//     id: "CoffeeScript",
//     data: [
//       {
//         x: 2000,
//         y: 28,
//       },
//       {
//         x: 2001,
//         y: 26,
//       },
//       {
//         x: 2002,
//         y: 26,
//       },
//       {
//         x: 2003,
//         y: 29,
//       },
//       {
//         x: 2004,
//         y: 22,
//       },
//       {
//         x: 2005,
//         y: 23,
//       },
//     ],
//   },
// ];
