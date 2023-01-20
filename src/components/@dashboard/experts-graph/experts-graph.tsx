import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";

import DataSection from "../../reusable/data-section";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import BarChart from "../../@product/bar-chart";
import RadialChart from "../../@product/radial-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import { getTimeperiod } from "../../../utils/helpers";
import { getExpertsCountGraph } from "../../../utils/api/charts";
import { barChartLegendOptions } from "../../../utils/data/barchartLegend";

/**
 *
 */
export default function ExpertsGraph(props: IExpertsGraphProps) {
  //
  const [activeGraph, setActiveGraph] = useState<ChartType>("bar");

  //
  const [timeperiods, setTimeperiods] = useState<ITimePeriodItem[]>([]);
  const [selectedTimeperiod, setSelectedTimeperiod] = useState<ITimePeriodItem | null>(null);

  //
  const [activeData, setActiveData] = useState<any[]>([]);
  const [hasActiveData, setHasActiveData] = useState(true);

  //

  // Fetching the data from the API
  const { data, isLoading, isError, error } = useQuery(
    ["dashboard-experts-count-graph", ...props.keywords],
    async () => {
      return await getExpertsCountGraph(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
    const sortedPatentData = (data ?? []).patent?.sort((a, b) => (a.year > b.year ? 1 : -1));
    const sortedPublicationData = (data ?? []).publication?.sort((a, b) =>
      a.year > b.year ? 1 : -1,
    );

    //
    const endPatentYear = sortedPatentData[0]?.year;
    const endPublicationyear = sortedPublicationData[0]?.year;

    const endYearValues = [];

    //
    if (endPatentYear) endYearValues.push(+endPatentYear);
    if (endPublicationyear) endYearValues.push(+endPublicationyear);

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
    const selectedData: any[] = [];

    //
    for (let i = +startYear; i <= +endYear; i++) {
      const patentItem = data.patent.find((item) => +item.year === i);
      const publicationItem = data.publication.find((item) => +item.year === i);

      selectedData.push({
        year: i.toString(),
        publication: publicationItem?.count ?? 0,
        patent: patentItem?.count ?? 0,
      });
    }

    //
    const totalAmount = selectedData.reduce(
      (prev, curr) => (prev += curr.publication + curr.patent),
      0,
    );

    setHasActiveData(totalAmount > 0);

    //
    setActiveData(selectedData);
  }, [selectedTimeperiod, data]);

  //

  //
  const barChartData = activeData ?? [];

  //
  const pieChartData = (activeData ?? [])
    .filter((item) => item.patent + item.publication > 0)
    .map((item) => {
      const total = item.patent + item.publication;

      const patentPercentage = item.patent ? (item.patent / total) * 100 : 0;
      const publicationPercentage = item.publication ? (item.publication / total) * 100 : 0;

      return {
        id: item.year,
        data: [
          {
            x: "Patents",
            y: patentPercentage,
            value: item.patent,
          },
          {
            x: "Publications",
            y: publicationPercentage,
            value: item.publication,
          },
        ],
      };
    });

  //
  const finalScatterDataFormatHelper = (data: any[]) => {
    if (!data) return [];

    const patentExpertsCountObj = { id: "Patents", data: [] };
    const publicationExpertsCountObj = { id: "Publications", data: [] };

    const patentExpertsData: any = [];
    const publicationExpertsData: any = [];

    //
    data.forEach((d) => {
      patentExpertsData.push({ x: d.year, y: d.patent });
      publicationExpertsData.push({ x: d.year, y: d.publication });
    });

    //
    patentExpertsCountObj.data = patentExpertsData;
    publicationExpertsCountObj.data = publicationExpertsData;

    //
    return [patentExpertsCountObj, publicationExpertsCountObj];
  };

  //
  const scatterChartData = finalScatterDataFormatHelper(activeData ?? []);

  //
  // const hasDataChecker = (expertsList: IExpertCount[]) => {
  //   if (!expertsList) return (hasNoData = true);

  //   if (expertsList.length < 1) return (hasNoData = true);

  //   let hasNoDataFlag = true;

  //   expertsList.forEach((cD) => {
  //     if (cD.closed_doi_count + cD.open_doi_count > 0) {
  //       hasNoDataFlag = false;
  //     }
  //   });

  //   if (hasNoDataFlag) {
  //     hasNoData = true;
  //   } else {
  //     hasNoData = false;
  //   }
  // };

  //
  // const chartDataFormatHelper = (patents: IExpertCount[]) => {
  //   const startYear = selectedTimeperiod?.split("-")[0] || "2018";
  //   const endYear = selectedTimeperiod?.split("-")[1] || "2022";

  //   const expertsList = patents.filter((data) => {
  //     const year = String(data.year);
  //     return year >= startYear && year <= endYear;
  //   });
  //   hasDataChecker(expertsList);
  //   return expertsList;
  // };

  //
  // const chartData = data?.experts ? chartDataFormatHelper(data.experts) ?? [] : [];

  //
  // const finalPieData = isLoading ? [] : chartData ?? [];
  // const finalPieData = [];
  // const radialData = [];

  // const radialData = finalPieData
  //   .map((itm) => itm.year)
  //   .map((itm) => {
  //     const data = finalPieData.find((it) => it.year === itm)!;

  //     const total = data.open_doi_count + data.closed_doi_count;
  //     const openPercentage = (data.open_doi_count / total) * 100;
  //     const closedPercentage = (data.closed_doi_count / total) * 100;

  //     return {
  //       id: itm,
  //       data: [
  //         { x: "Open", y: openPercentage, value: data.open_doi_count },
  //         {
  //           x: "Closed",
  //           y: closedPercentage,
  //           value: data.closed_doi_count,
  //         },
  //       ],
  //     };
  //   });

  // const finalScatterDataFormatHelper = (data: any) => {
  //   if (!data) return [];

  //   const openExpertsObj = { id: "Open Experts", data: [] };
  //   const closedExpertsObj = { id: "Closed Experts", data: [] };

  //   let openExpertsData: any = [];
  //   let closedExpertsData: any = [];

  //   data.forEach((d: any) => {
  //     openExpertsData = [...openExpertsData, { x: d.year, y: d.openExpertsCount }];

  //     closedExpertsData = [...closedExpertsData, { x: d.year, y: d.closedExpertsCount }];
  //   });

  //   openExpertsObj.data = openExpertsData;
  //   closedExpertsObj.data = closedExpertsData;

  //   return [openExpertsObj, closedExpertsObj];
  // };

  // const handleTimePeriodChange = (value: any) => {
  //   setSelectedTimeperiod(value.value);
  // };

  // const finalScatterData = isLoading ? [] : finalScatterDataFormatHelper(chartData) ?? [];

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title="Inventor’s Trend"
          titleClass="font-semibold"
          info={`This list was extracted from "X" total number of experts and researchers worldwide`}
        />
      }
    >
      <div className="pt-1 flex justify-end items-center h-5">
        <div className="flex items-center">
          <TimePeriod
            onChange={(item) => setSelectedTimeperiod(item)}
            value={selectedTimeperiod}
            timePeriods={timeperiods}
          />

          <ChartButtons
            isMultiData={true}
            activeChart={activeGraph}
            setActiveChart={setActiveGraph}
          />
        </div>
      </div>
      {hasActiveData && (
        <Fragment>
          {activeGraph === "bar" && (
            <BarChart
              keys={["Patents", "Publications"]}
              indexBy="year"
              legendY="Number of Inventors"
              data={barChartData.map((data) => ({
                Patents: data.patent,
                Publications: data.publication,
                year: data.year,
              }))}
              legends={[barChartLegendOptions]}
            />
          )}

          {activeGraph === "donut" && (
            <RadialChart data={pieChartData} colors={["#7F4BD8", "#442873"]} />
          )}

          {activeGraph === "scatter" && (
            <ScatterChart
              data={scatterChartData}
              legendY="Number of Inventors"
              abbreviateLegendX={true}
            />
          )}
        </Fragment>
      )}
      {/* {!hasNoData && (
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
            <RadialChart data={radialData} colors={["#7F4BD8", "#442873"]} />
          )}
        </>
      )} */}
      <div className="mt-4">
        <Link to="/experts">Read more</Link>
      </div>{" "}
    </DataSection>
  );
}

interface IExpertsGraphProps {
  keywords: string[];
}
