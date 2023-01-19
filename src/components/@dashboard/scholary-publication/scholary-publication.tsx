import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";
import ChartButtons, { ChartType } from "../../reusable/chart-buttons";

//
import BarChart from "../../@product/bar-chart";
import RadialChart from "../../@product/radial-chart";
import ScatterChart from "../../@product/scatter-chart";

// import { getPublicationsCount } from "../../../utils/api/dashboard";
import { getScholaryPublications } from "../../../utils/api/charts";

/**
 *
 */
export default function ScholaryPublication(props: IScholaryPublicationProps) {
  const [activeChart, setActiveChart] = useState<ChartType>("bar");

  // Fetching data
  const { data: publicationChartData, isLoading } = useQuery(
    ["scholary-publications", ...props.keywords],
    async () => {
      return await getScholaryPublications(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  //
  const finalPieData = isLoading ? [] : publicationChartData ?? [];

  const radialData = finalPieData
    .map((itm) => itm.year)
    .map((itm) => {
      const data = finalPieData.find((it) => it.year === itm)!;

      const total = data.openArticles + data.closedArticles;
      const openPercentage = (data.openArticles / total) * 100;
      const closedPercentage = (data.closedArticles / total) * 100;

      return {
        id: itm,
        data: [
          { x: "Open Articles", y: openPercentage, value: data.openArticles },
          {
            x: "Closed Articles",
            y: closedPercentage,
            value: data.closedArticles,
          },
        ],
      };
    });

  const finalScatterDataFormatHelper = (data: any) => {
    if (!data) return [];

    let closedArticlesObj = { id: "Closed Articles", data: [] };
    let openArticlesObj = { id: "Open Articles", data: [] };

    let closedArticlesData: any = [];
    let openArticlesData: any = [];

    data.forEach((d: IScholaryPublicationData) => {
      closedArticlesData = [
        ...closedArticlesData,
        { x: d.year, y: d.closedArticles },
      ];
      openArticlesData = [
        ...openArticlesData,
        { x: d.year, y: d.openArticles },
      ];
    });

    closedArticlesObj.data = closedArticlesData;
    openArticlesObj.data = openArticlesData;

    return [closedArticlesObj, openArticlesObj];
  };

  const finalScatterData = isLoading
    ? []
    : finalScatterDataFormatHelper(publicationChartData) ?? [];

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      title={
        <PageTitle
          title="Scholarly Publications"
          info={`Stats in this graph are extracted from a total of "X" number of open access publications and "Y" number of closed access publications`}
          titleClass="font-semibold"
        />
      }
    >
      <div className="pt-1 flex justify-between items-center h-5">
        <div className="flex gap-x-3">
          {activeChart === "bar" && (
            <>
              <div className="flex gap-x-1 text-sm items-center">
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
                <span>Open</span>
              </div>

              <div className="flex gap-x-1 text-sm items-center">
                <div className="w-2 h-2 bg-primary-800 rounded-full" />
                <span>Closed</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center">
          <ChartButtons
            isMultiData={true}
            activeChart={activeChart}
            setActiveChart={setActiveChart}
          />
        </div>
      </div>

      {activeChart === "bar" && (
        <BarChart
          keys={["openArticles", "closedArticles"]}
          indexBy="year"
          legendY="Number of Publications"
          data={(isLoading ? [] : publicationChartData) ?? []}
        />
      )}

      {activeChart === "scatter" && (
        <ScatterChart
          data={finalScatterData}
          legendX="Year"
          legendY="Publications"
        />
      )}

      {activeChart === "donut" && (
        <RadialChart data={radialData} colors={["#7F4BD8", "#442873"]} />
      )}

      <div className="mt-4">
        <Link to="/publications">Read more</Link>
      </div>
    </DataSection>
  );
}

interface IScholaryPublicationProps {
  keywords: string[];
}

interface IScholaryPublicationData {
  closedArticles: string;
  openArticles: string;
  year: string;
}
