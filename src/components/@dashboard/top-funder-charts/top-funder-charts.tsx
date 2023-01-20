import { useState } from "react";
import { Link } from "react-router-dom";
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

//
import ChartButtons, { ChartType } from "../../reusable/chart-buttons/chart-buttons";

//
import { getTopFundingChart, ITopFundingChart } from "../../../utils/api/charts";

//
import { DEFAULT_TIME_PERIOD_END_YEAR, YEAR_DIFFERENCE } from "../../../utils/constants";

/**
 *
 */
export default function TopFunderCharts(props: ITopFunderProps) {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const [selectedTimeperiod, setSelectedTimeperiod] = useState("");

  let hasNoData = false;

  //
  const { data, isLoading, isError, error } = useQuery(
    ["top-funder-charts", ...props.keywords, selectedTimeperiod],
    async () => {
      return await getTopFundingChart(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  const chartDataFormatHelper = (funders: ITopFundingChart[]) => {
    const startYear =
      +selectedTimeperiod?.split("-")[0] || DEFAULT_TIME_PERIOD_END_YEAR - YEAR_DIFFERENCE;
    const endYear = +selectedTimeperiod?.split("-")[1] || DEFAULT_TIME_PERIOD_END_YEAR;

    const funderList: ITopFundingChart[] = [];
    for (let i = startYear; i <= endYear; i++) {
      const funderData = funders.find((funder) => funder.year === i);
      if (funderData) {
        funderList.push(funderData);
      } else {
        funderList.push({
          year: i,
          amount: 0,
        });
      }
    }

    return funderList;
  };

  const chartData = data?.fundings ? chartDataFormatHelper(data?.fundings) ?? [] : [];

  if (!chartData) hasNoData = true;

  if (chartData.length < 1) hasNoData = true;

  let hasNoDataFlag = true;

  chartData.forEach((cD) => {
    if (cD.amount > 0) {
      hasNoDataFlag = false;
    }
  });

  if (hasNoDataFlag) {
    hasNoData = true;
  } else {
    hasNoData = false;
  }

  const handleTimePeriodChange = (value: any) => {
    setSelectedTimeperiod(value.value);
  };

  //
  const finalBarData = isLoading ? [] : chartData ?? [];

  //
  const finalPieData = isLoading
    ? []
    : (chartData ?? []).map((item) => ({
        id: item.year,
        label: `${item.year}`,
        value: item.amount,
      }));

  //
  const finalScatterData = isLoading
    ? []
    : [
        {
          id: "Fundings (USD)",
          data: (chartData ?? []).map((item) => ({
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
          title="Total Amount of Funding over time"
          info={`This list was extracted from "X" total number of funders worldwide`}
          titleClass="font-semibold"
        />
      }
    >
      <div className="pt-1 flex items-center justify-end gap-x-3 h-5">
        <div>
          {/* <TimePeriod startYear={data?.startYear} handleChange={handleTimePeriodChange} /> */}
        </div>

        <div className="flex items-center">
          <ChartButtons activeChart={activeChart} setActiveChart={setActiveChart} />
        </div>
      </div>

      {hasNoData && (
        <div className="flex h-full justify-center items-center">
          <NoDataMessage years={selectedTimeperiod} />
        </div>
      )}

      {!hasNoData && (
        <>
          {activeChart === "bar" && (
            <BarChart
              data={finalBarData ?? []}
              keys={["amount"]}
              indexBy="year"
              groupMode="stacked"
              legendY="Funding Amount (USD)"
            />
          )}

          {activeChart === "donut" && <PieChart data={finalPieData} />}

          {activeChart === "scatter" && (
            <ScatterChart data={finalScatterData} legendY="Funding Amount (USD)" />
          )}
        </>
      )}

      <div className="text-primary-600 mt-4 cursor-pointer">
        <Link to="/funders">Read more</Link>
      </div>
    </DataSection>
  );
}

interface ITopFunderProps {
  keywords: string[];
}
