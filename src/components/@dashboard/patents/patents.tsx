import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import PieChart from "../../@product/pie-chart";
import PageTitle from "../../reusable/page-title";

//
import TimePeriod from "../../reusable/time-period";
import ChartButtons from "../../reusable/chart-buttons/chart-buttons";

//
import { TIME_PERIODS } from "../../../utils/constants";
import { getPatentsCount } from "../../../utils/api/dashboard";
import { getPatentsPieChart } from "../../../utils/api/charts";

//
import { ChartType } from "../../reusable/chart-buttons";
import BarChart from "../../@product/bar-chart";

/**
 *
 */
export default function Patents() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data, isLoading } = useQuery(["patents-pie-chart"], async () => {
    return await getPatentsPieChart();
  });

  const { data: patentCount } = useQuery(
    ["patents-count-for-chart"],
    async () => {
      return await getPatentsCount();
    }
  );

  const finalData = isLoading
    ? []
    : (data ?? []).map((item) => ({
        id: item.name,
        label: `${item.name} (${item.percentage}%)`,
        value: item.value,
      }));

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle title="Patents" info="info" />

      <div className="pt-1 flex justify-end gap-x-3">
        <div>
          <TimePeriod timePeriods={TIME_PERIODS} />
        </div>

        <div className="flex items-center">
          <ChartButtons
            activeChart={activeChart}
            setActiveChart={setActiveChart}
          />
        </div>
      </div>

      {activeChart === "bar" && (
        <BarChart data={data ?? []} keys={["value"]} indexBy="name" />
      )}

      {activeChart === "donut" && <PieChart data={finalData} />}

      {activeChart === "scatter" && <>Scatter plot, yet to do</>}

      <div className="mt-4 text-sm">
        <span className="font-bold">"{patentCount?.patentCount ?? "-"}"</span>
        <span> </span>
        <span>total number of patents were filed in the past</span>
        <span> </span>
        <span className="font-semibold">{patentCount?.yearsElapsed}</span>
        <span> </span>
        <span>years</span>
      </div>
    </div>
  );
}
