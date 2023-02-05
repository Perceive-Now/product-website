import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import NoData from "../../reusable/no-data";
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import DataSection from "../../reusable/data-section";

//
import ChartButtons from "../../reusable/chart-buttons/chart-buttons";
import type { ChartType } from "../../reusable/chart-buttons/chart-buttons";

//
import { getTimeperiod } from "../../../utils/helpers";

import { getTopFundingChart } from "../../../utils/api/charts";
import type { ITopFundingItem } from "../../../utils/api/charts";

/**
 *
 */
export default function TopFunderCharts(props: ITopFunderProps) {
  //
  const [activeGraph, setActiveGraph] = useState<ChartType>("bar");

  //
  const [timeperiods, setTimeperiods] = useState<ITimePeriodItem[]>([]);
  const [selectedTimeperiod, setSelectedTimeperiod] = useState<ITimePeriodItem | null>(null);

  //
  const [activeData, setActiveData] = useState<ITopFundingItem[]>([]);
  const [hasActiveData, setHasActiveData] = useState(true);

  // Fetching data from the API
  const { data, isLoading, isError, error } = useQuery(
    ["dashboard-top-funder-charts", ...props.keywords],
    async () => {
      return await getTopFundingChart(props.keywords);
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
    const selectedData: ITopFundingItem[] = [];

    //
    for (let i = +startYear; i <= +endYear; i++) {
      const item = data.find((item) => +item.year === i);

      selectedData.push({
        year: i,
        amount: item?.amount ?? 0,
      });
    }

    //
    const totalAmount = selectedData.reduce((prev, curr) => (prev += curr.amount), 0);

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
    value: item.amount,
  }));

  //
  const scatterChartData = [
    {
      id: "Fundings (USD)",
      data: (activeData ?? []).map((item) => ({
        x: item.year,
        y: item.amount,
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
          title="Federal Funding Trends"
          // info={`This list was extracted from "X" total number of funders worldwide`}
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
          <NoData years={selectedTimeperiod?.value} />
        </div>
      )}

      {hasActiveData && (
        <>
          {activeGraph === "bar" && (
            <BarChart
              data={barChartData ?? []}
              keys={["amount"]}
              indexBy="year"
              groupMode="stacked"
              legendY="Funding Amount (USD)"
            />
          )}

          {activeGraph === "donut" && <PieChart data={pieChartData} />}

          {activeGraph === "scatter" && (
            <ScatterChart data={scatterChartData} legendY="Funding Amount (USD)" />
          )}
        </>
      )}

      <div className="text-primary-600 mt-2 cursor-pointer">
        <Link to="/deep-search/funders">Read more</Link>
      </div>
    </DataSection>
  );
}

interface ITopFunderProps {
  keywords: string[];
}
