/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import { useQuery } from "@tanstack/react-query";
import { getWIPOSector } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";
import BarChart from "../../../@product/bar-chart";

interface Props {
  keywords: string[];
}

// interface IScholaryPublicationData {
//   grant_days: number;
//   years: number;
// }

// interface IScatterItem {
//   x: number;
//   y: number;
// }

// interface IScatterList {
//   id: string;
//   data: IScatterItem[];
// }

export function PatentWipo({ keywords }: Props) {
  const { data, isLoading, isError, error } = useQuery(
    ["wipo_sector", ...keywords],
    async () => {
      return await getWIPOSector(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  const finalData = data && data.map((item) => ({ label: item.title, count: item.count }));
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
            titleClass="font-bold"
            title="15. Distribution of Patents Across WIPO Sectors"
          />
        }
      >
        <div>
          {data && (
            <BarChart
              data={finalData as any}
              keys={["count"]}
              indexBy="label"
              groupMode={"stacked"}
              layout={"horizontal"}
              // legendX="Number of Patents"
              legendY="WIPO FIELD"
              innerPadding={0}
              borderRadius={4}
              legends={"range"}
            />
          )}
          <div className="space-y-2 text-secondary-800 mt-4">
            <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
            <div>
              {/* <h6 className="font-semibold text-primary-900">
                Family A: California (100 patents), Texas (50 patents); Family B: New York (80
                patents), Florida (70 patents)
              </h6> */}
              <ul className="list-disc ml-3 text-sm mt-1 font-medium">
                <li>
                  Dominant WIPO Sector: "WIPO Sector V accounts for X% of all patents, underscoring
                  its importance in global innovation efforts."
                </li>
                <li>
                  Annual Growth in WIPO Sector Patent Filings: "Patent filings in WIPO Sector W have
                  seen an annual increase of X%, indicating a growing interest in this area."
                </li>
                <li>
                  Shift in WIPO Sector Focus Over Years: "Over the last Y years, the focus has
                  shifted towards WIPO Sector X, with its patent filings increasing by X%,
                  reflecting changing global innovation trends."
                </li>
                <li>
                  Comparison of WIPO Sector Filings: "WIPO Sector Y saw a X% increase in patent
                  filings compared to Sector Z over the past decade, highlighting evolving
                  technological landscapes."
                </li>
                <li>
                  Most Rapidly Growing WIPO Sector: "WIPO Sector AA experienced the most rapid
                  growth, with an increase of X% in patent filings over the last Y years, marking it
                  as an emerging area of innovation."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DataSection>
    </div>
  );
}
