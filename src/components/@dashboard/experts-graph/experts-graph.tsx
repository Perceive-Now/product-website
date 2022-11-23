import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import NoKeywordMessage from "../../reusable/no-keyword";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import BarChart from "../../@product/bar-chart";
import RadialChart from "../../@product/radial-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import { getTimeperiod } from "../../../utils/helpers";
import { getExpertsCountGraph, IExpertCount } from "../../../utils/api/charts";

//
import { LoadingIcon } from "../../icons";

/**
 *
 */
export default function ExpertsGraph(props: IExpertsGraphProps) {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const [selectedTimeperiod, setSelectedTimeperiod] = useState("");
  const timeperiod = useMemo(() => getTimeperiod(), []);

  let hasNoData = false;

  const { data: expertsChartData, isLoading } = useQuery(
    ["experts-count-graph", ...props.keywords],
    async () => {
      return await getExpertsCountGraph(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const hasDataChecker = (expertsList: IExpertCount[]) => {
    if (!expertsList) return (hasNoData = true);

    if (expertsList.length < 1) return (hasNoData = true);

    let hasNoDataFlag = true;

    expertsList.forEach((cD) => {
      if (cD.closed_doi_count + cD.open_doi_count > 0) {
        hasNoDataFlag = false;
      }
    });

    if (hasNoDataFlag) {
      hasNoData = true;
    } else {
      hasNoData = false;
    }
  };

  const chartDataFormatHelper = (patents: IExpertCount[]) => {
    let startYear = selectedTimeperiod?.split("-")[0] || "2018";
    let endYear = selectedTimeperiod?.split("-")[1] || "2022";

    let expertsList = patents.filter((data) => {
      let year = String(data.year);
      return year >= startYear && year <= endYear;
    });
    hasDataChecker(expertsList);
    return expertsList;
  };

  const chartData = expertsChartData?.experts
    ? chartDataFormatHelper(expertsChartData.experts) ?? []
    : [];

  //
  const finalPieData = isLoading ? [] : chartData ?? [];

  const radialData = finalPieData
    .map((itm) => itm.year)
    .map((itm) => {
      const data = finalPieData.find((it) => it.year === itm)!;

      const total = data.open_doi_count + data.closed_doi_count;
      const openPercentage = (data.open_doi_count / total) * 100;
      const closedPercentage = (data.closed_doi_count / total) * 100;

      return {
        id: itm,
        data: [
          { x: "Open", y: openPercentage, value: data.open_doi_count },
          {
            x: "Closed",
            y: closedPercentage,
            value: data.closed_doi_count,
          },
        ],
      };
    });

  const finalScatterDataFormatHelper = (data: any) => {
    if (!data) return [];

    let openExpertsObj = { id: "Open Experts", data: [] };
    let closedExpertsObj = { id: "Closed Experts", data: [] };

    let openExpertsData: any = [];
    let closedExpertsData: any = [];

    data.forEach((d: any) => {
      openExpertsData = [
        ...openExpertsData,
        { x: d.year, y: d.openExpertsCount },
      ];

      closedExpertsData = [
        ...closedExpertsData,
        { x: d.year, y: d.closedExpertsCount },
      ];
    });

    openExpertsObj.data = openExpertsData;
    closedExpertsObj.data = closedExpertsData;

    return [openExpertsObj, closedExpertsObj];
  };

  const handleTimePeriodChange = (value: any) => {
    setSelectedTimeperiod(value.value);
  };

  const finalScatterData = isLoading
    ? []
    : finalScatterDataFormatHelper(chartData) ?? [];

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        title="Number of Experts and Researchers"
        titleClass="font-semibold"
        info={`This list was extracted from "X" total number of experts and researchers worldwide`}
      />

      {props.keywords.length < 1 && (
        <div className="h-[300px] flex justify-center items-center">
          <NoKeywordMessage />
        </div>
      )}

      {props.keywords.length > 0 && (
        <>
          {isLoading && (
            <div className="h-[300px] flex justify-center items-center">
              <LoadingIcon fontSize={52} />
            </div>
          )}

          {!isLoading && (
            <>
              <div className="pt-1 flex justify-end items-center h-5">
                <div className="flex items-center">
                  <TimePeriod
                    startYear={expertsChartData?.startYear}
                    handleChange={handleTimePeriodChange}
                  />

                  <ChartButtons
                    isMultiData={true}
                    activeChart={activeChart}
                    setActiveChart={setActiveChart}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-3 gap-x-3">
                {activeChart === "bar" && (
                  <>
                    <div className="flex gap-x-1 text-sm items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      <span>Open</span>
                    </div>

                    <div className="flex gap-x-1 text-sm items-center">
                      <div className="w-2 h-2 bg-primary-800 rounded-full" />
                      <span>Closed</span>
                    </div>
                  </>
                )}
              </div>
              {!hasNoData && (
                <>
                  {activeChart === "bar" && (
                    <BarChart
                      keys={["open_doi_count", "closed_doi_count"]}
                      indexBy="year"
                      legendY="Number of Experts"
                      data={(isLoading ? [] : chartData) ?? []}
                    />
                  )}

                  {activeChart === "scatter" && (
                    <ScatterChart
                      data={finalScatterData}
                      legendX="Year"
                      legendY="Experts"
                      colors={["#7F4BD8", "#442873"]}
                    />
                  )}

                  {activeChart === "donut" && (
                    <RadialChart
                      data={radialData}
                      colors={["#7F4BD8", "#442873"]}
                    />
                  )}
                </>
              )}
              <div className="mt-4">
                <Link to="/experts">Read more</Link>
              </div>{" "}
            </>
          )}
        </>
      )}
    </div>
  );
}

interface IExpertsGraphProps {
  keywords: string[];
}
