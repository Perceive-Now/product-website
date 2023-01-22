import classNames from "classnames";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import GoogleMaps from "../../@product/google-map";
// import type { IWorldMapDataItem } from "../../@product/world-map/world-map";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";
import RadioButtons from "../../reusable/radio-buttons";

//
import { getExpertsMapInfo } from "../../../utils/api/map";

/**
 *
 */
export default function ExpertsMap(props: IFootprintHeatmapProps) {
  const [currentMode, setCurrentMode] = useState<availableModes>("publications");
  const [industryMode, setIndustryMode] = useState<industryModes>("industry");

  // const joinedKeywords = props.keywords.map((kwd) => `"${kwd}"`).join(", ");

  //
  const { isLoading, isError, error } = useQuery(
    ["footprint-for-experts-map", ...props.keywords],
    async () => {
      return await getExpertsMapInfo(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  //
  const toggleCurrentMode = (mode: availableModes) => {
    setCurrentMode(mode);
  };

  const toggleIndustryMode = (mode: string) => {
    setIndustryMode(mode as industryModes);
  };

  // const mapData: IWorldMapDataItem[] =
  //   (
  //     (currentMode === "basicPatents"
  //       ? data?.industryExpertMap
  //       : currentMode === "basicPublication"
  //       ? data?.academicExpertMap
  //       : data?.federalExpertMap) ?? []
  //   ).map((itm) => ({
  //     name: itm.name,
  //     location: itm.location,
  //     patents: itm.patentcount,
  //     coordinate: itm.coordinates,
  //     employment: itm.employment,
  //   })) ?? [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapData: any[] = [];

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <div className="grid grid-cols-2">
          <div className="col-span-1">
            <PageTitle
              titleClass="font-semibold"
              title="Geographical footprint of inventors"
              subTitle="Network of experts and researchers working across the globe"
            />
          </div>

          <div className="col-span-1 flex flex-col justify-center items-end">
            <div className="flex mb-1">
              <button
                className={classNames(
                  "rounded-l border px-1 py-[4px] border-gray-300",
                  currentMode === "publications" ? "bg-gray-300" : "bg-gray-100",
                )}
                onClick={() => toggleCurrentMode("publications")}
              >
                Publications
              </button>
              <button
                className={classNames(
                  "rounded-r border px-1 py-[4px] border-gray-300",
                  currentMode === "patents" ? "bg-gray-300" : "bg-gray-100",
                )}
                onClick={() => toggleCurrentMode("patents")}
              >
                Patents
              </button>
            </div>

            <RadioButtons
              activeMode={industryMode}
              handleModeChange={toggleIndustryMode}
              options={[
                { label: "Industry authors", value: "industry" },
                { label: "Academic authors", value: "academic" },
              ]}
            />
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-12 mt-2 h-[610px]">
        <div className="col-span-3 overflow-y-scroll">
          {mapData?.slice(0, 100)?.map((item, index) => (
            <div
              key={index}
              className={classNames("border-b border-gray-300 mr-3", {
                "mt-2": index !== 0,
              })}
            >
              <p>
                <span className="font-semibold text-primary-800">{index + 1}. </span>
                <span className="font-semibold">{item.name}</span>
              </p>
              <div className="mt-1 mb-2 text-sm">
                <p className="line-clamp-4">{item.employment}</p>
                <p className="mt-[0.25rem]">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-9 bg-gray-200">
          {currentMode === "patents" ? (
            <GoogleMaps isWorldMap={false} data={mapData} />
          ) : (
            <GoogleMaps isWorldMap={true} data={mapData} />
          )}
        </div>
      </div>
    </DataSection>
  );
}

//
type industryModes = "industry" | "academic";
type availableModes = "publications" | "patents";

//
interface IFootprintHeatmapProps {
  keywords: string[];
}
