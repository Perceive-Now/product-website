import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getPatentClassificationCPC } from "../../../../utils/api/charts";
import TreeMap from "../../../@product/tree-map";
import RelatedKeywords from "../../related-keywords";

interface Props {
  keywords: string[];
}

interface IPatentClassification {
  cpc_subclass: string;
  count: number;
}

interface ITreeData {
  cpc_subclass: string;
  children: any[];
}

interface GroupedData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: { cpc_subclass: string; children: any[] };
}

export const PatentClassificationAnalysis: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patents-cpc", ...keywords],
    async () => {
      return await getPatentClassificationCPC(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const transformData = (data: IPatentClassification[] | undefined) => {
    if (!data) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: { cpc_subclass: string; children: any[] } = {
      cpc_subclass: "data",
      children: [],
    };

    // Group data by the first letter and second letter of cpc_subclass
    const groupedData: GroupedData = data.reduce((acc: GroupedData, item) => {
      const firstLetter = item.cpc_subclass.charAt(0).toUpperCase();
      const secondLetter = item.cpc_subclass.charAt(1).toLowerCase();
      const groupName = firstLetter + secondLetter;

      acc[groupName] = acc[groupName] || { cpc_subclass: groupName, children: [] };
      acc[groupName].children.push({
        cpc_subclass: item.cpc_subclass,
        count: item.count,
      });
      return acc;
    }, {});

    // Transform grouped data into the desired format
    for (const key in groupedData) {
      result.children.push(groupedData[key]);
    }
    result.children = result.children.slice(0, 8);
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
            title="6. Patent Classification Analysis"

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
          {<TreeMap data={result} />}
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
        <div className="mt-4">
          {/* <PageTitle
            // info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
            titleClass="font-bold"
            title="Associated technologies "
          /> */}
          <RelatedKeywords title="Associated technologies" keywords={keywords} />
        </div>
      </DataSection>
      <div></div>
    </div>
  );
};
