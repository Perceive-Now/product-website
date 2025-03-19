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

  const fetchListing = () => {
    setReportList({
      ...reportList,
      loading: true,
    });
    fetchAgentReports(userId || "", ({ reports, loading }) => {
      setReportList({
        reports:
          reports?.length > 0
            ? reports
                .sort((a, b) => b.id - a.id)
                .filter((report: any) => report.is_complete === false)
            : [],
        loading,
      });
    });
  };

  useEffect(() => {
    fetchListing();
  }, [threadId]);
  return (
    <ListingContext.Provider
      value={{ records: reportList.reports, setRecords: setReportList, fetchListing }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => useContext(ListingContext);
