// import { useState } from "react";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";

//
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";

//
import GoogleMaps from "../../@product/google-map";
import type { IWorldMapDataItem } from "../../@product/world-map/world-map";

//
import { getCompetitorMapInfo } from "../../../utils/api/map";
import { LocationIcon } from "../../icons";

/**
 *
 */
export default function CompetetitorMap(props: IFootprintHeatmapProps) {
  const { data, isLoading, isError, error } = useQuery(
    ["footprint-for-competetitors", ...props.keywords],
    async () => {
      return await getCompetitorMapInfo(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  //
  const finalData: IWorldMapDataItem[] = isLoading
    ? []
    : data?.patentInfo?.map((item) => ({
        name: item.company,
        location: item.location,
        patents: item.count,
        lat: item.coordiantes?.[0],
        lng: item.coordiantes?.[1],
      })) ?? [];

  //
  const allPatentList = (isLoading ? [] : data?.patentInfo) ?? [];

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          // info={`Geographical footprint of companies working in your area of interest is extracted from "X" total number of companies worldwide with technology research footprint`}
          titleClass="font-semibold"
          title="Geographical Footprint of Companies"
        >
          <div className="flex justify-between">
            <p className="text-sm">Geolocation of companies working in your area of interest</p>
          </div>
        </PageTitle>
      }
    >
      <div className="grid grid-cols-12 mt-2 h-[610px]">
        <div className="col-span-3 h-[610px] overflow-hidden pr-2">
          <div>
            {allPatentList?.slice(0, 7)?.map((itm, index) => (
              <div
                key={index}
                className={classNames({
                  "pb-2 mb-2 border-b border-gray-300": index !== 6,
                })}
              >
                <p className="text-xl leading-tight line-clamp-1">
                  <span className="mr-1 font-semibold text-primary-800">0{index + 1}.</span>
                  <span className="text-gray-700">{itm.company}</span>
                </p>

                {/* <p className="my-[12px] text-sm line-clamp-4">{itm.abstract}</p> */}

                <div className="flex items-center gap-[4px] text-gray-600 mt-1">
                  <LocationIcon width={16} height={16} />
                  <p className="text-sm">{itm.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-9 bg-gray-200">
          <GoogleMaps isWorldMap={false} data={finalData} />
        </div>
      </div>
    </DataSection>
  );
}

//
interface IFootprintHeatmapProps {
  keywords: string[];
}
