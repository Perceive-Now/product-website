/* eslint-disable no-case-declarations */
import { useState } from "react";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

//
import { BriefcaseIcon, LocationIcon } from "../../icons";

//
import { IWorldMapDataItem, TooltipGroupItem } from "../world-map/world-map";

//
import geoUrl from "./topology.json";

//
const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const HEATMAP_SECTIONS = 9;

//
const COLOR_RANGE = [
  "#EBF5FF",
  "#DEEBF7",
  "#C6DBEF",
  "#9ECAE1",
  "#6BAED6",
  "#4292C6",
  "#225EA8",
  "#08519C",
  "#08306B",
];

const HEATMAP_COLORS = [
  "bg-[#EBF5FF]",
  "bg-[#DEEBF7]",
  "bg-[#C6DBEF]",
  "bg-[#9ECAE1]",
  "bg-[#6BAED6]",
  "bg-[#4292C6]",
  "bg-[#225EA8]",
  "bg-[#08519C]",
  "bg-[#08306B]",
];

/**
 *
 */
export default function USMap(props: IUSMapProps) {
  const [activeMarkerData, setActiveMarkerData] = useState<IWorldMapDataItem | undefined>(
    undefined,
  );

  //
  const [heatmapHoveredState, setHeatmapHoveredState] = useState<string>("");

  //
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFillColor = (geo?: any) => {
    switch (props.type) {
      case "normal":
        return "#263680";

      case "federalExperts":
        return "#5C1FC4";

      case "heatmap":
        const currentStateValue =
          props.data?.find(
            (itm) => itm.country?.toLowerCase() === geo?.properties?.name?.toLowerCase(),
          )?.patents ?? 0;

        let finalValueToReturn = "#D7D7D7";
        if (currentStateValue === 0) return finalValueToReturn;

        const allValues = getRangeForPatents(true);

        for (let i = 0; i < HEATMAP_SECTIONS; i++) {
          if (currentStateValue <= allValues[i]) {
            finalValueToReturn = COLOR_RANGE[i];
            break;
          }
        }

        return finalValueToReturn;

      default:
        return "#D7D7D7";
    }
  };

  const getRangeForPatents = (excludeZero = false) => {
    const maxVal = 100;
    const tempValue = maxVal / HEATMAP_SECTIONS;

    const midValues = [];
    for (let i = 1; i < HEATMAP_SECTIONS; i++) {
      midValues.push(Math.floor(tempValue * i));
    }

    const values = [...midValues, maxVal];

    return excludeZero ? values : [0, ...values];
  };

  //
  return (
    <div className="overflow-y-hidden h-[610px] relative">
      {activeMarkerData && (
        <ReactTooltip id="marker-details">
          <div>
            <p className="text-lg mb-1">{activeMarkerData?.name ?? "-"}</p>

            {activeMarkerData?.employment && (
              <div className="flex gap-x-1 items-center mb-[0.25rem]">
                <BriefcaseIcon className="text-gray-400" />
                <span>{activeMarkerData?.employment}</span>
              </div>
            )}

            <div className="flex gap-x-1 items-center">
              <LocationIcon className="text-gray-400" />
              <span>{activeMarkerData?.location ?? "-"}</span>
            </div>

            <div className="mt-2 flex">
              <TooltipGroupItem title="Patents" value={activeMarkerData.patents} />
            </div>
          </div>
        </ReactTooltip>
      )}

      {props.type === "heatmap" && heatmapHoveredState && (
        <ReactTooltip id="country-name">
          <div className="flex items-center gap-x-0.5">
            <LocationIcon className="text-gray-400" />

            <p>{heatmapHoveredState}</p>
          </div>

          <div className="mt-2 flex justify-center gap-x-2">
            <TooltipGroupItem title="Patents" value={activeMarkerData?.patents} isPercentage />
          </div>
        </ReactTooltip>
      )}

      {/* Actual Map */}
      <div className="flex justify-center w-full object-cover">
        <ComposableMap
          projection="geoAlbersUsa"
          className="bg-gray-200 h-[610px]"
          projectionConfig={{ scale: 1000 }}
        >
          <Geographies geography={geoUrl} data-tip="" data-for="country-name">
            {({ geographies }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="gray"
                    strokeWidth={0.25}
                    style={
                      props.type === "normal"
                        ? { hover: { fill: "#7A89CC" } }
                        : props.type === "federalExperts"
                        ? { hover: { fill: "#B6A2D8" } }
                        : {}
                    }
                    onMouseEnter={() => {
                      if (props.type === "heatmap") {
                        setHeatmapHoveredState(geo?.properties?.name);

                        //
                        const dataForCurrentState = props.data?.find(
                          (itm) =>
                            itm.country?.toLowerCase() === geo?.properties?.name?.toLowerCase(),
                        );
                        setActiveMarkerData(dataForCurrentState);
                      }
                    }}
                    onMouseLeave={() => {
                      if (props.type === "heatmap") {
                        setHeatmapHoveredState("");
                        setActiveMarkerData(undefined);
                      }
                    }}
                    fill={getFillColor(geo)}
                    className="focus:outline-none drop-shadow-sm"
                  />
                ))}

                {/* Markers */}
                {props.type !== "heatmap" &&
                  props.data
                    ?.filter((item) => item.coordinate?.length)
                    ?.map((marker, index) => {
                      const _centroid = marker.coordinate ?? [0, 0];
                      const centroid: [number, number] = [_centroid[1], _centroid[0]];

                      return (
                        <g key={index + "-name"}>
                          {centroid[0] > -160 && centroid[0] < -67 && (
                            <>
                              <Marker
                                coordinates={centroid}
                                data-tip=""
                                data-for="marker-details"
                                onMouseEnter={() => setActiveMarkerData(marker)}
                                onMouseLeave={() => setActiveMarkerData(undefined)}
                              >
                                <circle r={3} fill="red" />
                                <circle r={2} fill="white" />
                              </Marker>
                            </>
                          )}
                        </g>
                      );
                    })}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>

      {props.type === "heatmap" && (
        <div className="h-[80px] absolute inset-x-0 bottom-0  z-10 px-[60px] pt-3">
          {/* Heatmap range values */}
          <div className="flex justify-between text-sm">
            {getRangeForPatents().map((grp) => (
              <div key={grp} className="h-2 text-gray-700">
                {grp}%
              </div>
            ))}
          </div>

          {/* Heatmap color indicators */}
          <div className="flex justify-between mt-1">
            {COLOR_GROUPS.map((grp) => (
              <div key={grp} className={classNames("h-2 w-[11.11%] shadow", HEATMAP_COLORS[grp])} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface IUSMapProps {
  isExpertMap?: boolean;
  type: "heatmap" | "normal" | "federalExperts";
  //
  data?: IWorldMapDataItem[];
}
