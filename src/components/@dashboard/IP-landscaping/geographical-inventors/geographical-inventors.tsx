import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getGeographicDistributionApplicant } from "../../../../utils/api/charts";
import TreeMap from "../../../@product/tree-map";

interface Props {
  keywords: string[];
}

interface IPatentClassification {
  cpc_class: string;
  count: number;
}

interface IGeoApplicant {
  location_id: string;
  count: number;
  country: string;
  city: string;
}

// interface ITreeData {
//   cpc_class: string;
//   children: any[];
// }

interface GroupedData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: { city: string; children: any[] };
}

export const GeographicalDistributionInventors: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["geographical_inventors", ...keywords],
    async () => {
      return await getGeographicDistributionApplicant(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const transformData = (data: IGeoApplicant[] | undefined) => {
    if (!data) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const result: { cpc_class: string; children: any[] } = {
    //   cpc_class: "data",
    //   children: [],
    // };
    const result: { city: string; children: { city: string; count: number }[] }[] = [];

    // Group data by the first letter and second letter of cpc_class
    const groupedData: GroupedData = data.reduce((acc: GroupedData, item) => {
      const firstLetter =
        item.city !== null && item.city !== "" ? item.city.charAt(0).toUpperCase() : "";
      const secondLetter =
        item.city !== null && item.city.length > 1 ? item.city.charAt(1).toLowerCase() : "";
      const groupName = firstLetter + secondLetter;

      acc[groupName] = acc[groupName] || { city: groupName, children: [] };
      acc[groupName].children.push({
        city: item.city,
        count: item.count,
      });
      return acc;
    }, {});

    // Transform grouped data into the desired format
    for (const key in groupedData) {
      result.push(groupedData[key]);
    }
    // result.children = result.children.slice(0, 3);
    return result;
  };

  const result = transformData(data);

  // const Category_A = {
  //   cpc_class: "A",
  //   children: result.filter((s) => (s.cpc_class.charAt(0) === "A"))
  // }
  // const Category_B = {
  //   cpc_class: "B",
  //   children: result.filter((s) => (s.cpc_class.charAt(0) === "B"))
  // }
  // const Category_C = {
  //   cpc_class: "C",
  //   children: result.filter((s) => (s.cpc_class.charAt(0) === "C"))
  // }
  // const Category_D = {
  //   cpc_class: "D",
  //   children: result.filter((s) => (s.cpc_class.charAt(0) === "D"))
  // }
  // const Category_E = {
  //   cpc_class: "E",
  //   children: result.filter((s) => (s.cpc_class.charAt(0) === "E"))
  // }
  // const Category_F = {
  //   cpc_class: "F",
  //   children: result.filter((s) => (s.cpc_class.charAt(0) === "F"))
  // }
  // const Category_G = {
  //   cpc_class: "G",
  //   children: result.filter((s) => (s.cpc_class.charAt(0) === "G"))
  // }
  // const Category_H = {
  //   cpc_class: "H",
  //   children: result.filter((s) => (s.cpc_class.charAt(0) === "H"))
  // }
  // const Category_Y = {
  //   cpc_class: "Y",
  //   children: result.filter((s) => (s.cpc_class.charAt(0) === "Y"))
  // }

  return (
    <div className="border-gray-200 shadow-custom border px-2 pt-2 pb-4 w-full space-y-2">
      <DataSection
        keywords={keywords}
        isLoading={isLoading}
        isError={isError}
        error={error}
        title={
          <PageTitle
            // info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
            titleClass="font-bold"
            title="11. Geographical Distribution of Inventors"

            // subTitle="Heat map of patents location in USA"
            // sideTitleOption={
            //   <RadioButtons
            //     options={[
            //       { label: '2014-2018', value: '1st5year' },
            //       { label: '2019-2023', value: '2nd5year' }
            //     ]}
            //     activeMode={yearChoose}
            //     handleModeChange={changeYear}
            //     classNames="text-sm font-semibold"
            //   />
            // }
          />
        }
      >
        <div>
          <div className="space-y-8">
            <div>
              {/* <p className="font-bold text-primary-900 text-lg">A</p> */}
              {/* <TreeMap
                data={result}
                name={"A: Human Necessities"}
                identity="country"
                value="count"
              /> */}
            </div>
            {/* <div>
              <TreeMap data={Category_B} name={"B: Performing Operations &Transporting"} />
            </div>
            <div>
              <TreeMap data={Category_C} name={"C: Chemistry & Metallurgy"} />
            </div>
            <div>
              <TreeMap data={Category_D} name={"D: Textiles & Paper"} />
            </div>
            <div>
              <TreeMap data={Category_E} name={"E: Fixed Constructions"} />
            </div>
            <div>
              <TreeMap data={Category_F} name={"F: Mechanical Engineering"} />
            </div>
            <div>
              <TreeMap data={Category_G} name={"G: Physics"} />
            </div>
            <div>
              <TreeMap data={Category_H} name={"H: Electricity"} />
            </div>
            <div>
              <TreeMap data={Category_Y} name={"Y: General Tagging of New Technological Developments"} />
            </div> */}
          </div>
          <div className="space-y-2 text-secondary-800 mt-4">
            <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
            <div>
              <h6 className="font-semibold text-primary-900">
                Family A: California (100 patents), Texas (50 patents); Family B: New York (80
                patents), Florida (70 patents)
              </h6>
              <ul className="list-disc ml-3 text-sm mt-1 font-medium">
                <li>
                  The wearable blood pressure sensor market is on a growth trajectory with a
                  projected Compound Annual Growth Rate (CAGR) of 8.5% over the next five years.
                  This could potentially elevate the market valuation from an estimated $1.5 billion
                  to over $2.25 billion by the end of the forecast period.
                </li>
                <li>
                  The driving factors behind this growth could be an increasing awareness of health
                  and fitness, aging population, and the advancement in wearable technology.
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="mt-4">
          <PageTitle
            // info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
            titleClass="font-bold"
            title="Associated technologies "
          />
          <RelatedKeywords title="Associated technologies" keywords={keywords} />
        </div> */}
      </DataSection>
    </div>
  );
};
// let data = [
//   cpc_class: "data",
//   children: [
//     { cpc_class: 'A0', children: Array(5) },
//     { cpc_class: 'A2', children: Array(6) },
//     { cpc_class: 'A4', children: Array(15) },
//     { cpc_class: 'B2', children: Array(13) },
//     { cpc_class: 'B3', children: Array(4) },
//     { cpc_class: 'C0', children: Array(4) }

//   ]
// ]

// let Category_A = [
//   cpc_class: "A",
//   children: [
//     { cpc_class: 'A0', children: Array(5) },
//     { cpc_class: 'A2', children: Array(6) },
//     { cpc_class: 'A4', children: Array(15) },
//     { cpc_class: 'B2', children: Array(13) },
//     { cpc_class: 'B3', children: Array(4) },
//     { cpc_class: 'C0', children: Array(4) }
//   ]
// ]

// let category_B = [
//   cpc_class: "B",
//   children: [

//     { cpc_class: 'B2', children: Array(13) },
//     { cpc_class: 'B3', children: Array(4) },
//   ]
// ]

// 2
// :
// { cpc_class: 'A4', children: Array(15) }
// 3
// :
// { cpc_class: 'A6', children: Array(19) }
// 4
// :
// { cpc_class: 'B0', children: Array(6) }
// 5
// :

// 6
// : { cpc_class: 'B2', children: Array(13) },
// { cpc_class: 'B3', children: Array(4) },
// { cpc_class: 'B3', children: Array(4) }
// 7
// :
// { cpc_class: 'B4', children: Array(3) }
// 8
// :
// { cpc_class: 'B6', children: Array(26) }
// 9
// :
// { cpc_class: 'B8', children: Array(1) }
// 10
// :
// { cpc_class: 'C0', children: Array(4) }
// 11
// :
// { cpc_class: 'C1', children: Array(3) }
// 12
// :
// { cpc_class: 'D0', children: Array(9) }
// 13
// :
// { cpc_class: 'D1', children: Array(1) }
// 14
// :
// { cpc_class: 'D2', children: Array(1) }
// 15
// :
// { cpc_class: 'E0', children: Array(5) }
// 16
// :
// { cpc_class: 'E2', children: Array(3) }
// 17
// :
// { cpc_class: 'F0', children: Array(3) }
// 18
// :
// { cpc_class: 'F1', children: Array(5) }
// 19
// :
// { cpc_class: 'F2', children: Array(7) }
// 20
// :
// { cpc_class: 'F4', children: Array(3) }
// 21
// :
// { cpc_class: 'G0', children: Array(43) }
// 22
// :
// { cpc_class: 'G1', children: Array(11) }
// 23
// :
// { cpc_class: 'G2', children: Array(2) }
// 24
// :
// { cpc_class: 'H0', children: Array(29) }
// 25
// :
// { cpc_class: 'H1', children: Array(2) }
// 26
// :
// { cpc_class: 'Y0', children: Array(7) }
// 27
// :
// { cpc_class: 'Y1', children: Array(2) }
// length
// :
// 28
// [[Prototype]]
// :
// Array(0)
// cpc_class
// :
// "data"
