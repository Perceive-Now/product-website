import { ResponsiveSankey } from "@nivo/sankey";

export function Sankey() {
  return (
    <div className="h-[400px]">
      <ResponsiveSankey
        data={data}
        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
        align="justify"
        colors={{ scheme: "category10" }}
        nodeOpacity={1}
        nodeHoverOthersOpacity={0.35}
        nodeThickness={18}
        nodeSpacing={24}
        nodeBorderWidth={0}
        nodeBorderColor={{
          from: "color",
          modifiers: [["darker", 0.8]],
        }}
        nodeBorderRadius={3}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        linkContract={3}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="vertical"
        labelPadding={16}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1]],
        }}
        animate={false}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 130,
            itemWidth: 100,
            itemHeight: 14,
            itemDirection: "right-to-left",
            itemsSpacing: 2,
            itemTextColor: "#999",
            symbolSize: 14,
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
}

const data = {
  nodes: [
    {
      id: "John",
      nodeColor: "hsl(68, 70%, 50%)",
    },
    {
      id: "Raoul",
      nodeColor: "hsl(20, 70%, 50%)",
    },
    {
      id: "Jane",
      nodeColor: "hsl(159, 70%, 50%)",
    },
    {
      id: "Marcel",
      nodeColor: "hsl(260, 70%, 50%)",
    },
    {
      id: "Ibrahim",
      nodeColor: "hsl(338, 70%, 50%)",
    },
    {
      id: "Junko",
      nodeColor: "hsl(303, 70%, 50%)",
    },
  ],
  links: [
    {
      source: "Junko",
      target: "Marcel",
      value: 136,
    },
    {
      source: "John",
      target: "Junko",
      value: 187,
    },
    {
      source: "John",
      target: "Ibrahim",
      value: 53,
    },
    {
      source: "Jane",
      target: "Marcel",
      value: 88,
    },
    {
      source: "Jane",
      target: "Ibrahim",
      value: 92,
    },
    {
      source: "Marcel",
      target: "Ibrahim",
      value: 141,
    },
    {
      source: "Raoul",
      target: "Ibrahim",
      value: 184,
    },
    {
      source: "Raoul",
      target: "Junko",
      value: 181,
    },
  ],
};
