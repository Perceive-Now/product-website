import { FunctionComponent, useEffect } from "react";
import BarChart from "../../../@product/bar-chart";
import DataSection from "../../../reusable/data-section";
import { useQuery } from "@tanstack/react-query";
import { getPatentCompetitorPortfolio } from "../../../../utils/api/charts";
import PageTitle from "../../../reusable/page-title";

interface Props {
  keywords: string[];
}

interface IScholaryPublicationData {
  count: number;
  year: number;
}

interface IScatterItem {
  x: number;
  y: number;
}

interface IScatterList {
  id: string;
  data: IScatterItem[];
}

// type IYear = "1st5year" | "2nd5year";

export const PatentAssignment: FunctionComponent<Props> = ({ keywords }) => {
  // const [yearChoose, setYearChoose] = useState<IYear>("1st5year");

  // const changeYear = (mode: string) => {
  //   setYearChoose(mode as IYear);
  // };

  const { data, isLoading, isError, error } = useQuery(
    ["patents-portfolio1", ...keywords],
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

  //
  // const finalScatterDataFormatHelper = (data: IScholaryPublicationData[]) => {
  //   if (!data) return [];

  //   const openAccessCountObj: IScatterList = { id: "Stage", data: [] };
  //   let openAccessData: IScatterItem[] = [];
  //   //
  //   data.forEach((d) => {
  //     openAccessData.push({ x: d.year, y: d.count });
  //   });

  //   // For checking and sorting past 10years
  //   const uniqueYears = Array.from(
  //     new Set(openAccessData.map((entry) => entry.x))
  //   );
  //   const sortedYears = uniqueYears.sort((a, b) => b - a);
  //   const recentYears = sortedYears.slice(0, 10);
  //   //

  //   // filter
  //   openAccessData = openAccessData.filter((item) => recentYears.includes(item.x));
  //   openAccessCountObj.data = openAccessData.slice(0, 10);
  //   //
  //   return [openAccessCountObj];
  // };

  // const scatterChartData = finalScatterDataFormatHelper(data ?? []);

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
            title="9. Top Organizations by Number of Patent Assignments"
            // subTitle="Heat map of patents location in USA"
            // sideTitleOption={
            //   <RadioButtons
            //     options={[
            //       { label: "2014-2018", value: "1st5year" },
            //       { label: "2019-2023", value: "2nd5year" },
            //     ]}
            //     activeMode={yearChoose}
            //     handleModeChange={changeYear}
            //     classNames="text-sm font-semibold"
            //   />
            // }
          />
        }
      >
        <div>
          {data && (
            <BarChart
              data={data.slice(2, 5)}
              keys={["count"]}
              indexBy="org"
              groupMode="stacked"
              // legendY="Number of Patents"
              // legendX=" of Patents"
              innerPadding={0}
              borderRadius={4}
            />
          )}
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
