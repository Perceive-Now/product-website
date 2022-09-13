import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";

//
import ReactTable from "../../reusable/ReactTable";
import PageTitle from "../../reusable/page-title";
import ExpandBtn from "../../reusable/expand-btn/expand-btn";

//
import { InfoIcon } from "../../icons";

/*
 *
 **/
export default function Competitors() {
  const customRef = useRef<HTMLDivElement | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [fetchedData, setFetchedData] = useState<CompetitorsType[]>([]);

  const columns = useMemo<ColumnDef<CompetitorsType>[]>(
    () => [
      {
        header: "",
        accessorKey: "sn",
      },
      {
        header: "Competitors",
        accessorKey: "competitors",
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
        header: "Experts",
        accessorKey: "experts",
      },
      {
        header: "Funding",
        accessorKey: "funding",
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
      const fetchCompetitorsData = (length = 10) => {
        return {
          data: Array(length)
            .fill(null)
            .map((slot) => {
              return {
                competitors: "Pharmaceutical",
                patents: "1,025",
                publications: "81,920",
                experts: "8,392",
                funding: "$60.2B",
              };
            }),
        };
      };

      const response = fetchCompetitorsData();

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
    if (isExpanded) {
      customRef.current?.scrollIntoView({ behavior: "auto" });
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className="mt-2 rounded-2xl border border-gray-200 shadow"
      ref={customRef}
    >
      <div className="pt-4 px-3">
        <PageTitle
          title="Competitors"
          info={`This list of top competitors was extracted from "X" no of publications and "Y" no of patents`}
          titleClass="font-bold"
          subTitle={`"Company name 1" has the largest number of patents. The leading expert in "company name 1" is "expert name 1". The most recent patent filed by them was titled “Title of the most recent patent published by company name 1"`}
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

interface CompetitorsType {
  sn: string;
  competitors: string;
  patents: string;
  publications: string;
  experts: string;
  funding: string;
}

const RowActions = ({ row }: any) => {
  return <InfoIcon className="cursor-pointer" />;
};
