import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

//
import BarChart from "../../@product/bar-chart";
import PieChart from "../../@product/pie-chart";
import ScatterChart from "../../@product/scatter-chart";

//
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period";
import DataSection from "../../reusable/data-section";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import { getPatentsPieChart, IPatent } from "../../../utils/api/charts";

//
import NoDataMessage from "../../reusable/no-data";
import {
  DEFAULT_TIME_PERIOD_END_YEAR,
  YEAR_DIFFERENCE,
} from "../../../utils/constants";

/**
 *
 */
export default function Patents(props: IPatentsProps) {
  const navigate = useNavigate();

  const colorsArray = ["#B6A2D8", "#7F4BD8", "#442873", "#d6d6d6", "#b5a2d8"];

  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const [selectedTimeperiod, setSelectedTimeperiod] = useState("");

  let hasNoData = false;

  const { data, isLoading, isError, error } = useQuery(
    ["patents-pie-chart", ...props.keywords],
    async () => {
      return await getPatentsPieChart(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const hasDataChecker = (patentsList: IPatent[]) => {
    if (!patentsList) return (hasNoData = true);

    if (patentsList.length < 1) return (hasNoData = true);

    let hasNoDataFlag = true;

    patentsList.forEach((cD) => {
      if (cD.value > 0) {
        hasNoDataFlag = false;
      }
    });

    if (hasNoDataFlag) {
      hasNoData = true;
    } else {
      hasNoData = false;
    }
  };

  const chartDataFormatHelper = (patents: IPatent[]) => {
    let startYear =
      +selectedTimeperiod?.split("-")[0] ||
      DEFAULT_TIME_PERIOD_END_YEAR - YEAR_DIFFERENCE;
    let endYear =
      +selectedTimeperiod?.split("-")[1] || DEFAULT_TIME_PERIOD_END_YEAR;

    let patentsList: IPatent[] = [];
    for (let i = startYear; i <= endYear; i++) {
      const patentData = patents.find((patent) => patent.name === i);
      if (patentData) {
        patentsList.push(patentData);
      } else {
        patentsList.push({
          name: i,
          percentage: 0,
          value: 0,
        });
      }
    }

    hasDataChecker(patentsList);
    return patentsList;
  };

  const chartData = data?.patents
    ? chartDataFormatHelper(data?.patents) ?? []
    : [];

  const finalBarData = isLoading ? [] : chartData ?? [];

  const finalPieData = isLoading
    ? []
    : (chartData ?? []).map((item, idx) => ({
        id: item.name,
        label: `${item.name}`,
        value: item.value,
        color: colorsArray[idx],
      }));

  const finalScatterData = isLoading
    ? []
    : [
        {
          id: "Patents",
          data: (chartData ?? []).map((item) => ({
            x: item.name,
            y: item.percentage,
          })),
        },
      ];

  const handleArcClick = (data: any) => {
    navigate("/patents", {
      state: { search: [{ label: data.id, value: data.id }] },
    });
  };

  const handleSelectedTimeperiodChange = (value: any) => {
    setSelectedTimeperiod(value.value);
  };

  console.log({ isLoading, isError, error });

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title="Patents"
          info={`Stats in this graph are extracted from a total of "X" number of patents`}
          titleClass="font-semibold"
        />
      }
    >
      <div className="pt-1 flex items-center justify-end gap-x-3 h-5">
        <div>
          <TimePeriod
            startYear={data?.startYear}
            handleChange={handleSelectedTimeperiodChange}
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
              keys={["value"]}
              indexBy="name"
              groupMode="stacked"
            />
          )}

          {activeChart === "donut" && (
            <PieChart
              data={finalPieData}
              colors={(bar) => bar.data.color}
              onClick={handleArcClick}
            />
          )}

          {activeChart === "scatter" && (
            <ScatterChart
              data={finalScatterData}
              legendX="Years"
              legendY="Patents"
            />
          )}
        </>
      )}

      <div className="mt-4">
        <Link to="/patents">Read more</Link>
      </div>
    </DataSection>
  );
}

interface IPatentsProps {
  keywords: string[];
}
