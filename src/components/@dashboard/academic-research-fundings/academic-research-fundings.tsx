import { Link } from "react-router-dom";
import { Fragment, useState } from "react";

//
import { useQuery } from "@tanstack/react-query";
import { getAcademicResearchFundingChart } from "../../../utils/api/charts";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import ChartButtons from "../../reusable/chart-buttons";
import { ChartType } from "../../reusable/chart-buttons";

//
import { formatNumber } from "../../../utils/helpers";
import { TIME_PERIODS } from "../../../utils/constants";

/**
 *
 */
export default function AcademicResearchFundings() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  const { data, isLoading } = useQuery(
    ["dashboard-academic-funding-chart"],
    async () => {
      return await getAcademicResearchFundingChart();
    }
  );

  const finalPieValue = isLoading
    ? []
    : (data?.chart ?? []).map((itm, index) => ({
        id: index,
        label: itm.name,
        value: itm.percentage,
      }));

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle title="Aacdemic Research Funding" info="info" />

      {/* Controls */}
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

      {/* Bar Chart */}
      {activeChart === "bar" && (
        <Fragment>
          <BarChart
            keys={["percentage"]}
            indexBy="name"
            legendY="Number of Funding"
            data={data?.chart ?? []}
          />
        </Fragment>
      )}

      {/* Pie Chart */}
      {activeChart === "donut" && <PieChart data={finalPieValue} />}

      {/* Scatter chart */}
      {activeChart === "scatter" && (
        <div className="text-center my-8">Work on progress</div>
      )}

      {/* Caption */}
      <div className="mt-4">
        <span className="font-semibold">
          "
          {formatNumber(data?.captionText.fundingAmount ?? 0, {
            isCurrency: true,
          })}
          "
        </span>
        <span> </span>
        <span>
          amount of funding was received by the top 5 universities with the
          maximum amount of funding in the past
        </span>
        <span> </span>
        <span>{data?.captionText.numberOfYears ?? "-"}</span>
        <span> </span>
        <span>
          {(data?.captionText.numberOfYears ?? 0) > 1 ? "years" : "year"}
        </span>
        <span className="ml-1">
          <Link to="#">Read More</Link>
        </span>
      </div>
    </div>
  );
}
