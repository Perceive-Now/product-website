import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import PieChart from "../../../components/@chart/pie-chart/pie-chart";
import BarChart from "./bar-chart";
import { useAppSelector } from "src/hooks/redux";
import { UseCaseOptions } from "../../../components/@report/use-case/__use-cases";
import BackButton from "./goback";

interface ChartData {
  id: string;
  label: string;
  value: number;
  Assignee?: string;
  Assignors?: string;
  "number of patents"?: number;
  values?: {
    [key: string]: number;
  };
  year?: string;
}

interface Chart {
  title: string;
  type: string;
  data: ChartData[];
}

interface ReportData {
  [key: string]: any;
  user_case_id?: number;
}

const preprocessMarkdown = (markdown: string) => {
  const preprocessed = markdown
    .replace(/(<p>)\s*(<h[1-6]>)/g, "$2")
    .replace(/(<\/h[1-6]>)\s*(<\/p>)/g, "$1");
  return preprocessed;
};

const FullReportPage: React.FC = () => {
  const location = useLocation();
  const { title, requirement_gathering_id } = location.state || {};
  const currentReport = useAppSelector((state) => state.generatedReports.currentReport);
  const [reportData, setReportData] = useState<ReportData | string | null>(null);
  const [useCase, setUseCase] = useState<{ label: string; value: string } | null>(null);

  const useCaseName = UseCaseOptions.find(
    (useCase) => useCase.useCaseId === Number(currentReport?.user_case_id),
  )?.label;

  console.log("usecaseID2", useCaseName);

  useEffect(() => {
    if (currentReport) {
      const userCaseId =
        typeof currentReport.user_case_id === "string"
          ? parseInt(currentReport?.user_case_id, 10)
          : currentReport.user_case_id;
      if (typeof currentReport.data === "string") {
        setReportData(currentReport.data);
      } else {
        const dataWithUserCaseId = { ...currentReport.data, user_case_id: userCaseId };
        setReportData(dataWithUserCaseId);

        const matchedUseCase = UseCaseOptions.find(
          (uc) => uc.useCaseId === dataWithUserCaseId.user_case_id,
        );

        setUseCase(matchedUseCase || null);
      }
    }
  }, [currentReport]);

  const renderGraph = (key: string, graphData: Chart) => {
    if (graphData.type === "bar") {
      const barChartData = graphData.data.map((item: ChartData) => ({
        Assignee: item.Assignee || "",
        value: item["number of patents"] || 0,
      }));

      return (
        <div className="my-5" key={key}>
          <h2 className="text-[#442873] text-xl mb-2">{graphData.title}</h2>
          <BarChart
            data={barChartData}
            keys={["value"]}
            indexBy="Assignee"
            groupMode={"stacked"}
            borderRadius={4}
            legendY="Number of patents"
            layout="vertical"
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 30,
              legend: "Assignee",
              legendPosition: "middle",
              legendOffset: 44,
              truncateTickAt: 15,
            }}
          />
        </div>
      );
    } else if (graphData.type === "group_bar") {
      const barChartData = graphData.data.map((item: ChartData) => ({
        year: item.year || "",
        ...item.values,
      }));

      return (
        <div className="my-5" key={key}>
          <h2 className="text-[#442873] text-xl mb-2">{graphData.title}</h2>
          <BarChart
            data={barChartData}
            keys={Object.keys(barChartData[0]).filter((key) => key !== "year")}
            indexBy="year"
            groupMode={"grouped"}
            borderRadius={4}
            legendY="Number of patents"
            layout="vertical"
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 30,
              legend: "year",
              legendPosition: "middle",
              legendOffset: 44,
              truncateTickAt: 10,
            }}
          />
        </div>
      );
    } else if (graphData.type === "pie") {
      return (
        <div className="my-5" key={key}>
          <h2 className="text-[#442873] text-xl mb-2">{graphData.title}</h2>
          <PieChart data={graphData.data} />
        </div>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (!reportData) {
      return <div>No data available</div>;
    }

    if (typeof reportData === "string") {
      return (
        <div className="markdown-content">
          <Markdown>{preprocessMarkdown(reportData)}</Markdown>
        </div>
      );
    }

    return Object.keys(reportData).map((key) => {
      if (key.endsWith("graph")) {
        let graphData: Chart;
        try {
          graphData = JSON.parse(JSON.stringify(reportData[key]));
        } catch (error) {
          graphData = { title: "", type: "", data: [] };
        }

        return renderGraph(key, graphData);
      } else if (typeof reportData[key] === "string") {
        return (
          <div className="markdown-content" key={key}>
            <Markdown>{preprocessMarkdown(reportData[key])}</Markdown>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="flex justify-start mb-1">
        <BackButton />
      </div>
      <div className="bg-white p-5 flex flex-col justify-between items-center text-left w-[1100px] rounded-lg mb-1 border border-[#EFEFEF]">
        <div className="flex flex-row justify-between w-full gap-y-1 ">
          <p className="font-bold text-[18px] text-primary-900">Report on {title}</p>
          <p className="text-[14px] text-primary-900">
            {" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        {useCaseName && (
          <div className="flex flex-row justify-between w-full gap-y-1">
            <p className="text-[14px] text-primary-700">
              Use Case: <strong>{useCaseName} report</strong>
            </p>
          </div>
        )}
      </div>
      <div className="bg-white p-5 flex flex-col justify-center items-start text-left w-[1100px] rounded-lg border border-[#EFEFEF]">
        <div>{renderContent()}</div>
      </div>
    </>
  );
};

export default FullReportPage;
