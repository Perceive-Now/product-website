/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import RadialChart from "../../@product/radial-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import PageTitle from "../../reusable/page-title";
import NoDataMessage from "../../reusable/no-data";
import TimePeriod from "../../reusable/time-period";
import DataSection from "../../reusable/data-section";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import { getTimeperiod } from "../../../utils/helpers";
import { getAcademicResearchTrends, IUniverityItem } from "../../../utils/api/charts";
import { barChartLegendOptions } from "../../../utils/data/barchartLegend";

/**
 *
 */
export default function AcademicResearchTrends(props: IResearchProps) {
  const [activeGraph, setActiveGraph] = useState<ChartType>("bar");

  //
  const [timeperiods, setTimeperiods] = useState<ITimePeriodItem[]>([]);
  const [selectedTimeperiod, setSelectedTimeperiod] = useState<ITimePeriodItem | null>(null);

  //
  const [activeData, setActiveData] = useState<IUniverityItem[]>([]);
  const [hasActiveData, setHasActiveData] = useState(true);

  const { data, isLoading, isError, error } = useQuery(
    ["dashboard-university-research-trend", ...props.keywords],
    async () => {
      return await getAcademicResearchTrends(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
    const sortedUniversityData = (data ?? [])?.sort((a, b) => (a.year > b.year ? 1 : -1));

    //
    const endUniversityYear = sortedUniversityData[0]?.year;

    const endYearValues = [];

    //
    if (endUniversityYear) endYearValues.push(+endUniversityYear);

    //
    const endYear = endYearValues.length
      ? Math.min(...endYearValues)
      : new Date().getFullYear() - 4;

    //
    const timePeriods = getTimeperiod(endYear);

    //
    setTimeperiods(timePeriods);
    setSelectedTimeperiod(timePeriods[0]);
  }, [data]);

  // Fetching data for selected time period
  useEffect(() => {
    if (!data) return;
    if (!selectedTimeperiod?.value) return;

    //
    const [startYear, endYear] = selectedTimeperiod.value.split("-");

    //
    const selectedData: IUniverityItem[] = [];

    //
    for (let i = +startYear; i <= +endYear; i++) {
      const universityItem = data.find((item) => +item.year === i);

      selectedData.push({
        year: i,
        open_source: universityItem?.open_source ?? 0,
        closed_source: universityItem?.closed_source ?? 0,
        patent: universityItem?.patent ?? 0,
      });
    }

    //
    const totalAmount = selectedData.reduce(
      (prev, curr) => (prev += curr.open_source + curr.closed_source + curr.patent),
      0,
    );

    setHasActiveData(totalAmount > 0);

    //
    setActiveData(selectedData);
  }, [selectedTimeperiod, data]);

  //
  const barChartData = activeData ?? [];

  //
  const radialData = (activeData ?? [])
    .filter((item) => item.open_source + item.closed_source + item.patent > 0)
    .map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const total = item.open_source + item.closed_source + item.patent;
      const openPercentage = (item.open_source / total) * 100;
      const closedPercentage = (item.closed_source / total) * 100;
      const patentsPercentage = (item.patent / total) * 100;

      return {
        id: item.year,
        data: [
          {
            x: "Patents",
            y: patentsPercentage,
            value: item.patent,
          },
          {
            x: "Open Articles",
            y: openPercentage,
            value: item.open_source,
          },
          {
            x: "Closed Articles",
            y: closedPercentage,
            value: item.closed_source,
          },
        ],
      };
    });

  const finalScatterDataFormatHelper = (data: IUniverityItem[]) => {
    if (!data) return [];

    const patentsObj = { id: "Patents", data: [] };
    const openArticlesObj = { id: "Open Source", data: [] };
    const closedArticlesObj = { id: "Closed Source", data: [] };

    let patentsData: any = [];
    let openArticlesData: any = [];
    let closedArticlesData: any = [];

    data.forEach((d: any) => {
      patentsData = [...patentsData, { x: d.year, y: d.patent }];

      openArticlesData = [...openArticlesData, { x: d.year, y: d.open_source }];

      closedArticlesData = [...closedArticlesData, { x: d.year, y: d.closed_source }];
    });

    patentsObj.data = patentsData;
    openArticlesObj.data = openArticlesData;
    closedArticlesObj.data = closedArticlesData;

    return [patentsObj, openArticlesObj, closedArticlesObj];
  };

  const finalScatterData = finalScatterDataFormatHelper(activeData ?? []);

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title="University Research Trends in the USA"
          // info={`This list was extracted from "X" total number of universities worldwide`}
          titleClass="font-semibold"
        />
      }
    >
      <div className="pt-1 flex justify-end items-center gap-x-3">
        <div className="flex items-center">
          <TimePeriod
            onChange={(item) => setSelectedTimeperiod(item)}
            value={selectedTimeperiod}
            timePeriods={timeperiods}
          />

          <div className="flex items-center">
            <ChartButtons
              isMultiData={true}
              activeChart={activeGraph}
              setActiveChart={setActiveGraph}
            />
          </div>
        </div>
      </div>
      {!hasActiveData && (
        <div className="flex h-full justify-center items-center">
          <NoDataMessage years={selectedTimeperiod?.value ?? ""} />
        </div>
      )}
      {hasActiveData && (
        <Fragment>
          {activeGraph === "bar" && (
            <BarChart
              keys={["Patents", "Open Source", "Closed Source"]}
              indexBy="year"
              legendY="Number of Publications"
              data={barChartData.map((data) => ({
                Patents: data.patent,
                "Open Source": data.open_source,
                "Closed Source": data.closed_source,
                year: data.year,
              }))}
              legends={[barChartLegendOptions]}
            />
          )}

          {activeGraph === "scatter" && (
            <ScatterChart data={finalScatterData} legendX="Location" legendY="Articles" />
          )}

          {activeGraph === "donut" && (
            <RadialChart data={radialData} colors={["#B6A2D8", "#7F4BD8", "#442873"]} />
          )}
        </Fragment>
      )}

      {/* <div className="mt-4">
        <Link to="/publications">Read more</Link>
      </div> */}
    </DataSection>
  );
}

interface IResearchProps {
  keywords: string[];
}
