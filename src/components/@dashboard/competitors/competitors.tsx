import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

//
import ReactTable from "../../reusable/ReactTable";
import PageTitle from "../../reusable/page-title";

/*
 *
 **/
export default function Competitors() {
  const [totalData, setTotalData] = useState(4);
  const [fetchedData, setFetchedData] = useState<any>();

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
    ],
    []
  );

  useEffect(() => {
    // api call to fetch data
    setFetchedData(makeData());
  }, []);

  const data = useMemo(() => {
    return fetchedData.slice(0, totalData);
  }, [fetchedData, totalData]);

  const handleExpandTable = () => {
    setTotalData(10);
  };

  console.log(totalData, data, "totalData");

  return (
    <div className="mt-3 p-3 rounded-lg border border-gray-200 shadow">
      <PageTitle
        title="Competitors"
        info="true"
        subTitle={`"Company name 1" has the largest number of patents. The leading expert in "company name 1" is "expert name 1". The most recent patent filed by them was titled “Title of the most recent patent published by company name 1"`}
      />
      <div className="mt-9">
        <ReactTable columnsData={columns} rowsData={data} />
        <div>
          <button onClick={handleExpandTable}>Expand</button>
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

const makeData = (length = 10) => {
  return Array(length)
    .fill(null)
    .map((slot, index) => {
      let sn = ("0" + (index + 1)).slice(-2);
      return {
        sn: sn,
        competitors: "Ram Thapa",
        patents: "Thapa industry",
        publications: "Personal protective equipment and method",
        experts: "/id",
        funding: "2022-08-24",
      };
    });
};
