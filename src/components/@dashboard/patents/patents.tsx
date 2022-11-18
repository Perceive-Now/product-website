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
import { ChartType } from "../../reusable/chart-buttons";
import ChartButtons from "../../reusable/chart-buttons/chart-buttons";
import NoKeywordMessage from "../../reusable/no-keyword";

//
import { getTimeperiod } from "../../../utils/helpers";
import { getPatentsPieChart, IPatent } from "../../../utils/api/charts";

//
import { LoadingIcon } from "../../icons";
import NoDataMessage from "../../reusable/no-data";

/**
 *
 */
export default function Patents(props: IPatentsProps) {
  const navigate = useNavigate();

  const colorsArray = ["#B6A2D8", "#7F4BD8", "#442873", "#d6d6d6", "#b5a2d8"];

  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const [selectedTimeperiod, setSelectedTimeperiod] = useState("");

  let hasNoData = false;

  const { data, isLoading } = useQuery(
    ["patents-pie-chart", ...props.keywords],
    async () => {
      return await getPatentsPieChart(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const timeperiod = getTimeperiod();

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
    let startYear = selectedTimeperiod?.split("-")[0] || "2018";
    let endYear = selectedTimeperiod?.split("-")[1] || "2022";

    let patentsList = patents.filter((data) => {
      let year = String(data.name);
      return year >= startYear && year <= endYear;
    });
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
          id: "Years",
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

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle
        title="Patents"
        info={`Stats in this graph are extracted from a total of "X" number of patents`}
        titleClass="font-semibold"
      />

      {props.keywords.length < 1 && (
        <div className="h-[300px] flex justify-center items-center">
          <NoKeywordMessage />
        </div>
      )}

      {props.keywords.length > 0 && (
        <>
          {isLoading && (
            <div className="h-[300px] flex justify-center items-center">
              <LoadingIcon fontSize={52} />
            </div>
          )}

          {!isLoading && (
            <>
              <div className="pt-1 flex items-center justify-end gap-x-3 h-5">
                <div>
                  <TimePeriod
                    timePeriods={timeperiod}
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
            </>
          )}
        </>
      )}
    </div>
  );
}

interface IPatentsProps {
  keywords: string[];
}
