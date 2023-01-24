import { useState } from "react";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

//
import { BriefcaseIcon, LocationIcon } from "../../icons";

//
import { IWorldMapDataItem, TooltipGroupItem } from "../world-map/world-map";

//
import geoUrl from "./topology.json";

//
const COLOR_GROUPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const HEATMAP_SECTIONS = 10;

//
const COLOR_RANGE = [
  "#D7D7D7",
  "#5c1fc4e6",
  "#5c1fc433",
  "#5c1fc4e6",
  "#442873e6",
  "#B6A2D8",
  "#7F4BD8",
  "#5C1FC4",
  "#533F73",
  "#442873",
];

const HEATMAP_COLORS = [
  "bg-[#D7D7D7]",
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
const COLOR_RANGE2 = [
  "#D7D7D7",
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

const HEATMAP_COLORS2 = [
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

        //
        for (let i = 1; i <= COLOR_RANGE.length; i++) {
          if (currentStateValue < allValues[i]) {
            return COLOR_RANGE[i - 1];
          }
        }

        return;

      case "heatmap_universities":
        currentStateValue =
          props.data?.find(
            (itm) => itm.country?.toLowerCase() === geo?.properties?.name?.toLowerCase(),
          )?.patents ?? 0;

        //
        for (let i = 1; i <= COLOR_RANGE2.length; i++) {
          if (currentStateValue < allValues[i]) {
            return COLOR_RANGE2[i - 1];
          }
        }

        return;

      default:
        return "#D7D7D7";
    }
  };

  const getRangeForPatents = (data?: IWorldMapDataItem[]) => {
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
              <TooltipGroupItem
                title="Patents"
                value={activeMarkerData.patents}
                isPercentage={false}
              />
            </div>
          </div>
        </ReactTooltip>
      )}

      {props.type === "heatmap_industry" && heatmapHoveredState && (
        <ReactTooltip id="country-name">
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
                    onMouseEnter={() => {
                      if (props.type === "heatmap_industry") {
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
                      if (props.type === "heatmap_industry") {
                        setHeatmapHoveredState("");
                        setActiveMarkerData(undefined);
                      }
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
  );
}

interface IUSMapProps {
  isExpertMap?: boolean;
  type: "heatmap_industry" | "heatmap_universities";
  //
  data?: IWorldMapDataItem[];
}
