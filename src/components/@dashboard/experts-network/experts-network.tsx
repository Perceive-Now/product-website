import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import classNames from "classnames";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";
import RadioButtons from "../../reusable/radio-buttons";

//
import { getExpertsTable } from "../../../utils/api/dashboard";

/*
 *
 **/
export default function ExpertsNetwork(props: IExpertsNetworkProps) {
  const [expertMode, setExpertMode] = useState<modes>("industry");

  const { data, isLoading, isError, error } = useQuery(
    ["footprint-for-experts", ...props.keywords],
    async () => {
      return await getExpertsTable(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  //
  const patentsData =
    (expertMode === "industry" ? data?.patent?.Industry : data?.patent?.Academic ?? [])
      ?.sort((a, b) => b.count - a.count)
      .slice(0, 5) ?? [];

  //
  const publicationData =
    (expertMode === "industry" ? data?.publication?.Industry : data?.publication?.Academic ?? [])
      ?.sort((a, b) => b.count - a.count)
      .slice(0, 5) ?? [];

  //
  const handleModeChange = (mode: string) => {
    setExpertMode(mode as modes);
  };

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          title="Inventors"
          subTitle="Top list of inventors with maximum number of publications and patents "
          sideTitleOption={
            <RadioButtons
              options={[
                { label: "Industry", value: "industry" },
                { label: "Academic", value: "academic" },
              ]}
              activeMode={expertMode}
              handleModeChange={handleModeChange}
            />
          }
        />
      }
    >
      <div className="grid gap-y-5 gap-x-4 my-3">
        <div>
          <p className="text-lg font-semibold text-primary-900 mb-2">Based on patents</p>

          <div className="grid grid-cols-12 mb-3">
            <div className="col-span-1" />
            <div className="col-span-4 font-semibold ml-2">Name</div>
            <div className="col-span-6 font-semibold">Company</div>
            <div className="col-span-1 text-left pr-1 font-semibold">Patents</div>
          </div>

          {patentsData.map((itm, index) => (
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
          <p className="text-lg font-semibold text-primary-900 mb-2">Based on publications</p>

          <div className="grid grid-cols-12 mb-3">
            <div className="col-span-1" />
            <div className="col-span-4 font-semibold ml-2">Name</div>
            <div className="col-span-6 font-semibold">Company</div>
            <div className="col-span-1 text-left pr-1 font-semibold">Publications</div>
          </div>

          {publicationData.map((itm, index) => (
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
    </DataSection>
  );
}

//
function ListItem(props: IListItemProps) {
  return (
    <div className="grid grid-cols-12 gap-x-2 border rounded-full shadow-md mb-2 px-2 py-1">
      <div
        className={classNames("col-span-1 font-bold flex items-center font-sans", {
          "text-primary-100": props.index === 0,
          "text-primary-500": props.index === 1,
          "text-primary-600": props.index === 2,
          "text-primary-800": props.index === 3,
          "text-primary-900": props.index === 4,
        })}
      >
        0{props.index + 1}
      </div>
      <div className="col-span-4 flex items-center">
        <p className="line-clamp-2">{props.name ?? "-"}</p>
      </div>
      <div className="col-span-6 flex items-center line-clamp-1">{props.organization ?? "-"}</div>
      <div className="col-span-1 pr-1 flex items-center justify-start line-clamp-1">
        {props.value?.toLocaleString() ?? "-"}
      </div>
    </div>
  );
}

//
interface IListItemProps {
  name: string;
  organization: string;
  value: number;
  index: number;
}

interface IExpertsNetworkProps {
  keywords: string[];
}

type modes = "industry" | "academic";
