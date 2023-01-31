import classNames from "classnames";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";

//
import GoogleMaps from "../../@product/google-map";
import type { IWorldMapDataItem } from "../../@product/world-map/world-map";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";
import RadioButtons from "../../reusable/radio-buttons";

//
import { getExpertsMapInfo } from "../../../utils/api/map";
import { LocationIcon } from "../../icons";

/**
 *
 */
export default function ExpertsMap(props: IFootprintHeatmapProps) {
  const [industryMode, setIndustryMode] = useState<industryModes>("industry");

  //
  const { data, isLoading, isError, error } = useQuery(
    ["footprint-for-experts-map", ...props.keywords],
    async () => {
      return await getExpertsMapInfo(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  const toggleIndustryMode = (mode: string) => {
    setIndustryMode(mode as industryModes);
  };

  const mapData: IWorldMapDataItem[] =
    (industryMode === "industry"
      ? data?.Industry_patent_experts
      : data?.Academic_patent_experts
    )?.map((item) => ({
      name: item.name,
      location: `${item.state}, ${item.city}`,
      patents: item.count,
      employment: item.org,
      lat: item.lat,
      lng: item.lon,
    })) ?? [];

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          titleClass="font-semibold"
          title="Geographical footprint of inventors"
          subTitle="Network of inventors and researchers working across the globe"
          sideTitleOption={
            <RadioButtons
              activeMode={industryMode}
              handleModeChange={toggleIndustryMode}
              options={[
                { label: "Industry authors", value: "industry" },
                { label: "Academic authors", value: "academic" },
              ]}
            />
          }
        />
      }
    >
      <div className="grid grid-cols-12 mt-2 h-[610px]">
        <div className="col-span-3 h-[610px] overflow-y-hidden pr-2">
          <TooltipProvider>
            {mapData?.slice(0, 5)?.map((item, index) => (
              <div
                key={index}
                className={classNames({
                  "pb-2 mb-2 border-b border-gray-300": index !== 4,
                })}
              >
                <TooltipWrapper content={item.name}>
                  <p className="line-clamp-1 text-xl leading-6">
                    <span className="font-semibold text-primary-800">{index + 1}. </span>
                    <span className="font-semibold text-gray-700">{item.name}</span>
                  </p>
                </TooltipWrapper>

                <div className="mt-1 text-gray-600 line-clamp-1">
                  <TooltipWrapper content={item.employment}>
                    <p>{item.employment}</p>
                  </TooltipWrapper>
                </div>

                <div className="flex items-center gap-[4px] text-gray-600 mt-1">
                  <LocationIcon height={16} width={16} />
                  <p className="text-sm">{item.location}</p>
                </div>
              </div>
            ))}

            <Tooltip className="tooltip" float />
          </TooltipProvider>
        </div>

        <div className="col-span-9 bg-gray-200">
          {industryMode === "industry" && <GoogleMaps isWorldMap={true} data={mapData} />}
          {industryMode === "academic" && <GoogleMaps isWorldMap={true} data={mapData} />}
        </div>
      </div>
    </DataSection>
  );
}

//
type industryModes = "industry" | "academic";

//
interface IFootprintHeatmapProps {
  keywords: string[];
}
