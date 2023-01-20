import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import RadialChart from "../../@product/radial-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import DataSection from "../../reusable/data-section";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import { TIME_PERIODS } from "../../../utils/constants";
import { getAcademicResearchTrends } from "../../../utils/api/charts";

/**
 *
 */
export default function AcademicResearchTrends(props: IResearchProps) {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data, isLoading, isError, error } = useQuery(
    ["dashboard-academic-research-trend", ...props.keywords],
    async () => {
      return await getAcademicResearchTrends(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  //
  const finalData = isLoading ? [] : data?.chart ?? [];

  //
  const finalPieData = isLoading ? [] : data?.chart ?? [];

  const radialData = finalPieData
    .map((itm) => itm.locationName)
    .map((itm) => {
      const data = finalPieData.find((it) => it.locationName === itm)!;

      const total = data.openArticlesCount + data.closedArticlesCount + data.patentsCount;
      const openPercentage = (data.openArticlesCount / total) * 100;
      const closedPercentage = (data.closedArticlesCount / total) * 100;
      const patentsPercentage = (data.patentsCount / total) * 100;

      return {
        id: itm,
        data: [
          {
            x: "Patents",
            y: patentsPercentage,
            value: data.patentsCount,
          },
          {
            x: "Open Articles",
            y: openPercentage,
            value: data.openArticlesCount,
          },
          {
            x: "Closed Articles",
            y: closedPercentage,
            value: data.closedArticlesCount,
          },
        ],
      };
    });

  const finalScatterDataFormatHelper = (data: any) => {
    if (!data) return [];

    const patentsObj = { id: "Patents", data: [] };
    const openArticlesObj = { id: "Open Articles", data: [] };
    const closedArticlesObj = { id: "Closed Articles", data: [] };

    let patentsData: any = [];
    let openArticlesData: any = [];
    let closedArticlesData: any = [];

    data.forEach((d: any) => {
      patentsData = [...patentsData, { x: d.locationName, y: d.patentsCount }];

      openArticlesData = [...openArticlesData, { x: d.locationName, y: d.openArticlesCount }];

      closedArticlesData = [...closedArticlesData, { x: d.locationName, y: d.closedArticlesCount }];
    });

    patentsObj.data = patentsData;
    openArticlesObj.data = openArticlesData;
    closedArticlesObj.data = closedArticlesData;

    return [patentsObj, openArticlesObj, closedArticlesObj];
  };

  const finalScatterData = isLoading ? [] : finalScatterDataFormatHelper(data?.chart) ?? [];

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title="Academic Research Trends in the USA"
          info={`This list was extracted from "X" total number of universities worldwide`}
          titleClass="font-semibold"
        />
      }
    >
      <div className="pt-1 flex justify-end items-center gap-x-3">
        <div>{/* <TimePeriod timePeriods={TIME_PERIODS} /> */}</div>

        <div className="flex items-center">
          <ChartButtons
            isMultiData={true}
            activeChart={activeChart}
            setActiveChart={setActiveChart}
          />
        </div>
      </div>

      {activeChart === "bar" && (
        <>
          <div className="flex justify-end gap-x-3 pt-1 -mb-3">
            <div className="flex gap-x-1 text-sm items-center">
              <div className="w-2 h-2 bg-primary-100 rounded-full" />
              <span>Patents</span>
            </div>

            <div className="flex gap-x-1 text-sm items-center">
              <div className="w-2 h-2 bg-primary-500 rounded-full" />
              <span>Open</span>
            </div>

            <div className="flex gap-x-1 text-sm items-center">
              <div className="w-2 h-2 bg-primary-800 rounded-full" />
              <span>Closed</span>
            </div>
          </div>

          <BarChart
            keys={["patentsCount", "openArticlesCount", "closedArticlesCount"]}
            indexBy="locationName"
            legendY="Number of Publications"
            data={finalData}
          />
        </>
      )}

      {activeChart === "scatter" && (
        <ScatterChart data={finalScatterData} legendX="Location" legendY="Articles" />
      )}

      {activeChart === "donut" && <RadialChart data={radialData} />}

      <div className="mt-4">
        <Link to="/publications">Read more</Link>
      </div>
    </DataSection>
  );
}

interface IResearchProps {
  keywords: string[];
}
