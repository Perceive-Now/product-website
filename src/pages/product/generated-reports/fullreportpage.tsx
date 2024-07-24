import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import PieChart from "../../../components/@chart/pie-chart/pie-chart";
import BarChart from "./bar-chart";
import { useAppSelector } from "src/hooks/redux";
import { UseCaseOptions } from "../../../components/@report/use-case/__use-cases";
import BackButton from "./goback";

// Define the interfaces at the top of the file
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
  prompt1: string;
  prompt2: string;
  prompt2graph: string;
  prompt2_2graph: string;
  prompt3: string;
  prompt3graph: string;
  prompt4: string;
  prompt4graph: string;
  prompt5: string;
  prompt5graph: string;
  prompt6: string;
  user_case_id?: number; // Ensure this property exists
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
  const reports = useAppSelector((state) => state.generatedReports.reports); // Assuming you have this in your Redux state
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [useCase, setUseCase] = useState<{ label: string; value: string } | null>(null);

  useEffect(() => {
    // Find the report by requirement_gathering_id
    const report = reports.find((r) => r.requirement_gathering_id === requirement_gathering_id);
    if (report) {
      const userCaseId =
        typeof report.user_case_id === "string"
          ? parseInt(report.user_case_id, 10)
          : report.user_case_id;
      const dataWithUserCaseId = { ...report.data, user_case_id: userCaseId };
      setReportData(dataWithUserCaseId); // Directly assign the data with user_case_id

      {
        /*// Debugging logs
      console.log("Report Data with User Case ID:", dataWithUserCaseId);
      console.log("Use Case Options:", UseCaseOptions);
      */
      }

      const matchedUseCase = UseCaseOptions.find(
        (uc) => uc.useCaseId === dataWithUserCaseId.user_case_id,
      );
      //console.log("Matched Use Case:", matchedUseCase); // Log the matched use case

      setUseCase(matchedUseCase || null);
    }
  }, [requirement_gathering_id, reports]);

  const renderContent = () => {
    if (!reportData) {
      return <div>No data available</div>;
    }

    // Parse the prompt2_2graph JSON string
    let parsedPrompt2_2Graph: Chart;
    let parsedPrompt2Graph: Chart;
    let parsedPrompt3Graph: Chart;
    let parsedPrompt4Graph: Chart;
    let parsedPrompt5Graph: Chart;
    try {
      const jsonString2_2 = JSON.stringify(reportData.prompt2_2graph);
      parsedPrompt2_2Graph = JSON.parse(jsonString2_2);
      //console.log("Parsed prompt2_2graph:", parsedPrompt2_2Graph);
    } catch (error) {
      parsedPrompt2_2Graph = { title: "", type: "", data: [] };
    }

    try {
      const jsonString2 = JSON.stringify(reportData.prompt2graph);
      parsedPrompt2Graph = JSON.parse(jsonString2);
      //console.log("Parsed prompt2graph:", parsedPrompt2Graph);
    } catch (error) {
      parsedPrompt2Graph = { title: "", type: "", data: [] };
    }

    try {
      const jsonString3 = JSON.stringify(reportData.prompt3graph);
      parsedPrompt3Graph = JSON.parse(jsonString3);
    } catch (error) {
      parsedPrompt3Graph = { title: "", type: "", data: [] };
    }

    try {
      const jsonString4 = JSON.stringify(reportData.prompt4graph);
      parsedPrompt4Graph = JSON.parse(jsonString4);
    } catch (error) {
      parsedPrompt4Graph = { title: "", type: "", data: [] };
    }

    try {
      const jsonString5 = JSON.stringify(reportData.prompt5graph);
      parsedPrompt5Graph = JSON.parse(jsonString5);
      //console.log("Parsed prompt5graph:", parsedPrompt5Graph);
    } catch (error) {
      parsedPrompt5Graph = { title: "", type: "", data: [] };
    }

    // Extract the data fields from these properties
    const graphData1 = Array.isArray(parsedPrompt2_2Graph.data) ? parsedPrompt2_2Graph.data : [];
    const graphData2 = Array.isArray(parsedPrompt2Graph.data) ? parsedPrompt2Graph.data : [];
    const graphData3 = Array.isArray(parsedPrompt3Graph.data) ? parsedPrompt3Graph.data : [];
    const graphData4 = Array.isArray(parsedPrompt4Graph.data) ? parsedPrompt4Graph.data : [];
    const graphData5 = Array.isArray(parsedPrompt5Graph.data) ? parsedPrompt5Graph.data : [];

    // Map graphData to have the correct structure for the BarChart component
    const barChartData2 = graphData2.map((item: ChartData) => ({
      Assignee: item.Assignee || "",
      value: item["number of patents"] || 0,
    }));

    const barChartData3 = graphData3.map((item: ChartData) => ({
      Assignee: item.Assignee || "",
      value: item["number of patents"] || 0,
    }));

    const barChartData4 = graphData4.map((item: ChartData) => ({
      Assignors: item.Assignors || "",
      value: item["number of patents"] || 0,
    }));

    const barChartData5 = graphData5.map((item: ChartData) => ({
      year: item.year || "",
      ...item.values,
    }));

    return (
      <div>
        {reportData.prompt1 && (
          <div className="markdown-content">
            <Markdown>{preprocessMarkdown(reportData.prompt1)}</Markdown>
          </div>
        )}
        {reportData.prompt2 && (
          <div className="markdown-content">
            <Markdown>{preprocessMarkdown(reportData.prompt2)}</Markdown>
          </div>
        )}

        {barChartData2.length > 0 && (
          <div className="my-5">
            <h2 className="text-[#442873] text-xl mb-2">{parsedPrompt2Graph.title}</h2>
            <BarChart
              data={barChartData2}
              padding={0.45}
              keys={["value"]}
              indexBy="Assignee"
              groupMode={"stacked"}
              borderRadius={4}
              //legends={"range"}
              legendY="Number of patents"
              //legendX="Assignee"
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
        )}

        {graphData1.length > 0 && (
          <div className="my-5">
            <h2 className="text-[#442873] text-xl mb-2">{parsedPrompt2_2Graph.title}</h2>
            <PieChart data={graphData1} />
          </div>
        )}

        {reportData.prompt3 && (
          <div className="markdown-content">
            <Markdown>{preprocessMarkdown(reportData.prompt3)}</Markdown>
          </div>
        )}

        {barChartData3.length > 0 && (
          <div className="my-5">
            <h2 className="text-[#442873] text-xl mb-2">{parsedPrompt3Graph.title}</h2>
            <BarChart
              data={barChartData3}
              keys={["value"]}
              indexBy="Assignee"
              groupMode={"stacked"}
              borderRadius={4}
              //legends={"legend"}
              legendY="Number of patents"
              //legendX="Assignee"
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
        )}

        {reportData.prompt4 && (
          <div className="markdown-content">
            <Markdown>{preprocessMarkdown(reportData.prompt4)}</Markdown>
          </div>
        )}

        {barChartData4.length > 0 && (
          <div className="my-5">
            <h2 className="text-[#442873] text-xl mb-2">{parsedPrompt4Graph.title}</h2>
            <BarChart
              data={barChartData4}
              keys={["value"]}
              indexBy="Assignors"
              groupMode={"stacked"}
              borderRadius={4}
              //legends={"legend"}
              legendY="Number of patents"
              //legendX="Assignee"
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
        )}

        {reportData.prompt5 && (
          <div className="markdown-content">
            <Markdown>{preprocessMarkdown(reportData.prompt5)}</Markdown>
          </div>
        )}

        {barChartData5.length > 0 && (
          <div className="my-5">
            <h2 className="text-[#442873] text-xl mb-2">{parsedPrompt5Graph.title}</h2>
            <BarChart
              data={barChartData5}
              keys={Object.keys(barChartData5[0]).filter((key) => key !== "year")}
              indexBy="year"
              groupMode={"grouped"}
              borderRadius={4}
              //legends={"range"}
              legendY="Number of patents"
              //legendX="year"
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
        )}

        {reportData.prompt6 && (
          <div className="markdown-content">
            <Markdown>{preprocessMarkdown(reportData.prompt6)}</Markdown>
          </div>
        )}
      </div>
    );
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
        {useCase && (
          <div className="flex flex-row justify-between w-full gap-y-1">
            <p className="text-[14px] text-primary-700">
              Use Case: <strong>{useCase.label} report</strong>
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
