import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import PageTitle from "../../reusable/page-title";
import NoDataMessage from "../../reusable/no-data";
import TimePeriod from "../../reusable/time-period";
import NoKeywordMessage from "../../reusable/no-keyword";
import ChartButtons, {
  ChartType,
} from "../../reusable/chart-buttons/chart-buttons";

//
import { getTimeperiod } from "../../../utils/helpers";
import { getTopFundingChart } from "../../../utils/api/charts";

//
import { LoadingIcon } from "../../icons";

/**
 *
 */
export default function TopFunderCharts(props: ITopFunderProps) {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const [selectedTimeperiod, setSelectedTimeperiod] = useState("");

  let hasNoData = false;

  //
  const { data, isLoading } = useQuery(
    ["top-funder-charts", ...props.keywords, selectedTimeperiod],
    async () => {
      return await getTopFundingChart(props.keywords, selectedTimeperiod);
    },
    { enabled: !!props.keywords.length }
  );

  const chartData = data?.fundings ?? [];

  const hasDataChecker = () => {
    if (!chartData) return (hasNoData = true);

    if (chartData.length < 1) return (hasNoData = true);

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
  };
  hasDataChecker();

  const timeperiod = useMemo(() => getTimeperiod(), []);

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
          id: "Years",
          data: (chartData ?? []).map((item) => ({
            x: item.year,
            y: item.amount,
          })),
        },
      ];

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        title="Total Amount of Funding over time"
        info={`This list was extracted from "X" total number of funders worldwide`}
        titleClass="font-semibold"
      />

      {props.keywords.length > 0 && (
        <>
          {!isLoading && (
            <>
              <div className="pt-1 flex items-center justify-end gap-x-3 h-5">
                <div>
                  <TimePeriod
                    timePeriods={timeperiod}
                    handleChange={handleTimePeriodChange}
                  />
                </div>

                <div className="flex items-center">
                  <ChartButtons
                    activeChart={activeChart}
                    setActiveChart={setActiveChart}
                  />
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
                    <ScatterChart data={finalScatterData} legendY="Fundings" />
                  )}
                </>
              )}

              <div className="text-primary-600 mt-4 cursor-pointer">
                <Link to="/">Read more</Link>
              </div>
            </>
          )}

          {isLoading && (
            <div className="h-[300px] flex items-center justify-center">
              <LoadingIcon fontSize={56} />
            </div>
          )}
        </>
      )}

      {props.keywords.length < 1 && <NoKeywordMessage />}
    </div>
  );
}

interface ITopFunderProps {
  keywords: string[];
}
