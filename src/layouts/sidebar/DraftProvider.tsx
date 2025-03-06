import { useContext, useState, useEffect, createContext } from "react";
import { useSearchParams } from "react-router-dom";
import jsCookie from "js-cookie";
import { fetchAgentReports } from "src/pages/my-account/my-agent-reports/agent-report.action";

const ListingContext = createContext<any>(null);

export const ListingProvider = ({ children }: any) => {
  const [searchParams] = useSearchParams();

  const userId = jsCookie.get("user_id");

  const threadId = searchParams.get("threadId");
  const [reportList, setReportList] = useState<{ loading: boolean; reports: any[] }>({
    loading: true,
    reports: [],
  });

  const filteredReports =
    reportList.reports.length > 0
      ? reportList.reports
          .sort((a: any, b: any) => {
            const dateA = +new Date(a.created_at);
            const dateB = +new Date(b.created_at);
            return dateB - dateA; // Descending order
          })
          .filter((report: any) => report.is_complete === false)
      : [];

  const fetchListing = () => {
    setReportList({
      ...reportList,
      loading: true,
    });
    fetchAgentReports(userId || "", setReportList);
  };

  useEffect(() => {
    fetchListing();
  }, [threadId]);
  return (
    <ListingContext.Provider
      value={{ records: filteredReports, setRecords: setReportList, fetchListing }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => useContext(ListingContext);
