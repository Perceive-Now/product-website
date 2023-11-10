import { useQuery } from "@tanstack/react-query";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { FunctionComponent, useEffect, useState } from "react";
import { getCompetitorPatentingActivity } from "../../../../utils/api/charts";
import RadarChart from "../../../@product/radar";

interface Props {
  keywords: string[];
}

interface ITransformedData {
  [key: string]: {
    year: number;
    [org: string]: number;
  };
}

export const PatentCompetitorActivity: FunctionComponent<Props> = ({ keywords }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [keys, setKeys] = useState<any>([]);
  const { data, isLoading, isError, error } = useQuery(
    ["patent-competitor-activity", ...keywords],
    async () => {
      return await getCompetitorPatentingActivity(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const transformedData: ITransformedData = {};

  data &&
    data.forEach((entry) => {
      const year = Math.floor(entry.year);

      if (!transformedData[year]) {
        transformedData[year] = { year: year };
      }

      transformedData[year][entry.org] = entry.count;
    });

  const result = Object.values(transformedData);

  useEffect(() => {
    const uniqueKeys = new Set(keys);

    result.forEach((obj) => {
      Object.entries(obj).forEach(([key]) => {
        if (key !== "year") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          // setKeys((prevKeys: any) => [...prevKeys, key]);
          uniqueKeys.add(key);
        }
      });
    });

    setKeys(Array.from(uniqueKeys));
  }, []);

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
            title="12. Competitor Patenting Activity"
          />
        }
      >
        <div>
          <RadarChart
            data={result.slice(0, 5)}
            keys={keys.slice(0, 5)}
            // keys={["AEROSPACE COMMUNICATION HOLDINGS, CO., LTD","Fairchild Camera & Instrument Corp","Standard Systems Corporation","The United States of America as represented by the Secretary of the Army"]}
            index={"year"}
          />
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
