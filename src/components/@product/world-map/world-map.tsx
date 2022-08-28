import classNames from "classnames";
import ReactTooltip from "react-tooltip";

import { useState } from "react";
import { scaleLinear } from "d3-scale";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

//
import { LocationIcon, MapMarkerIcon } from "../../icons";

// Topology
import topology from "./topology.json";

//
import "./world-map.css";

//
const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const TEXT_GROUPS = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, "500+"];

const HEATMAP_1_COLORS = [
  "bg-[#D7D7D7]",
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

const HEATMAP_2_COLORS = [
  "bg-[#D7D7D7]",
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
export default function WorldMap(props: ISvgMapProps) {
  const [scale, setScale] = useState(125);
  const [center, setCenter] = useState<[number, number]>([0, 30]);
  const [activeSelection, setActiveSelection] = useState<string | null>(null);

  const [hoveredCountry, setHoveredCountry] = useState("");
  const [heatmapHoveredCountry, setHeatmapHoveredCountry] = useState<any>("");

  const [activeMarker, setActiveMarker] = useState<any>(null);

  // Miscs
  const isZoomed = scale > 125;
  const isHeatmap = ["publicationHeatmap", "patentsHeatmap"].includes(
    props.type
  );

  const getFillColor = (geo: any) => {
    switch (props.type) {
      case "basicPublication":
        return geo.rsmKey === activeSelection && isZoomed
          ? "#FFA300"
          : "#442873";

      case "basicPatents":
        return geo.rsmKey === activeSelection && isZoomed
          ? "#7A89CC"
          : "#263680";

      case "publicationHeatmap":
        // if (heatmapHoveredCountry && geo.id !== heatmapHoveredCountry.id)
        //   return "#D7D7D7";

        const colorScale1 = scaleLinear<string>()
          .domain([0, 100])
          .range(["#FFEBA5", "#D0350E"]);

        return colorScale1(parseInt(geo.rsmKey.split("-")[1]));

      case "patentsHeatmap":
        // if (heatmapHoveredCountry && geo.id !== heatmapHoveredCountry.id)
        //   return "#D7D7D7";

        const colorScale2 = scaleLinear<string>()
          .domain([0, 100])
          .range(["#EBF5FF", "#08519C"]);

        return colorScale2(parseInt(geo.rsmKey.split("-")[1]));

      default:
        return "#D7D7D7";
    }
  };

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
    setScale((scaleValue) => Math.min(scaleValue + 200, 2000));
  };

  const decreaseScale = () => {
    const newScale = Math.max(scale - 200, 125);
    setScale(newScale);

    if (newScale === 125) setCenter([0, 30]);
  };

  return (
    <div className="overflow-y-hidden h-[610px] relative">
      {/* Tooltip with just country name */}
      {!isHeatmap && (
        <ReactTooltip id="country-name">{hoveredCountry}</ReactTooltip>
      )}

      {isHeatmap && heatmapHoveredCountry && (
        <ReactTooltip id="country-name" place="bottom">
          <div className="bg-white">
            <p className="font-semibold text-xs">
              {heatmapHoveredCountry?.properties?.name}
            </p>

            <hr className="my-1 border-gray-300" />
            <p>
              <span className="font-bold">{546} </span>
              <span>
                {props.type === "publicationHeatmap"
                  ? "Publications"
                  : "Patents"}
              </span>
            </p>
          </div>
        </ReactTooltip>
      )}

      {!isHeatmap && activeMarker && (
        <ReactTooltip id="marker-details">
          <div>
            <p className="text-lg mb-1">
              {activeMarker?.company ?? "Company Name"}
            </p>

            <div className="flex gap-x-1 items-center">
              <LocationIcon className="text-gray-400" />
              <span>{activeMarker?.location ?? "Location"}</span>
            </div>

            <div className="mt-2 flex gap-x-2">
              <div className="min-w-[80px] h-9 px-[6px] py-2 bg-gray-100 text-center text-xs shadow">
                <p className="font-bold text-lg">
                  {activeMarker?.experts ?? 0}
                </p>
                <p>Experts</p>
              </div>

              <div className="min-w-[80px] h-9 px-[6px] py-2 bg-gray-100 text-center text-xs shadow">
                <p className="font-bold text-lg">
                  {activeMarker?.patents ?? 0}
                </p>
                <p>Patents</p>
              </div>

              <div className="min-w-[80px] h-9 px-[6px] py-2 bg-gray-100 text-center text-xs shadow">
                <p className="font-bold text-lg">
                  {activeMarker?.publications ?? 0}
                </p>
                <p>Publication</p>
              </div>
            </div>
          </div>
        </ReactTooltip>
      )}

      {/* Zoom Controls */}
      <div className="relative">
        <div
          className={classNames(
            "absolute top-1 right-1 w-4 text-center",
            "bg-white border border-gray-300 shadow rounded",
            "flex flex-col justify-around"
          )}
        >
          <div
            className={classNames(
              "w-full h-4 cursor-pointer flex items-center justify-center text-xl font-bold",
              { "cursor-not-allowed bg-gray-200": scale >= 2000 }
            )}
            onClick={increaseScale}
          >
            +
          </div>

          <hr className="border-gray-300" />

          <div
            className={classNames(
              "w-full h-4 cursor-pointer flex items-center justify-center text-xl font-bold",
              { "cursor-not-allowed bg-gray-200": scale <= 125 }
            )}
            onClick={decreaseScale}
          >
            -
          </div>
        </div>
      </div>

      {/* Actual Map */}
      <div
        className="flex justify-center w-full object-cover"
        data-tip=""
        data-for="country-name"
      >
        <ComposableMap
          projection="geoMercator"
          className="bg-gray-200 h-[610px]"
          projectionConfig={{
            scale: scale,
            center: center,
          }}
          zoomAndPan="true"
        >
          {/* Maps */}
          <Geographies geography={topology} id="hello-world">
            {({ geographies, projection, path }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="white"
                  strokeWidth={isZoomed ? 1 : 0.25}
                  style={{ hover: { fill: getCountryHoverColor(geo) } }}
                  fill={getFillColor(geo)}
                  className="focus:outline-none drop-shadow-sm"
                  onClick={() => handleGeographyClick(geo, projection, path)}
                  onMouseEnter={() => {
                    if (isHeatmap) {
                      setHeatmapHoveredCountry(geo);
                    } else {
                      setHoveredCountry(geo.properties.name);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isHeatmap) {
                      setHeatmapHoveredCountry("");
                    } else {
                      setHoveredCountry("");
                    }
                  }}
                />
              ))
            }
          </Geographies>

          {/* Markers */}
          {!isHeatmap &&
            props.markers?.map((marker, index) => (
              <Marker
                key={index}
                coordinates={marker.coordinates}
                className={classNames(
                  "focus:outline-none",
                  isZoomed ? "text-white" : "text-[#FFA300]"
                )}
                data-tip=""
                data-for="marker-details"
                onMouseEnter={() => setActiveMarker(marker)}
                onMouseLeave={() => setActiveMarker(null)}
              >
                <MapMarkerIcon
                  width={isZoomed ? 30 : 15}
                  height={isZoomed ? 30 : 15}
                />
              </Marker>
            ))}
        </ComposableMap>
      </div>

      {isHeatmap && !isZoomed && (
        <div className="h-[80px] absolute inset-x-0 bottom-0 bg-gray-200 z-10 px-[60px] pt-3">
          {/* Heatmap range values */}
          <div className="flex justify-between text-sm">
            {TEXT_GROUPS.map((grp) => (
              <div key={grp} className="h-2 w-4 text-gray-700">
                {grp}
              </div>
            ))}
          </div>

          {/* Heatmap color indicators */}
          <div className="flex justify-between mt-1">
            {COLOR_GROUPS.map((grp) => (
              <div
                key={grp}
                className={classNames(
                  "h-2 w-[10%]",
                  props.type === "publicationHeatmap"
                    ? HEATMAP_1_COLORS[grp]
                    : HEATMAP_2_COLORS[grp]
                )}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ISvgMapProps {
  /**
   * publicationHeatmap: Geographical footprint for publication
   * patentsHeatmap: Geographical footprint for patents
   * basicPublication: Geographical footprint of competetors for publications
   * basicPatents: Geographical footprint of competetors for patents
   */
  type:
    | "publicationHeatmap"
    | "patentsHeatmap"
    | "basicPublication"
    | "basicPatents";
  //
  markers?: {
    coordinates: [number, number];
  }[];
}
