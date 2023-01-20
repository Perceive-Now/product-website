import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";

import DataSection from "../../reusable/data-section";
import NoDataMessage from "../../reusable/no-data";
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
  const [activeData, setActiveData] = useState<IExpertItem[]>([]);
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
    const selectedData: IExpertItem[] = [];

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
  const finalScatterDataFormatHelper = (data: IExpertItem[]) => {
    if (!data) return [];

    const patentExpertsCountObj: IScatterList = { id: "Patents", data: [] };
    const publicationExpertsCountObj: IScatterList = { id: "Publications", data: [] };

    const patentExpertsData: IScatterItem[] = [];
    const publicationExpertsData: IScatterItem[] = [];

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
      {!hasActiveData && (
        <div className="flex h-full justify-center items-center">
          <NoDataMessage years={selectedTimeperiod?.value ?? ""} />
        </div>
      )}
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
      <div className="mt-2">
        <Link to="/experts">Read more</Link>
      </div>{" "}
    </DataSection>
  );
}

//
interface IExpertsGraphProps {
  keywords: string[];
}

//
interface IExpertItem {
  year: string;
  patent: number;
  publication: number;
}

interface IScatterItem {
  x: string;
  y: number;
}

interface IScatterList {
  id: string;
  data: IScatterItem[];
}
