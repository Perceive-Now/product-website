import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Tooltip, TooltipProvider, TooltipWrapper } from "react-tooltip";

import classNames from "classnames";

//
import USMap from "../../@product/us-map";

//
import Button from "../../reusable/button";
import PageTitle from "../../reusable/page-title";
import DataSection from "../../reusable/data-section";
// import RadioButtons from "../../reusable/radio-buttons";

//
import { getPatentHeatmap } from "../../../utils/api/map";
import StatesCodes from "../../../utils/extra/us-states-codes";

//
import { ChevronRight, LocationIcon } from "../../icons";

//
import { classificationMode } from "../../../pages/product/pro/patents/list/patents";

/**
 *
 */
export default function FootprintHeatmap(props: IFootprintHeatmapProps) {
  const navigate = useNavigate();

  const [currentMode, setCurrentMode] = useState<classificationMode>("Industry");

  //
  const { data, isLoading, isError, error } = useQuery(
    ["footprint-for-patents-and-publications", ...props.keywords],
    async () => {
      return await getPatentHeatmap(props.keywords);
    },
    { enabled: !!props.keywords.length },
  );

  //
  const mapData =
    (currentMode === "Industry" ? data?.Industries : data?.Universities)?.count.map((item) => ({
      country: StatesCodes[item.country],
      patents: item.count,
    })) ?? [];

  //
  const titleList =
    (currentMode === "Industry" ? data?.Industries : data?.Universities)?.titles ?? [];

  //
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleModeChange = (mode: string) => {
    setCurrentMode(mode as classificationMode);
  };

  const handleViewMoreClick = () => {
    navigate(`/deep-search/patents?mode=${currentMode}`);
  };

  //
  return (
    <DataSection
      keywords={props.keywords}
      isLoading={isLoading}
      isError={isError}
      error={error}
      title={
        <PageTitle
          // info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
          titleClass="font-semibold"
          title="Geographical Footprint of Patents"
          subTitle="Heat map of patents location in USA"
          // sideTitleOption={
          //   <RadioButtons
          //     options={[
          //       { label: "Industries", value: "Industry" },
          //       { label: "Universities", value: "Academic" },
          //     ]}
          //     activeMode={currentMode}
          //     handleModeChange={handleModeChange}
          //   />
          // }
        />
      }
    >
      <div className="grid grid-cols-12 mt-2 h-[610px]">
        <TooltipProvider>
          <div className="col-span-3 overflow-y-hidden pr-2">
            <p className="text-xl text-primary-900">Most Recent Patents</p>

            <div className="mt-2 flex flex-col justify-between items-start h-[90%]">
              <div>
                {titleList.slice(0, 3).map((itm, index) => (
                  <div
                    key={index}
                    className={classNames({
                      "border-b border-gray-300 mb-2 pb-2": index !== 3,
                    })}
                  >
                    <div className="line-clamp-1 text-xl text-gray-700">
                      <TooltipWrapper content={itm.patent_title}>
                        <span className="text-lg mr-1 font-semibold text-primary-800">
                          0{index + 1}.
                        </span>
                        <span>{itm.patent_title}</span>
                      </TooltipWrapper>
                    </div>

                    <div className="line-clamp-2 mt-1 text-gray-600">
                      <TooltipWrapper content={itm.patent_abstract}>
                        <p>{itm.patent_abstract}</p>
                      </TooltipWrapper>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-sm text-gray-700">
                      <LocationIcon width={16} height={16} />
                      <span>{StatesCodes[itm.state] ?? itm.state}</span>
                    </div>
                  </div>
                ))}
              </div>

              <Button type="secondary" handleClick={handleViewMoreClick}>
                <div className="flex">
                  View more <ChevronRight className="ml-0.5" />
                </div>
              </Button>
            </div>
          </div>

          <Tooltip className="tooltip" float />
        </TooltipProvider>

        <div className="col-span-9 bg-gray-200">
          <USMap
            type={currentMode === "Industry" ? "heatmap_industry" : "heatmap_universities"}
            data={mapData}
          />
        </div>
      </div>
    </DataSection>
  );
}

interface IFootprintHeatmapProps {
  keywords: string[];
}
