import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import RadioButtons from "../../reusable/radio-buttons";

//
import { getExpertsTable, IExpertModeItem } from "../../../utils/api/dashboard";

/*
 *
 **/
export default function ExpertsNetwork(props: IExpertsNetworkProps) {
  const customRef = useRef<HTMLDivElement | null>(null);

  const [expertMode, setExpertMode] = useState("industryExperts");

  const { data, isLoading } = useQuery(
    ["footprint-for-experts", ...props.keywords],
    async () => {
      const data = await getExpertsTable(props.keywords);
      console.log(data, "inside react query");
      return data;
    },
    { enabled: !!props.keywords.length }
  );

  const _tableData: IExpertModeItem = isLoading
    ? {}
    : (expertMode === "industryExperts"
        ? data?.industry
        : expertMode === "academicExperts"
        ? data?.academic
        : data?.federal) ?? {};

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

      <div className="mt-4 px-3">
        <div className="grid gap-y-5 gap-x-4 mb-3">
          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">
              Patents
            </p>

            <div className="grid grid-cols-11 mb-3">
              <div className="col-span-5 font-semibold">Name</div>
              <div className="col-span-5 font-semibold">Organization</div>
              <div className="col-span-1 text-right pr-1 font-semibold">
                Patents
              </div>
            </div>

            {_tableData?.patents
              ?.sort((a, b) => b.count - a.count)
              ?.slice(0, 5)
              ?.map((itm, index) => (
                <ListItem
                  name={itm.name}
                  organization={itm.company}
                  value={itm.count}
                  index={index}
                  key={index}
                />
              ))}
          </div>

          <div>
            <p className="text-lg font-semibold text-primary-900 mb-2">
              Publications
            </p>

            <div className="grid grid-cols-11 mb-3">
              <div className="col-span-5 font-semibold">Name</div>
              <div className="col-span-5 font-semibold">Organization</div>
              <div className="col-span-1 text-right pr-1 font-semibold">
                Publications
              </div>
            </div>

            {_tableData?.publications
              ?.sort((a, b) => b.count - a.count)
              ?.slice(0, 5)
              ?.map((itm, index) => (
                <ListItem
                  name={itm.name}
                  organization={itm.company}
                  value={itm.count}
                  index={index}
                  key={index}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ExpertsMode = ({ activeMode, onModeChange }: IExpertMode) => {
  return (
    <div className="flex">
      <RadioButtons
        options={[
          { label: "Industry", value: "industryExperts" },
          { label: "Academic", value: "academicExperts" },
          { label: "Federal", value: "federalExperts" },
        ]}
        activeMode={activeMode}
        handleModeChange={onModeChange}
      />
    </div>
  );
};

function ListItem(props: IListItemProps) {
  return (
    <div className="grid grid-cols-11 gap-x-2 border rounded-full shadow-md mb-2 px-2 py-1">
      <div className="col-span-5 flex items-center line-clamp-2">
        {props.name ?? "-"}
      </div>
      <div className="col-span-5 flex items-center">
        {props.organization ?? "-"}
      </div>
      <div className="col-span-1 pr-1 flex items-center justify-center">
        {props.value?.toLocaleString() ?? "-"}
      </div>
    </div>
  );
}

interface IListItemProps {
  name: string;
  organization: string;
  value: number;
  index: number;
}

interface IExpertMode {
  activeMode: string;
  onModeChange: (mode: string) => void;
}

interface IExpertsNetworkProps {
  keywords: string[];
}
