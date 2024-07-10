import { FunctionComponent, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

//
import DataSection from "../../reusable/data-section";
import PageTitle from "../../reusable/page-title";

//
import { getTechnlogyLifeCycleAnalysis } from "../../../utils/api/charts";

//
import ScatterChart from "../../@chart/scatter-chart";

//
interface Props {
  keywords: string[];
}

interface IScholaryPublicationData {
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

/**
 *
 */
export const TechnologyLifeCycleAnalysis: FunctionComponent<Props> = ({ keywords }) => {
  //
  const { data, isLoading, isError, error } = useQuery(
    ["lifecycle-analysis", ...keywords],
    async () => {
      return await getTechnlogyLifeCycleAnalysis(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  //
  const finalScatterDataFormatHelper = (data: IScholaryPublicationData[]) => {
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
            title="8. Technology Lifecycle Stage Analysis"
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
          {
            <ScatterChart
              data={scatterChartData}
              colors={["#FFA300CC"]}
              // legendX={""}
              // legendY="b"
            />
          }

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
      </DataSection>
    </div>
  );
};
