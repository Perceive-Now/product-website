import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import WorldMap from "../../@product/world-map";
import PageTitle from "../../reusable/page-title";
import USMap from "../../@product/us-map";

//
// import { getPublicationsAndPatentsMap } from "../../../utils/api/map";

/**
 *
 */
export default function CompetetitorMap(props: IFootprintHeatmapProps) {
  const [currentMode, setCurrentMode] =
    useState<availableModes>("basicPublication");

  const { data, isLoading } = useQuery(
    ["footprint-for-competetitors", ...props.keywords],
    async () => {
      // return await getPublicationsAndPatentsMap();
      return [];
    },
    { enabled: !!props.keywords.length }
  );

  return (
    <div className="mt-3 p-3 rounded-lg border border-gray-200 shadow">
      <PageTitle
        info={`Geographical footprint of competitors working in your area of interest is extracted from "X" total number of companies worldwide with technology research footprint`}
        titleClass="font-bold"
        title="Geographical Footprint of Competitors"
        children={
          <div className="flex justify-between">
            <p className="text-sm">
              World map with heat spots & icon for top competitors
            </p>

            <div className="flex gap-x-3 text-sm">
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
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-12 mt-2 h-[610px]">
        <div className="col-span-3 overflow-y-scroll">
          <div style={{ height: 999 }}>
            {/* Scrollable list goes here... need to display items here */}
          </div>
        </div>

        <div className="col-span-9 bg-gray-200">
          {currentMode === "basicPublication" ? (
            <WorldMap type={currentMode} data={isLoading ? [] : data} />
          ) : (
            <USMap type="normal" data={isLoading ? [] : data} />
          )}
        </div>
      </div>
    </div>
  );
}

type availableModes = "basicPublication" | "basicPatents";

interface IFootprintHeatmapProps {
  keywords: string[];
}
