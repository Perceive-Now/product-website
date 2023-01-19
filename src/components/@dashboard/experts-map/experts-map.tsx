import classNames from "classnames";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import GoogleMaps from "../../@product/google-map";
import type { IWorldMapDataItem } from "../../@product/world-map/world-map";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";

//
import { getExpertsMapInfo } from "../../../utils/api/map";

/**
 *
 */
export default function ExpertsMap(props: IFootprintHeatmapProps) {
  const [currentMode, setCurrentMode] =
    useState<availableModes>("basicPublication");

  // const joinedKeywords = props.keywords.map((kwd) => `"${kwd}"`).join(", ");

  const { data, isLoading } = useQuery(
    ["footprint-for-experts-map", ...props.keywords],
    async () => {
      return await getExpertsMapInfo(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const mapData: IWorldMapDataItem[] =
    (
      (currentMode === "basicPatents"
        ? data?.industryExpertMap
        : currentMode === "basicPublication"
        ? data?.academicExpertMap
        : data?.federalExpertMap) ?? []
    ).map((itm) => ({
      name: itm.name,
      location: itm.location,
      patents: itm.patentcount,
      coordinate: itm.coordinates,
      employment: itm.employment,
    })) ?? [];

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      title={
        <PageTitle
          info={`This list was extracted from "X" total number of experts and researchers worldwide`}
          titleClass="font-semibold"
          title="Geographical footprint of experts"
          children={
            <div className="flex justify-between">
              <p className="text-sm">
                Network of experts and researchers working across the globe
              </p>

              <div className="flex gap-x-3 text-sm">
                <div className="flex h-full items-center gap-x-0.5 cursor-pointer">
                  <input
                    type="radio"
                    id="industryExperts"
                    name="currentModeExpertMap"
                    checked={currentMode === "basicPublication"}
                    onChange={() => setCurrentMode("basicPublication")}
                  />
                  <label htmlFor="industryExperts" className="cursor-pointer">
                    Industry
                  </label>
                </div>

                <div className="flex h-full items-center gap-x-0.5 cursor-pointer">
                  <input
                    type="radio"
                    id="academicExperts"
                    name="currentModeExpertMap"
                    checked={currentMode === "basicPatents"}
                    onChange={() => setCurrentMode("basicPatents")}
                  />
                  <label htmlFor="academicExperts" className="cursor-pointer">
                    Academic
                  </label>
                </div>

                <div className="flex h-full items-center gap-x-0.5 cursor-pointer">
                  <input
                    type="radio"
                    id="federalExperts"
                    name="currentModeExpertMap"
                    checked={currentMode === "federalExperts"}
                    onChange={() => setCurrentMode("federalExperts")}
                  />
                  <label htmlFor="federalExperts" className="cursor-pointer">
                    Federal
                  </label>
                </div>
              </div>
            </div>
          }
        />
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
                <span className="font-semibold text-primary-800">
                  {index + 1}.{" "}
                </span>
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
          {currentMode === "federalExperts" ? (
            <GoogleMaps isWorldMap={false} data={mapData} />
          ) : (
            <GoogleMaps isWorldMap={true} data={mapData} />
          )}
        </div>
      </div>
    </DataSection>
  );
}

type availableModes = "basicPublication" | "basicPatents" | "federalExperts";

interface IFootprintHeatmapProps {
  keywords: string[];
}
