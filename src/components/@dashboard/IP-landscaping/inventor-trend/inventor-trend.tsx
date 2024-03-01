import { useEffect } from "react";
import DataSection from "../../../reusable/data-section";
import { useQuery } from "@tanstack/react-query";
import { getPatentInventorColab } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";
import ScatterChart from "../../../@product/scatter-chart";

interface Props {
  keywords: string[];
}

interface IPatentColab {
  count: number;
  year: number;
}

interface IScatterItem {
  x: number;
  y: number;
}

interface IScatterList {
  id: string;
  data: IScatterItem[];
}

export function InventorTrendOverTime({ keywords }: Props) {
  const { data, isLoading, isError, error } = useQuery(
    ["patent-invenotr-colab", ...keywords],
    async () => {
      return await getPatentInventorColab(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  //
  const finalScatterDataFormatHelper = (data: IPatentColab[]) => {
    if (!data) return [];

    const openAccessCountObj: IScatterList = { id: "Stage", data: [] };
    let openAccessData: IScatterItem[] = [];
    //
    data.forEach((d) => {
      openAccessData.push({ x: d.year, y: d.count });
    });

    // For checking and sorting past 10years
    const uniqueYears = Array.from(new Set(openAccessData.map((entry) => entry.x)));
    const sortedYears = uniqueYears.sort((a, b) => b - a);
    const recentYears = sortedYears.slice(0, 10);
    //

    // filter
    openAccessData = openAccessData.filter((item) => recentYears.includes(item.x));
    openAccessCountObj.data = openAccessData.slice(0, 10);
    //
    return [openAccessCountObj];
  };

  const scatterChartData = finalScatterDataFormatHelper(data ?? []);

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
            title="12. Trends in Inventor Collaborations Over Time"
          />
        }
      >
        <div>
          <ScatterChart
            data={scatterChartData}
            // legendX="Year"
            // legendY="Publications"
            // abbreviateLegendX={true}
            colors={["#7F4BD8", "#442873"]}
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
                  Growth in Inventor Collaborations: "Collaborations among inventors have increased
                  by X% over the last Y years, reflecting a trend towards more cooperative
                  innovation efforts."
                </li>
                <li>
                  Year with Highest Collaboration Count: "Year Z saw the highest number of inventor
                  collaborations, with X collaborative projects, indicating a peak in joint
                  innovation activities."
                </li>
                <li>
                  Decadal Increase in Collaborations: "Comparing the last two decades, inventor
                  collaborations in the 2010s were X% higher than in the 2000s, showing a growing
                  preference for teamwork in innovation."
                </li>
                <li>
                  Sector-Specific Collaboration Trends: "In the technology sector, collaborations
                  among inventors have increased by X% in the last Y years, highlighting sectoral
                  shifts towards collective innovation."
                </li>
                <li>
                  Regional Variations in Collaboration Patterns: "Region L exhibits the highest rate
                  of increase in inventor collaborations, with a surge of X% over the past decade,
                  pointing to evolving regional innovation strategies."
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DataSection>
    </div>
  );
}
