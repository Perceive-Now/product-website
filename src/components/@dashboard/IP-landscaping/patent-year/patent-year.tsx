import { FunctionComponent, useEffect, useState } from "react";
import BarChart from "../../../@product/bar-chart";
import DataSection from "../../../reusable/data-section";
import RadioButtons from "../../../reusable/radio-buttons";
import { useQuery } from "@tanstack/react-query";
import { getPatentsYearly } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";

interface Props {
  keywords: string[];
}
type IYear = "1st5year" | "2nd5year";

export const PatentYear: FunctionComponent<Props> = ({ keywords }) => {
  const [yearChoose, setYearChoose] = useState<IYear>("1st5year");

  const changeYear = (mode: string) => {
    setYearChoose(mode as IYear);
  };

  const { data, isLoading, isError, error } = useQuery(
    ["patents-year", ...keywords],
    async () => {
      return await getPatentsYearly(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

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
            title="1. Patent Families by year"
            // subTitle="Heat map of patents location in USA"
            sideTitleOption={
              <RadioButtons
                options={[
                  { label: "2014-2018", value: "1st5year" },
                  { label: "2019-2023", value: "2nd5year" },
                ]}
                activeMode={yearChoose}
                handleModeChange={changeYear}
                classNames="text-sm font-semibold"
              />
            }
          />
        }
      >
        <div>
          {data && (
            <BarChart
              data={data}
              keys={[
                "count",
                // 'burger',
                // 'sandwich',
                // 'kebab',
                // 'fries',
                // 'donut'
              ]}
              indexBy="year"
              groupMode="stacked"
              legendY="Number of Patents"
              innerPadding={0}
              borderRadius={4}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: -20,
                  itemsSpacing: 0,
                  itemWidth: 83,
                  itemHeight: 45,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                  legendClassName: "custom-legend",
                },
              ]}
            />
          )}
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
