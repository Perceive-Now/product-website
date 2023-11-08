import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";

//
import { getGeoFiling } from "../../../../utils/api/charts";
//
import StatesCodes from "../../../../utils/extra/us-states-codes";
//
import USMap from "../../../@product/us-map";
import BarChart from "../../../@product/bar-chart";

interface Props {
  keywords: string[];
}

export const GeographicalDistributionFiling: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["geographical-filing", ...keywords],
    async () => {
      return await getGeoFiling(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const mapData = (data ?? []).map((item) => ({
    country: StatesCodes[item.state],
    patents: item.cout,
  }));

  return (
    <div className="border-gray-200 shadow-custom border px-2 pt-2 pb-4 w-full space-y-2">
      <DataSection
        keywords={keywords}
        isLoading={isLoading}
        isError={isError}
        error={error}
        title={
          <PageTitle
            // info={`This geographical hLegal Status of Patentseat map network was extracted from "X" no of publications and "Y" no of patents`}
            titleClass="font-bold"
            title="5. Geographical Distribution of Filings"
            // subTitle="Top 5 Inventors"
            // sideTitleOption={
            //   <RadioButtons
            //     options={[
            //       { label: "Industries", value: "Industry" },
            //       { label: "Universities", value: "Academic" },
            //     ]}
            //     activeMode={currentMode}
            //     handleModeChange={handleModeChange}
            //   />
            // }
          />
        }
      >
        <div className="space-y-2 text-secondary-800 mt-4">
          {data && <USMap data={mapData} type={"heatmap_industry"} />}

          <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
          <div>
            <h6 className="font-semibold text-primary-900">
              Patent ID 001: 5 references, Patent ID 002: 3 references, Patent ID 003: 7 references
            </h6>
            <ul className="list-disc ml-3 text-sm mt-1 font-medium">
              <li>
                The wearable blood pressure sensor market is on a growth trajectory with a projected
                Compound Annual Growth Rate (CAGR) of 8.5% over the next five years. This could
                potentially elevate the market valuation from an estimated $1.5 billion to over
                $2.25 billion by the end of the forecast period.
              </li>
              <li>
                The driving factors behind this growth could be an increasing awareness of health
                and fitness, aging population, and the advancement in wearable technology.
              </li>
            </ul>
          </div>
        </div>
        {/* bar chart */}
        <div className="mt-4">
          <h5 className="font-bold text-primary-900 text-lg">
            Top 5 states based on patent filings
          </h5>

          {data && (
            <BarChart
              data={mapData.slice(0, 5)}
              keys={["patents"]}
              indexBy="country"
              groupMode="stacked"
              legendY="NUMBER OF PATENTS"
            />
          )}

          <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
          <ul className="list-disc ml-3 text-sm mt-1 font-medium">
            <li>
              The wearable blood pressure sensor market is on a growth trajectory with a projected
              Compound Annual Growth Rate (CAGR) of 8.5% over the next five years. This could
              potentially elevate the market valuation from an estimated $1.5 billion to over $2.25
              billion by the end of the forecast period.
            </li>
            <li>
              The driving factors behind this growth could be an increasing awareness of health and
              fitness, aging population, and the advancement in wearable technology.
            </li>
          </ul>
        </div>
      </DataSection>
    </div>
  );
};
