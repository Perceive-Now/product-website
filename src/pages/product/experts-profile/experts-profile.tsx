import { useState } from "react";

//
import PageTitle from "../../../components/reusable/page-title";
import ReportButtons from "../../../components/reusable/reports-buttons";
import Search, { IKeywordOption } from "../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { setDashboardSearch } from "../../../stores/dashboard";

//
import { InfoIcon } from "../../../components/icons";

/**
 *
 */
export default function ExpertsProfilePage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const [expertsData] = useState<IExpertsData>({
    name: "Riccardo Privolizzi",
    affiliations:
      "University College London, Asklepios BioPharmaceutical, Inc.",
    distictions:
      "Honorary Research Fellow ASGCT Meritorious Abstract Travel Award",
    employment: "London's Global University",
    location: "London, England, UK",
    funding: "???",
    number_of_patents: 32,
    number_of_publications: 203,
    biography:
      "Riccardo Privolizzi is a researcher at University College London who specializes in gene therapy research. As a former research assistant, he is highly knowledgeable in AAV, lentiviral reproduction and iPS cells. Using his expertise, Riccardo Privolizzi has published multiple articles in journals such as Gene and Current Stem Cell Reproduction. His awards include the ASGCT Meritorious Abstract Travel Award and LMU Highest Overall Mark in Biomedical Sciences for 2013.",
  });

  //
  const handleSearch = (value: IKeywordOption[]) => {
    dispatch(setDashboardSearch(value));
  };

  return (
    <div>
      <div className="mb-5 grid grid-cols-12">
        <div className="col-span-8 flex items-center">
          <div className="w-2/3">
            <Search initialValue={searchedKeywords} onSubmit={handleSearch} />
          </div>
          <InfoIcon className="ml-2" />
        </div>

        <div className="col-span-4 flex justify-end	items-center">
          <ReportButtons />
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-9 max-w-[870px] text-appGray-900">
          <div className="mb-3">
            <PageTitle title={expertsData.name} titleClass="font-semibold" />
          </div>

          <div>
            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                Affiliations:
              </span>

              <span className="col-span-9">{expertsData.affiliations}</span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                Distictions:
              </span>

              <span className="col-span-9">{expertsData.distictions}</span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                Employment:
              </span>
              <span className="col-span-9">{expertsData.employment}</span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                Location:
              </span>
              <span className="col-span-9">{expertsData.location}</span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                Funding:
              </span>
              <span className="col-span-9">{expertsData.funding}</span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                No. of Patents:
              </span>

              <span className="col-span-9">
                {expertsData.number_of_patents}
              </span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                No. of Publications:
              </span>

              <span className="col-span-9">
                {expertsData.number_of_publications}
              </span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                Biography:
              </span>

              <span className="col-span-9">{expertsData.biography}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IExpertsData {
  name: string;
  affiliations: string;
  distictions: string;
  employment: string;
  location: string;
  funding: string;
  number_of_patents: number;
  number_of_publications: number;
  biography: string;
}
