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
import ChartButtons from "../../reusable/chart-buttons/chart-buttons";

//
import { getPatentsPieChart, IPatent } from "../../../utils/api/charts";

//
import { ChartType } from "../../reusable/chart-buttons";
import NoKeywordMessage from "../../reusable/no-keyword";
import { LoadingIcon } from "../../icons";
import { getTimeperiod } from "../../../utils/helpers";

/**
 *
 */
export default function Patents(props: IPatentsProps) {
  const navigate = useNavigate();

  const colorsArray = ["#B6A2D8", "#7F4BD8", "#442873"];

  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const [selectedTimeperiod, setSelectedTimeperiod] = useState("");

  const { data, isLoading } = useQuery(
    ["patents-pie-chart", ...props.keywords],
    async () => {
      return await getPatentsPieChart(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const timeperiod = getTimeperiod();

  const chartDataFormatHelper = (patents: IPatent[]) => {
    let startYear = selectedTimeperiod?.split("-")[0] || "2018";
    let endYear = selectedTimeperiod?.split("-")[1] || "2022";

    let patentsList = patents.filter((data) => {
      let year = String(data.name);
      return year >= startYear && year <= endYear;
    });
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
        label: `${item.name} (${item.percentage}%)`,
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
