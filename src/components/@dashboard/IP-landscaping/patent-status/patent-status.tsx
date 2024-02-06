import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
//
import DataSection from "../../../reusable/data-section";
//
import { getPatentLegalStatus } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";
import PieChart from "../../../@product/pie-chart";

interface Props {
  keywords: string[];
}

/**
 *
 */
export const PatentLegalStatus: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patents-status", ...keywords],
    async () => {
      return await getPatentLegalStatus(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const pieChartData = (data ?? []).map((item) => ({
    id: item.title,
    label: item.title,
    value: item.count,
  }));

  //
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
            title="2. Distribution of Patent Types"
            // subTitle="Heat map of patents location in USA"
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
          {<PieChart data={pieChartData} />}
          <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
          <div>
            {/* <h6 className="font-semibold text-primary-900">
              Patent ID 001: 5 references, Patent ID 002: 3 references, Patent ID 003: 7 references
            </h6> */}
            <ul className="list-disc ml-3 text-sm mt-1 font-medium">
              <li>
                Proportion of Patent Types: Breakdown of patents by type (utility, design, plant),
                e.g., "Utility patents represent X% of all filings," indicating the predominant form
                of innovation.
              </li>
              <li>
                Yearly Change in Patent Type Distribution: Yearly fluctuation in the distribution of
                patent types, showing shifts in innovation focus, e.g., "Design patents increased by
                X% in market share from year Y to Z."
              </li>
              <li>
                Sector-Specific Patent Type Trends: The distribution of patent types within key
                industry sectors, e.g., "In the biotech sector, plant patents constitute X% of
                filings."
              </li>
              <li>
                Geographical Variation in Patent Types: Differences in patent type popularity by
                region, e.g., "Region A favors design patents, making up X% of its total patents."
              </li>
              <li>
                Impact of Patent Type on Examination Times: Average examination times for each
                patent type, indicating, "Utility patents take X% longer to examine than design
                patents on average."
              </li>
            </ul>
          </div>
        </div>
      </DataSection>
    </div>
  );
};
