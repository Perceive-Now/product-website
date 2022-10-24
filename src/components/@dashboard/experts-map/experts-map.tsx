import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import WorldMap from "../../@product/world-map";

//
import PageTitle from "../../reusable/page-title";

//
import { getExpertsTable } from "../../../utils/api/dashboard";

/**
 *
 */
export default function ExpertsMap(props: IFootprintHeatmapProps) {
  const [currentMode, setCurrentMode] =
    useState<availableModes>("basicPublication");

  const joinedKeywords = props.keywords.map((kwd) => `"${kwd}"`).join(", ");

  const { data, isLoading } = useQuery(
    ["footprint-for-experts", ...props.keywords],
    async () => {
      return await getExpertsTable(props.keywords);
    }
  );

  const mapData = (
    (currentMode === "basicPublication" ? data?.industry : data?.academic) ?? []
  )?.map((itm) => ({
    name: [itm.firstName, itm.lastName].join(" "),
    location: itm.locationText,
    patents: itm.patentsCount,
    publications: itm.publicationsCount,
    coordinate: itm.coordinates,
  }));

  return (
    <div className="mt-3 p-3 rounded-lg border border-gray-200 shadow">
      <PageTitle
        info={`This list was extracted from "X" total number of experts and researchers worldwide`}
        titleClass="font-bold"
        title="Geographical footprint of experts"
        children={
          <div className="flex justify-between">
            <p className="text-sm">
              <span>Location of experts working on </span>
              <span className="font-semibold">{joinedKeywords}</span>
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
                  Industry Experts
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
                  Academic Experts
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
          <WorldMap
            isExpertMap
            type={currentMode}
            data={isLoading ? [] : mapData}
          />
        </div>
      </div>
    </div>
  );
}

type availableModes = "basicPublication" | "basicPatents";

interface IFootprintHeatmapProps {
  keywords: string[];
}
