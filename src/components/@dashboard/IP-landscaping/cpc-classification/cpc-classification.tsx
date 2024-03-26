/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { useQuery } from "@tanstack/react-query";
import { getPatentClassificationCPC } from "../../../../utils/api/charts";
import ScrollableBarChart from "../../../@product/bar-scroll";

interface Props {
  keywords: string[];
}

export const ClassificationCPC: FunctionComponent<Props> = ({ keywords }) => {
  const { data, isLoading, isError, error } = useQuery(
    ["patent_cpc", ...keywords],
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

  const finalData = data && data.map((item) => ({ label: item.cpc_class, value: item.count }));

  return (
    <DataSection
      keywords={keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-bold"
          title="6. CPC"
          subTitle=" Distribution of Patents by CPC Classifications"
        />
      }
    >
      <div className="space-y-2 text-secondary-800 mt-4">
        {data && (
          <ScrollableBarChart
            data={finalData as any}
            // keys={["count"]}
            // indexBy="label"
            // groupMode="stacked"
            // legends={"legend"}
            // legendX="CPC Class"
            // legendY="No. of patent count"
          />
        )}

        <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
        <div>
          <h6 className="font-semibold text-primary-900">
            Patent ID 001: 5 references, Patent ID 002: 3 references, Patent ID 003: 7 references
          </h6>
          <ul className="list-disc ml-3 text-sm mt-1 font-medium">
            <li>
              Leading IPC Class: "IPC Class R leads with X% of patent applications, marking it as
              the most focused area of innovation."
            </li>
            <li>
              Growth Trend in IPC Class Applications: "Applications in IPC Class S have grown by X%
              in the last Y years, indicating a rising trend in this technological field."
            </li>
            <li>
              Comparison of IPC Class Dominance: "IPC Class T's share of patent applications has
              increased from X% to Y% over the past decade, demonstrating shifting innovation
              priorities."
            </li>
            <li>
              Sector Analysis for IPC Classes: "The electronics sector predominantly applies for
              patents in IPC Class U, accounting for X% of the sector's applications."
            </li>
            <li>
              Year with Most Diverse IPC Class Filings: "Year Z recorded the most diverse range of
              IPC Class filings, with significant applications in over X different classes,
              reflecting a broad innovation landscape."
            </li>
          </ul>
        </div>
      </div>
    </DataSection>
  );
};
