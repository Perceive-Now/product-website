import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsCookie from "js-cookie";
import { fetchCustomizeReport } from "src/pages/product/ai-agent/action";
import DotLoader from "src/components/reusable/dot-loader";

const Chip = ({ label }: { label: string }) => (
  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 inline-block">
    {label}
  </span>
);

const ReportCustomizationThread = () => {
  const { id } = useParams();
  const { threadid } = useParams();
  const userId = jsCookie.get("user_id");

  const [reportList, setReportList] = useState<{ loading: boolean; customReport: any }>({
    loading: true,
    customReport: {},
  });
  const { customReport, loading } = reportList;

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const adminUserId = useParams().userid;

  useEffect(() => {
    setReportList({
      customReport: {},
      loading: true,
    });
    fetchCustomizeReport(
      id || threadid || "",
      isAuthenticated ? adminUserId || userId || "" : userId || "",
      setReportList,
    );
  }, []);
  return (
    <div className="mt-2 px-0 md:px-3 w-full mx-auto  max-w-2xl mx-auto p-3 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Report Customization</h2>
      {loading ? (
        <div className="flex items-center justify-center p-5 h-full">
          <DotLoader />
        </div>
      ) : (
        <div className="">
          <div>
            <h3 className="text-lg font-semibold">Report Depth</h3>
            <div className="flex flex-wrap mt-2">
              {customReport.report_depth?.selected?.length
                ? customReport.report_depth?.selected?.map((ele: string, index: number) =>
                    ele === "Other" ? (
                      <Chip label={`Other: ${customReport.report_depth?.other}`} key={index} />
                    ) : (
                      <Chip label={ele} key={index} />
                    ),
                  )
                : "NA"}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Report Format</h3>
            <div className="flex flex-wrap mt-2">
              {customReport.report_format?.selected?.length
                ? customReport.report_format?.selected?.map((ele: string, index: number) =>
                    ele === "Other" ? (
                      <Chip label={`Other: ${customReport.report_format?.other}`} key={index} />
                    ) : (
                      <Chip label={ele} key={index} />
                    ),
                  )
                : "NA"}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Visual Style</h3>
            <div className="flex flex-wrap mt-2">
              {customReport.visual_style?.selected?.length
                ? customReport.visual_style?.selected?.map((ele: string, index: number) =>
                    ele === "Other" ? (
                      <Chip label={`Other: ${customReport.visual_style?.other}`} key={index} />
                    ) : (
                      <Chip label={ele} key={index} />
                    ),
                  )
                : "NA"}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Number of Charts</h3>
            <div className="flex flex-wrap mt-2">
              {customReport.number_of_charts?.selected?.length
                ? customReport.number_of_charts?.selected?.map((ele: string, index: number) =>
                    ele === "Other" ? (
                      <Chip label={`Other: ${customReport.number_of_charts?.other}`} key={index} />
                    ) : (
                      <Chip label={ele} key={index} />
                    ),
                  )
                : "NA"}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Citations</h3>
            <div className="flex flex-wrap mt-2">
              {customReport.citations?.selected?.length
                ? customReport.citations?.selected?.map((ele: string, index: number) =>
                    ele === "Other" ? (
                      <Chip label={`Other: ${customReport.citations?.other}`} key={index} />
                    ) : (
                      <Chip label={ele} key={index} />
                    ),
                  )
                : "NA"}
            </div>
          </div>
          <h3 className="text-lg font-semibold">Audience Focus</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">For enterprises</h3>
              <div className="flex flex-wrap mt-2">
                {customReport.audience_focus?.enterprise?.selected?.length
                  ? customReport.audience_focus?.enterprise?.selected?.map(
                      (ele: string, index: number) =>
                        ele === "Other" ? (
                          <Chip
                            label={`Other: ${customReport.audience_focus?.enterprise?.other}`}
                            key={index}
                          />
                        ) : (
                          <Chip label={ele} key={index} />
                        ),
                    )
                  : "NA"}
              </div>
            </div>{" "}
            <div>
              <h3 className="text-lg font-semibold">For Investors & Financial Insitutions</h3>
              <div className="flex flex-wrap mt-2">
                {customReport.audience_focus?.investors?.selected?.length
                  ? customReport.audience_focus?.investors?.selected?.map(
                      (ele: string, index: number) =>
                        ele === "Other" ? (
                          <Chip
                            label={`Other: ${customReport.audience_focus?.investors?.other}`}
                            key={index}
                          />
                        ) : (
                          <Chip label={ele} key={index} />
                        ),
                    )
                  : "NA"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportCustomizationThread;
