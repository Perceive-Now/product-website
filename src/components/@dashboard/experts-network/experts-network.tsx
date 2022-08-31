import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

//
import ReactTable from "../../reusable/ReactTable";
import PageTitle from "../../reusable/page-title";
import ExpandBtn from "../../reusable/expand-btn/expand-btn";

//
import { InfoIcon } from "../../icons";

/*
 *
 **/
export default function ExpertsNetwork() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [fetchedData, setFetchedData] = useState<ExpertsNetworkType[]>([]);

  const columns = useMemo<ColumnDef<ExpertsNetworkType>[]>(
    () => [
      {
        header: "",
        accessorKey: "sn",
      },
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Company Name",
        accessorKey: "companyName",
        maxWidth: 400,
        minWidth: 140,
        width: 200,
      },
      {
        header: "Location",
        accessorKey: "location",
      },
      {
        header: "Patents",
        accessorKey: "patents",
      },
      {
        header: "Publications",
        accessorKey: "publications",
      },
      {
        id: "actions",
        cell: (props) => <RowActions {...props} />,
      },
    ],
    []
  );

  useEffect(() => {
    try {
      // api call to fetch data
      const fetchExpertsNetworkData = (length = 10) => {
        return {
          data: Array(length)
            .fill(null)
            .map((slot) => {
              return {
                name: "Riccardo Privolizzi",
                companyName: "Compnay Name",
                location: "London, England, UK",
                patents: 32,
                publications: 203,
              };
            }),
        };
      };

      const response = fetchExpertsNetworkData();

      let data = response.data.map((d, index) => {
        let sn = ("0" + (index + 1)).slice(-2);
        return {
          ...d,
          sn: sn,
        };
      });

      setFetchedData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const data = useMemo(() => {
    let displayRowCount = isExpanded ? 10 : 4;
    return fetchedData.slice(0, displayRowCount);
  }, [fetchedData, isExpanded]);

  const handleExpandToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mt-3 rounded-2xl border border-gray-200 shadow">
      <div className="pt-4 px-3">
        <PageTitle
          title="Experts"
          info="true"
          subTitle={`Top list of experts with maximum number of publications and patents `}
        />
      </div>
      <div className="mt-9">
        <div className="px-3">
          <ReactTable columnsData={columns} rowsData={data} />
        </div>
        <div>
          <ExpandBtn
            isExpanded={isExpanded}
            handleExpandToggle={handleExpandToggle}
            secondaryButton="View More"
          />
        </div>
      </div>
    </div>
  );
}

interface ExpertsNetworkType {
  sn: string;
  name: string;
  companyName: string;
  location: string;
  patents: number;
  publications: number;
}

const RowActions = ({ row }: any) => {
  return <InfoIcon className="cursor-pointer" />;
};
