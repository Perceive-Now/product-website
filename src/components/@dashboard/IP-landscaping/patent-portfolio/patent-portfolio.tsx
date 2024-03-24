import { useQuery } from "@tanstack/react-query";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { getPatentCompetitorPortfolio } from "../../../../utils/api/charts";
import Sunburst from "../../sunburst";
import RadioButtons from "../../../reusable/radio-buttons";

interface Props {
  keywords: string[];
}

interface GroupedData {
  org: string;
  count?: number;
  children?: GroupedData[];
}

type ICompetitorType = "ipc" | "cpc";

interface IIPatentCompetitorPortfolio {
  org: string;
  count: number;
}

export const PatentPortfolioCompetitor: FunctionComponent<Props> = ({ keywords }) => {
  const [competitorType, setCompetitorType] = useState<ICompetitorType>("ipc");

  const changeType = (mode: string) => {
    setCompetitorType(mode as ICompetitorType);
  };

  const { data, isLoading, isError, error } = useQuery(
    ["patemt-portfolio", ...keywords],
    async () => {
      return await getPatentCompetitorPortfolio(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const total = useMemo(() => {
    if (data) {
      return [...data].length;
    }
    return 0;
  }, [data]);

  const transformData = (data: IIPatentCompetitorPortfolio[] | undefined) => {
    if (!data) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: { org: string; children: GroupedData[] } = {
      org: "data",
      children: [],
    };

    // // Group data by the first letter and second letter of cpc_subclass
    // const groupedData: GroupedData = data.reduce((acc: GroupedData, item) => {
    //   const firstLetter = item.org.charAt(0);
    //   // const groupName = firstLetter ;

    //   // const groupName = firstLetter;

    //   acc[firstLetter] = acc[firstLetter] || { org: firstLetter, children: [] };

    //   const firstLetter = item.org.charAt(0);
    //   const secondLetter = item.org.charAt(1);
    //   // const groupName = firstLetter;

    //   acc[firstLetter].children.push({
    //     org: item.org,
    //     count: item.count,
    //   });
    //   return acc;
    // }, {});

    // // Transform grouped data into the desired format
    // for (const key in groupedData) {
    //   result.children.push(groupedData[key]);
    // }
    // result.children = result.children.slice(0, 5);
    // return result;

    data.forEach((item) => {
      const firstChar = item.org.charAt(0);
      const secondChar = item.org.slice(0, 3);

      let firstLevel = result.children?.find((g) => g.org === firstChar);

      if (!firstLevel) {
        firstLevel = { org: firstChar, children: [] };
        result.children?.push(firstLevel);
      }

      let secondLevel = firstLevel.children?.find((sg) => sg.org === secondChar);

      if (!secondLevel) {
        secondLevel = { org: secondChar, children: [] };
        firstLevel.children?.push(secondLevel);
      }
      secondLevel.children?.push({ org: item.org, count: item.count });
    });
    result.children = result.children.slice(1, 8);
    return result;
  };

  const result = transformData(data);

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
            title="10. Patent Portfolios of Key Competitors"
            sideTitleOption={
              <RadioButtons
                options={[
                  { label: "IPC", value: "ipc" },
                  { label: "CPC", value: "cpc" },
                ]}
                activeMode={competitorType}
                handleModeChange={changeType}
                classNames="text-sm font-semibold"
              />
            }
          />
        }
      >
        <div>
          <Sunburst data={result} total={total} />
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
      </DataSection>
    </div>
  );
};

// [
//   {
//     org: "",
//     count: 2290,
//   },
//   {
//     org: "01 Communique Laboratory Inc.",
//     count: 3,
//   },
//   {
//     org: "02 Communique Laboratory Inc.",
//     count: 3,
//   },
//   {
//     org: "1 Communique Laboratory Inc.",
//     count: 3,
//   },
//   {
//     org: "2 Communique Laboratory Inc.",
//     count: 3,
//   },
//   {
//     org: "3 Communique Laboratory Inc.",
//     count: 3,
//   },
// ];

// {
//   total: data,
//     children: [
//       {
//         org: '0',
//         children: [
//           {
//             "org": "01",
//             children: [
//               {
//                 "org": "01 Communique Laboratory Inc.",
//                 "count": 3
//               }
//             ]
//           },
//           {
//             "org": "02",
//             children: [
//               {
//                 "org": "02 Communique Laboratory Inc.",
//                 "count": 3
//               }
//             ]
//           },
//         ]
//       },
//       {
//         org: '1',
//         children: [
//           {
//             "org": "1 Communique Laboratory Inc.",
//             "count": 3
//           },
//         ]
//       },
//       {
//         org: '2',
//         children: [
//           {
//             "org": "3 Communique Laboratory Inc.",
//             "count": 3
//           }, I
//         ]
//       },
//     ]
// }
