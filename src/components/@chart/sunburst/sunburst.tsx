import { ResponsiveSunburst } from "@nivo/sunburst";

import { COLORS } from "../../../utils/constants";
import { FunctionComponent } from "react";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  total?: number;
}

const CenteredMetric = () => {
  // Your custom layer implementation goes here

  return (
    <div className="centered-metri z-50 absolute top-[48%] left-[46%] text-black bg-black">
      1000 patents
    </div>
  );
};

export const Sunburst: FunctionComponent<Props> = ({ data, total }) => {
  return (
    <div className="h-[500px] relative overflow-hidden 3xl:w-[1000px] mx-auto">
      <ResponsiveSunburst
        data={data}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        id="org"
        value="count"
        cornerRadius={0}
        borderColor={{ theme: "background" }}
        // borderWidth={}
        // colors={{ scheme: 'nivo' }}
        colors={COLORS.slice(4, 6)}
        // colors={{ scheme: "purples" }}
        childColor={{
          from: "color",
          modifiers: [["brighter", 0.1]],
        }}
        // arcLabel="id"
        // inheritColorFromParent={false}

        enableArcLabels={true}
        arcLabelsSkipAngle={12}
        arcLabel="id"
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["brighter", 5]],
        }}
        layers={["arcs", "arcLabels", CenteredMetric]}
        theme={{
          tooltip: {
            container: {
              background: "#ffffff",
            },
          },
        }}
        // tooltip={(item: { value: number }) => (
        //   <div className="bg-white border border-gray-400 rounded-lg text-sm px-2 py-1">
        //     {item.value}
        //   </div>
        // )}
      />
      <div className="absolute z- top-[48%] left-[42%] 2xl:left-[43%] 3xl:left-[46%] ">
        <span className="text-black text-xl ">{total} patents</span>
      </div>
    </div>
  );
};
