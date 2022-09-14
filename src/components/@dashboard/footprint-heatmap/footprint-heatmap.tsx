import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import WorldMap from "../../@product/world-map";
import PageTitle from "../../reusable/page-title";

//
import { getPublicationsAndPatentsMap } from "../../../utils/api/map";

/**
 *
 */
export default function FootprintHeatmap(props: IFootprintHeatmapProps) {
  const [currentMode, setCurrentMode] =
    useState<availableModes>("publicationHeatmap");

  const joinedKeywords = props.keywords.map((kwd) => `"${kwd}"`).join(", ");

  const { data, isLoading } = useQuery(
    ["footprint-for-patents-and-publications", ...props.keywords],
    async () => {
      return await getPublicationsAndPatentsMap();
    }
  );

  return (
    <div className="mt-3 p-3 rounded-lg border border-gray-200 shadow">
      <PageTitle
        info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
        titleClass="font-bold"
        title="Geographical Footprint of Publications and Patents"
        children={
          <div className="flex justify-between">
            <p className="text-sm">
              <span>Heat map of publications related to </span>
              <span className="font-semibold">{joinedKeywords}</span>
            </p>

            <div className="flex gap-x-3 text-sm">
              <div className="flex h-full items-center gap-x-0.5 cursor-pointer">
                <input
                  type="radio"
                  id="publicationHeatmap"
                  name="currentModeHeatmap"
                  checked={currentMode === "publicationHeatmap"}
                  onChange={() => setCurrentMode("publicationHeatmap")}
                />
                <label htmlFor="publicationHeatmap" className="cursor-pointer">
                  Publications
                </label>
              </div>

              <div className="flex h-full items-center gap-x-0.5 cursor-pointer">
                <input
                  type="radio"
                  id="patentsHeatmap"
                  name="currentModeHeatmap"
                  checked={currentMode === "patentsHeatmap"}
                  onChange={() => setCurrentMode("patentsHeatmap")}
                />
                <label htmlFor="patentsHeatmap" className="cursor-pointer">
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
          <WorldMap type={currentMode} data={isLoading ? [] : data} />
        </div>
      </div>
    </div>
  );
}

type availableModes = "publicationHeatmap" | "patentsHeatmap";

interface IFootprintHeatmapProps {
  keywords: string[];
}
