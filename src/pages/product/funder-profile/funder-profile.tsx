import { useState } from "react";

//
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

//
import { InfoIcon } from "../../../components/icons";

//
import PublicationItem from "../../../components/@product/publicationItem/publicationItem";
import PageTitle from "../../../components/reusable/page-title";
import ReportButtons from "../../../components/reusable/reports-buttons";
import Search, { IKeywordOption } from "../../../components/reusable/search";
import Pagination from "../../../components/reusable/pagination";

//
import { setDashboardSearch } from "../../../stores/dashboard";

//
import { IPublicationData } from "../publications/publications";

/**
 *
 */
export default function FunderProfilePage() {
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const gotoPage = (page: number) => {
    setCurrentPage(page);
  };

  const searchedKeywords = useAppSelector((state) => state.dashboard?.search);

  const [publicationData] = useState<IFunderData>({
    title:
      "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
    location: "Washington, D.C., United States",
    totalFunding: "83.1 Billion",
    expertise: "???",

    associatedPublications: [
      {
        title:
          "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
        description:
          "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
        id: 1,
      },
      {
        title:
          "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
        description:
          "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
        id: 2,
      },
      {
        title:
          "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
        description:
          "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
        id: 3,
      },
      {
        title:
          "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
        description:
          "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
        id: 4,
      },
      {
        title:
          "Field evaluation of a rapid antigen test (Panbio™ COVID-19 Ag Rapid Test Device) for COVID-19 diagnosis in primary healthcare centres",
        description:
          "To our knowledge, no previous study has assessed the performance of a rapid antigen diagnostic immunoassay (RAD) conducted at the point of care (POC). We evaluated the Panbio™ COVID-19 Ag Rapid Test Device for diagnosis of coronavirus 2019 disease (COVID-19) in symptomatic patients (n = 412) attending primary healthcare centers.",
        id: 5,
      },
    ],
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
            <PageTitle title={publicationData.title} />
          </div>

          <div>
            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                Location:
              </span>
              <span className="col-span-9">{publicationData.location}</span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                Total funding:
              </span>

              <span className="col-span-9">{publicationData.totalFunding}</span>
            </div>

            <div className="pb-2 grid grid-cols-12">
              <span className="font-bold col-span-3 text-right pr-4">
                Expertise:
              </span>
              <span className="col-span-9">{publicationData.expertise}</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-2xl text-primary-900 font-medium mb-4">
              Associated list of publications
            </div>

            <div>
              {publicationData.associatedPublications.map(
                (publicationData: IPublicationData) => (
                  <PublicationItem
                    data={{ abstract: "", doi: "", title: [] }}
                    key={publicationData.id}
                  />
                )
              )}

              <div className="flex justify-center mt-7">
                <Pagination
                  currentPage={currentPage}
                  totalCount={111}
                  gotoPage={gotoPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IFunderData {
  title: string;
  location: string;
  totalFunding: string;
  expertise: string;
  associatedPublications: IPublicationData[];
}
