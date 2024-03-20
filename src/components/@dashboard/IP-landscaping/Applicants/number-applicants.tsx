import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import { getPatentApplicantType } from "../../../../utils/api/charts";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../reusable/page-title";
import BarChart from "../../../@product/bar-chart";

interface Props {
  keywords: string[];
}

export const NumberApplicationsByApplicant: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patent-portfolio", ...keywords],
    async () => {
      return await getPatentApplicantType(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  // const sortedData = useMemo(() => {
  //   if (data) {
  //     return [...data].sort((a, b) => a.count - b.count);
  //   }
  //   return [];
  // }, [data]);

  const barChartData = (data ?? []).map((item) => ({
    label: item.applicant_type,
    value: item.count,
  }));

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-bold"
          title="3. Applicants"
          subTitle="Number of Applications by Applicant Type"
        />
      }
    >
      <div>
        <BarChart
          data={barChartData}
          keys={["value"]}
          indexBy="label"
          groupMode={"stacked"}
          // innerPadding={0}
          borderRadius={4}
          legends={"range"}
          legendY="Average family size (n)"
          legendX="Application type"
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
                Market Share of Applications by Applicant Type: Breakdown of patent applications by
                applicant type (individual, corporation, etc.), e.g., "Corporations filed for X% of
                all patents, highlighting the commercial drive of innovation."
              </li>
              <li>
                Trend in Applicant Type Over Time: Evolution of applicant type proportions,
                indicating shifts in who is driving innovation, e.g., "Applications by individuals
                have increased by X% over the last Y years."
              </li>
              <li>
                Sector-Specific Applicant Type Dominance: Dominance of certain applicant types
                within specific sectors, suggesting, "In the renewable energy sector, universities
                account for X% of applications."
              </li>
              <li>
                Geographical Variations in Applicant Types: Regional differences in the distribution
                of applicant types, e.g., "Region A has a notably high proportion of corporate
                applicants at X%."
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DataSection>
  );
};
