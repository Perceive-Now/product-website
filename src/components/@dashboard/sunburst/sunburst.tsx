import { ResponsiveSunburst } from "@nivo/sunburst";

import { COLORS } from "../../../utils/constants";

export function Sunburst() {
  return (
    <div className="h-[500px]">
      <ResponsiveSunburst
        data={data}
        margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
        id="name"
        value="loc"
        cornerRadius={2}
        borderColor={{ theme: "background" }}
        // borderWidth={}
        // colors={{ scheme: 'nivo' }}
        colors={COLORS.slice(3 - 2)}
        childColor={{
          from: "color",
          modifiers: [["brighter", 0.1]],
        }}
        arcLabel="id"
        enableArcLabels={true}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["brighter", 5]],
        }}
      />
    </div>
  );
}

const data = {
  name: "nivo",
  color: "hsl(350, 70%, 50%)",
  children: [
    {
      name: "viz",
      color: "hsl(92, 70%, 50%)",
      children: [
        {
          name: "stack",
          color: "hsl(306, 70%, 50%)",
          children: [
            {
              name: "cchart",
              color: "hsl(23, 70%, 50%)",
              loc: 147746,
            },
            {
              name: "xAxis",
              color: "hsl(219, 70%, 50%)",
              loc: 46839,
            },
            {
              name: "yAxis",
              color: "hsl(231, 70%, 50%)",
              loc: 192526,
            },
            {
              name: "layers",
              color: "hsl(322, 70%, 50%)",
              loc: 102557,
            },
          ],
        },
        {
          name: "ppie",
          color: "hsl(304, 70%, 50%)",
          children: [
            {
              name: "chart",
              color: "hsl(66, 70%, 50%)",
              children: [
                {
                  name: "pie",
                  color: "hsl(37, 70%, 50%)",
                  children: [
                    {
                      name: "outline",
                      color: "hsl(160, 70%, 50%)",
                      loc: 133444,
                    },
                    {
                      name: "slices",
                      color: "hsl(251, 70%, 50%)",
                      loc: 171615,
                    },
                    {
                      name: "bbox",
                      color: "hsl(182, 70%, 50%)",
                      loc: 145322,
                    },
                  ],
                },
                {
                  name: "donut",
                  color: "hsl(314, 70%, 50%)",
                  loc: 73578,
                },
                {
                  name: "gauge",
                  color: "hsl(20, 70%, 50%)",
                  loc: 28862,
                },
              ],
            },
            {
              name: "legends",
              color: "hsl(19, 70%, 50%)",
              loc: 193328,
            },
          ],
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(224, 70%, 50%)",
      children: [
        {
          name: "rgb",
          color: "hsl(304, 70%, 50%)",
          loc: 181878,
        },
        {
          name: "hsl",
          color: "hsl(62, 70%, 50%)",
          loc: 25638,
        },
      ],
    },
    {
      name: "utils",
      color: "hsl(69, 70%, 50%)",
      children: [
        {
          name: "randomize",
          color: "hsl(97, 70%, 50%)",
          loc: 41375,
        },
        {
          name: "resetClock",
          color: "hsl(164, 70%, 50%)",
          loc: 147313,
        },
        {
          name: "noop",
          color: "hsl(295, 70%, 50%)",
          loc: 68797,
        },
        // {
        //   "name": "tick",
        //   "color": "hsl(259, 70%, 50%)",
        //   "loc": 160238
        // },
        // {
        //   "name": "forceGC",
        //   "color": "hsl(311, 70%, 50%)",
        //   "loc": 55559
        // },
        // {
        //   "name": "stackTrace",
        //   "color": "hsl(250, 70%, 50%)",
        //   "loc": 180747
        // },
        // {
        //   "name": "dbg",
        //   "color": "hsl(229, 70%, 50%)",
        //   "loc": 169081
        // }
      ],
    },
    {
      name: "generators",
      color: "hsl(212, 70%, 50%)",
      children: [
        {
          name: "address",
          color: "hsl(319, 70%, 50%)",
          loc: 158831,
        },
        {
          name: "city",
          color: "hsl(77, 70%, 50%)",
          loc: 21295,
        },
        {
          name: "animal",
          color: "hsl(173, 70%, 50%)",
          loc: 66750,
        },
        {
          name: "movie",
          color: "hsl(174, 70%, 50%)",
          loc: 192624,
        },
        {
          name: "user",
          color: "hsl(12, 70%, 50%)",
          loc: 39288,
        },
      ],
    },
    {
      name: "set",
      color: "hsl(123, 70%, 50%)",
      children: [
        {
          name: "clone",
          color: "hsl(274, 70%, 50%)",
          loc: 110864,
        },
        {
          name: "intersect",
          color: "hsl(125, 70%, 50%)",
          loc: 50219,
        },
        {
          name: "merge",
          color: "hsl(120, 70%, 50%)",
          loc: 141471,
        },
        {
          name: "reverse",
          color: "hsl(216, 70%, 50%)",
          loc: 104627,
        },
        {
          name: "toArray",
          color: "hsl(184, 70%, 50%)",
          loc: 35875,
        },
        {
          name: "toObject",
          color: "hsl(62, 70%, 50%)",
          loc: 87045,
        },
        // {
        //   "name": "fromCSV",
        //   "color": "hsl(38, 70%, 50%)",
        //   "loc": 74067
        // },
        // {
        //   "name": "slice",
        //   "color": "hsl(288, 70%, 50%)",
        //   "loc": 129615
        // },
        // {
        //   "name": "append",
        //   "color": "hsl(0, 70%, 50%)",
        //   "loc": 147737
        // },
        // {
        //   "name": "prepend",
        //   "color": "hsl(74, 70%, 50%)",
        //   "loc": 121982
        // },
        {
          name: "shuffle",
          color: "hsl(266, 70%, 50%)",
          loc: 166320,
        },
        {
          name: "pick",
          color: "hsl(249, 70%, 50%)",
          loc: 116405,
        },
        {
          name: "plouc",
          color: "hsl(355, 70%, 50%)",
          loc: 108484,
        },
      ],
    },
    {
      name: "text",
      color: "hsl(106, 70%, 50%)",
      children: [
        {
          name: "trim",
          color: "hsl(88, 70%, 50%)",
          loc: 146715,
        },
        {
          name: "slugify",
          color: "hsl(330, 70%, 50%)",
          loc: 181259,
        },
        {
          name: "snakeCase",
          color: "hsl(273, 70%, 50%)",
          loc: 75301,
        },
        {
          name: "camelCase",
          color: "hsl(268, 70%, 50%)",
          loc: 134542,
        },
        {
          name: "repeat",
          color: "hsl(170, 70%, 50%)",
          loc: 123915,
        },
        {
          name: "padLeft",
          color: "hsl(252, 70%, 50%)",
          loc: 32853,
        },
        {
          name: "padRight",
          color: "hsl(137, 70%, 50%)",
          loc: 59205,
        },
        {
          name: "sanitize",
          color: "hsl(244, 70%, 50%)",
          loc: 28304,
        },
        {
          name: "ploucify",
          color: "hsl(119, 70%, 50%)",
          loc: 184171,
        },
      ],
    },
    {
      name: "misc",
      color: "hsl(134, 70%, 50%)",
      children: [
        {
          name: "greetings",
          color: "hsl(253, 70%, 50%)",
          children: [
            {
              name: "hey",
              color: "hsl(347, 70%, 50%)",
              loc: 166256,
            },
            {
              name: "HOWDY",
              color: "hsl(320, 70%, 50%)",
              loc: 98803,
            },
            {
              name: "aloha",
              color: "hsl(296, 70%, 50%)",
              loc: 59380,
            },
            {
              name: "AHOY",
              color: "hsl(155, 70%, 50%)",
              loc: 160133,
            },
          ],
        },
        {
          name: "other",
          color: "hsl(208, 70%, 50%)",
          loc: 29053,
        },
        {
          name: "path",
          color: "hsl(66, 70%, 50%)",
          children: [
            {
              name: "pathA",
              color: "hsl(324, 70%, 50%)",
              loc: 193449,
            },
            {
              name: "pathB",
              color: "hsl(96, 70%, 50%)",
              children: [
                {
                  name: "pathB1",
                  color: "hsl(141, 70%, 50%)",
                  loc: 81390,
                },
                {
                  name: "pathB2",
                  color: "hsl(162, 70%, 50%)",
                  loc: 77449,
                },
                {
                  name: "pathB3",
                  color: "hsl(135, 70%, 50%)",
                  loc: 146920,
                },
                {
                  name: "pathB4",
                  color: "hsl(165, 70%, 50%)",
                  loc: 91500,
                },
              ],
            },
            {
              name: "pathC",
              color: "hsl(184, 70%, 50%)",
              children: [
                {
                  name: "pathC1",
                  color: "hsl(241, 70%, 50%)",
                  loc: 54978,
                },
                {
                  name: "pathC2",
                  color: "hsl(346, 70%, 50%)",
                  loc: 149607,
                },
                {
                  name: "pathC3",
                  color: "hsl(225, 70%, 50%)",
                  loc: 66455,
                },
                {
                  name: "pathC4",
                  color: "hsl(107, 70%, 50%)",
                  loc: 103372,
                },
                {
                  name: "pathC5",
                  color: "hsl(119, 70%, 50%)",
                  loc: 149850,
                },
                {
                  name: "pathC6",
                  color: "hsl(101, 70%, 50%)",
                  loc: 1738,
                },
                {
                  name: "pathC7",
                  color: "hsl(69, 70%, 50%)",
                  loc: 80915,
                },
                {
                  name: "pathC8",
                  color: "hsl(201, 70%, 50%)",
                  loc: 31786,
                },
                {
                  name: "pathC9",
                  color: "hsl(317, 70%, 50%)",
                  loc: 44746,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
