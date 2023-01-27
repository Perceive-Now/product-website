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
import classNames from "classnames";
import { LocationIcon } from "../../icons";

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
        <div className="col-span-3 overflow-y-hidden pr-2">
          <p className="text-xl text-primary-900">Most Recent Patents</p>

          <div className="mt-2">
            {titleList.slice(0, 4).map((itm, index) => (
              <div
                key={index}
                className={classNames({
                  "border-b border-gray-300 mb-2 pb-2": index !== 3,
                })}
              >
                <div className="line-clamp-1 text-xl text-gray-700">
                  <span className="text-lg mr-1 font-semibold text-primary-800">0{index + 1}.</span>
                  <span>{itm.patent_title}</span>
                </div>

                <div className="line-clamp-2 mt-1 text-gray-600">
                  <span>{itm.patent_abstract}</span>
                </div>

                <div className="mt-1 flex items-center gap-1 text-sm text-gray-700">
                  <LocationIcon width={16} height={16} />
                  <span>{StatesCodes[itm.state] ?? itm.state}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-9 bg-gray-200">
          <USMap
            type={currentMode === "industries" ? "heatmap_industry" : "heatmap_universities"}
            data={mapData}
          />
        </div>
      </div>
    </DataSection>
  );
}

type availableModes = "industries" | "universities";

interface IFootprintHeatmapProps {
  keywords: string[];
}
