import { useEffect, useState } from "react";

//
import Button from "../button";
import Accordion from "../accordion";
import PatentTable from "../patent-table";
import FundingTable from "../funding-table";
import ExpertsTable from "../experts-table";
import PublicationItem from "../../@product/publicationItem";

//
import { PatentType } from "../patent-table/patent-table";
import { ExpertsType } from "../experts-table/experts-table";
import { FundingType } from "../funding-table/funding-table";
import { IPublicationData } from "../../../pages/product/advanced-search/publications/publications";

//
import {
  expertsAPIData,
  fundingAPIData,
  patentsPortfolioData,
  publicationsAPIData,
} from "./_data";

/**
 *
 */
export default function DetailedDisclosure({
  id,
  title,
  description,
}: IDetailedDisclosure) {
  const options = [
    { id: 1, label: "Patent Portfolio" },
    { id: 2, label: "Publication Portfolio" },
    { id: 3, label: "Funding" },
    { id: 4, label: "Expert Portfolio" },
  ];

  const [activeLabel, setActiveLabel] = useState("Patent Portfolio");

  const [fundingsData, setFundingsData] = useState<FundingType[]>([]);
  const [expertsData, setExpertsData] = useState<ExpertsType[]>([]);
  const [patentsData, setPatentsData] = useState<PatentType[]>([]);
  const [publicationsData, setPublicationsData] = useState<IPublicationData[]>(
    []
  );

  //
  useEffect(() => {
    if (activeLabel === "Patent Portfolio") {
      setPatentsData(patentsPortfolioData);
    } else if (activeLabel === "Publication Portfolio") {
      setPublicationsData(publicationsAPIData);
    } else if (activeLabel === "Funding") {
      setFundingsData(fundingAPIData);
    } else if (activeLabel === "Expert Portfolio") {
      setExpertsData(expertsAPIData);
    }
  }, [activeLabel]);

  return (
    <div className="shadow pt-2 pb-3 px-3 w-full rounded-2xl mb-3">
      <Accordion title={title} description={description}>
        <div className="px-3 py-4">
          <div className="mb-5 font-bold flex">
            {options.map((option) => (
              <Button
                key={option.id}
                handleClick={() => setActiveLabel(option.label)}
                type={option.label === activeLabel ? "primary" : "secondary"}
                classname="!py-0.5 mr-3"
              >
                {option.label}
              </Button>
            ))}
          </div>

          <div className="mb-2">
            {activeLabel === "Patent Portfolio" && (
              <PatentTable data={patentsData} />
            )}

            {activeLabel === "Publication Portfolio" && (
              <div>
                {publicationsData.map((publicationData: IPublicationData) => (
                  <PublicationItem
                    data={{ abstract: "", doi: "", title: [] }}
                    key={publicationData.id}
                  />
                ))}
              </div>
            )}

            {activeLabel === "Funding" && <FundingTable data={fundingsData} />}

            {activeLabel === "Expert Portfolio" && (
              <ExpertsTable data={expertsData} />
            )}
          </div>
        </div>
      </Accordion>
    </div>
  );
}

interface IDetailedDisclosure {
  title: string;
  description: string;
  id: string;
}
