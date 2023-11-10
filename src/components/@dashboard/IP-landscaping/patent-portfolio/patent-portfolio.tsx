import { useQuery } from "@tanstack/react-query";
import DataSection from "../../../reusable/data-section";
import PageTitle from "../../../reusable/page-title";
import { FunctionComponent, useEffect, useState } from "react";
import {
  getCompetitorPatentingActivity,
  getPatentCompetitorPortfolio,
} from "../../../../utils/api/charts";
import Sunburst from "../../sunburst";
import RadioButtons from "../../../reusable/radio-buttons";

interface Props {
  keywords: string[];
}

type ICompetitorType = "ipc" | "cpc";

export const PatentPortfolioCompetitor: FunctionComponent<Props> = ({ keywords }) => {
  const [competitorType, setCompetitorType] = useState<ICompetitorType>("ipc");

  const changeType = (mode: string) => {
    setCompetitorType(mode as ICompetitorType);
  };

  const { data, isLoading, isError, error } = useQuery(
    ["patemt-portfolio", ...keywords],
    async () => {
      return await getPatentCompetitorPortfolio(keywords);
    },
    // { enabled: !!props.keywords.length },
  );

  // Fetching time period
  useEffect(() => {
    if (!data) return;

    //
  }, [data]);

  return (
    <div className="border-gray-200 shadow-custom border px-2 pt-2 pb-4 w-full space-y-2">
      <DataSection
        keywords={keywords}
        isLoading={isLoading}
        isError={isError}
        error={error}
        title={
          <PageTitle
            // info={`This geographical heat map network was extracted from "X" no of publications and "Y" no of patents`}
            titleClass="font-bold"
            title="10. Patent Portfolios of Key Competitors"
            sideTitleOption={
              <RadioButtons
                options={[
                  { label: "IPC", value: "ipc" },
                  { label: "CPC", value: "cpc" },
                ]}
                activeMode={competitorType}
                handleModeChange={changeType}
                classNames="text-sm font-semibold"
              />
            }
          />
        }
      >
        <div>
          {data && <Sunburst data={data} />}
          <div className="space-y-2 text-secondary-800 mt-4">
            <h5 className="font-bold text-primary-900 text-lg">Key takeaways</h5>
            <div>
              <h6 className="font-semibold text-primary-900">
                Family A: California (100 patents), Texas (50 patents); Family B: New York (80
                patents), Florida (70 patents)
              </h6>
              <ul className="list-disc ml-3 text-sm mt-1 font-medium">
                <li>
                  The wearable blood pressure sensor market is on a growth trajectory with a
                  projected Compound Annual Growth Rate (CAGR) of 8.5% over the next five years.
                  This could potentially elevate the market valuation from an estimated $1.5 billion
                  to over $2.25 billion by the end of the forecast period.
                </li>
                <li>
                  The driving factors behind this growth could be an increasing awareness of health
                  and fitness, aging population, and the advancement in wearable technology.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </DataSection>
    </div>
  );
};
