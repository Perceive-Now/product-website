import { ResponsiveTreeMap } from "@nivo/treemap";
import { FunctionComponent } from "react";
const COLORS = ["#7F4BD8", "#E1D5F2", "#FFB531"];

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export const TreeMap: FunctionComponent<Props> = ({ data }) => {
  return (
    <div className="h-[500px]">
      <ResponsiveTreeMap
        data={demo}
        identity="name"
        value="loc"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
          from: "color",
          modifiers: [["brighter", 5]],
        }}
        // parentLabelPosition="left"
        parentLabelTextColor="#ffffff"
        borderWidth={1}
        colors={COLORS}
        nodeOpacity={1}
        parentLabelSize={40}
        parentLabelPosition="top"
        parentLabelPadding={20}
        enableParentLabel={false}
        label="id"
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
};

const demo = {
  name: "AAAAA",
  children: [
    {
      name: "A0",
      children: [
        {
          name: "A01B",
          loc: 100,
        },
        {
          name: "A02B",
          loc: 100,
        },
        {
          name: "A03B",
          loc: 100,
        },
      ],
    },
    {
      name: "A2",
      children: [
        {
          name: "A21B",
          loc: 500,
        },
        {
          name: "A21c",
          loc: 500,
        },
      ],
    },
  ],
};

const a = {
  children: [
    {
      name: "viz",
      children: [
        {
          name: "stack",
          children: [
            {
              name: "cchart",
              loc: 194677,
            },
            {
              name: "xAxis",
              loc: 18500,
            },
            {
              name: "yAxis",
              loc: 19281,
            },
            {
              name: "layers",
              loc: 52593,
            },
          ],
        },
        {
          name: "ppie",
          children: [
            {
              name: "chart",
              children: [
                {
                  name: "pie",
                  children: [
                    {
                      name: "outline",
                      loc: 195220,
                    },
                    {
                      name: "slices",
                      loc: 68098,
                    },
                    {
                      name: "bbox",
                      loc: 49781,
                    },
                  ],
                },
                {
                  name: "donut",
                  loc: 66869,
                },
                {
                  name: "gauge",
                  loc: 16187,
                },
              ],
            },
            {
              name: "legends",
              loc: 29261,
            },
          ],
        },
      ],
    },
    {
      name: "colors",
      children: [
        {
          name: "rgb",
          loc: 75870,
        },
        {
          name: "hsl",
          loc: 97417,
        },
      ],
    },
  ],
};

const ddd = {
  name: "nivo",
  color: "hsl(111, 70%, 50%)",
  children: [
    {
      name: "viz",
      color: "hsl(218, 70%, 50%)",
      children: [
        {
          name: "stack",
          color: "hsl(221, 70%, 50%)",
          children: [
            {
              name: "cchart",
              color: "hsl(165, 70%, 50%)",
              loc: 111538,
            },
            {
              name: "xAxis",
              color: "hsl(134, 70%, 50%)",
              loc: 54615,
            },
            {
              name: "yAxis",
              color: "hsl(99, 70%, 50%)",
              loc: 140174,
            },
            {
              name: "layers",
              color: "hsl(190, 70%, 50%)",
              loc: 171155,
            },
          ],
        },
        {
          name: "ppie",
          color: "hsl(308, 70%, 50%)",
          children: [
            {
              name: "chart",
              color: "hsl(261, 70%, 50%)",
              children: [
                {
                  name: "pie",
                  color: "hsl(171, 70%, 50%)",
                  children: [
                    {
                      name: "outline",
                      color: "hsl(36, 70%, 50%)",
                      loc: 70628,
                    },
                    {
                      name: "slices",
                      color: "hsl(27, 70%, 50%)",
                      loc: 29416,
                    },
                    {
                      name: "bbox",
                      color: "hsl(359, 70%, 50%)",
                      loc: 26853,
                    },
                  ],
                },
                {
                  name: "donut",
                  color: "hsl(180, 70%, 50%)",
                  loc: 185766,
                },
                {
                  name: "gauge",
                  color: "hsl(319, 70%, 50%)",
                  loc: 98849,
                },
              ],
            },
            {
              name: "legends",
              color: "hsl(326, 70%, 50%)",
              loc: 48382,
            },
          ],
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(301, 70%, 50%)",
      children: [
        {
          name: "rgb",
          color: "hsl(246, 70%, 50%)",
          loc: 198414,
        },
        {
          name: "hsl",
          color: "hsl(128, 70%, 50%)",
          loc: 87303,
        },
      ],
    },
    {
      name: "utils",
      color: "hsl(14, 70%, 50%)",
      children: [
        {
          name: "randomize",
          color: "hsl(74, 70%, 50%)",
          loc: 172731,
        },
        {
          name: "resetClock",
          color: "hsl(139, 70%, 50%)",
          loc: 137024,
        },
        {
          name: "noop",
          color: "hsl(63, 70%, 50%)",
          loc: 16962,
        },
        {
          name: "tick",
          color: "hsl(93, 70%, 50%)",
          loc: 175221,
        },
        {
          name: "forceGC",
          color: "hsl(236, 70%, 50%)",
          loc: 95559,
        },
        {
          name: "stackTrace",
          color: "hsl(236, 70%, 50%)",
          loc: 72669,
        },
        {
          name: "dbg",
          color: "hsl(268, 70%, 50%)",
          loc: 61604,
        },
      ],
    },
    {
      name: "generators",
      color: "hsl(260, 70%, 50%)",
      children: [
        {
          name: "address",
          color: "hsl(111, 70%, 50%)",
          loc: 116869,
        },
        {
          name: "city",
          color: "hsl(213, 70%, 50%)",
          loc: 172170,
        },
        {
          name: "animal",
          color: "hsl(11, 70%, 50%)",
          loc: 127906,
        },
        {
          name: "movie",
          color: "hsl(59, 70%, 50%)",
          loc: 149284,
        },
        {
          name: "user",
          color: "hsl(181, 70%, 50%)",
          loc: 90981,
        },
      ],
    },
    {
      name: "set",
      color: "hsl(206, 70%, 50%)",
      children: [
        {
          name: "clone",
          color: "hsl(267, 70%, 50%)",
          loc: 197325,
        },
        {
          name: "intersect",
          color: "hsl(209, 70%, 50%)",
          loc: 36793,
        },
        {
          name: "merge",
          color: "hsl(150, 70%, 50%)",
          loc: 147371,
        },
        {
          name: "reverse",
          color: "hsl(1, 70%, 50%)",
          loc: 49615,
        },
        {
          name: "toArray",
          color: "hsl(159, 70%, 50%)",
          loc: 55049,
        },
        {
          name: "toObject",
          color: "hsl(55, 70%, 50%)",
          loc: 71681,
        },
        {
          name: "fromCSV",
          color: "hsl(305, 70%, 50%)",
          loc: 97999,
        },
        {
          name: "slice",
          color: "hsl(295, 70%, 50%)",
          loc: 173052,
        },
        {
          name: "append",
          color: "hsl(208, 70%, 50%)",
          loc: 76466,
        },
        {
          name: "prepend",
          color: "hsl(136, 70%, 50%)",
          loc: 125801,
        },
        {
          name: "shuffle",
          color: "hsl(30, 70%, 50%)",
          loc: 129152,
        },
        {
          name: "pick",
          color: "hsl(273, 70%, 50%)",
          loc: 162772,
        },
        {
          name: "plouc",
          color: "hsl(56, 70%, 50%)",
          loc: 101289,
        },
      ],
    },
    {
      name: "text",
      color: "hsl(122, 70%, 50%)",
      children: [
        {
          name: "trim",
          color: "hsl(151, 70%, 50%)",
          loc: 148592,
        },
        {
          name: "slugify",
          color: "hsl(340, 70%, 50%)",
          loc: 176398,
        },
        {
          name: "snakeCase",
          color: "hsl(184, 70%, 50%)",
          loc: 111215,
        },
        {
          name: "camelCase",
          color: "hsl(243, 70%, 50%)",
          loc: 68721,
        },
        {
          name: "repeat",
          color: "hsl(213, 70%, 50%)",
          loc: 181990,
        },
        {
          name: "padLeft",
          color: "hsl(302, 70%, 50%)",
          loc: 37548,
        },
        {
          name: "padRight",
          color: "hsl(223, 70%, 50%)",
          loc: 145541,
        },
        {
          name: "sanitize",
          color: "hsl(159, 70%, 50%)",
          loc: 185078,
        },
        {
          name: "ploucify",
          color: "hsl(292, 70%, 50%)",
          loc: 2331,
        },
      ],
    },
    {
      name: "misc",
      color: "hsl(281, 70%, 50%)",
      children: [
        {
          name: "greetings",
          color: "hsl(326, 70%, 50%)",
          children: [
            {
              name: "hey",
              color: "hsl(354, 70%, 50%)",
              loc: 95341,
            },
            {
              name: "HOWDY",
              color: "hsl(331, 70%, 50%)",
              loc: 153642,
            },
            {
              name: "aloha",
              color: "hsl(267, 70%, 50%)",
              loc: 87536,
            },
            {
              name: "AHOY",
              color: "hsl(130, 70%, 50%)",
              loc: 3205,
            },
          ],
        },
        {
          name: "other",
          color: "hsl(123, 70%, 50%)",
          loc: 103319,
        },
        {
          name: "path",
          color: "hsl(349, 70%, 50%)",
          children: [
            {
              name: "pathA",
              color: "hsl(58, 70%, 50%)",
              loc: 183418,
            },
            {
              name: "pathB",
              color: "hsl(189, 70%, 50%)",
              children: [
                {
                  name: "pathB1",
                  color: "hsl(342, 70%, 50%)",
                  loc: 190782,
                },
                {
                  name: "pathB2",
                  color: "hsl(289, 70%, 50%)",
                  loc: 82881,
                },
                {
                  name: "pathB3",
                  color: "hsl(315, 70%, 50%)",
                  loc: 178513,
                },
                {
                  name: "pathB4",
                  color: "hsl(92, 70%, 50%)",
                  loc: 65377,
                },
              ],
            },
            {
              name: "pathC",
              color: "hsl(286, 70%, 50%)",
              children: [
                {
                  name: "pathC1",
                  color: "hsl(137, 70%, 50%)",
                  loc: 55517,
                },
                {
                  name: "pathC2",
                  color: "hsl(285, 70%, 50%)",
                  loc: 14180,
                },
                {
                  name: "pathC3",
                  color: "hsl(108, 70%, 50%)",
                  loc: 77166,
                },
                {
                  name: "pathC4",
                  color: "hsl(214, 70%, 50%)",
                  loc: 101616,
                },
                {
                  name: "pathC5",
                  color: "hsl(164, 70%, 50%)",
                  loc: 106980,
                },
                {
                  name: "pathC6",
                  color: "hsl(71, 70%, 50%)",
                  loc: 98331,
                },
                {
                  name: "pathC7",
                  color: "hsl(207, 70%, 50%)",
                  loc: 69418,
                },
                {
                  name: "pathC8",
                  color: "hsl(213, 70%, 50%)",
                  loc: 195897,
                },
                {
                  name: "pathC9",
                  color: "hsl(252, 70%, 50%)",
                  loc: 195971,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
