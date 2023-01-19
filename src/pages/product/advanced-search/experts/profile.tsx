import { useState } from "react";

//
import PageTitle from "../../../../components/reusable/page-title";
import ReportButtons from "../../../../components/reusable/reports-buttons";
import Search, { IKeywordOption } from "../../../../components/reusable/search";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { setDashboardSearch } from "../../../../stores/dashboard";

//
import { InfoIcon } from "../../../../components/icons";

/**
 *
 */
export default function ExpertsProfilePage() {
  const dispatch = useAppDispatch();
  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const [expertsData] = useState<IExpertsData>({
    name: "Riccardo Privolizzi",
    affiliations: "University College London, Asklepios BioPharmaceutical, Inc.",
    distictions: "Honorary Research Fellow ASGCT Meritorious Abstract Travel Award",
    employment: "London's Global University",
    location: "London, England, UK",
    funding: "???",
    numberOfPatents: 32,
    numberOfPublications: 203,
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
        <div className="col-span-8 text-appGray-900">
          <div className="mb-3">
            <PageTitle title={expertsData.name} titleClass="font-semibold" />
          </div>

          <div>
            <ProfileProperty title="Affiliations" value={expertsData.affiliations} />

            <ProfileProperty title="Distinctions" value={expertsData.distictions} />

            <ProfileProperty title="Employment" value={expertsData.employment} />

            <ProfileProperty title="Location" value={expertsData.location} />

            <ProfileProperty title="Funding" value={expertsData.funding} />

            <ProfileProperty
              title="No. of Patents"
              value={expertsData.numberOfPatents.toString()}
            />

            <ProfileProperty
              title="No. of Publications"
              value={expertsData.numberOfPublications.toString()}
            />

            <ProfileProperty title="Biography" value={expertsData.biography} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileProperty(props: IProfilePropertyProps) {
  return (
    <div className="pb-2 grid grid-cols-12">
      <span className="font-bold col-span-3 text-right pr-4">{props.title}:</span>

      {props.isLink && (
        <a href={props.value} target="_blank" rel="noreferrer">
          {props.value}
        </a>
      )}

      {!props.isLink && <span className="col-span-9">{props.value}</span>}
    </div>
  );
}

interface IProfilePropertyProps {
  title: string;
  value: string;
  isLink?: boolean;
}

interface IExpertsData {
  name: string;
  affiliations: string;
  distictions: string;
  employment: string;
  location: string;
  funding: string;
  numberOfPatents: number;
  numberOfPublications: number;
  biography: string;
}
