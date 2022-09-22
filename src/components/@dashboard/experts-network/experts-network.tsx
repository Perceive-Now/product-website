import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useRef, useState } from "react";

//
import PageTitle from "../../reusable/page-title";
import ReactTable from "../../reusable/ReactTable";
import RadioButtons from "../../reusable/radio-buttons";
import ExpandBtn from "../../reusable/expand-btn/expand-btn";

//
import { InfoIcon } from "../../icons";
import { getExpertsTable, IExpert } from "../../../utils/api/dashboard";

/*
 *
 **/
export default function ExpertsNetwork(props: IExpertsNetworkProps) {
  const customRef = useRef<HTMLDivElement | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [expertMode, setExpertMode] = useState("industryExperts");

  const { data, isLoading } = useQuery(
    ["footprint-for-experts", ...props.keywords],
    async () => {
      return await getExpertsTable(props.keywords);
    }
  );

  const _tableData = isLoading
    ? []
    : (expertMode === "industryExperts" ? data?.industry : data?.academic) ??
      [];

  const tableData = _tableData.slice(0, isExpanded ? _tableData.length : 4);

  const columns = useMemo<ColumnDef<IExpert>[]>(
    () => [
      {
        header: "",
        accessorKey: "sn",
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: (props) => {
          const originalData = props.row.original;
          return [originalData.firstName, originalData.lastName].join(" ");
        },
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
        accessorKey: "locationText",
      },
      {
        header: "Patents",
        accessorKey: "patentsCount",
      },
      {
        header: "Publications",
        accessorKey: "publicationsCount",
      },
      {
        id: "actions",
        cell: (props) => <RowActions {...props} />,
      },
    ],
    []
  );

  const handleExpandToggle = () => {
    if (isExpanded) {
      customRef.current?.scrollIntoView({ behavior: "auto" });
    }
    setIsExpanded((prev) => !prev);
  };

  const handleModeChange = (mode: string) => {
    setExpertMode(mode);
  };

  return (
    <div
      className="mt-1 rounded-2xl border border-gray-200 shadow"
      ref={customRef}
    >
      <div className="pt-4 px-3">
        <PageTitle
          title="Experts"
          subTitle={`Top list of experts with maximum number of publications and patents `}
          titleClass="font-bold"
          sideTitleOption={
            <ExpertsMode
              activeMode={expertMode}
              onModeChange={handleModeChange}
            />
          }
        />
      </div>

      <div className="mt-9">
        <div className="px-3">
          <ReactTable columnsData={columns} rowsData={tableData} />
        </div>

        {tableData.length > 4 && (
          <div>
            <ExpandBtn
              isExpanded={isExpanded}
              handleExpandToggle={handleExpandToggle}
              secondaryButton="View More"
            />
          </div>
        )}
      </div>
    </div>
  );
}

const RowActions = ({ row }: any) => {
  return <InfoIcon className="cursor-pointer" />;
};

const ExpertsMode = ({ activeMode, onModeChange }: IExpertMode) => {
  return (
    <div className="flex">
      <RadioButtons
        options={[
          { label: "Industry Experts", value: "industryExperts" },
          { label: "Academic Experts", value: "academicExperts" },
        ]}
        activeMode={activeMode}
        handleModeChange={onModeChange}
      />
    </div>
  );
};

interface IExpertMode {
  activeMode: string;
  onModeChange: (mode: string) => void;
}

interface IExpertsNetworkProps {
  keywords: string[];
}
