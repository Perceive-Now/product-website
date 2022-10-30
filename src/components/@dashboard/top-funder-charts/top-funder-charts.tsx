import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import NoKeywordMessage from "../../reusable/no-keyword";
import { ChartType } from "../../reusable/chart-buttons";
import ChartButtons from "../../reusable/chart-buttons/chart-buttons";

//
import { getTimeperiod } from "../../../utils/helpers";
import { getTopFundingChart } from "../../../utils/api/charts";

//
import { LoadingIcon } from "../../icons";

//

/**
 *
 */
export default function TopFunderCharts(props: ITopFunderProps) {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const [selectedTimeperiod, setSelectedTimeperiod] = useState("");

  //
  const { data, isLoading } = useQuery(
    ["top-funder-charts", ...props.keywords, selectedTimeperiod],
    async () => {
      return await getTopFundingChart(props.keywords, selectedTimeperiod);
    },
    { enabled: !!props.keywords.length }
  );

  const chartData = data?.fundings ?? [];

  const dataStartYear = data?.startYear ?? "";
  const dataEndYear = data?.lastYear ?? "";

  const timeperiod = useMemo(
    () => getTimeperiod(dataStartYear, dataEndYear),
    [dataStartYear, dataEndYear]
  );

  useEffect(() => {
    if (timeperiod[0]) {
      setSelectedTimeperiod(timeperiod[0].value);
    }
  }, [timeperiod]);

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

          {!isLoading && (
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

          {isLoading && (
            <div className="h-[300px] flex items-center justify-center">
              <LoadingIcon fontSize={56} />
            </div>
          )}

          <div className="text-primary-600 mt-4 cursor-pointer">Read more</div>
        </>
      )}

      {props.keywords.length < 1 && <NoKeywordMessage />}
    </div>
  );
}

interface ITopFunderProps {
  keywords: string[];
}
