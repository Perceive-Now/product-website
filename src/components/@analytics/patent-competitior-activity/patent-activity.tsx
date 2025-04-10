import { FunctionComponent, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../reusable/data-section";
import PageTitle from "../../reusable/page-title";

//
import { getCompetitorPatentingActivity } from "../../../utils/api/charts";
import RadarChart from "../../@chart/radar";

interface Props {
  keywords: string[];
}

interface ITransformedData {
  [key: string]: {
    year: number;
    [org: string]: number;
  };
}

interface ITransformedEntry {
  year: number;
  [org: string]: number;
}

/**
 *
 */
export const PatentCompetitorActivity: FunctionComponent<Props> = ({ keywords }) => {
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

  const transformData = useCallback((inputData: ITransformedEntry[]) => {
    const uniqueKeys = Array.from(
      new Set(inputData.flatMap((entry) => Object.keys(entry).filter((key) => key !== "year"))),
    );

    // Check and add missing keys with a value of 0
    inputData.forEach((entry) => {
      uniqueKeys.forEach((key) => {
        if (!entry[key]) {
          entry[key] = 0;
        }
      });
    });

    return inputData;
  }, []);

  const finalData = transformData(result);

  // const uniqueKeys = useMemo(() => { new Set(keys); }, [keys])

  const updateKeys = useCallback((data: ITransformedEntry[]) => {
    const uniqueKeys = new Set();

    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        if (key !== "year") {
          uniqueKeys.add(key);
        }
      });
    });
    const newKeys = Array.from(uniqueKeys);

    return newKeys as string[];
  }, []);

  const keys = updateKeys(finalData);

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
          <RadarChart data={finalData.slice(0, 5)} keys={keys.slice(0, 5)} index={"year"} />
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
