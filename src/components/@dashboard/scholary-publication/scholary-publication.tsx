import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import BarChart from "../../@product/bar-chart";
import RadialChart from "../../@product/radial-chart";
import ScatterChart from "../../@product/scatter-chart";

// import { getPublicationsCount } from "../../../utils/api/dashboard";
import { getScholaryPublications } from "../../../utils/api/charts";
import { getTimeperiod } from "../../../utils/helpers";
import { barChartLegendOptions } from "../../../utils/data/barchartLegend";
import NoDataMessage from "../../reusable/no-data";
import TimePeriod from "../../reusable/time-period";

/**
 *
 */
export default function ScholaryPublication(props: IScholaryPublicationProps) {
  const [activeGraph, setActiveGraph] = useState<ChartType>("bar");
  //
  const [timeperiods, setTimeperiods] = useState<ITimePeriodItem[]>([]);
  const [selectedTimeperiod, setSelectedTimeperiod] =
    useState<ITimePeriodItem | null>(null);

  //
  const [activeData, setActiveData] = useState<IScholaryPublicationData[]>([]);
  const [hasActiveData, setHasActiveData] = useState(true);

  // Fetching data
  const {
    data: publicationChartData,
    isLoading,
    isError,
    error
  } = useQuery(
    ["scholary-publications", ...props.keywords],
    async () => {
      return await getScholaryPublications(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  // Fetching time period
  useEffect(() => {
    if (!publicationChartData) return;

    //
    const sortedData = publicationChartData.sort((a, b) =>
      a.year > b.year ? 1 : -1
    );
    const endYear = sortedData[0].year;

    const timePeriods = getTimeperiod(endYear);

    //
    setTimeperiods(timePeriods);
    setSelectedTimeperiod(timePeriods[0]);
  }, [publicationChartData]);

  // Fetching publicationChartData for selected time period
  useEffect(() => {
    if (!publicationChartData) return;
    if (!selectedTimeperiod?.value) return;

    //
    const [startYear, endYear] = selectedTimeperiod.value.split("-");

    //
    const selectedData: IScholaryPublicationData[] = [];

    //
    for (let i = +startYear; i <= +endYear; i++) {
      const item = publicationChartData.find((item) => +item.year === i);

      selectedData.push({
        year: i,
        closed_source: item?.closed_source ?? 0,
        open_source: item?.open_source ?? 0
      });
    }

    //
    const totalAmount = selectedData.reduce(
      (prev, curr) => (prev += curr.open_source + curr.closed_source),
      0
    );

    setHasActiveData(totalAmount > 0);

    //
    setActiveData(selectedData);
  }, [selectedTimeperiod, publicationChartData]);

  //
  const barChartData = activeData ?? [];

  //
  const pieChartData = (activeData ?? [])
    .filter((item) => item.open_source + item.closed_source > 0)
    .map((item) => {
      const total = item.open_source + item.closed_source;

      const openSourcePercentage = item.open_source
        ? (item.open_source / total) * 100
        : 0;
      const closedSourcePercentage = item.closed_source
        ? (item.closed_source / total) * 100
        : 0;

      return {
        id: item.year,
        data: [
          {
            x: "Open access",
            y: openSourcePercentage,
            value: item.open_source
          },
          {
            x: "Closed access",
            y: closedSourcePercentage,
            value: item.closed_source
          }
        ]
      };
    });

  //
  const finalScatterDataFormatHelper = (data: IScholaryPublicationData[]) => {
    if (!data) return [];

    const openAccessCountObj: IScatterList = { id: "Open access", data: [] };
    const closedAccessCountObj: IScatterList = {
      id: "Closed access",
      data: []
    };

    const openAccessData: IScatterItem[] = [];
    const closedAccessData: IScatterItem[] = [];

    //
    data.forEach((d) => {
      openAccessData.push({ x: String(d.year), y: d.open_source });
      closedAccessData.push({ x: String(d.year), y: d.closed_source });
    });

    //
    openAccessCountObj.data = openAccessData;
    closedAccessCountObj.data = closedAccessData;

    //
    return [openAccessCountObj, closedAccessCountObj];
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
          title="Scholarly Publications"
          info={`Stats in this graph are extracted from a total of "X" number of open access publications and "Y" number of closed access publications`}
          titleClass="font-semibold"
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
        <>
          {activeGraph === "bar" && (
            <BarChart
              keys={["Open_Articles", "Closed_Articles"]}
              indexBy="year"
              legendY="Number of Publications"
              data={barChartData.map((data) => ({
                Open_Articles: data.open_source,
                Closed_Articles: data.closed_source,
                year: data.year
              }))}
              legends={[barChartLegendOptions]}
            />
          )}
          {activeGraph === "scatter" && (
            <ScatterChart
              data={scatterChartData}
              legendX="Year"
              legendY="Publications"
              abbreviateLegendX={true}
            />
          )}
          {activeGraph === "donut" && (
            <RadialChart data={pieChartData} colors={["#7F4BD8", "#442873"]} />
          )}
        </>
      )}
      <div className="mt-4">
        <Link to="/publications">Read more</Link>
      </div>
    </DataSection>
  );
}

interface IScholaryPublicationProps {
  keywords: string[];
}

interface IScholaryPublicationData {
  closed_source: number;
  open_source: number;
  year: number;
}

interface IScatterItem {
  x: string;
  y: number;
}

interface IScatterList {
  id: string;
  data: IScatterItem[];
}
