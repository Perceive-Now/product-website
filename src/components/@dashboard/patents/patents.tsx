import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import PageTitle from "../../reusable/page-title";
import NoDataMessage from "../../reusable/no-data";
import TimePeriod from "../../reusable/time-period";
import DataSection from "../../reusable/data-section";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import { getPatentsPieChart, IPatent } from "../../../utils/api/charts";

//
import { getTimeperiod } from "../../../utils/helpers";

/**
 *
 */
export default function Patents(props: IPatentsProps) {
  const [activeGraph, setActiveGraph] = useState<ChartType>("bar");

  //
  const [timeperiods, setTimeperiods] = useState<ITimePeriodItem[]>([]);
  const [selectedTimeperiod, setSelectedTimeperiod] = useState<ITimePeriodItem | null>(null);

  //
  const [activeData, setActiveData] = useState<IPatent[]>([]);
  const [hasActiveData, setHasActiveData] = useState(true);

  const { data, isLoading, isError, error } = useQuery(
    ["patents-pie-chart", ...props.keywords],
    async () => {
      return await getPatentsPieChart(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
    const sortedData = data.sort((a, b) => (a.year > b.year ? 1 : -1));
    const endPatentYear = sortedData[0]?.year;

    const timePeriods = getTimeperiod(endPatentYear);

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
    const selectedData: IPatent[] = [];

    //
    for (let i = +startYear; i <= +endYear; i++) {
      const item = data.find((item) => +item.year === i);

      selectedData.push({
        year: i.toString(),
        count: (item?.count ?? 0).toString(),
      });
    }

    //
    const totalAmount = selectedData.reduce((prev, curr) => (prev += +curr.count), 0);

    setHasActiveData(totalAmount > 0);

    //
    setActiveData(selectedData);
  }, [selectedTimeperiod, data]);

  //
  const barChartData = activeData ?? [];

  //
  const pieChartData = (activeData ?? []).map((item) => ({
    id: item.year,
    label: item.year,
    value: item.count,
  }));

  //
  const scatterChartData = [
    {
      id: "Patents",
      data: (activeData ?? []).map((item) => ({
        x: item.year,
        y: item.count,
      })),
    },
  ];

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title={props.title}
          // info={`Stats in this graph are extracted from a total of "X" number of patents`}
          titleClass="font-semibold"
        />
      }
    >
      <div className="pt-1 flex items-center justify-end gap-x-3 h-5">
        <div>
          <TimePeriod
            onChange={(item) => setSelectedTimeperiod(item)}
            value={selectedTimeperiod}
            timePeriods={timeperiods}
          />
        </div>

        <div className="flex items-center">
          <ChartButtons activeChart={activeGraph} setActiveChart={setActiveGraph} />
        </div>
      </div>

      {!hasActiveData && (
        <div className="flex h-full justify-center items-center">
          <NoDataMessage years={selectedTimeperiod?.value} />
        </div>
      )}

      {hasActiveData && (
        <>
          {activeGraph === "bar" && (
            <BarChart
              data={barChartData ?? []}
              keys={["count"]}
              indexBy="year"
              groupMode="stacked"
              legendY="Number of Patents"
            />
          )}

          {activeGraph === "donut" && <PieChart data={pieChartData} />}

          {activeGraph === "scatter" && (
            <ScatterChart data={scatterChartData} legendX="Years" legendY="Number of Patents" />
          )}
        </>
      )}

      <div className="mt-4">
        <Link to="/deep-search/patents">Read more</Link>
      </div>
    </DataSection>
  );
}

interface IPatentsProps {
  keywords: string[];
  title: string;
}
