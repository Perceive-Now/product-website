import { ResponsiveTreeMap } from "@nivo/treemap";
import { FunctionComponent } from "react";
const COLORS = ["#7F4BD8", "#E1D5F2", "#FFB531"];

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export const TreeMap: FunctionComponent<Props> = ({ data }) => {
  // console.log(data)
  return (
    <div className="h-[600px] 3xl:w-[1000px] mx-auto">
      <ResponsiveTreeMap
        data={data}
        identity="cpc_subclass"
        value="count"
        // valueFormat=".02s"
        // leavesOnly={true}

        innerPadding={1}
        margin={{ top: 10, right: 50, bottom: 10, left: 50 }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        label={(e: any) => e.id + " (" + e.formattedValue + ")"}
        labelSkipSize={30}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 5]],
        }}
        // parentLabelPosition="left"
        parentLabelTextColor="#ffffff"
        borderWidth={1}
        colors={COLORS}
        nodeOpacity={1}
        parentLabelPosition="top"
        parentLabelPadding={20}
        enableParentLabel={false}
        // label="id"
        // tooltip={(item: { value: number }) => (
        //   <div className="bg-white border border-gray-400 rounded-lg text-sm px-2 py-1">
        //     {item.value}
        //   </div>
        // )}
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

// const demo = {
//   name: "data",
//   children: [
//     {
//       name: "A",
//       children: [
//         {
//           name: "A01B",
//           loc: 100,
//         },
//         {
//           name: "A02B",
//           loc: 100,
//         },
//         {
//           name: "A03B",
//           loc: 100,
//         },
//       ],
//     },
//     {
//       name: "A2",
//       children: [
//         {
//           name: "A21B",
//           loc: 500,
//         },
//         {
//           name: "A21c",
//           loc: 500,
//         },
//       ],
//     },
//   ],
// };
