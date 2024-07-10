import { FunctionComponent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../reusable/data-section";
import PageTitle from "../../reusable/page-title";

//
import { getPatentActivityClass } from "../../../utils/api/charts";

//
import BarChart from "../../@chart/bar-chart";
import RadioButtons from "../../reusable/radio-buttons";

interface Props {
  keywords: string[];
}

type IYear = "2023" | "2022" | "2021" | "2020";

/**
 *
 */
export const PatentCompetitorClass: FunctionComponent<Props> = ({ keywords }) => {
  const [year, setYear] = useState<IYear>("2023");

  const changeYear = (mode: string) => {
    setYear(mode as IYear);
  };

  //
  const { data, isLoading, isError, error } = useQuery(
    ["patent-competitor-activity-class", ...keywords],
    async () => {
      return await getPatentActivityClass(keywords);
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
            title="13. Top 10 Classes of Competitor Patenting Activity Class (USPC)"
            sideTitleOption={
              <RadioButtons
                options={[
                  { label: "2023", value: "2023" },
                  { label: "2022", value: "2022" },
                  { label: "2021", value: "2021" },
                  { label: "2020", value: "2020" },
                ]}
                activeMode={year}
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
              data={data.slice(2, 15)}
              keys={["count"]}
              indexBy="org"
              groupMode={"stacked"}
              // legendX="Number of Patents"
              legendY="WIPO FIELD"
              innerPadding={0}
              borderRadius={4}
              layout={"horizontal"}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-left",
                  direction: "row",
                  justify: false,
                  translateX: 100,
                  translateY: 80,
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
