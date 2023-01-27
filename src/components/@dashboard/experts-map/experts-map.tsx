import classNames from "classnames";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//
import GoogleMaps from "../../@product/google-map";
import type { IWorldMapDataItem } from "../../@product/world-map/world-map";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";
import RadioButtons from "../../reusable/radio-buttons";

//
import { getExpertsMapInfo } from "../../../utils/api/map";

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
        <div className="col-span-3 h-[610px] overflow-y-hidden">
          {mapData?.slice(0, 4)?.map((item, index) => (
            <div
              key={index}
              className={classNames("border-b border-gray-300 mr-3", {
                "mt-2": index !== 0,
              })}
            >
              <p className="line-clamp-1">
                <span className="font-semibold text-primary-800">{index + 1}. </span>
                <span className="font-semibold">{item.name}</span>
              </p>
              <div className="mt-1 mb-2 text-sm">
                <p className="line-clamp-4">{item.employment}</p>
                <p className="mt-[0.25rem]">{item.location}</p>
              </div>
            </div>
          ))}
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
