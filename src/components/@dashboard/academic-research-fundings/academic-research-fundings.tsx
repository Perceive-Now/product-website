import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import BarChart from "../../@product/bar-chart";

//
import PieChart from "../../@product/pie-chart";
import ChartButtons from "../../reusable/chart-buttons";
import { ChartType } from "../../reusable/chart-buttons/chart-button/chart-button";
import PageTitle from "../../reusable/page-title";
import TimePeriod from "../../reusable/time-period/time-period";

/**
 *
 */
export default function AcademicResearchFundings() {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");
  const [data, setData] = useState([
    {
      id: "london-college",
      label: "University College London (34%)",
      value: 34,
    },
    { id: "harvard-medical", label: "Harvard Medical School (28%)", value: 28 },
    {
      id: "south-california",
      label: "University of Southern California (22%)",
      value: 22,
    },
    { id: "meth-zurich", label: "METH Zurich (8%)", value: 8 },
    { id: "imperial-college", label: "Imperial College London (8%)", value: 8 },
  ]);

  let chart = null;
  switch (activeChart) {
    case "bar":
      chart = (
        <Fragment>
          <div className="flex justify-end gap-x-3 pt-1 -mb-3">
            <div className="flex gap-x-1 text-sm items-center">
              <div className="w-2 h-2 bg-primary-100 rounded-full" />
              <span>Patents</span>
            </div>

            <div className="flex gap-x-1 text-sm items-center">
              <div className="w-2 h-2 bg-primary-500 rounded-full" />
              <span>Open</span>
            </div>

            <div className="flex gap-x-1 text-sm items-center">
              <div className="w-2 h-2 bg-primary-800 rounded-full" />
              <span>Closed</span>
            </div>
          </div>

          <BarChart
            keys={["patents", "openArticles", "closedArticles"]}
            indexBy="city"
            legendY="Number of Funding"
            data={data ?? []}
          />
        </Fragment>
      );
      break;
    case "donut":
      chart = <PieChart data={data} />;
      break;
    case "scatter":
      chart = <div className="text-center my-8">Work on progress</div>;
      break;
  }

  return (
    <div className="px-3 pt-1 pb-3 rounded-lg border bg-white border-gray-200 shadow">
      <PageTitle title="Aacdemic Research Funding" info="info" />

      <div className="pt-1 flex justify-end gap-x-3">
        <div>
          <TimePeriod timePeriods={timeperiod} />
        </div>

        <div className="flex items-center">
          <ChartButtons
            activeChart={activeChart}
            setActiveChart={setActiveChart}
          />
        </div>
      </div>

      {chart}

      <div className="mt-4">
        <span>
          "$ X" amount of funding was received by the top 5 universities with
          the maximum amount of funding in the past 1 year
        </span>
        <span className="ml-1">
          <Link to="#">Read More</Link>
        </span>
      </div>
    </div>
  );
}

export const timeperiod = [
  {
    label: "Past 10 years",
    value: "10yrs",
  },
  {
    label: "Past 5 years",
    value: "5yrs",
  },
  {
    label: "Past 3 years",
    value: "3yrs",
  },
  {
    label: "Past 12 months",
    value: "12mth",
  },
];
