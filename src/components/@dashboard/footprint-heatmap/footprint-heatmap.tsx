import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import USMap from "../../@product/us-map";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";
import RadioButtons from "../../reusable/radio-buttons";

//
import StatesCodes from "../../../utils/extra/us-states-codes";

//
import { getPatentHeatmap } from "../../../utils/api/map";

/**
 *
 */
export default function FootprintHeatmap(props: IFootprintHeatmapProps) {
  const [currentMode, setCurrentMode] = useState<availableModes>("industries");

  //
  const { data, isLoading, isError, error } = useQuery(
    ["footprint-for-patents-and-publications", ...props.keywords],
    async () => {
      return await getPatentHeatmap(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  //
  const mapData =
    (currentMode === "industries" ? data?.Industries : data?.Universities)?.count.map((item) => ({
      country: StatesCodes[item.country],
      patents: item.count,
    })) ?? [];

  //
  const titleList =
    (currentMode === "industries" ? data?.Industries : data?.Universities)?.titles ?? [];

  //
  const handleModeChange = (mode: string) => {
    setCurrentMode(mode as availableModes);
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
          info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
          titleClass="font-semibold"
          title="Geographical Footprint of Patents"
          subTitle="Heat map of patents location in USA"
          sideTitleOption={
            <RadioButtons
              options={[
                { label: "Industries", value: "industries" },
                { label: "Universities", value: "universities" },
              ]}
              activeMode={currentMode}
              handleModeChange={handleModeChange}
            />
          }
        />
      }
    >
      <div className="grid grid-cols-12 mt-2 h-[610px]">
        <div className="col-span-3 overflow-y-scroll pr-2">
          <p className="text-xl text-primary-900">Most Recent Patents</p>

          {/* TODO:: Handle layout */}
          {titleList.slice(0, 3).map((itm, index) => (
            <div key={index} className={"mt-3"}>
              <span className="text-lg mr-1 font-semibold text-primary-800">{index + 1}.</span>
              <span>{itm.patent_title}</span>
            </div>
          ))}
        </div>

        <div className="col-span-9 bg-gray-200">
          <USMap type="heatmap" data={mapData} />
        </div>
      </div>
    </DataSection>
  );
}

type availableModes = "industries" | "universities";

interface IFootprintHeatmapProps {
  keywords: string[];
}
