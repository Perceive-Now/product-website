import { ResponsiveTreeMap } from "@nivo/treemap";
const COLORS = ["#7F4BD8", "#E1D5F2", "#FFB531"];

export function TreeMap() {
  return (
    <div className="h-[500px]">
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value="loc"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
          from: "color",
          modifiers: [["brighter", 5]],
        }}
        parentLabelPosition="left"
        parentLabelTextColor="#ffffff"
        borderWidth={1}
        colors={COLORS}
        nodeOpacity={1}
        // colors={{ scheme: 'set1' }}

        // parentLabelTextColor={{
        //   from: "color",
        //   modifiers: [["darker", 2]],
        // }}
        borderColor="#f4f1f1"
        // borderColor={{
        //   from: "color",
        //   modifiers: [["brighter", 0.1]],
        // }}
      />
    </div>
  );
}

const data = {
  // "name": "nivo",
  //"color": "hsl(292, 70%, 50%)",
  children: [
    {
      name: "viz",
      //"color": "hsl(105, 70%, 50%)",
      children: [
        {
          name: "stack",
          //"color": "hsl(226, 70%, 50%)",
          children: [
            {
              name: "cchart",
              //"color": "hsl(116, 70%, 50%)",
              loc: 194677,
            },
            {
              name: "xAxis",
              //"color": "hsl(263, 70%, 50%)",
              loc: 18500,
            },
            {
              name: "yAxis",
              //"color": "hsl(290, 70%, 50%)",
              loc: 19281,
            },
            {
              name: "layers",
              //"color": "hsl(66, 70%, 50%)",
              loc: 52593,
            },
          ],
        },
        {
          name: "ppie",
          //"color": "hsl(108, 70%, 50%)",
          children: [
            {
              name: "chart",
              //"color": "hsl(328, 70%, 50%)",
              children: [
                {
                  name: "pie",
                  //"color": "hsl(174, 70%, 50%)",
                  children: [
                    {
                      name: "outline",
                      //"color": "hsl(167, 70%, 50%)",
                      loc: 195220,
                    },
                    {
                      name: "slices",
                      //"color": "hsl(196, 70%, 50%)",
                      loc: 68098,
                    },
                    {
                      name: "bbox",
                      //"color": "hsl(66, 70%, 50%)",
                      loc: 49781,
                    },
                  ],
                },
                {
                  name: "donut",
                  //"color": "hsl(175, 70%, 50%)",
                  loc: 66869,
                },
                {
                  name: "gauge",
                  //"color": "hsl(348, 70%, 50%)",
                  loc: 16187,
                },
              ],
            },
            {
              name: "legends",
              //"color": "hsl(309, 70%, 50%)",
              loc: 29261,
            },
          ],
        },
      ],
    },
    {
      name: "colors",
      //"color": "hsl(42, 70%, 50%)",
      children: [
        {
          name: "rgb",
          //"color": "hsl(325, 70%, 50%)",
          loc: 75870,
        },
        {
          name: "hsl",
          //"color": "hsl(20, 70%, 50%)",
          loc: 97417,
        },
      ],
    },
    {
      name: "utils",
      //"color": "hsl(117, 70%, 50%)",
      children: [
        {
          name: "randomize",
          //"color": "hsl(120, 70%, 50%)",
          loc: 29466,
        },
        {
          name: "resetClock",
          //"color": "hsl(347, 70%, 50%)",
          loc: 138159,
        },
        {
          name: "noop",
          //"color": "hsl(241, 70%, 50%)",
          loc: 134072,
        },
        {
          name: "tick",
          //"color": "hsl(331, 70%, 50%)",
          loc: 88789,
        },
        {
          name: "forceGC",
          //"color": "hsl(93, 70%, 50%)",
          loc: 122022,
        },
        {
          name: "stackTrace",
          //"color": "hsl(30, 70%, 50%)",
          loc: 79272,
        },
        {
          name: "dbg",
          //"color": "hsl(111, 70%, 50%)",
          loc: 134566,
        },
      ],
    },
  ],
};
