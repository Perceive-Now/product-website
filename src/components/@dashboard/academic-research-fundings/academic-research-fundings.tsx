import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";
import ChartButtons from "../../reusable/chart-buttons";
import { ChartType } from "../../reusable/chart-buttons";

//
import { getStateFullName } from "../../../utils/helpers";
import {
  getAcademicResearchFundingChart,
  IUniversityResearchFunding,
} from "../../../utils/api/charts";
import NoDataMessage from "../../reusable/no-data";

/**
 *
 */
export default function AcademicResearchFundings(props: IFundingProps) {
  //
  const [activeGraph, setActiveGraph] = useState<ChartType>("bar");

  //
  const [activeData, setActiveData] = useState<IUniversityResearchFunding[]>([]);
  const [hasActiveData, setHasActiveData] = useState(true);

  const { data, isLoading, isError, error } = useQuery(
    ["dashboard-academic-funding-chart", ...props.keywords],
    async () => {
      return await getAcademicResearchFundingChart(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  // Fetching data for selected time period
  useEffect(() => {
    if (!data) return;

    //
    const totalAmount = data.reduce((prev, curr) => (prev += curr.value), 0);

    const selectedData = data.map((item) => ({
      key: getStateFullName(item.key),
      value: item.value,
    }));

    setHasActiveData(totalAmount > 0);

    //
    setActiveData(selectedData);
  }, [data]);

  const barChartData = activeData ?? [];

  const finalPieValue = (activeData ?? []).map((item) => ({
    id: item.key,
    label: item.key,
    value: item.value,
  }));

  //
  const scatterChartData = [
    {
      id: "States",
      data: (activeData ?? []).map((item) => ({
        x: item.key,
        y: item.value,
      })),
    },
  ];

  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title="University Patent Landscape"
          info={`This list was extracted from "X" total number of universities worldwide`}
          titleClass="font-semibold"
        />
      }
    >
      {/* Controls */}
      <div className="pt-1 flex justify-end gap-x-3">
        <div className="flex items-center">
          <ChartButtons activeChart={activeGraph} setActiveChart={setActiveGraph} />
        </div>
      </div>

      {!hasActiveData && (
        <div className="flex h-full justify-center items-center">
          <NoDataMessage />
        </div>
      )}

      {hasActiveData && (
        <>
          {activeGraph === "bar" && (
            <BarChart
              keys={["value"]}
              indexBy="key"
              legendY="Number of Patents"
              legendX="States"
              data={barChartData}
              groupMode="stacked"
            />
          )}

          {activeGraph === "donut" && <PieChart data={finalPieValue} />}

          {activeGraph === "scatter" && (
            <ScatterChart data={scatterChartData} legendX="States" legendY="Patents" />
          )}
        </>
      )}

      {/* Caption */}
      <div className="mt-4">
        <Link to="/funders">Read more</Link>
      </div>
    </DataSection>
  );
}

interface IFundingProps {
  keywords: string[];
}
