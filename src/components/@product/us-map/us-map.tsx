/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";

import { useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

//
import { LocationIcon } from "../../icons";
import MapNavigation from "../../../assets/images/map-navigation.svg";

//
import { IWorldMapDataItem, TooltipGroupItem } from "../world-map/world-map";

//
import geoUrl from "./topology.json";
import toast from "react-hot-toast";

//
const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const HEATMAP_SECTIONS = 10;

//handleButtonClick
// const COLOR_RANGE = [
//   "#533F73",
//   "#442873",
//   "#5C1FC4",
//   "#5C20C4",
//   "#7D4DD0",
//   "#B6A2D8",
//   "#7F4BD8",
//   "#926AD7",
//   "#CCBAED",
//   "#5C1FC4",
// ];

const COLOR_RANGE = [
  "#5C1FC4",
  "#CCBAED",
  "#926AD7",
  "#7F4BD8",
  "#B6A2D8",
  "#7D4DD0",
  "#5C20C4",
  "#5C1FC4",
  "#442873",
  "#533F73",
];

const HEATMAP_COLORS = [
  "bg-[#5c1fc41a]",
  "bg-[#5c1fc433]",
  "bg-[#5c1fc44d]",
  "bg-[#5c1fc466]",
  "bg-[#7f4bd8cc]",
  "bg-[#7F4BD8]",
  "bg-[#5c1fc4e6]",
  "bg-[#533f73e6]",
  "bg-[#533F73]",
  "bg-[#442873]",
];

//
// const COLOR_RANGE2 = [
//   "#EBF5FF",
//   "#DEEBF7",
//   "#C6DBEF",
//   "#9ECAE1",
//   "#6BAED6",
//   "#4292C6",
//   "#225EA8",
//   "#08529C",
//   "#113B8F",
//   "#032454",
// ];

const HEATMAP_COLORS2 = [
  "bg-[#032454]",
  "bg-[#EBF5FF]",
  "bg-[#DEEBF7]",
  "bg-[#C6DBEF]",
  "bg-[#9ECAE1]",
  "bg-[#6BAED6]",
  "bg-[#4292C6]",
  "bg-[#225EA8]",
  "bg-[#08529C]",
  "bg-[#113B8F]",
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
    let currentStateValue = 0;
    const allValues = getRangeForPatents(props.data);
    //
    switch (props.type) {
      case "heatmap_industry":
        currentStateValue =
          props.data?.find(
            (itm) => itm.country?.toLowerCase() === geo?.properties?.name?.toLowerCase(),
          )?.patents ?? 0;

        if (currentStateValue === 0) return "#E1D5F2";
        //
        for (let i = 0; i <= COLOR_RANGE.length; i++) {
          if (currentStateValue < allValues[i]) {
            return COLOR_RANGE[i];
          }
        }

        return;

      // case "heatmap_universities":
      //   currentStateValue =
      //     props.data?.find(
      //       (itm) => itm.country?.toLowerCase() === geo?.properties?.name?.toLowerCase(),
      //     )?.patents ?? 0;

      //   if (currentStateValue === 0) return "#E1D5F2";

      //   //
      //   for (let i = 1; i <= COLOR_RANGE2.length; i++) {
      //     if (currentStateValue < allValues[i]) {
      //       return COLOR_RANGE2[i - 1];
      //     }
      //   }

      //   return;

      default:
        return "#D7D7D7";
    }
  };

  const getRangeForPatents = (data?: IWorldMapDataItem[]) => {
    if (!data?.length) return [];

    const maxVal = (data ?? []).sort((a, b) => (b.patents ?? 0) - (a.patents ?? 0))[0].patents ?? 0;
    const maxValue = Math.ceil(maxVal / 100) * 100;

    const tempValue = maxValue / HEATMAP_SECTIONS;

    const midValues = [];
    for (let i = 1; i < HEATMAP_SECTIONS; i++) {
      midValues.push(Math.floor(tempValue * i));
    }

    const values = [...midValues, maxValue];

    return [0, ...values];
  };
  //
  const elementRef = useRef<any>(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // If the document is not currently in full screen, request full screen
      elementRef.current.requestFullscreen().catch((err: any) => {
        toast.error("Error attempting to enable full-screen mode:", err);
      });
    } else {
      // If the document is currently in full screen, exit full screen
      document.exitFullscreen();
    }
  };
  //
  return (
    <>
      <div className="overflow-y-hidden h-[610px] relative w-[610px] mx-auto">
        <div className="text-end">
          <button type="button" onClick={toggleFullScreen}>
            <img src={MapNavigation} />
          </button>
        </div>
        {/* Actual Map */}
        <div className="flex justify-center w-full object-cover" id="us-map" ref={elementRef}>
          <ComposableMap
            projection="geoAlbersUsa"
            className="bg-white h-[610px w-full"
            projectionConfig={{ scale: 1000 }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) => (
                <>
                  {geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      stroke="gray"
                      strokeWidth={0.25}
                      onMouseEnter={() => {
                        setHeatmapHoveredState(geo?.properties?.name);

                        //
                        const dataForCurrentState = props.data?.find(
                          (itm) =>
                            itm.country?.toLowerCase() === geo?.properties?.name?.toLowerCase(),
                        );
                        setActiveMarkerData(dataForCurrentState);
                      }}
                      onMouseLeave={() => {
                        setHeatmapHoveredState("");
                        setActiveMarkerData(undefined);
                      }}
                      fill={getFillColor(geo)}
                      className="focus:outline-none drop-shadow-sm"
                    />
                  ))}
                </>
              )}
            </Geographies>
          </ComposableMap>
        </div>

        <div className="h-[80px] absolute inset-x-0 bottom-0  z-10 px-[60px] pt-3">
          {/* Heatmap range values */}
          <div className="flex justify-between text-sm">
            {getRangeForPatents(props.data).map((grp, index) => (
              <div
                key={grp}
                className={classNames("h-2 text-gray-700", {
                  "-mr-1": index > 0,
                  "-mr-[12px]": index > 6,
                })}
              >
                <span>{grp}</span>
                {index === 10 && <span>+</span>}
              </div>
            ))}
          </div>

          {/* Heatmap color indicators */}
          <div className="flex justify-between mt-1">
            {COLOR_GROUPS.map((grp) => (
              <div
                key={grp}
                className={classNames(
                  "h-2 w-[11.11%] shadow",
                  props.type === "heatmap_industry" ? HEATMAP_COLORS[grp] : HEATMAP_COLORS2[grp],
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <Tooltip anchorId="us-map" className="map-tooltip" float>
        {heatmapHoveredState && (
          <>
            <div className="flex items-center gap-x-0.5">
              <LocationIcon className="text-gray-400" />

              <p>{heatmapHoveredState}</p>
            </div>

            <div className="mt-2 flex justify-center gap-x-2">
              <TooltipGroupItem
                title="Patents"
                value={activeMarkerData?.patents}
                isPercentage={false}
              />
            </div>
          </>
        )}
      </Tooltip>
    </>
  );
}

interface IUSMapProps {
  isExpertMap?: boolean;
  type: "heatmap_industry" | "heatmap_universities";
  //
  data?: IWorldMapDataItem[];
}
