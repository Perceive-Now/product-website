/* eslint-disable no-case-declarations */
import classNames from "classnames";
import { Tooltip } from "react-tooltip";

import { useState } from "react";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

//
import {
  BriefcaseIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  LocationIcon,
} from "../../icons";

// Topology
import topology from "./topology.json";

//
import "./world-map.css";

//
const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const HEATMAP_SECTIONS = 9;

const COLOR_RANGE_1 = [
  "#FFEBA5",
  "#FFCD6C",
  "#FFB21E",
  "#EE9207",
  "#FF6B00",
  "#F5470F",
  "#D0350E",
  "#A90808",
  "#760000",
];

const HEATMAP_1_COLORS = [
  "bg-[#FFEBA5]",
  "bg-[#FFCD6C]",
  "bg-[#FFB21E]",
  "bg-[#EE9207]",
  "bg-[#FF6B00]",
  "bg-[#F5470F]",
  "bg-[#D0350E]",
  "bg-[#A90808]",
  "bg-[#760000]",
];

/**
 *
 */
export default function WorldMap(props: ISvgMapProps) {
  const [scale, setScale] = useState(125);
  const [center, setCenter] = useState<[number, number]>([0, 30]);
  const [activeSelection, setActiveSelection] = useState<string | null>(null);

  const [hoveredCountry, setHoveredCountry] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [heatmapHoveredCountry, setHeatmapHoveredCountry] = useState<any>("");

  const [activeMarkerData, setActiveMarkerData] = useState<IWorldMapDataItem | undefined>(
    undefined,
  );

  // Miscs
  const isZoomed = scale > 125;
  const isHeatmap = ["publicationHeatmap", "patentsHeatmap"].includes(props.type);

  //
  const getRangeForPublications = (excludeZero = false) => {
    const maxVal = 100;
    const tempValue = maxVal / HEATMAP_SECTIONS;

    const midValues = [];
    for (let i = 1; i < HEATMAP_SECTIONS; i++) {
      midValues.push(Math.floor(tempValue * i));
    }

    const values = [...midValues, maxVal];

    return excludeZero ? values : [0, ...values];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFillColor = (geo: any) => {
    switch (props.type) {
      case "basicPublication":
        return geo.rsmKey === activeSelection && isZoomed ? "#FFA300" : "#442873";

      case "basicPatents":
        return geo.rsmKey === activeSelection && isZoomed ? "#7A89CC" : "#263680";

      case "publicationHeatmap":
        const currentCountryValue =
          props.data?.find((itm) => itm.country === geo.id)?.publications ?? 0;

        let finalValueToReturn = "#D7D7D7";
        if (currentCountryValue === 0) return finalValueToReturn;

        const allValues = getRangeForPublications(true);

        for (let i = 0; i < HEATMAP_SECTIONS; i++) {
          if (currentCountryValue <= allValues[i]) {
            finalValueToReturn = COLOR_RANGE_1[i];
            break;
          }
        }

        return finalValueToReturn;

      case "patentsHeatmap":
      default:
        return "#D7D7D7";
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getCountryHoverColor = (geo: any) => {
    if (geo.rsmKey === activeSelection) return;

    switch (props.type) {
      case "basicPublication":
        return "#E1D5F2";

      case "basicPatents":
        return "#7A89CC";

      default:
        return "";
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGeographyClick = (geography: any, projection: any, path: any) => {
    if (activeSelection === geography.rsmKey) {
      setActiveSelection(null);
      setScale(125);
      setCenter([0, 30]);
    } else {
      const centroid = projection.invert(path.centroid(geography));
      setCenter(centroid);
      setScale(500);

      setActiveSelection(geography.rsmKey);
    }
  };

  // Map controls
  const increaseScale = () => {
    setScale((scaleValue) => Math.min(scaleValue + 200, 1500));
  };

  const decreaseScale = () => {
    const newScale = Math.max(scale - 200, 125);
    setScale(newScale);

    if (newScale === 125) setCenter([0, 30]);
  };

  const moveHorizontal = (value: number) => {
    let newValue = center[0] + value;

    if (scale <= 700) {
      newValue = newValue < -150 ? -150 : newValue > 150 ? 150 : newValue;
    } else if (scale <= 1100) {
      newValue = newValue < -170 ? -170 : newValue > 170 ? 170 : newValue;
    }

    setCenter([newValue, center[1]]);
  };

  const moveVertical = (value: number) => {
    let newValue = center[1] + value;

    if (scale <= 700) {
      newValue = newValue < 0 ? 0 : newValue > 80 ? 80 : newValue;
    } else if (scale <= 1100) {
      newValue = newValue < -20 ? -20 : newValue > 80 ? 80 : newValue;
    }

    setCenter([center[0], newValue]);
  };

  return (
    <div className="overflow-y-hidden h-[610px] relative">
      {/* Tooltip with just country name */}
      {!isHeatmap && <Tooltip anchorId="country-name">{hoveredCountry}</Tooltip>}

      {isHeatmap && heatmapHoveredCountry && (
        <Tooltip anchorId="country-name">
          <div className="flex items-center gap-x-0.5">
            <LocationIcon className="text-gray-400" />

            <p>{activeMarkerData?.location ?? heatmapHoveredCountry?.properties?.name}</p>
          </div>

          <div className="mt-2 flex justify-center gap-x-2">
            {props.type === "patentsHeatmap" && (
              <TooltipGroupItem title="Patents" value={activeMarkerData?.patents} isPercentage />
            )}

            {props.type === "publicationHeatmap" && (
              <TooltipGroupItem
                title="Publications"
                value={activeMarkerData?.publications}
                isPercentage
              />
            )}

            {!["publicationHeatmap", "patentsHeatmap"].includes(props.type) && (
              <TooltipGroupItem title="Experts" value={activeMarkerData?.experts} />
            )}
          </div>
        </Tooltip>
      )}

      {!isHeatmap && activeMarkerData && (
        <Tooltip id="marker-details">
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

            <div className="mt-2 flex gap-x-2">
              {activeMarkerData.experts && (
                <TooltipGroupItem title="Experts" value={activeMarkerData.experts} />
              )}

              {activeMarkerData.patents && (
                <TooltipGroupItem title="Patents" value={activeMarkerData.patents} />
              )}

              {activeMarkerData.publications && (
                <TooltipGroupItem title="Publications" value={activeMarkerData.publications} />
              )}
            </div>
          </div>
        </Tooltip>
      )}

      {/* Direction Controls */}
      {isZoomed && (
        <div className="relative">
          <div className="absolute top-2 left-2">
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden shadow-lg relative text-gray-600">
              <ChevronUp
                className="absolute top-0 ml-[20px] cursor-pointer"
                onClick={() => moveVertical(10)}
              />

              <ChevronRight
                className="absolute right-0 mt-[20px] cursor-pointer"
                onClick={() => moveHorizontal(20)}
              />

              <ChevronDown
                className="absolute bottom-0 ml-[20px] cursor-pointer"
                onClick={() => moveVertical(-10)}
              />

              <ChevronLeft
                className="absolute left-0 mt-[20px] cursor-pointer"
                onClick={() => moveHorizontal(-20)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="relative">
        <div
          className={classNames(
            "absolute top-1 right-1 w-4 text-center",
            "bg-white border border-gray-300 shadow rounded",
            "flex flex-col justify-around",
          )}
        >
          <div
            className={classNames(
              "w-full h-4 cursor-pointer flex items-center justify-center text-xl font-bold",
              { "cursor-not-allowed bg-gray-200": scale >= 2000 },
            )}
            onClick={increaseScale}
          >
            +
          </div>

          <hr className="border-gray-300" />

          <div
            className={classNames(
              "w-full h-4 cursor-pointer flex items-center justify-center text-xl font-bold",
              { "cursor-not-allowed bg-gray-200": scale <= 125 },
            )}
            onClick={decreaseScale}
          >
            -
          </div>
        </div>
      </div>

      {/* Actual Map */}
      <div className="flex justify-center w-full object-cover" id="country-name">
        <ComposableMap
          projection="geoMercator"
          className="bg-gray-200 h-[610px]"
          projectionConfig={{
            scale: scale,
            center: center,
          }}
        >
          {/* Maps */}
          <Geographies geography={topology} className="cursor-pointer">
            {({ geographies, projection, path }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="gray"
                  strokeWidth={isZoomed ? 1 : 0.5}
                  style={{ hover: { fill: getCountryHoverColor(geo) } }}
                  fill={getFillColor(geo)}
                  className="focus:outline-none drop-shadow-sm"
                  onClick={() => handleGeographyClick(geo, projection, path)}
                  onMouseEnter={() => {
                    if (isHeatmap) {
                      setHeatmapHoveredCountry(geo);

                      const dataForCurrentCountry = props.data?.find(
                        (itm) => itm.country === geo.id,
                      );
                      setActiveMarkerData(dataForCurrentCountry);
                    } else {
                      setHoveredCountry(geo.properties.name);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isHeatmap) {
                      setHeatmapHoveredCountry("");
                      setActiveMarkerData(undefined);
                    } else {
                      setHoveredCountry("");
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>

      {isHeatmap && !isZoomed && (
        <div className="h-[80px] absolute inset-x-0 bottom-0 bg-gray-200 z-10 px-[60px] pt-3">
          {/* Heatmap range values */}
          <div className="flex justify-between text-sm">
            {getRangeForPublications().map((grp) => (
              <div key={grp} className="h-2 text-gray-700">
                {grp}%
              </div>
            ))}
          </div>

          {/* Heatmap color indicators */}
          <div className="flex justify-between mt-1">
            {COLOR_GROUPS.map((grp) => (
              <div
                key={grp}
                className={classNames("h-2 w-[11.11%] shadow", HEATMAP_1_COLORS[grp])}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function TooltipGroupItem(props: ITooltipGroupItemProp) {
  return (
    <div className="min-w-[80px] h-9 px-[6px] py-2 bg-gray-100 text-center text-xs shadow flex-grow">
      <p className="font-bold text-lg">
        <span>{props.value?.toLocaleString() ?? "-"}</span>
        {props.isPercentage && props.value && "%"}
      </p>
      <p>{props.title}</p>
    </div>
  );
}

//
interface ITooltipGroupItemProp {
  title: string;
  value?: number;
  isPercentage?: boolean;
}

export interface IWorldMapDataItem {
  name?: string;
  country?: string;
  location?: string;
  employment?: string;
  patents?: number;
  publications?: number;
  city?: string;
  state?: string;
  experts?: number;
  lat?: string;
  lng?: string;
}

interface ISvgMapProps {
  /**
   * publicationHeatmap: Geographical footprint for publication
   * patentsHeatmap: Geographical footprint for patents
   * basicPublication: Geographical footprint of competetors for publications
   * basicPatents: Geographical footprint of competetors for patents
   * federalExperts: Geographical footprint for expers federal
   */
  isExpertMap?: boolean;
  type:
    | "publicationHeatmap"
    | "patentsHeatmap"
    | "basicPublication"
    | "basicPatents"
    | "federalExperts";
  //
  data?: IWorldMapDataItem[];
}
