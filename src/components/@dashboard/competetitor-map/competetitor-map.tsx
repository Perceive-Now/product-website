// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
// import WorldMap from "../../@product/world-map";
import PageTitle from "../../reusable/page-title";
import USMap from "../../@product/us-map";

//
import { getCompetitorMapInfo } from "../../../utils/api/map";
import { IWorldMapDataItem } from "../../@product/world-map/world-map";
import classNames from "classnames";

/**
 *
 */
export default function CompetetitorMap(props: IFootprintHeatmapProps) {
  // const [currentMode, setCurrentMode] =
  //   useState<availableModes>("basicPublication");

  const { data, isLoading } = useQuery(
    ["footprint-for-competetitors", ...props.keywords],
    async () => {
      return await getCompetitorMapInfo(props.keywords);
    },
    { enabled: !!props.keywords.length }
  );

  const finalData: IWorldMapDataItem[] = isLoading
    ? []
    : data?.patentsMap?.map((itm) => ({
        coordinate: [itm.coordinates[1], itm.coordinates[0]],
        name: itm.company,
        location: itm.location,
        patents: itm.count,
      })) ?? [];

  const allPatentList = (isLoading ? [] : data?.patentsList) ?? [];

  return (
    <div className="mt-3 p-3 rounded-lg border border-gray-200 shadow">
      <PageTitle
        info={`Geographical footprint of competitors working in your area of interest is extracted from "X" total number of companies worldwide with technology research footprint`}
        titleClass="font-bold"
        title="Geographical Footprint of Competitors"
        children={
          <div className="flex justify-between">
            <p className="text-sm">
              Geolocation of companies working in your area of interest
            </p>

            {/* <div className="flex gap-x-3 text-sm">
              <div className="flex h-full items-center gap-x-0.5 cursor-pointer">
                <input
                  type="radio"
                  id="basicPublication"
                  name="currentModeCompetetitorMap"
                  checked={currentMode === "basicPublication"}
                  onChange={() => setCurrentMode("basicPublication")}
                />
                <label htmlFor="basicPublication" className="cursor-pointer">
                  Publications
                </label>
              </div>

              <div className="flex h-full items-center gap-x-0.5 cursor-pointer">
                <input
                  type="radio"
                  id="basicPatents"
                  name="currentModeCompetetitorMap"
                  checked={currentMode === "basicPatents"}
                  onChange={() => setCurrentMode("basicPatents")}
                />
                <label htmlFor="basicPatents" className="cursor-pointer">
                  Patents
                </label>
              </div>
            </div> */}
          </div>
        }
      />

      <div className="grid grid-cols-12 mt-2 h-[610px]">
        <div className="col-span-3 overflow-y-scroll pr-2">
          <div>
            {allPatentList?.slice(0, 50)?.map((itm, index) => (
              <div
                key={index}
                className={classNames("mt-3", {
                  "pb-3 border-b border-gray-300":
                    index !== allPatentList?.length - 1,
                })}
              >
                <p className="text-lg leading-tight">
                  <span className="mr-1 font-semibold text-primary-800">
                    {index + 1}.
                  </span>
                  <span>{itm.title}</span>
                </p>

                <p className="my-[12px] text-sm line-clamp-4">{itm.abstract}</p>

                <p>{itm.location}</p>
              </div>
            ))}
            {/* Scrollable list goes here... need to display items here */}
          </div>
        </div>

        <div className="col-span-9 bg-gray-200">
          {/* {currentMode === "basicPublication" ? (
            <WorldMap type={currentMode} data={[]} />
          ) : ( */}
          <USMap type="normal" data={finalData} />
          {/* )} */}
        </div>
      </div>
    </div>
  );
}

// type availableModes = "basicPublication" | "basicPatents";

interface IFootprintHeatmapProps {
  keywords: string[];
}
